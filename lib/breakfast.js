"use strict"

var global = require('./global-submit.js')
var globalDate = require('./global-set-date-storage.js')

class Breakfast {
  constructor(food=0, calories=0){
    this.food = food;
    this.calories = calories;
  }

storeBreakfast() {
    var breakfastJSON = localStorage.getItem('breakfast')
    if(breakfastJSON === null){
      breakfastJSON = '[]';
    };

    var currentBreakfast = JSON.parse(breakfastJSON);
    currentBreakfast.unshift({food: this.food, calories: this.calories});
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
       JSON.parse(localStorage.getItem(storage)).forEach(function(element, i){
         global.submitTable(element.food, element.calories, i, tableName, storage);
         CalorieTotal += parseInt(element.calories)
       })
       global.submitTableCalories(CalorieTotal, tableName)
     }
   }
}
// global[name1](CalorieTotal)


module.exports = Breakfast
