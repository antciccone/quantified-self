//   function search() {
//   var input, filter, table, tr, td, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     debugger;
//     if (td) {
//       if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }

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
      submitFood(food, calories);
      storeFood(food, calories);
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

    currentFoods.push({food: food, calories: calories});

    foodsJSON = JSON.stringify(currentFoods);

    localStorage.setItem('foods', foodsJSON);

  };

  function submitFood(food, calories){
    var newRow = document.createElement('tr');
    newRow.id = "row-"+food+"-"+calories
    var foodCell = document.createElement('td');
    foodCell.innerText = food;
    // foodCell.id = "food-"+food
    foodCell.id = "food-td"
    var calorieCell = document.createElement('td');
    calorieCell.innerText = calories;
    // calorieCell.id = "calories-"+calories
    calorieCell.id = "calories-td"
    var deleteCell = document.createElement('td')
    deleteCell.id = "delete-"+food+"-"+calories
    deleteCell.innerHTML = '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>';

    newRow.appendChild(foodCell);
    newRow.appendChild(calorieCell);
    newRow.appendChild(deleteCell);

    allFoods.appendChild(newRow);

    foodCell.contentEditable='true';
    calorieCell.contentEditable='true';

  };

  function updateTable() {
    JSON.parse(localStorage.getItem('foods')).forEach(function(element){
      submitFood(element.food, element.calories);
    });
  }

  $(document).ready(function(){
    $('.food-form').on('submit', getFood);

    $("form").submit(function( event ){
      event.preventDefault();
    });

    $('#myTable').on("click", ".fa-trash-o", function(event){
      event.preventDefault();
    var foods = JSON.parse(localStorage["foods"]);
    for (var i = 0; i < foods.length; i++) {
      if (this.parentElement.parentElement.children[0].innerText === foods[i].food.trim() && this.parentElement.parentElement.children[1].innerText === foods[i].calories.trim()) {

        this.parentElement.parentElement.remove();

        foods.splice(i,1)
        foodsJSON = JSON.stringify(foods);
        localStorage.setItem('foods', foodsJSON);
      }
     }
   })


  //  $('#myTable').on("click", "td", function(event){
  //    var foods = JSON.parse(localStorage["foods"]);
  //    for (var i = 0; i < foods.length; i++) {
  //      if (this.innerText === foods[i].food.trim() || this.innerText === foods[i].calories.trim() && this.parentElement.children[1].innerText === foods[i].calories.trim() || this.innerText === foods[i].food.trim()) {
  //      $(this).replaceWith('<input class="edit-input" type="text" placeholder=' + this.innerText + '>' );
  //       foodsJSON = JSON.stringify(foods);
  //       localStorage.setItem('foods', foodsJSON);
  //       }
  //     }
  //   });

   updateTable();

   $("#myTable").on('blur', '#food-td', function(){

    //  get object id
    tdId = $(this).closest('tr').index() - 2;

    //  find object in localStorage that matches table row id
    var foods = JSON.parse(localStorage["foods"]);

    //  update parsed localStorage object to match tr
    foods[tdId].food = this.innerText
    foods[tdId].calories = this.parentElement.children[1].innerText

    // save object to localStorage
    foodsJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodsJSON);

   });

   $("#myTable").on('blur', '#calories-td', function(){

    //  get object id
    tdId = $(this).closest('tr').index() - 2;

    //  find object in localStorage that matches table row id
    var foods = JSON.parse(localStorage["foods"]);

    //  update parsed localStorage object to match tr
    foods[tdId].food = this.parentElement.children[0].innerText
    foods[tdId].calories = this.innerText

    // save object to localStorage
    foodsJSON = JSON.stringify(foods);
    localStorage.setItem('foods', foodsJSON);

   });

  });
