"use strict"

var global = require('./global-submit.js')
var globalDate = require('./global-set-date-storage.js')

class Breakfast {
  constructor(food=0, calories=0){
    this.food = food;
    this.calories = calories;
  }


storeBreakfast() {
  var date = $('.date-format')[0].innerText
  var dateJSON = localStorage.getItem(date)
  var dateArray = JSON.parse(dateJSON)
    // if (dateArray === null){
    //   breakfastJSON = '[]';
    // }
    dateArray.breakfast.unshift({food: this.food, calories: this.calories});

    var breakfastJSON = JSON.stringify(dateArray);
    localStorage.setItem(date, breakfastJSON)
  }


deleteBreakfast(event, that) {
    event.preventDefault();
    var breakfast = JSON.parse(localStorage["breakfast"]);
    for (var i = 0; i < breakfast.length; i++) {
      if ($(that).parent().parent().data('id') === i){
        that.parentElement.parentElement.remove();
        breakfast.splice(i,1)
        var breakfastJSON = JSON.stringify(breakfast);
        localStorage.setItem('breakfast', breakfastJSON);
      }
     }
     globalDate.setDateStorage('breakfast');
   };

updateBreakfast(storage, tableName){
     var CalorieTotal = 0
     if (localStorage.getItem('01/31/2017') === null) {
       var array = "[]"
       localStorage.setItem('01/31/2017', array)
     } else if (JSON.parse(localStorage["01/31/2017"]).breakfast === undefined) {
      var date = $('.date-format')[0].innerText
      var breakfastJSON = '[]'
      localStorage.setItem('breakfast',breakfastJSON)
      var breakfastArray = JSON.parse(localStorage.breakfast)
      var breakfast = {breakfast:breakfastArray}
      localStorage.setItem(date, JSON.stringify(breakfast))
      var brad = JSON.parse(localStorage.getItem('01/31/2017'))
    } else {
      var brad = JSON.parse(localStorage["01/31/2017"]).breakfast
      for (var i = 0; i < brad.length; i++) {
         global.submitTable(brad[i].food, brad[i].calories, i, tableName, '01/31/2017');
         CalorieTotal += parseInt(brad[i].calories)
       }
     }
     global.submitTableCalories(CalorieTotal, tableName)
   }
 }

// global[name1](CalorieTotal)


module.exports = Breakfast
