var exercise = document.getElementById('submit-exercise');
var allFoods = document.getElementById('myTable')

exercise.addEventListener('click', function(event){
  event.preventDefault();
  var exercise = document.getElementsByName("exercise")[0].value
  var calories = document.getElementsByName("calories")[0].value
  if (exercise.trim() === "") {
    $("#exercise-error").remove();
    $("#exercise-input").append('<p id="exercise-error">Please enter a exercise name</p>')
  } else if (calories.trim() === "") {
    $("#exercise-error").remove();
    $("#calories-error").remove();
    $(".ex-calories-input").append('<p id="calories-error">Please enter a calorie amount</p>')
  } else {
    $("#calories-error").remove();
    submitExercise(exercise, calories)
    storeExercise(exercise, calories)
    }
  });


function submitExercise(exercise, calories){
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
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  allFoods.appendChild(newRow);

}

function storeExercise(exercise, calories){
  var exerciseJSON = localStorage.getItem('exercises')

  if(exerciseJSON === null){
    exerciseJSON = '[]';
  };

  var currentExercies = JSON.parse(exerciseJSON);
  currentExercies.push({exercise: exercise, calories: calories});
  exerciseJSON = JSON.stringify(currentExercies);
  localStorage.setItem('exercises', exerciseJSON)
}

function updateExercise(){
  JSON.parse(localStorage.getItem('exercises')).forEach(function(element){
    submitExercise(element.exercise, element.calories);
  });
}

function deleteExercise(event, item){
  event.preventDefault();
    var exercises = JSON.parse(localStorage["exercises"])
    for (var i = 0; i < exercises.length; i++) {
      if (item.parentElement.parentElement.children[0].innerText === exercises[i].exercise.trim() && item.parentElement.parentElement.children[1].innerText === exercises[i].calories.trim()) {

        item.parentElement.parentElement.remove();

        exercises.splice(i,1)
        exercisesJSON = JSON.stringify(exercises);
        localStorage.setItem('exercises', exercisesJSON);
      }
    }
  };

function editTable(that){
  var tdId = $(that).closest('tr').index() - 2;
    var exercises = JSON.parse(localStorage["exercises"]);
    if (that.id == "exercise-td") {
      exercises[tdId].exercise = that.innerText
      exercises[tdId].calories = that.parentElement.children[1].innerText
    } else {
      exercises[tdId].exercise = that.parentElement.children[0].innerText
      exercises[tdId].calories = that.innerText
    }
    exercisesJSON = JSON.stringify(exercises);
    localStorage.setItem('exercises', exercisesJSON);
  }


updateExercise();
document.getElementById("exercise-td").contentEditable = true;
document.getElementById("calories-td").contentEditable = true;

$(document).ready(function(){


  $('#myTable').on("click", ".fa-trash-o", function(event){
    var that = this
    deleteExercise(event, that)
  })

  $('#myTable').on("blur", "#exercise-td", function(){
    var that = this
    editTable(that)
  })

  $('#myTable').on("blur", "#calories-td", function(){
    var that = this
    editTable(that)
  })

});
