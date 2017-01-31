"use strict"

var global = require('./global-submit.js')

class Lunch {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeLunch() {
  var lunchJSON = localStorage.getItem('lunch')
  var currentLunch = JSON.parse(lunchJSON);
  currentLunch.unshift({food: this.food, calories: this.calories});
  lunchJSON = JSON.stringify(currentLunch);
  localStorage.setItem('lunch', lunchJSON)
  }

deleteLunch(event, that){
  event.preventDefault();
  var lunch = JSON.parse(localStorage["lunch"]);
  for (var i = 0; i < lunch.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      lunch.splice(i,1)
      var lunchJSON = JSON.stringify(lunch);
      localStorage.setItem('lunch', lunchJSON);
    }
   }
  }
   updateLunch(storage,tableName, meal) {
    var lunchCalorieTotal = 0
    if (localStorage.getItem('lunch') === null){
      var lunch = "[]"
      localStorage.setItem('lunch', lunch)
    } else {
      JSON.parse(localStorage.getItem('lunch')).forEach(function(element, i){
        global.submitTable(element.food, element.calories, i, tableName, meal)
        lunchCalorieTotal += parseInt(element.calories)
      });
      global.submitTableCalories(lunchCalorieTotal, tableName)
    };
  }

}
module.exports = Lunch
