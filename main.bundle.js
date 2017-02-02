/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Breakfast = __webpack_require__(1);
	var Lunch = __webpack_require__(3);
	var Dinner = __webpack_require__(4);
	var Snacks = __webpack_require__(5);

	$('.fa-arrow-left').on('click', function () {

	  var today = new Date(this.parentElement.children[1].innerText);
	  var yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

	  var dd = yesterday.getDate();
	  var mm = yesterday.getMonth() + 1;
	  var yyyy = yesterday.getFullYear();

	  if (dd < 10) {
	    dd = '0' + dd;
	  }
	  if (mm < 10) {
	    mm = '0' + mm;
	  }
	  var cleanedYesterday = mm + '/' + dd + '/' + yyyy;
	  $('.date-format').html(cleanedYesterday);

	  $("#breakfastTable > tr").remove();
	  var breakfastClass = new Breakfast();
	  breakfastClass.updateBreakfast('vrad', 'breakfastTable');
	  $("#dinnerTable > tr").remove();
	  var breakfastClass1 = new Dinner();
	  breakfastClass1.updateDinner('whatever', 'dinnerTable');
	  $("#lunchTable > tr").remove();
	  var breakfastClass2 = new Lunch();
	  breakfastClass2.updateLunch('whatever', 'lunchTable');
	  $("#snacksTable > tr").remove();
	  var breakfastClass3 = new Snacks();
	  breakfastClass3.updateSnacks('whatever', 'snacksTable');
	  $("#daily-exercise > tr").remove();
	  updateExerciseLog();
	  $("#totals > tr").remove();
	  updateTotalTable();
	});

	$('.fa-arrow-right').on('click', function () {

	  var today = new Date(this.parentElement.children[1].innerText);
	  var yesterday = new Date(today.getTime() + 24 * 60 * 60 * 1000);

	  var dd = yesterday.getDate();
	  var mm = yesterday.getMonth() + 1;
	  var yyyy = yesterday.getFullYear();

	  if (dd < 10) {
	    dd = '0' + dd;
	  }
	  if (mm < 10) {
	    mm = '0' + mm;
	  }
	  var cleanedYesterday = mm + '/' + dd + '/' + yyyy;
	  $('.date-format').html(cleanedYesterday);

	  $("#breakfastTable > tr").remove();
	  var breakfastClass = new Breakfast();
	  breakfastClass.updateBreakfast('vrad', 'breakfastTable');
	  $("#dinnerTable > tr").remove();
	  var breakfastClass1 = new Dinner();
	  breakfastClass1.updateDinner('whatever', 'dinnerTable');
	  $("#lunchTable > tr").remove();
	  var breakfastClass2 = new Lunch();
	  breakfastClass2.updateLunch('whatever', 'lunchTable');
	  $("#snacksTable > tr").remove();
	  var breakfastClass3 = new Snacks();
	  breakfastClass3.updateSnacks('whatever', 'snacksTable');
	  $("#daily-exercise > tr").remove();
	  updateExerciseLog();
	  $("#totals > tr").remove();
	  updateTotalTable();
	});

	var clicked = 0;

	$('.calorie-header').on('click', function () {
	  clicked++;

	  if (clicked >= 3) {
	    clicked = 0;

	    $('#t-body > tr').remove();
	    updateTable();
	  } else {
	    sortTable(1, "myTable");
	  }
	});

	var exClicked = 0;

	$('.ex-calorie-header').on('click', function () {
	  exClicked++;

	  if (exClicked >= 3) {
	    exClicked = 0;
	    $('#myEx-body > tr').remove();
	    updateExercise();
	  } else {
	    sortTable(1, "myExTable");
	  }
	});

	// function to sort table by calorie
	function sortTable(n, tableName) {
	  var table,
	      rows,
	      switching,
	      i,
	      x,
	      y,
	      shouldSwitch,
	      dir,
	      switchcount = 0;
	  table = document.getElementById(tableName);
	  switching = true;
	  dir = "asc";
	  while (switching) {
	    switching = false;
	    rows = table.getElementsByTagName("TR");
	    for (i = 1; i < rows.length - 1; i++) {
	      shouldSwitch = false;
	      x = rows[i].getElementsByTagName("TD")[n];
	      y = rows[i + 1].getElementsByTagName("TD")[n];
	      if (dir == "asc") {
	        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
	          shouldSwitch = true;
	          break;
	        }
	      } else if (dir == "desc") {
	        if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
	          shouldSwitch = true;
	          break;
	        }
	      }
	    }
	    if (shouldSwitch) {
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      switchcount++;
	    } else {
	      if (switchcount == 0 && dir == "asc") {
	        dir = "desc";
	        switching = true;
	      }
	    }
	  }
	}

	// event handler for food search
	$("#myInput").on('keyup', function () {
	  search("myInput", "myTable");
	});

	// event handler for exercise search
	$("#exercise-search").on('keyup', function () {
	  search("exercise-search", "myExTable");
	});

	// search functionality for food and exercise
	function search(inputName, tableName) {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById(inputName);
	  filter = input.value.toUpperCase();
	  table = document.getElementById(tableName);
	  tr = table.getElementsByTagName("tr");
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	};

	function submitFood(food, calories, id) {
	  var newRow = document.createElement('tr');
	  newRow.id = "row-" + food + "-" + calories;
	  var foodCell = document.createElement('td');
	  foodCell.innerText = food;
	  foodCell.id = "food-td";
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.id = "calories-td";
	  var deleteCell = document.createElement('td');
	  deleteCell.id = "delete-" + food + "-" + calories;
	  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in food-check' id=" + 'food-' + id + " /><label for=" + 'food-' + id + "></form>";

	  newRow.appendChild(foodCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(deleteCell);

	  $(newRow).data("id", id);
	  var allFoods = document.getElementById('t-body');
	  allFoods.appendChild(newRow);
	};

	function updateTable() {
	  if (localStorage.getItem('foods') === null) {
	    var foods = "[]";
	    localStorage.setItem('foods', foods);
	  } else {
	    JSON.parse(localStorage.getItem('foods')).forEach(function (element, i) {
	      submitFood(element.food, element.calories, i);
	    });
	  }
	}

	updateTable();

	// exercise starts here
	function submitExercise(exercise, calories, id) {
	  var newRow = document.createElement('tr');
	  newRow.id = "row-" + exercise + "-" + calories;
	  var exerciseCell = document.createElement('td');
	  exerciseCell.innerText = exercise;
	  exerciseCell.id = "exercise-td";
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.id = "calories-td";
	  var deleteCell = document.createElement('td');
	  deleteCell.id = "delete-" + exercise + "-" + calories;
	  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in exercise-check' id=" + 'exercise-' + id + " /><label for=" + 'exercise-' + id + "></form>";
	  newRow.appendChild(exerciseCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(deleteCell);
	  $(newRow).data("id", id);

	  var exerciseTable = document.getElementById('myEx-body');
	  exerciseTable.appendChild(newRow);
	}

	function updateExercise() {
	  if (localStorage.getItem('exercises') === null) {
	    var exercise = "[]";
	    localStorage.setItem('exercises', exercise);
	  } else {
	    JSON.parse(localStorage.getItem('exercises')).forEach(function (element, i) {
	      submitExercise(element.exercise, element.calories, i);
	    });
	  }
	}

	// START OF BREAKFAST
	$('#submit-breakfast').on('click', function (event) {
	  event.preventDefault();
	  var checkBox = $('.food-check');
	  breakfastChecker(checkBox);
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	$('#breakfastTable').on("click", ".fa-trash-o", function (event) {
	  var that = this;
	  var breakfastClass = new Breakfast();
	  // delete method is called here
	  breakfastClass.deleteBreakfast(event, that);
	  $("#breakfastTable > tr").remove();
	  updateBreakfastTable();
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	function breakfastChecker(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    if (checkBox[i].checked === true) {
	      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
	      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
	      var breakfastClass = new Breakfast(food, calories);
	      breakfastClass.storeBreakfast();
	      $("#breakfastTable > tr").remove();
	      updateBreakfastTable();
	    }
	  }
	  clearChecked(checkBox);
	  //  setDateStorage('01/31/2017');
	}

	function clearChecked(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    checkBox[i].checked = false;
	  }
	}

	function updateBreakfastTable() {
	  var breakfastClass = new Breakfast();
	  breakfastClass.updateBreakfast('01/31/2017', 'breakfastTable');
	}

	// lunch starts here
	$('#submit-lunch').on('click', function (event) {
	  event.preventDefault();
	  var checkBox = $('.food-check');
	  lunchChecker(checkBox);
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	$('#lunchTable').on("click", ".fa-trash-o", function (event) {
	  var that = this;
	  var lunchClass = new Lunch();
	  lunchClass.deleteLunch(event, that);
	  $("#lunchTable > tr").remove();
	  updateLunchStorage();
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	function updateLunchStorage() {
	  var lunchClass = new Lunch();
	  lunchClass.updateLunch('lunch', 'lunchTable');
	}

	function lunchChecker(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    if (checkBox[i].checked === true) {
	      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
	      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
	      var lunchClass = new Lunch(food, calories);
	      lunchClass.storeLunch();
	      $("#lunchTable > tr").remove();
	      updateLunchStorage();
	    }
	  }
	  clearChecked(checkBox);
	}
	// dinner starts here
	$('#submit-dinner').on('click', function (event) {
	  event.preventDefault();
	  var checkBox = $('.food-check');
	  dinnerChecker(checkBox);
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	$('#dinnerTable').on("click", ".fa-trash-o", function (event) {
	  var that = this;
	  var dinnerClass = new Dinner();
	  dinnerClass.deleteDinner(event, that);
	  $("#dinnerTable > tr").remove();
	  updateDinnerStorage();
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	function updateDinnerStorage() {
	  var dinnerClass = new Dinner();
	  dinnerClass.updateDinner('01/31/2017', 'dinnerTable');
	}

	function dinnerChecker(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    if (checkBox[i].checked === true) {
	      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
	      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
	      var dinnerClass = new Dinner(food, calories);
	      dinnerClass.storeDinner();
	      $("#dinnerTable > tr").remove();
	      updateDinnerStorage();
	    }
	  }
	  clearChecked(checkBox);
	}
	// snacks starts here
	$('#submit-snacks').on('click', function (event) {
	  event.preventDefault();
	  var checkBox = $('.food-check');
	  snacksChecker(checkBox);
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	$('#snacksTable').on("click", ".fa-trash-o", function (event) {
	  var that = this;
	  var snacksClass = new Snacks();
	  snacksClass.deleteSnacks(event, that);
	  $("#snacksTable > tr").remove();
	  updateSnacksStorage();
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	function snacksChecker(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    if (checkBox[i].checked === true) {
	      var food = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
	      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
	      var snacksClass = new Snacks(food, calories);
	      snacksClass.storeSnacks();
	      $("#snacksTable > tr").remove();
	      updateSnacksStorage();
	    }
	  }
	  clearChecked(checkBox);
	}

	function updateSnacksStorage() {
	  var snacksClass = new Snacks();
	  snacksClass.updateSnacks('breakfast', 'snacksTable');
	}

	// exercise starts here
	$('#submit-exercise').on('click', function (event) {
	  event.preventDefault();
	  var checkBox = $('.exercise-check');
	  exerciseChecker(checkBox);
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	$('#daily-exercise').on("click", ".fa-trash-o", function (event) {
	  var that = this;
	  deleteExerciseLog(event, that);
	  $("#daily-exercise > tr").remove();
	  updateExerciseLog();
	  $('#totals > tr').remove();
	  updateTotalTable();
	});

	function submitExerciseLog(exercise, calories, id) {
	  var newRow = document.createElement('tr');
	  newRow.id = "exercise-" + exercise + "-" + calories;
	  var exerciseCell = document.createElement('td');
	  exerciseCell.innerText = exercise;
	  exerciseCell.id = "exercise-td";
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.id = "exercise-calories-td";
	  var deleteCell = document.createElement('td');
	  deleteCell.id = "exercise-delete-" + exercise + "-" + calories;
	  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

	  newRow.appendChild(exerciseCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(deleteCell);

	  $(newRow).data("id", id);

	  var dailyExercise = document.getElementById('daily-exercise');

	  dailyExercise.appendChild(newRow);
	}

	function submitExerciseCalories(total = 0) {
	  var newRow = document.createElement('tr');
	  newRow.id = "exercise-calorie-total";

	  var firstTd = document.createElement('td');
	  firstTd.innerHTML = "<strong>Total Calories</strong>";

	  var calorieTotalCell = document.createElement('td');

	  if (total > 0) {
	    calorieTotalCell.innerHTML = "<span id='remaining-green'>" + total + "</span>";
	  } else {
	    calorieTotalCell.innerHTML = "<span id='remaining-black'>" + total + "</span>";
	  }

	  // calorieTotalCell.innerText = total;
	  calorieTotalCell.id = "exercise-calories-total";

	  var emptyTd = document.createElement('td');
	  emptyTd.innerText = "";

	  newRow.appendChild(firstTd);
	  newRow.appendChild(calorieTotalCell);
	  newRow.appendChild(emptyTd);

	  var exerciseTable = document.getElementById('daily-exercise');
	  exerciseTable.appendChild(newRow);
	}

	function storeExerciseLog(exercise, calories) {
	  var date = $('.date-format')[0].innerText;
	  var dateJSON = localStorage.getItem(date);
	  var fullDateArray = JSON.parse(localStorage[date]);
	  fullDateArray[4].dailyExercise.unshift({ exercise: exercise, calories: calories });
	  var exJSON = JSON.stringify(fullDateArray);
	  localStorage.setItem(date, exJSON);

	  $("#daily-exercise > tr").remove();
	  updateExerciseLog();
	}

	function exerciseChecker(checkBox) {
	  for (var i = 0; i < checkBox.length; i++) {
	    if (checkBox[i].checked === true) {
	      var exercise = checkBox[i].parentElement.parentElement.parentElement.children[0].innerText;
	      var calories = checkBox[i].parentElement.parentElement.parentElement.children[1].innerText;
	      storeExerciseLog(exercise, calories);
	    }
	  }
	  clearChecked(checkBox);
	}

	function updateExerciseLog() {
	  var exerciseCalorieTotal = 0;
	  var date = $('.date-format')[0].innerText;
	  var brad = JSON.parse(localStorage[date])[4];
	  for (var i = 0; i < brad.dailyExercise.length; i++) {
	    submitExerciseLog(brad.dailyExercise[i].exercise, brad.dailyExercise[i].calories, i);
	    exerciseCalorieTotal += parseInt(brad.dailyExercise[i].calories);
	  }
	  submitExerciseCalories(exerciseCalorieTotal);
	}

	function deleteExerciseLog(event, that) {
	  var date = $('.date-format')[0].innerText;
	  event.preventDefault();
	  var fullDateArray = JSON.parse(localStorage[date]);
	  for (var i = 0; i < fullDateArray[4].dailyExercise.length; i++) {
	    if ($(that).parent().parent().data('id') === i) {
	      that.parentElement.parentElement.remove();
	      fullDateArray[4].dailyExercise.splice(i, 2);
	      var dateJSON = JSON.stringify(fullDateArray);
	      localStorage.setItem(date, dateJSON);
	    }
	  }
	};

	// start of total table for calories
	function submitTotalTable(total = 0, burnedCalories = 0) {
	  var goalRow = document.createElement('tr');
	  goalRow.id = "goal-calories";

	  var goalTd = document.createElement('td');
	  goalTd.innerHTML = "<strong>Goal Calories</strong>";

	  var goalTd2 = document.createElement('td');
	  goalTd2.innerHTML = "<strong>2000</strong>";

	  goalRow.appendChild(goalTd);
	  goalRow.appendChild(goalTd2);

	  var totalsTable = document.getElementById('totals');
	  totalsTable.appendChild(goalRow);
	  // calories consumed
	  var consumedRow = document.createElement('tr');
	  consumedRow.id = "consumed-calories";

	  var consumeTd = document.createElement('td');
	  consumeTd.innerHTML = "<span><strong>Calories Consumed</strong>";

	  var consumeTd2 = document.createElement('td');
	  consumeTd2.innerHTML = total;
	  consumeTd2.id = "cal-consumed";
	  consumedRow.appendChild(consumeTd);
	  consumedRow.appendChild(consumeTd2);

	  totalsTable.appendChild(consumedRow);
	  // calories burned
	  var burnedRow = document.createElement('tr');
	  burnedRow.id = "burned-calories";

	  var burnedTd = document.createElement('td');
	  burnedTd.innerHTML = "<strong>Calories Burned</strong>";

	  var burnedTd2 = document.createElement('td');

	  if (burnedCalories > 0) {
	    burnedTd2.innerHTML = "<span id='remaining-green'>" + burnedCalories + "</span>";
	  } else {
	    burnedTd2.innerHTML = "<span id='remaining-black'>" + burnedCalories + "</span>";
	  }

	  // burnedTd2.innerHTML = burnedCalories

	  burnedRow.appendChild(burnedTd);
	  burnedRow.appendChild(burnedTd2);

	  totalsTable.appendChild(burnedRow);
	  // remaining calories
	  var remainingRow = document.createElement('tr');
	  remainingRow.id = "remaining-calories";

	  var remainingTd = document.createElement('td');
	  remainingTd.innerHTML = "<strong>Remaining Calories</strong>";

	  var remainingTd2 = document.createElement('td');

	  var remainingCalories = 2000 - total + burnedCalories;

	  if (remainingCalories < 0) {
	    remainingTd2.innerHTML = "<span id='remaining-red'>" + remainingCalories + "</span>";
	  } else {
	    remainingTd2.innerHTML = "<span id='remaining-green'>" + remainingCalories + "</span>";
	  }

	  remainingRow.appendChild(remainingTd);
	  remainingRow.appendChild(remainingTd2);

	  totalsTable.appendChild(remainingRow);
	}
	function updateTotalTable() {
	  debugger;
	  var caloriesTds = $('#snacksTable-calories-total-td, #dinnerTable-calories-total-td, #breakfastTable-calories-total-td, #lunchTable-calories-total-td');
	  var burnedCalories = parseInt($('#exercise-calories-total')[0].innerText);
	  var total = 0;
	  for (var i = 0; i < caloriesTds.length; i++) {
	    total += parseInt(caloriesTds[i].innerText);
	  }
	  submitTotalTable(total, burnedCalories);
	}

	// start of making date
	function makeDate() {
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth() + 1;
	  var yyyy = today.getFullYear();

	  if (dd < 10) {
	    dd = '0' + dd;
	  }
	  if (mm < 10) {
	    mm = '0' + mm;
	  }
	  today = mm + '/' + dd + '/' + yyyy;
	  $('.date-format').html(today);
	}

	// doc ready starts here //
	$(document).ready(function () {
	  makeDate();
	  updateExercise();
	  // breakfast doc ready starts here

	  updateBreakfastTable();
	  // lunch doc ready starts here
	  updateLunchStorage();
	  // dinner doc ready starts here
	  updateDinnerStorage();
	  // snacks doc ready starts here
	  updateSnacksStorage();
	  // exercise starts here
	  // adding date
	  updateExerciseLog();

	  updateTotalTable();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var global = __webpack_require__(2);

	class Breakfast {
	  constructor(food = 0, calories = 0) {
	    this.food = food;
	    this.calories = calories;
	  }

	  storeBreakfast() {
	    var date = $('.date-format')[0].innerText;
	    // var dateJSON = localStorage.getItem(date)
	    var fullDateArray = JSON.parse(localStorage[date]);
	    // var dateArray = JSON.parse(dateJSON)[0]
	    fullDateArray[0].breakfast.unshift({ food: this.food, calories: this.calories });

	    var breakfastJSON = JSON.stringify(fullDateArray);
	    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
	    localStorage.setItem(date, breakfastJSON);
	  }

	  deleteBreakfast(event, that) {
	    var date = $('.date-format')[0].innerText;
	    event.preventDefault();
	    var fullDateArray = JSON.parse(localStorage[date]);
	    for (var i = 0; i < fullDateArray[0].breakfast.length; i++) {
	      if ($(that).parent().parent().data('id') === i) {
	        that.parentElement.parentElement.remove();
	        fullDateArray[0].breakfast.splice(i, 1);
	        var dateJSON = JSON.stringify(fullDateArray);
	        localStorage.setItem(date, dateJSON);
	      }
	    }
	  }

	  updateBreakfast(storage, tableName) {
	    var CalorieTotal = 0;
	    var date = $('.date-format')[0].innerText;
	    if (localStorage.getItem(date) === null) {
	      var array = [{ breakfast: [] }, { lunch: [] }, { dinner: [] }, { snack: [] }, { dailyExercise: [] }];
	      localStorage.setItem(date, JSON.stringify(array));
	    } else {
	      var brad = JSON.parse(localStorage[date])[0];
	      for (var i = 0; i < brad.breakfast.length; i++) {
	        global.submitTable(brad.breakfast[i].food, brad.breakfast[i].calories, i, tableName, date);
	        CalorieTotal += parseInt(brad.breakfast[i].calories);
	      }
	    }
	    global.submitTableCalories(CalorieTotal, tableName, 400);
	  }
	}

	module.exports = Breakfast;

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	function submitTable(food, calories, id, tableName, idName) {
	  var newRow = document.createElement('tr');
	  newRow.id = idName + food + "-" + calories;
	  var foodCell = document.createElement('td');
	  foodCell.innerText = food;
	  foodCell.id = idName + '-' + food + '-' + 'td';
	  var calorieCell = document.createElement('td');
	  calorieCell.innerText = calories;
	  calorieCell.id = idName + "-calories-td";
	  var deleteCell = document.createElement('td');
	  deleteCell.id = idName + "-delete-" + food + "-" + calories;
	  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

	  newRow.appendChild(foodCell);
	  newRow.appendChild(calorieCell);
	  newRow.appendChild(deleteCell);

	  $(newRow).data("id", id);

	  var table = document.getElementById(tableName);
	  table.appendChild(newRow);
	}

	function submitTableCalories(total = 0, tableName, calorieTotal) {
	  var newRow = document.createElement('tr');
	  newRow.id = tableName + "-calorie-total-tr";

	  var firstTd = document.createElement('td');
	  firstTd.innerHTML = "<strong>Total Calories</strong>";

	  var calorieTotalCell = document.createElement('td');
	  calorieTotalCell.innerText = total;
	  calorieTotalCell.id = tableName + "-calories-total-td";

	  var emptyTd = document.createElement('td');
	  emptyTd.innerText = "";

	  newRow.appendChild(firstTd);
	  newRow.appendChild(calorieTotalCell);
	  newRow.appendChild(emptyTd);
	  var breakfastTable = document.getElementById(tableName);
	  breakfastTable.appendChild(newRow);
	  // remaining row
	  var remainingRow = document.createElement('tr');
	  remainingRow.id = tableName + "-calorie-total";

	  var firstRemainingTd = document.createElement('td');
	  firstRemainingTd.innerHTML = "<strong>Remaining Calories</strong>";

	  var calorieRemainingCell = document.createElement('td');
	  calorieRemainingCell.innerText = calorieTotal - total;
	  calorieRemainingCell.id = tableName + "-remaining-total";

	  var emptyRemainingTd = document.createElement('td');
	  emptyRemainingTd.innerText = "";

	  remainingRow.appendChild(firstRemainingTd);
	  remainingRow.appendChild(calorieRemainingCell);
	  remainingRow.appendChild(emptyRemainingTd);

	  breakfastTable.appendChild(remainingRow);
	}

	module.exports = {
	  submitTable,
	  submitTableCalories
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var global = __webpack_require__(2);

	class Lunch {
	  constructor(food = 'nil', calories = 'nil') {
	    this.food = food;
	    this.calories = calories;
	  }

	  storeLunch() {
	    var date = $('.date-format')[0].innerText;
	    var dateJSON = localStorage.getItem(date);
	    var fullDateArray = JSON.parse(localStorage[date]);
	    // var dateArray = JSON.parse(dateJSON)[0]
	    fullDateArray[1].lunch.unshift({ food: this.food, calories: this.calories });

	    var lunchJSON = JSON.stringify(fullDateArray);
	    // var apple = JSON.parse(localStorage.getItem(date))[0].breakfast
	    localStorage.setItem(date, lunchJSON);
	  }

	  deleteLunch(event, that) {
	    var date = $('.date-format')[0].innerText;
	    event.preventDefault();
	    // var dateJSON = localStorage.getItem(date)
	    var fullDateArray = JSON.parse(localStorage[date]);
	    for (var i = 0; i < fullDateArray[1].lunch.length; i++) {
	      if ($(that).parent().parent().data('id') === i) {
	        that.parentElement.parentElement.remove();
	        fullDateArray[1].lunch.splice(i, 1);
	        var dateJSON = JSON.stringify(fullDateArray);
	        localStorage.setItem(date, dateJSON);
	      }
	    }
	  }

	  updateLunch(storage, tableName) {
	    var CalorieTotal = 0;
	    var date = $('.date-format')[0].innerText;

	    var brad = JSON.parse(localStorage[date])[1];
	    for (var i = 0; i < brad.lunch.length; i++) {
	      global.submitTable(brad.lunch[i].food, brad.lunch[i].calories, i, tableName, date);
	      CalorieTotal += parseInt(brad.lunch[i].calories);
	    }
	    global.submitTableCalories(CalorieTotal, tableName, 600);
	  }

	}
	module.exports = Lunch;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var global = __webpack_require__(2);

	class Dinner {
	  constructor(food = 'nil', calories = 'nil') {
	    this.food = food;
	    this.calories = calories;
	  }

	  storeDinner() {
	    var date = $('.date-format')[0].innerText;
	    var dateJSON = localStorage.getItem(date);
	    var fullDateArray = JSON.parse(localStorage[date]);
	    fullDateArray[2].dinner.unshift({ food: this.food, calories: this.calories });
	    var dinnerJSON = JSON.stringify(fullDateArray);
	    localStorage.setItem(date, dinnerJSON);
	  }

	  deleteDinner(event, that) {
	    var date = $('.date-format')[0].innerText;
	    event.preventDefault();
	    var fullDateArray = JSON.parse(localStorage[date]);
	    for (var i = 0; i < fullDateArray[2].dinner.length; i++) {
	      if ($(that).parent().parent().data('id') === i) {
	        that.parentElement.parentElement.remove();
	        fullDateArray[2].dinner.splice(i, 2);
	        var dateJSON = JSON.stringify(fullDateArray);
	        localStorage.setItem(date, dateJSON);
	      }
	    }
	  }

	  updateDinner(storage, tableName) {
	    var CalorieTotal = 0;
	    var date = $('.date-format')[0].innerText;

	    var brad = JSON.parse(localStorage[date])[2];
	    for (var i = 0; i < brad.dinner.length; i++) {
	      global.submitTable(brad.dinner[i].food, brad.dinner[i].calories, i, tableName, date);
	      CalorieTotal += parseInt(brad.dinner[i].calories);
	    }
	    global.submitTableCalories(CalorieTotal, tableName, 800);
	  }
	}

	module.exports = Dinner;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var global = __webpack_require__(2);

	class Snacks {
	  constructor(food = 'nil', calories = 'nil') {
	    this.food = food;
	    this.calories = calories;
	  }

	  storeSnacks() {
	    var date = $('.date-format')[0].innerText;
	    var dateJSON = localStorage.getItem(date);
	    var fullDateArray = JSON.parse(localStorage[date]);
	    fullDateArray[3].snack.unshift({ food: this.food, calories: this.calories });
	    var snackJSON = JSON.stringify(fullDateArray);
	    localStorage.setItem(date, snackJSON);
	  }

	  deleteSnacks(event, that) {
	    var date = $('.date-format')[0].innerText;
	    event.preventDefault();
	    var fullDateArray = JSON.parse(localStorage[date]);
	    for (var i = 0; i < fullDateArray[3].snack.length; i++) {
	      if ($(that).parent().parent().data('id') === i) {
	        that.parentElement.parentElement.remove();
	        fullDateArray[3].snack.splice(i, 2);
	        var dateJSON = JSON.stringify(fullDateArray);
	        localStorage.setItem(date, dateJSON);
	      }
	    }
	  }

	  updateSnacks(storage, tableName) {
	    var CalorieTotal = 0;
	    var date = $('.date-format')[0].innerText;

	    var brad = JSON.parse(localStorage[date])[3];
	    for (var i = 0; i < brad.snack.length; i++) {
	      global.submitTable(brad.snack[i].food, brad.snack[i].calories, i, tableName, date);
	      CalorieTotal += parseInt(brad.snack[i].calories);
	    }
	    global.submitTableCalories(CalorieTotal, tableName, 200);
	  }

	}
	module.exports = Snacks;

/***/ }
/******/ ]);