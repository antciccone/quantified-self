
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
  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in' id=" + 'food-' + id + " /><label for=" + 'food-' + id + "></form>";

  newRow.appendChild(foodCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);

  $(newRow).data("id",id)

  allFoods.appendChild(newRow);

};

function updateTable() {
  JSON.parse(localStorage.getItem('foods')).forEach(function(element, i){
    submitFood(element.food, element.calories, i);
  });
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
  deleteCell.innerHTML = "<form action='#'><input type='checkbox' class='filled-in' id=" + 'exercise-' + id + " /><label for=" + 'exercise-' + id + "></form>";
  newRow.appendChild(exerciseCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  $(newRow).data("id",id)

  exerciseTable.appendChild(newRow);



}
function updateExercise(){
  JSON.parse(localStorage.getItem('exercises')).forEach(function(element, i){
    submitExercise(element.exercise, element.calories, i);
  });
}

updateExercise();
