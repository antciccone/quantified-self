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
  // var dateArray = JSON.parse(dateJSON)[0]
    fullDateArray[3].snack.unshift({food: this.food, calories: this.calories});


    var snackJSON = JSON.stringify(fullDateArray);
    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
    localStorage.setItem(date, snackJSON)
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
