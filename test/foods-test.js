var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing foods.html', function() {
  var driver;
  this.timeout(100000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it("should allow me to add food and calories to table", function(){
    driver.get('http://localhost:8080/foods.html');

    var foodInput = driver.findElement({name: 'food'})
    var calInput = driver.findElement({name:'calories'})
    foodInput.sendKeys('apple')
    calInput.sendKeys('120')
    var submit = driver.findElement({id: 'submit-food'})
    submit.click()

    driver.findElement({id: 'food-name'}).getText().then(function functionName(food){
      assert.equal(food, "apple")
    });
  });

  test.it("user should see error if no food is entered", function(){
    driver.get('http://localhost:8080/foods.html');

    var caloriesInput = driver.findElement({name: 'calories'})
    // var calInput = driver.findElement({name:'calories'})
    caloriesInput.sendKeys('100')
    // calInput.sendKeys('')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click()

    driver.findElement({id: 'food-error'}).getText().then(function functionName(error){
      assert.equal(error, "Please enter a food name")
    });
  });

  test.it("user should see error if no calories are entered", function(){
    driver.get('http://localhost:8080/foods.html');

    var foodInput = driver.findElement({name: 'food'})
    // var calInput = driver.findElement({name:'calories'})
    foodInput.sendKeys('apple')
    // calInput.sendKeys('')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click()

    driver.findElement({id: 'calories-error'}).getText().then(function functionName(error){
      assert.equal(error, "Please enter a calorie amount")
    });
  });

});
