"use strict"

var Breakfast = require('./breakfast.js')
var Lunch = require('./lunch')

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
  if (localStorage.getItem('foods') === null){
    var foods = "[]"
    localStorage.setItem('foods', foods)
  } else {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element, i){
    submitFood(element.food, element.calories, i)
    })
  }
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

function updateExercise() {
  if (localStorage.getItem('exercises') === null){
    var exercise = "[]"
    localStorage.setItem('exercises', exercise)
  } else {
  JSON.parse(localStorage.getItem('exercises')).forEach(function(element, i){
    submitExercise(element.exercise, element.calories, i)
    })
  };
}

updateExercise();


// START OF BREAKFAST
$('#submit-breakfast').on('click', function(event){
  event.preventDefault();
  var checkBox = $('.food-check')
  breakfastChecker(checkBox);
  $('#totals > tr').remove()
  updateTotalTable()
})

$('#breakfastTable').on("click", ".fa-trash-o", function(event){
  var that = this;
  var breakfastClass = new Breakfast()
  breakfastClass.deleteBreakfast(event, that)
  $("#breakfastTable > tr").remove();
  updateBreakfast();
  $('#totals > tr').remove()
  updateTotalTable()
});

function breakfastChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var breakfastClass = new Breakfast(food, calories)
      breakfastClass.storeBreakfast(food, calories)
      $("#breakfastTable > tr").remove();
      updateBreakfast();
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

// sends local storage to submit breakfast that changes dom
function updateBreakfast(){
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

// lunch starts here
$('#submit-lunch').on('click', function(event){
  event.preventDefault();
  var checkBox = $('.food-check')
  lunchChecker(checkBox);
  $('#totals > tr').remove()
  updateTotalTable()
})

$('#lunchTable').on("click", ".fa-trash-o", function(event){
  var that = this;
  var lunchClass = new Lunch()
  lunchClass.deleteLunch(event, that);
  $("#lunchTable > tr").remove();
  updateLunch();
  $('#totals > tr').remove()
  updateTotalTable()
});

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

function updateLunch() {
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

function lunchChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var lunchClass = new Lunch(food, calories)
      lunchClass.storeLunch();
      $("#lunchTable > tr").remove();
      updateLunch();
    }
  }
  clearChecked(checkBox);
}


// dinner starts here

function deleteDinner(event, that) {
  event.preventDefault();
  var dinner = JSON.parse(localStorage["dinner"]);
  for (var i = 0; i < dinner.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      dinner.splice(i,1)
      dinnerJSON = JSON.stringify(dinner);
      localStorage.setItem('dinner', dinnerJSON);
    }
   }
   $("#dinnerTable > tr").remove();
   updateDinner();
 };

function submitDinner(food, calories, id){
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


function updateDinner() {
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

function storeDinner(food, calories){
  var dinnerJSON = localStorage.getItem('dinner')

  if(dinnerJSON === null){
    dinnerJSON = '[]';
  };

  var currentDinner = JSON.parse(dinnerJSON);
  currentDinner.unshift({food: food, calories: calories});
  dinnerJSON = JSON.stringify(currentDinner);
  localStorage.setItem('dinner', dinnerJSON)

  $("#dinnerTable > tr").remove();
  updateDinner();
}

function dinnerChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      storeDinner(food, calories)
    }
  }
  clearChecked(checkBox);
}

updateDinner();

// snacks starts here

function deleteSnacks(event, that) {
  event.preventDefault();
  var snacks = JSON.parse(localStorage["snacks"]);
  for (var i = 0; i < snacks.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      snacks.splice(i,1)
      snacksJSON = JSON.stringify(snacks);
      localStorage.setItem('snacks', snacksJSON);
    }
   }
   $("#snacksTable > tr").remove();
   updateSnacks();
 };

function submitSnacks(food, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "snacks-"+food+"-"+calories
  var foodCell = document.createElement('td');
  foodCell.innerText = food;
  foodCell.id = "snacks-food-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "snacks-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "snacks-delete-"+food+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var snacksTable = document.getElementById('snacksTable')

  snacksTable.appendChild(newRow);
}

function submitSnacksCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "snacks-calorie-total-tr"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "snacks-calories-total-td"

  var emptyTd = document.createElement('td');
  emptyTd.innerText = ""

  newRow.appendChild(firstTd);
  newRow.appendChild(calorieTotalCell);
  newRow.appendChild(emptyTd);

  var snacksTable = document.getElementById('snacksTable')
  snacksTable.appendChild(newRow);

  // remaining row

  var remainingRow = document.createElement('tr');
  remainingRow.id = "snacks-calorie-total"

  var firstRemainingTd = document.createElement('td');
  firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>"

  var calorieRemainingCell = document.createElement('td');
  calorieRemainingCell.innerText = 200 - total;
  calorieRemainingCell.id = "snacks-remaining-total"

  var emptyRemainingTd = document.createElement('td');
  emptyRemainingTd.innerText = ""

  remainingRow.appendChild(firstRemainingTd);
  remainingRow.appendChild(calorieRemainingCell);
  remainingRow.appendChild(emptyRemainingTd);

  snacksTable.appendChild(remainingRow);

}


function updateSnacks() {
  var snacksCalorieTotal = 0

  if (localStorage.getItem('snacks') === null){
    var snacks = "[]"
    localStorage.setItem('snacks', snacks)
  } else {
  JSON.parse(localStorage.getItem('snacks')).forEach(function(element, i){
    submitSnacks(element.food, element.calories, i)
    snacksCalorieTotal += parseInt(element.calories)
    })
    submitSnacksCalories(snacksCalorieTotal)
  }
}

function storeSnacks(food, calories){
  var snacksJSON = localStorage.getItem('snacks')

  if(snacksJSON === null){
    snacksJSON = '[]';
  };

  var currentSnacks = JSON.parse(snacksJSON);
  currentSnacks.unshift({food: food, calories: calories});
  snacksJSON = JSON.stringify(currentSnacks);
  localStorage.setItem('snacks', snacksJSON)

  $("#snacksTable > tr").remove();
  updateSnacks();
}

function snacksChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      storeSnacks(food, calories)
    }
  }
  clearChecked(checkBox);
}

updateSnacks();

// exercise starts here
function submitExerciseLog(exercise, calories, id){
  var newRow = document.createElement('tr');
  newRow.id = "exercise-"+exercise+"-"+calories
  var exerciseCell = document.createElement('td');
  exerciseCell.innerText = exercise;
  exerciseCell.id = "exercise-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "exercise-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "exercise-delete-"+exercise+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var dailyExercise = document.getElementById('daily-exercise')

  dailyExercise.appendChild(newRow);
}


function submitExerciseCalories(total=0) {

  var newRow = document.createElement('tr');
  newRow.id = "exercise-calorie-total"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "exercise-calories-total"

  var emptyTd = document.createElement('td');
  emptyTd.innerText = ""

  newRow.appendChild(firstTd);
  newRow.appendChild(calorieTotalCell);
  newRow.appendChild(emptyTd);

  var exerciseTable = document.getElementById('daily-exercise')
  exerciseTable.appendChild(newRow);

}

function storeExerciseLog(exercise, calories){
  var exerciseJSON = localStorage.getItem('exerciseLog')

  var currentExerciseLog = JSON.parse(exerciseJSON);
  currentExerciseLog.unshift({exercise: exercise, calories: calories});
  exerciseLogJSON = JSON.stringify(currentExerciseLog);
  localStorage.setItem('exerciseLog', exerciseLogJSON)

  $("#daily-exercise > tr").remove();
  updateExerciseLog();
}


function exerciseChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var exercise = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      storeExerciseLog(exercise, calories)
    }
  }
  clearChecked(checkBox);
}

function updateExerciseLog() {
  var exerciseCalorieTotal = 0
  if (localStorage.getItem('exerciseLog') === null){
    var exerciseLog = "[]"
    localStorage.setItem('exerciseLog', exerciseLog)
  } else {
  JSON.parse(localStorage.getItem('exerciseLog')).forEach(function(element, i){
    submitExerciseLog(element.exercise, element.calories, i)
    exerciseCalorieTotal += parseInt(element.calories)
  })
  submitExerciseCalories(exerciseCalorieTotal)
  }
}


function deleteExerciseLog(event, that) {
  event.preventDefault();
  var exerciseLog = JSON.parse(localStorage["exerciseLog"]);
  for (var i = 0; i < exerciseLog.length; i++) {
    if ($(that).parent().parent().data('id') === i){
      that.parentElement.parentElement.remove();
      exerciseLog.splice(i,1)
      exerciseLogJSON = JSON.stringify(exerciseLog);
      localStorage.setItem('exerciseLog', exerciseLogJSON);
    }
   }
   $("#daily-exercise > tr").remove();
   updateExerciseLog();
 };


