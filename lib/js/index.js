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
  if (localStorage.getItem('foods') === null){
    var foods = "[]"
    localStorage.setItem('foods', foods)
  } else {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element, i){
    submitFood(element.food, element.calories, i)

  })}
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

//
//
// start of breakfast
//
//

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

function submitBreakfastCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "breakfast-calorie-total"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "breakfast-calories-total"

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
   $("#breakfastTable > tr").remove();
   updateBreakfast();
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
   $("#lunchTable > tr").remove();
   updateLunch();
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

function submitLunchCalories(total=0) {
  var newRow = document.createElement('tr');
  newRow.id = "lunch-calorie-total"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "lunch-calories-total"

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


function storeLunch(food, calories){
  var lunchJSON = localStorage.getItem('lunch')

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
  newRow.id = "dinner-calorie-total"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "dinner-calories-total"

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
  newRow.id = "snacks-calorie-total"

  var firstTd = document.createElement('td');
  firstTd.innerHTML = "<strong>Total Calories</strong>"

  var calorieTotalCell = document.createElement('td');
  calorieTotalCell.innerText = total;
  calorieTotalCell.id = "snacks-calories-total"

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
  newRow.id = "snacks-"+exercise+"-"+calories
  var exerciseCell = document.createElement('td');
  exerciseCell.innerText = exercise;
  exerciseCell.id = "snacks-exercise-td"
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "snacks-calories-td"
  var deleteCell = document.createElement('td')
  deleteCell.id = "snacks-delete-"+exercise+"-"+calories
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  var dailyExercise = document.getElementById('daily-exercise')

  dailyExercise.appendChild(newRow);
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
  if (localStorage.getItem('exerciseLog') === null){
    var exerciseLog = "[]"
    localStorage.setItem('exerciseLog', exerciseLog)
  } else {
  JSON.parse(localStorage.getItem('exerciseLog')).forEach(function(element, i){
    submitExerciseLog(element.exercise, element.calories, i)
  })}
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
 };


updateExerciseLog();


// doc ready starts here //

$(document).ready(function(){

  // breakfast doc ready starts here

  $('#submit-breakfast').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    breakfastChecker(checkBox);
  })

  $('#breakfastTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteBreakfast(event, that);
  });

  // lunch doc ready starts here

  $('#submit-lunch').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    lunchChecker(checkBox);
  })

  $('#lunchTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteLunch(event, that);
  });

  // dinner doc ready starts here
  $('#submit-dinner').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    dinnerChecker(checkBox);
  })

  $('#dinnerTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteDinner(event, that);
  });

  // snacks doc ready starts here
  $('#submit-snacks').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.food-check')
    snacksChecker(checkBox);
  })

  $('#snacksTable').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteSnacks(event, that);
  });

  // exercise starts here
  $('#submit-exercise').on('click', function(event){
    event.preventDefault();
    var checkBox = $('.exercise-check')
    exerciseChecker(checkBox);
  })

  $('#daily-exercise').on("click", ".fa-trash-o", function(event){
    that = this;
    deleteExerciseLog(event, that);
  });

  });
