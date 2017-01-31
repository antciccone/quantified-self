"use strict"
var global = require('./global-submit.js')

class Snacks {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeSnacks(){
  var snacksJSON = localStorage.getItem('snacks')

  if(snacksJSON === null){
    snacksJSON = '[]';
  };

  var currentSnacks = JSON.parse(snacksJSON);
  currentSnacks.unshift({food: this.food, calories: this.calories});
  var snacksJSON = JSON.stringify(currentSnacks);
  localStorage.setItem('snacks', snacksJSON)
  }

deleteSnacks(event, that){
  event.preventDefault();
  var snacks = JSON.parse(localStorage["snacks"]);
  for (var i = 0; i < snacks.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      snacks.splice(i,1)
      var snacksJSON = JSON.stringify(snacks);
      localStorage.setItem('snacks', snacksJSON);
      }
    }
  }

 updateSnacks(storage, tableName) {
    var snacksCalorieTotal = 0
    if (localStorage.getItem('snacks') === null){
      var snacks = "[]"
      localStorage.setItem('snacks', snacks)
    } else {
    JSON.parse(localStorage.getItem('snacks')).forEach(function(element, i){
      global.submitTable(element.food, element.calories, i, tableName, storage)
      snacksCalorieTotal += parseInt(element.calories)
      })
      global.submitTableCalories(snacksCalorieTotal, tableName)
    }
  }

}
module.exports = Snacks