updateExerciseLog();

// start of total table for calories
function submitTotalTable(total=0, burnedCalories=0){
  var goalRow = document.createElement('tr');
  goalRow.id = "goal-calories"

  var goalTd = document.createElement('td');
  goalTd.innerHTML = "<strong>Goal Calories</strong>"

  var goalTd2 = document.createElement('td');
  goalTd2.innerHTML = "<strong>2000</strong>"

  goalRow.appendChild(goalTd);
  goalRow.appendChild(goalTd2);

  var totalsTable = document.getElementById('totals')
  totalsTable.appendChild(goalRow);

  // calories consumed

  var consumedRow = document.createElement('tr');
  consumedRow.id = "consumed-calories"

  var consumeTd = document.createElement('td');
  consumeTd.innerHTML = "<strong>Calories Consumed</strong>"

  var consumeTd2 = document.createElement('td');
  consumeTd2.innerHTML = total

  consumedRow.appendChild(consumeTd);
  consumedRow.appendChild(consumeTd2);

  totalsTable.appendChild(consumedRow);

  // calories burned

  var burnedRow = document.createElement('tr');
  burnedRow.id = "burned-calories"

  var burnedTd = document.createElement('td');
  burnedTd.innerHTML = "<strong>Calories Burned</strong>"

  var burnedTd2 = document.createElement('td');
  burnedTd2.innerHTML = burnedCalories

  burnedRow.appendChild(burnedTd);
  burnedRow.appendChild(burnedTd2);

  totalsTable.appendChild(burnedRow);

  // remaining calories

  var remainingRow = document.createElement('tr');
  remainingRow.id = "remaining-calories"

  var remainingTd = document.createElement('td');
  remainingTd.innerHTML = "<strong>Remaining Calories</strong>"

  var remainingTd2 = document.createElement('td');

  var remainingCalories = (2000 - total) + burnedCalories

  if (remainingCalories < 0) {
    remainingTd2.innerHTML = "<span id='remaining-red'>"+remainingCalories+"</span>"
  } else {
    remainingTd2.innerHTML = "<span id='remaining-green'>"+remainingCalories+"</span>"
  }

  remainingRow.appendChild(remainingTd);
  remainingRow.appendChild(remainingTd2);

  totalsTable.appendChild(remainingRow);


}


function updateTotalTable(){
  var caloriesTds = $('#snacks-calories-total-td, #dinner-calories-total-td, #breakfast-calories-total-td, #lunch-calories-total-td')
  var burnedCalories = parseInt($('#exercise-calories-total')[0].innerText)
  var total = 0
  for (var i = 0; i < caloriesTds.length; i++) {
    total += parseInt(caloriesTds[i].innerText)
  }
  submitTotalTable(total, burnedCalories);
}

updateTotalTable()

// start of making date
function makeDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }
    today = mm+'/'+dd+'/'+yyyy;
    $('.date-format').html(today)

  }
// doc ready starts here //
$(document).ready(function(){

  // breakfast doc ready starts here
  updateBreakfast();
  // lunch doc ready starts here
  updateLunch();

  // dinner doc ready starts here
  $('#submit-dinner').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    dinnerChecker(checkBox);
    $('#totals > tr').remove()
    updateTotalTable()
  })

  $('#dinnerTable').on("click", ".fa-trash-o", function(event){
    var that = this;
    deleteDinner(event, that);
    $('#totals > tr').remove()
    updateTotalTable()
  });
  // snacks doc ready starts here
  $('#submit-snacks').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    snacksChecker(checkBox);
    $('#totals > tr').remove()
    updateTotalTable()
  })

  $('#snacksTable').on("click", ".fa-trash-o", function(event){
    var that = this;
    deleteSnacks(event, that);
    $('#totals > tr').remove()
    updateTotalTable()
  });
  // exercise starts here
  $('#submit-exercise').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.exercise-check')
    exerciseChecker(checkBox);
    $('#totals > tr').remove()
    updateTotalTable()
  })

  $('#daily-exercise').on("click", ".fa-trash-o", function(event){
    var that = this;
    deleteExerciseLog(event, that);
    $('#totals > tr').remove()
    updateTotalTable()
  });

  // adding date
  makeDate();
  });
