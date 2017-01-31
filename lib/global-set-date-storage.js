function setDateStorage() {
  var date = $('.date-format')[0].innerText
  localStorage.getItem(date)
  var breakfastArray = JSON.parse(localStorage.breakfast)
  var breakfast = {breakfast:breakfastArray}
  localStorage.setItem(date, JSON.stringify(breakfast))
}

module.exports ={
  setDateStorage
}
