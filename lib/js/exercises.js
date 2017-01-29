var exercise = document.getElementById('submit-exercise');
var exerciseTable = document.getElementById('myTable');

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
    storeExercise(exercise, calories)
    $("#myTable > tr").remove()
    updateExercise();
    $('input[name="exercise"]').val("")
    $('input[name="calories"]').val("")
    }
  });

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
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
}

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
  deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  $(newRow).data("id",id)

  exerciseTable.appendChild(newRow);

  exerciseCell.contentEditable = true;
  calorieCell.contentEditable = true;

}

function storeExercise(exercise, calories){
  var exerciseJSON = localStorage.getItem('exercises')
  debugger;

  var currentExercise = JSON.parse(exerciseJSON);
  currentExercise.unshift({exercise: exercise, calories: calories});
  exerciseJSON = JSON.stringify(currentExercise);
  localStorage.setItem('exercises', exerciseJSON)
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

function deleteExercise(event, item){
  event.preventDefault();
    var exercises = JSON.parse(localStorage["exercises"])
    for (var i = 0; i < exercises.length; i++) {
      if ($(item).parent().parent().data('id') === i) {

        item.parentElement.parentElement.remove();

        exercises.splice(i,1)
        exercisesJSON = JSON.stringify(exercises);
        localStorage.setItem('exercises', exercisesJSON);
      }
    }
  };

function editTable(that){
  var tdId = $(that).closest('tr').data("id");
  var exercises = JSON.parse(localStorage["exercises"]);
    if (that.id == "exercise-td") {
     exercises[tdId].exercise = that.innerText
     exercises[tdId].calories = that.parentElement.children[1].innerText
    } else {
     exercises[tdId].exercise = that.parentElement.children[0].innerText
     exercises[tdId].calories = that.innerText
    }
    var exercisesJSON = JSON.stringify(exercises);
    localStorage.setItem('exercises', exercisesJSON);

    $("#myTable > tr").remove();
    updateExercise();
  }


updateExercise();


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

  $("#myTable").on('keydown', '#calories-td', function(e){
      if (e.which == 13) {
        e.preventDefault();
        that = this;
        editTable(that);
      }
    });

  $("#myTable").on('keydown', '#exercise-td', function(e){
    if (e.which == 13) {
      e.preventDefault();
      that = this;
      editTable(that);
    }
  });


});
