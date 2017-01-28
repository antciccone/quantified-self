var Exercise = require('./exercises.js');

var exerciseSubmit = document.getElementById('submit-exercise');
var exerciseTable = document.getElementById('myTable');

exerciseSubmit.addEventListener('click', function(event){
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
    var exerciseClass = new Exercise(exercise, calories)
    exerciseClass.storeExercise()
    $("#myTable > tr").remove()
    updateExercise();
    $('input[name="exercise"]').val("")
    $('input[name="calories"]').val("")
    }
  });

$("#myInput").keyup(function(){
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
})

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


function updateExercise(){
  JSON.parse(localStorage.getItem('exercises')).forEach(function(element, i){
    submitExercise(element.exercise, element.calories, i);
  });
}

updateExercise();

$(document).ready(function(){

  $('#myTable').on("click", ".fa-trash-o", function(event){
    var that = this
    var exercise = this.parentElement.parentElement.children[0].innerText
    var calories = this.parentElement.parentElement.children[1].innerText
    var exerciseClass = new Exercise(exercise, calories)
    event.preventDefault();
    exerciseClass.deleteExercise(that)
  })

  $('#myTable').on("blur", "#exercise-td", function(){
    var that = this
    var exercise = this.innerText
    var calories = this.parentElement.children[1].innerHTML
    var exerciseClass = new Exercise(exercise, calories)
    exerciseClass.editTable(that)
    $("#myTable > tr").remove();
    updateExercise()
  })

  $('#myTable').on("blur", "#calories-td", function(){
    var that = this
    var exercise = this.parentElement.children[0].innerHTML
    var calories = this.innerHTML
    var exerciseClass = new Exercise(exercise, calories)
    exerciseClass.editTable(that)
    $("#myTable > tr").remove();
    updateExercise()
  })

  $("#myTable").on('keydown', '#calories-td', function(e){
      if (e.which == 13) {
        e.preventDefault();
        var that = this
        var exercise = this.parentElement.children[0].innerHTML
        var calories = this.innerHTML
        var exerciseClass = new Exercise(exercise, calories)
        exerciseClass.editTable(that)
        $("#myTable > tr").remove();
        updateExercise()
      }
    });

  $("#myTable").on('keydown', '#exercise-td', function(e){
    if (e.which == 13) {
      e.preventDefault();
      var that = this
      var exercise = this.innerHTML
      var calories = this.parentElement.children[1].innerHTML
      var exerciseClass = new Exercise(exercise, calories)
      exerciseClass.editTable(that)
      $("#myTable > tr").remove();
      updateExercise()
    }
  });

});
