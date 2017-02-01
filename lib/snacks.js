"use strict"
var global = require('./global-submit.js')

class Snacks {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeSnacks(){
  var date = $('.date-format')[0].innerText
  var dateJSON = localStorage.getItem(date)
  var fullDateArray = JSON.parse(localStorage[date])
    fullDateArray[3].snack.unshift({food: this.food, calories: this.calories});
    var snackJSON = JSON.stringify(fullDateArray);
    localStorage.setItem(date, snackJSON)
  }

  deleteSnacks(event, that) {
      var date = $('.date-format')[0].innerText
      event.preventDefault();
      var fullDateArray = JSON.parse(localStorage[date]);
      for (var i = 0; i < fullDateArray[3].snack.length; i++) {
        if ($(that).parent().parent().data('id') === i){
          that.parentElement.parentElement.remove();
          fullDateArray[3].snack.splice(i,2)
          var dateJSON = JSON.stringify(fullDateArray);
          localStorage.setItem(date, dateJSON);
        }
       }
     };

  updateSnacks(storage, tableName){
    var CalorieTotal = 0
    var date = $('.date-format')[0].innerText

        var brad = JSON.parse(localStorage[date])[3]
        for (var i = 0; i < brad.snack.length; i++) {
           global.submitTable(brad.snack[i].food, brad.snack[i].calories, i, tableName, date);
           CalorieTotal += parseInt(brad.snack[i].calories)

     }
     global.submitTableCalories(CalorieTotal, tableName, 200)
   }

}
module.exports = Snacks
