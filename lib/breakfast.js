"use strict"

class Breakfast {
  constructor(food, calories){
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
   };

}

module.exports = Breakfast
