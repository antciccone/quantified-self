function Breakfast(food='na', calories='na'){
  this.food = food;
  this.calories = calories
}

Breakfast.prototype.storeBreakfast = function () {
  function storeBreakfast(food, calories){
    var breakfastJSON = localStorage.getItem('breakfast')

    if(breakfastJSON === null){
      breakfastJSON = '[]';
    };

    var currentBreakfast = JSON.parse(breakfastJSON);
    currentBreakfast.unshift({food: this.food, calories: this.calories});
    breakfastJSON = JSON.stringify(currentBreakfast);
    localStorage.setItem('breakfast', breakfastJSON)

    $("#breakfastTable > tr").remove();
    updateBreakfast();

    }
  };

Breakfast.prototype.deleteBreakfast = function (event, that) {
    event.preventDefault();
    var breakfast = JSON.parse(localStorage["breakfast"]);
    for (var i = 0; i < breakfast.length; i++) {
      if ($(that).parent().parent().data('id') === i){
        that.parentElement.parentElement.remove();
        breakfast.splice(i,1)
        breakfastJSON = JSON.stringify(breakfast);
        localStorage.setItem('breakfast', breakfastJSON);
      }
     }
     $("#breakfastTable > tr").remove();
     updateBreakfast();
   };
}


module.exports = Breakfast
