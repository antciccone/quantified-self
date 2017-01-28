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

  editTable(that){
  var tdId = $(that).closest('tr').data("id");
  var exercises = JSON.parse(localStorage["exercises"]);
    if (that.id == "exercise-td") {
     exercises[tdId].exercise = this.exercise
     exercises[tdId].calories = that.parentElement.children[1].innerText
    } else {
     exercises[tdId].exercise = that.parentElement.children[0].innerText
     exercises[tdId].calories = that.innerText
    }
    var exercisesJSON = JSON.stringify(exercises);
    localStorage.setItem('exercises', exercisesJSON);

  }
}
module.exports = Exercise
