"use strict"

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
}
module.exports = Snacks
