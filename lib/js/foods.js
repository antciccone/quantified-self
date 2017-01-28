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

  var allFoods = document.getElementById('myTable')

  var getFood = function(){
    var calories = $('input[name="calories"]').val();
    var food = $('input[name="food"]').val();
    if (food.trim() === "") {
      $(".food-error").remove();
      $(".food-input").append('<p id="food-error">Please enter a food name</p>')
    } else if (calories.trim() === "") {
      $(".food-error").remove();
      $(".calories-error").remove();
      $(".calories-input").append('<p id="calories-error">Please enter a calorie amount</p>')
    } else {
      $(".calories-error").remove();
      storeFood(food, calories);
      $("#myTable > tr").remove();
      updateTable();
      $('input[name="food"]').val("")
      $('input[name="calories"]').val("")
    }
  };

  function storeFood(food, calories) {
    var foodsJSON = localStorage.getItem('foods');

    if(foodsJSON === null){
      foodsJSON = '[]';
    };

    var currentFoods = JSON.parse(foodsJSON);
    currentFoods.unshift({food: food, calories: calories});
    foodsJSON = JSON.stringify(currentFoods);
    localStorage.setItem('foods', foodsJSON);
  };

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
    deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

    newRow.appendChild(foodCell);
    newRow.appendChild(calorieCell);
    newRow.appendChild(deleteCell);

    $(newRow).data("id",id)

    allFoods.appendChild(newRow);
    foodCell.contentEditable='true';
    calorieCell.contentEditable='true';

  };

  function editObject(that) {
    var tdId = $(that).closest('tr').data("id");
    var foods = JSON.parse(localStorage["foods"]);
    if (that.id == "food-td") {
      foods[tdId].food = that.innerText
      foods[tdId].calories = that.parentElement.children[1].innerText
    } else {
      foods[tdId].food = that.parentElement.children[0].innerText
      foods[tdId].calories = that.innerText
    }
    foodsJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodsJSON);

    $("#myTable > tr").remove();
    updateTable();
  }

  function deleteFoods(event, that) {
    event.preventDefault();
    var foods = JSON.parse(localStorage["foods"]);
    for (var i = 0; i < foods.length; i++) {
      if (that.parentElement.parentElement.children[0].innerText === foods[i].food.trim() && that.parentElement.parentElement.children[1].innerText === foods[i].calories.trim()) {
        that.parentElement.parentElement.remove();
        foods.splice(i,1)
        foodsJSON = JSON.stringify(foods);
        localStorage.setItem('foods', foodsJSON);
      }
     }
   };

  function updateTable() {
    JSON.parse(localStorage.getItem('foods')).forEach(function(element, i){
      submitFood(element.food, element.calories, i);
    });
  }

  updateTable();

  $(document).ready(function(){
    $('.food-form').on('submit', getFood);

    $("form").submit(function( event ){
        event.preventDefault();
      });

    $('#myTable').on("click", ".fa-trash-o", function(event){

        that = this;
        deleteFoods(event, that);

      });

    $("#myTable").on('blur', '#food-td', function(e){
      that = this;
      editObject(that);
     });

    $("#myTable").on('blur', '#calories-td', function(){
       that = this;
       editObject(that);
     });

    $("#myTable").on('keydown', '#calories-td', function(event){
      if (event.which == 13) {
        event.preventDefault();
        that = this;
        editObject(that);
      }
    });

    $("#myTable").on('keydown', '#food-td', function(event){
      if (event.which == 13) {
        event.preventDefault();
        that = this;
        editObject(that);
      }
    });

  });
