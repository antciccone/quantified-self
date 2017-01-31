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
  var breakfastJSON = localStorage.getItem(date)

    if (breakfastJSON === null){
      breakfastJSON = '[]';
    }

    var brad = JSON.parse(breakfastJSON)

    currentBreakfast.breakfast.unshift({food: this.food, calories: this.calories});
    var breakfastJSON = JSON.stringify(currentBreakfast);
    localStorage.setItem('breakfast', breakfastJSON)
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
     if (localStorage.getItem(storage) === null) {
       var array = "[]"
       localStorage.setItem(storage, array)
     } else {
       var date = $('.date-format')[0].innerText
       var parse = localStorage.getItem(date)
       var brad = JSON.parse(parse)
      for (var i = 0; i < brad.breakfast.length; i++) {
         global.submitTable(brad.breakfast[i].food, brad.breakfast[i].calories, i, tableName, storage);
         CalorieTotal += parseInt(brad.breakfast[i].calories)
       }
       global.submitTableCalories(CalorieTotal, tableName)
     }
   }
}
// global[name1](CalorieTotal)


module.exports = Breakfast
