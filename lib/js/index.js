
// food starts here
var allFoods = document.getElementById('myTable')

function submitFood(food, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "row-"+food+"-"+calories
  var foodCell = document.createElement('td');
  foodCell.innerText = food;
  foodCell.id = "food-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "delete-"+food+"-"+calories
  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in food-check' id=" + 'food-' + id + " /><label for=" + 'food-' + id + "></form>";

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  allFoods.appendChild(newRow);

};

function updateTable() {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element, i){
    submitFood(element.food, element.calories, i);
  });
}

updateTable();





// exercise starts here
var exerciseTable = document.getElementById('myExTable');

function submitExercise(exercise, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "row-"+exercise+"-"+calories
  var exerciseCell = document.createElement('td');
  exerciseCell.innerText = exercise;
  exerciseCell.id = "exercise-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "delete-"+exercise+"-"+calories
  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in exercise-check' id=" + 'exercise-' + id + " /><label for=" + 'exercise-' + id + "></form>";
  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  $(newRow).data("id",id)

  exerciseTable.appendChild(newRow);
}

function updateExercise(){
  JSON.parse(localStorage.getItem('exercises')).forEach(function(element, i){
    submitExercise(element.exercise, element.calories, i);
  });
}




updateExercise();


// start of breakfast

// stores checked items one by one into localStorage
function storeBreakfast(food, calories){
  var breakfastJSON = localStorage.getItem('breakfast')

  if(breakfastJSON === null){
    breakfastJSON = '[]';
  };

  var currentBreakfast = JSON.parse(breakfastJSON);
  currentBreakfast.unshift({food: food, calories: calories});
  breakfastJSON = JSON.stringify(currentBreakfast);
  localStorage.setItem('breakfast', breakfastJSON)

  $("#breakfastTable > tr").remove();
  updateBreakfast();

}

// grabs items if the checkbox is checked and sends to store breakfast
function breakfastChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      storeBreakfast(food, calories)

    }
  }
  clearChecked(checkBox);
}

  function clearChecked(checkBox){
    for (var i = 0; i < checkBox.length; i++) {
      checkBox[i].checked = false
    }
  }
// displays breakfast on the page
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

// sends local storage to submit breakfast that changes dom
function updateBreakfast(){
  JSON.parse(localStorage.getItem('breakfast')).forEach(function(element, i){
    submitBreakfast(element.food, element.calories, i);
  });
}

function deleteBreakfast(event, that) {
  event.preventDefault();
  var breakfast = JSON.parse(localStorage["breakfast"]);
  for (var i = 0; i < breakfast.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      breakfast.splice(i,1)
      breakfastJSON = JSON.stringify(breakfast);
      localStorage.setItem('breakfast', breakfastJSON);
    }
   }
 };

updateBreakfast()

// lunch starts here

function deleteLunch(event, that) {
  event.preventDefault();
  var lunch = JSON.parse(localStorage["lunch"]);
  for (var i = 0; i < lunch.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      lunch.splice(i,1)
      lunchJSON = JSON.stringify(lunch);
      localStorage.setItem('lunch', lunchJSON);
    }
   }
 };

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


function updateLunch(){
  JSON.parse(localStorage.getItem('lunch')).forEach(function(element, i){
    submitLunch(element.food, element.calories, i);
  });
}


function storeLunch(food, calories){
  var lunchJSON = localStorage.getItem('lunch')

  if(lunchJSON === null){
    lunchJSON = '[]';
  };

  var currentLunch = JSON.parse(lunchJSON);
  currentLunch.unshift({food: food, calories: calories});
  lunchJSON = JSON.stringify(currentLunch);
  localStorage.setItem('lunch', lunchJSON)

  $("#lunchTable > tr").remove();
  updateLunch();
}

function lunchChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      storeLunch(food, calories)
    }
  }
  clearChecked(checkBox);
}

updateLunch();

$(document).ready(function(){

  $('#submit-breakfast').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    breakfastChecker(checkBox);
  })

  $('#breakfastTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteBreakfast(event, that);
  });

  $('#submit-lunch').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    lunchChecker(checkBox);
  })

  $('#lunchTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteLunch(event, that);
  });

  });
