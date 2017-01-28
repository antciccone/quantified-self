"use strict"

class Exercise {
  constructor(exercise="nil", calories="nil"){
    this.exercise = exercise;
    this.calories = calories;
  }

  storeExercise(){
    var exerciseJSON = localStorage.getItem('exercises')
    if(exerciseJSON === null){
      exerciseJSON = '[]';
    };
    var currentExercies = JSON.parse(exerciseJSON);
    currentExercies.push({exercise: this.exercise, calories: this.calories});
    exerciseJSON = JSON.stringify(currentExercies);
    localStorage.setItem('exercises', exerciseJSON)
  }

  deleteExercise(element){
      var exercises = JSON.parse(localStorage["exercises"])
      for (var i = 0; i < exercises.length; i++) {
        if (this.exercise === exercises[i].exercise.trim() && this.calories === exercises[i].calories.trim()) {

        element.parentElement.parentElement.remove();

        exercises.splice(i,1)
        var exercisesJSON = JSON.stringify(exercises);
        localStorage.setItem('exercises', exercisesJSON);
      }
    }
  }
}
module.exports = Exercise






"use strict";

var Exercise = require('./exercises.js');

var exerciseSubmit = document.getElementById('submit-exercise');
var exerciseTable = document.getElementById('myTable');

exerciseSubmit.addEventListener('click', function(event){
  event.preventDefault();
  var exerciseName = document.getElementsByName("exercise")[0].value
  var calories = document.getElementsByName("calories")[0].value
  if (exerciseName.trim() === "") {
    $("#exercise-error").remove();
    $("#exercise-input").append('<p id="exercise-error">Please enter a exercise name</p>')
  } else if (calories.trim() === "") {
    $("#exercise-error").remove();
    $("#calories-error").remove();
    $(".ex-calories-input").append('<p id="calories-error">Please enter a calorie amount</p>')
  } else {
    $("#calories-error").remove();
    submitExercise(exerciseName, calories)
    var exerciseClass = new Exercise(exerciseName, calories)
    exerciseClass.storeExercise();
    $('input[name="exercise"]').val("")
    $('input[name="calories"]').val("")
    }
  });
