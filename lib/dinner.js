"use strict"
var global = require('./global-submit.js')

class Dinner {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeDinner(){
  var date = $('.date-format')[0].innerText
  var dateJSON = localStorage.getItem(date)
  var fullDateArray = JSON.parse(localStorage[date])
  // var dateArray = JSON.parse(dateJSON)[0]
    fullDateArray[2].dinner.unshift({food: this.food, calories: this.calories});


    var dinnerJSON = JSON.stringify(fullDateArray);
    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
    localStorage.setItem(date, dinnerJSON)
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

  updateDinner(storage, tableName){
    var CalorieTotal = 0
    var date = $('.date-format')[0].innerText

        var brad = JSON.parse(localStorage[date])[2]
        for (var i = 0; i < brad.dinner.length; i++) {
           global.submitTable(brad.dinner[i].food, brad.dinner[i].calories, i, tableName, date);
           CalorieTotal += parseInt(brad.dinner[i].calories)

     }
     global.submitTableCalories(CalorieTotal, tableName, 800)
   }
}

module.exports = Dinner
