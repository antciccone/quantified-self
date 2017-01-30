"use strict"

class Breakfast {
  constructor(food=0, calories=0){
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
    updateBreakfast(){

     var breakfastCalorieTotal = 0
     if (localStorage.getItem('breakfast') === null) {
       var breakfast = "[]"
       localStorage.setItem('breakfast', breakfast)
     } else {
       JSON.parse(localStorage.getItem('breakfast')).forEach(function(element, i){
         submitBreakfast(element.food, element.calories, i);
         breakfastCalorieTotal += parseInt(element.calories)
       })
       submitBreakfastCalories(breakfastCalorieTotal)
     }
   }
}

function submitBreakfast(food, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "breakfast-"+food+"-"+calories
  var foodCell = document.createElement('td');
  foodCell.innerText = food;
  foodCell.id = "breakfast-food-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "breakfast-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "breakfast-delete-"+food+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var breakfastTable = document.getElementById('breakfastTable')

  breakfastTable.appendChild(newRow);
}

function submitBreakfastCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "breakfast-calorie-total-tr"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "breakfast-calories-total-td"

  var emptyTd = document.createElement('td');
  emptyTd.innerText = ""

  newRow.appendChild(firstTd);
  newRow.appendChild(calorieTotalCell);
  newRow.appendChild(emptyTd);

  var breakfastTable = document.getElementById('breakfastTable')
  breakfastTable.appendChild(newRow);
  // remaining row
  var remainingRow = document.createElement('tr');
  remainingRow.id = "breakfast-calorie-total"

  var firstRemainingTd = document.createElement('td');
  firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>"

  var calorieRemainingCell = document.createElement('td');
  calorieRemainingCell.innerText = 400 - total;
  calorieRemainingCell.id = "breakfast-remaining-total"

  var emptyRemainingTd = document.createElement('td');
  emptyRemainingTd.innerText = ""

  remainingRow.appendChild(firstRemainingTd);
  remainingRow.appendChild(calorieRemainingCell);
  remainingRow.appendChild(emptyRemainingTd);

  breakfastTable.appendChild(remainingRow);
}

module.exports = Breakfast
