"use strict"

class Lunch {
  constructor(food='nil', calories='nil'){
    this.food = food;
    this.calories = calories;
  }

storeLunch() {
  var lunchJSON = localStorage.getItem('lunch')
  var currentLunch = JSON.parse(lunchJSON);
  currentLunch.unshift({food: this.food, calories: this.calories});
  lunchJSON = JSON.stringify(currentLunch);
  localStorage.setItem('lunch', lunchJSON)
  }

deleteLunch(event, that){
  event.preventDefault();
  var lunch = JSON.parse(localStorage["lunch"]);
  for (var i = 0; i < lunch.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      lunch.splice(i,1)
      var lunchJSON = JSON.stringify(lunch);
      localStorage.setItem('lunch', lunchJSON);
    }
   }
  }
   updateLunch() {
    var lunchCalorieTotal = 0
    if (localStorage.getItem('lunch') === null){
      var lunch = "[]"
      localStorage.setItem('lunch', lunch)
    } else {
      JSON.parse(localStorage.getItem('lunch')).forEach(function(element, i){
        submitLunch(element.food, element.calories, i)
        lunchCalorieTotal += parseInt(element.calories)
      })
      submitLunchCalories(lunchCalorieTotal)
    };
  }

}

function submitLunch(food, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "lunch-"+food+"-"+calories
  var foodCell = document.createElement('td');
  foodCell.innerText = food;
  foodCell.id = "lunch-food-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "lunch-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "lunch-delete-"+food+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var lunchTable = document.getElementById('lunchTable')

  lunchTable.appendChild(newRow);
}

function submitLunchCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "lunch-calorie-total-tr"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "lunch-calories-total-td"

  var emptyTd = document.createElement('td');
  emptyTd.innerText = ""

  newRow.appendChild(firstTd);
  newRow.appendChild(calorieTotalCell);
  newRow.appendChild(emptyTd);

  var lunchTable = document.getElementById('lunchTable')
  lunchTable.appendChild(newRow);
  // remaining row
  var remainingRow = document.createElement('tr');
  remainingRow.id = "lunch-calorie-total"

  var firstRemainingTd = document.createElement('td');
  firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>"

  var calorieRemainingCell = document.createElement('td');
  calorieRemainingCell.innerText = 600 - total;
  calorieRemainingCell.id = "lunch-remaining-total"

  var emptyRemainingTd = document.createElement('td');
  emptyRemainingTd.innerText = ""

  remainingRow.appendChild(firstRemainingTd);
  remainingRow.appendChild(calorieRemainingCell);
  remainingRow.appendChild(emptyRemainingTd);

  lunchTable.appendChild(remainingRow);
}

module.exports = Lunch
