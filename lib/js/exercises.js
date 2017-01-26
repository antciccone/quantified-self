var submitExercise = document.getElementById('submit-exercise');
var allFoods = document.getElementById('myTable')

document.getElementById("submit-exercise").addEventListener("click", function(event){
  event.preventDefault();
});

submitExercise.addEventListener('click', function(){
  var exercise = document.getElementsByName("exercise")[0].value
  var calories = document.getElementsByName("calories")[0].value
  submitFood(exercise, calories)
  storeExercise(exercise, calories)
});

function submitFood(exercise, calories){
  var newRow = document.createElement('tr');
  newRow.id = "row-"+exercise+"-"+calories
  var exerciseCell = document.createElement('td');
  exerciseCell.innerText = exercise;
  exerciseCell.id = "exercise-"+exercise
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  calorieCell.id = "calories-"+calories
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
    foodsJSON = '[]'
  };
  var currentExercies
}
