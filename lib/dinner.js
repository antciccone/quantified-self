"use strict"

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
}

module.exports = Dinner
