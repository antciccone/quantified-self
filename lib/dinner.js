"use strict"
var global = require('./global-submit.js')

class Dinner {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeDinner(){
    var dinnerJSON = localStorage.getItem('dinner')

    if(dinnerJSON === null){
      dinnerJSON = '[]';
    };

    var currentDinner = JSON.parse(dinnerJSON);
    currentDinner.unshift({food: this.food, calories: this.calories});
    var dinnerJSON = JSON.stringify(currentDinner);
    localStorage.setItem('dinner', dinnerJSON)
  }

deleteDinner(event, that){
  event.preventDefault();
  var dinner = JSON.parse(localStorage["dinner"]);
  for (var i = 0; i < dinner.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      dinner.splice(i,1)
      var dinnerJSON = JSON.stringify(dinner);
      localStorage.setItem('dinner', dinnerJSON);
    }
   }
  };

  updateDinner(storage, tableName) {
    var dinnerCaloriesTotal = 0
    if (localStorage.getItem('dinner') === null){
      var dinner = "[]"
      localStorage.setItem('dinner', dinner)
    } else {
    JSON.parse(localStorage.getItem('dinner')).forEach(function(element, i){
      global.submitTable(element.food, element.calories, i, tableName, storage)
      dinnerCaloriesTotal += parseInt(element.calories)
      })
      global.submitTableCalories(dinnerCaloriesTotal, tableName)
    }
  }
}


module.exports = Dinner
