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
    fullDateArray[2].dinner.unshift({food: this.food, calories: this.calories});
    var dinnerJSON = JSON.stringify(fullDateArray);
    localStorage.setItem(date, dinnerJSON)
  }

  deleteDinner(event, that) {
      var date = $('.date-format')[0].innerText
      event.preventDefault();
      var fullDateArray = JSON.parse(localStorage[date]);
      for (var i = 0; i < fullDateArray[2].dinner.length; i++) {
        if ($(that).parent().parent().data('id') === i){
          that.parentElement.parentElement.remove();
          fullDateArray[2].dinner.splice(i,2)
          var dateJSON = JSON.stringify(fullDateArray);
          localStorage.setItem(date, dateJSON);
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
