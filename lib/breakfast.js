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
  var fullDateArray = JSON.parse(localStorage[date])
  // var dateArray = JSON.parse(dateJSON)[0]
    fullDateArray[0].breakfast.unshift({food: this.food, calories: this.calories});


    var breakfastJSON = JSON.stringify(fullDateArray);
    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
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
     var date = $('.date-format')[0].innerText
     if (localStorage.getItem(date) === null) {
       var array = [
        { breakfast: []},
        { lunch: [] },
        { dinner: []} ,
        { snack: [] },
        { dailyExercise: [] }
      ];
       localStorage.setItem(date, JSON.stringify(array))
     } else  {
      var brad = JSON.parse(localStorage[date])[0]
      for (var i = 0; i < brad.breakfast.length; i++) {
         global.submitTable(brad.breakfast[i].food, brad.breakfast[i].calories, i, tableName, date);
         CalorieTotal += parseInt(brad.breakfast[i].calories)
       }
     }
     global.submitTableCalories(CalorieTotal, tableName)
   }
 }

// global[name1](CalorieTotal)


module.exports = Breakfast
