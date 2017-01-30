// need to pass the table
// need to pass the name of elements
  function submitTable(food, calories, id, tableName, idName){
    var newRow = document.createElement('tr');
    newRow.id = idName+food+"-"+calories
    var foodCell = document.createElement('td');
    foodCell.innerText = food;
    foodCell.id = idName+'-'+food+'-'+'td'
    var calorieCell = document.createElement('td');
    calorieCell.innerText = calories;
    calorieCell.id = idName+"-calories-td"
    var deleteCell = document.createElement('td')
    deleteCell.id = idName+"-delete-"+food+"-"+calories
    deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

    newRow.appendChild(foodCell);
    newRow.appendChild(calorieCell);
    newRow.appendChild(deleteCell);

    $(newRow).data("id",id)

    var table = document.getElementById(tableName)

    table.appendChild(newRow);
  }

  function submitTableCalories(total=0, tableName) {
    var newRow = document.createElement('tr');
    newRow.id = "breakfast-calorie-total-tr"

    var firstTd = document.createElement('td');
    firstTd.innerHTML = "<strong>Total Calories</strong>"

    var calorieTotalCell = document.createElement('td');
    calorieTotalCell.innerText = total;
    calorieTotalCell.id = "breakfast-calories-total-td"

    var emptyTd = document.createElement('td');
    emptyTd.innerText = ""

    newRow.appendChild(firstTd);
    newRow.appendChild(calorieTotalCell);
    newRow.appendChild(emptyTd);

    var breakfastTable = document.getElementById(tableName)
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

module.exports ={
  submitTable,
  submitTableCalories,
}
