"use strict"

var Breakfast = require('./breakfast.js')
var Lunch = require('./lunch.js')
var Dinner = require('./dinner.js')
var Snacks = require('./snacks.js')

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
  var allFoods = document.getElementById('myTable')
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

  var exerciseTable = document.getElementById('myExTable');
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
  }
}

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
  updateBreakfastStorage();
  $('#totals > tr').remove()
  updateTotalTable()
});

function breakfastChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var breakfastClass = new Breakfast(food, calories)
      breakfastClass.storeBreakfast()
      $("#breakfastTable > tr").remove();
      updateBreakfastStorage();
    }
  }
  clearChecked(checkBox);
}

function clearChecked(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    checkBox[i].checked = false
  }
}

function updateBreakfastStorage(){
  var breakfastClass = new Breakfast()
  breakfastClass.updateBreakfast('breakfast', 'breakfastTable');
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
  updateLunchStorage();
  $('#totals > tr').remove()
  updateTotalTable()
});

function updateLunchStorage(){
  var lunchClass = new Lunch()
  lunchClass.updateLunch('lunch', 'lunchTable');
}

function lunchChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var lunchClass = new Lunch(food, calories)
      lunchClass.storeLunch();
      $("#lunchTable > tr").remove();
      updateLunchStorage();
    }
  }
  clearChecked(checkBox);
}
// dinner starts here
$('#submit-dinner').on('click', function(event){
  event.preventDefault();
  var checkBox = $('.food-check')
  dinnerChecker(checkBox);
  $('#totals > tr').remove()
  updateTotalTable()
})

$('#dinnerTable').on("click", ".fa-trash-o", function(event){
  var that = this;
  var dinnerClass = new Dinner()
  dinnerClass.deleteDinner(event, that);
  $("#dinnerTable > tr").remove();
  updateDinnerStorage();
  $('#totals > tr').remove()
  updateTotalTable()
});

function updateDinnerStorage(){
  var dinnerClass = new Dinner()
  dinnerClass.updateDinner('dinner', 'dinnerTable');
}

function dinnerChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var dinnerClass = new Dinner(food, calories)
      dinnerClass.storeDinner()
      $("#dinnerTable > tr").remove();
      updateDinnerStorage();
    }
  }
  clearChecked(checkBox);
}
// snacks starts here
$('#submit-snacks').on('click', function(event){
  event.preventDefault();
  var checkBox = $('.food-check')
  snacksChecker(checkBox);
  $('#totals > tr').remove()
  updateTotalTable()
})

$('#snacksTable').on("click", ".fa-trash-o", function(event){
  var that = this;
  var snacksClass = new Snacks()
  snacksClass.deleteSnacks(event, that);
  $("#snacksTable > tr").remove();
  updateSnacksStorage();
  $('#totals > tr').remove()
  updateTotalTable()
});

// function submitSnacks(food, calories, id){
//   var newRow = document.createElement('tr');
//   newRow.id = "snacks-"+food+"-"+calories
//   var foodCell = document.createElement('td');
//   foodCell.innerText = food;
//   foodCell.id = "snacks-food-td"
//   var calorieCell = document.createElement('td');
//   calorieCell.innerText = calories;
//   calorieCell.id = "snacks-calories-td"
//   var deleteCell = document.createElement('td')
//   deleteCell.id = "snacks-delete-"+food+"-"+calories
//   deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';
//
//   newRow.appendChild(foodCell);
//   newRow.appendChild(calorieCell);
//   newRow.appendChild(deleteCell);
//
//   $(newRow).data("id",id)
//
//   var snacksTable = document.getElementById('snacksTable')
//   snacksTable.appendChild(newRow);
// }
//
// function submitSnacksCalories(total=0) {
//   var newRow = document.createElement('tr');
//   newRow.id = "snacks-calorie-total-tr"
//
//   var firstTd = document.createElement('td');
//   firstTd.innerHTML = "<strong>Total Calories</strong>"
//
//   var calorieTotalCell = document.createElement('td');
//   calorieTotalCell.innerText = total;
//   calorieTotalCell.id = "snacks-calories-total-td"
//
//   var emptyTd = document.createElement('td');
//   emptyTd.innerText = ""
//
//   newRow.appendChild(firstTd);
//   newRow.appendChild(calorieTotalCell);
//   newRow.appendChild(emptyTd);
//
//   var snacksTable = document.getElementById('snacksTable')
//   snacksTable.appendChild(newRow);
//   // remaining row
//   var remainingRow = document.createElement('tr');
//   remainingRow.id = "snacks-calorie-total"
//
//   var firstRemainingTd = document.createElement('td');
//   firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>"
//
//   var calorieRemainingCell = document.createElement('td');
//   calorieRemainingCell.innerText = 200 - total;
//   calorieRemainingCell.id = "snacks-remaining-total"
//
//   var emptyRemainingTd = document.createElement('td');
//   emptyRemainingTd.innerText = ""
//
//   remainingRow.appendChild(firstRemainingTd);
//   remainingRow.appendChild(calorieRemainingCell);
//   remainingRow.appendChild(emptyRemainingTd);
//
//   snacksTable.appendChild(remainingRow);
// }

// function updateSnacks() {
//   var snacksCalorieTotal = 0
//
//   if (localStorage.getItem('snacks') === null){
//     var snacks = "[]"
//     localStorage.setItem('snacks', snacks)
//   } else {
//   JSON.parse(localStorage.getItem('snacks')).forEach(function(element, i){
//     submitSnacks(element.food, element.calories, i)
//     snacksCalorieTotal += parseInt(element.calories)
//     })
//     submitSnacksCalories(snacksCalorieTotal)
//   }
// }

function snacksChecker(checkBox){
  for (var i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked === true){
      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
      var snacksClass = new Snacks(food, calories)
      snacksClass.storeSnacks();
      $("#snacksTable > tr").remove();
      updateSnacksStorage();
    }
  }
  clearChecked(checkBox);
}

function updateSnacksStorage(){
  var snacksClass = new Snacks()
  snacksClass.updateSnacks('breakfast', 'snacksTable');
}

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
  var exerciseLogJSON = JSON.stringify(currentExerciseLog);
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
      var exerciseLogJSON = JSON.stringify(exerciseLog);
      localStorage.setItem('exerciseLog', exerciseLogJSON);
    }
   }
   $("#daily-exercise > tr").remove();
   updateExerciseLog();
   updateTotalTable()
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
  updateExercise();
  // breakfast doc ready starts here
  updateBreakfastStorage();

  // lunch doc ready starts here
  updateLunchStorage();
  // dinner doc ready starts here
  updateDinnerStorage()
  // snacks doc ready starts here
  updateSnacksStorage();
  // exercise starts here
  // adding date
  makeDate();
  });
