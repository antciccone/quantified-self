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

  updateDinner() {
    var dinnerCaloriesToatl = 0
    if (localStorage.getItem('dinner') === null){
      var dinner = "[]"
      localStorage.setItem('dinner', dinner)
    } else {
    JSON.parse(localStorage.getItem('dinner')).forEach(function(element, i){
      submitDinner(element.food, element.calories, i)
      dinnerCaloriesToatl += parseInt(element.calories)
      })
      submitDinnerCalories(dinnerCaloriesToatl)
    }
  }
}

function submitDinner(food, calories, id){
  debugger;
  var newRow = document.createElement('tr');
  newRow.id = "dinner-"+food+"-"+calories
  var foodCell = document.createElement('td');
  foodCell.innerText = food;
  foodCell.id = "dinner-food-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "dinner-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "dinner-delete-"+food+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var dinnerTable = document.getElementById('dinnerTable')
  dinnerTable.appendChild(newRow);
}

function submitDinnerCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "dinner-calorie-total-tr"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "dinner-calories-total-td"

  var emptyTd = document.createElement('td');
  emptyTd.innerText = ""

  newRow.appendChild(firstTd);
  newRow.appendChild(calorieTotalCell);
  newRow.appendChild(emptyTd);

  var dinnerTable = document.getElementById('dinnerTable')
  dinnerTable.appendChild(newRow);
  // remaining row
  var remainingRow = document.createElement('tr');
  remainingRow.id = "dinner-calorie-total"
  var firstRemainingTd = document.createElement('td');
  firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>"

  var calorieRemainingCell = document.createElement('td');
  calorieRemainingCell.innerText = 800 - total;
  calorieRemainingCell.id = "dinner-remaining-total"

  var emptyRemainingTd = document.createElement('td');
  emptyRemainingTd.innerText = ""

  remainingRow.appendChild(firstRemainingTd);
  remainingRow.appendChild(calorieRemainingCell);
  remainingRow.appendChild(emptyRemainingTd);

  dinnerTable.appendChild(remainingRow);
}


module.exports = Dinner
