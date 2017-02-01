"use strict"

var global = require('./global-submit.js')

class Lunch {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeLunch() {
  var date = $('.date-format')[0].innerText
  var dateJSON = localStorage.getItem(date)
  var fullDateArray = JSON.parse(localStorage[date])
  // var dateArray = JSON.parse(dateJSON)[0]
    fullDateArray[1].lunch.unshift({food: this.food, calories: this.calories});


    var lunchJSON = JSON.stringify(fullDateArray);
    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
    localStorage.setItem(date, lunchJSON)
  }

deleteLunch(event, that) {
    var date = $('.date-format')[0].innerText
    event.preventDefault();
    // var dateJSON = localStorage.getItem(date)
    var fullDateArray = JSON.parse(localStorage[date]);
    for (var i = 0; i < fullDateArray[1].lunch.length; i++) {
      if ($(that).parent().parent().data('id') === i){
        that.parentElement.parentElement.remove();
        fullDateArray[1].lunch.splice(i,1)
        var dateJSON = JSON.stringify(fullDateArray);
        localStorage.setItem(date, dateJSON);
      }
     }
   };

  updateLunch(storage, tableName){
    var CalorieTotal = 0
    var date = $('.date-format')[0].innerText

        var brad = JSON.parse(localStorage[date])[1]
        for (var i = 0; i < brad.lunch.length; i++) {
           global.submitTable(brad.lunch[i].food, brad.lunch[i].calories, i, tableName, date);
           CalorieTotal += parseInt(brad.lunch[i].calories)

     }
     global.submitTableCalories(CalorieTotal, tableName, 600)
   }

}
module.exports = Lunch
