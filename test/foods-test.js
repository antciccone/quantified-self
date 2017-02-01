var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect    = require('chai').expect;

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

    driver.findElement({id: 'food-td'}).getText().then(function functionName(food){
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
    foodInput.sendKeys('apple')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click()

    driver.findElement({id: 'calories-error'}).getText().then(function functionName(error){
      assert.equal(error, "Please enter a calorie amount")
    });
  });

  test.it("user should see added foods", function(){
    driver.get('http://localhost:8080/foods.html');

    var foodInput = driver.findElement({name: 'food'})
    var calorieInput = driver.findElement({name: 'calories'})
    foodInput.sendKeys('apple')
    calorieInput.sendKeys('100')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click();

    var foodInput = driver.findElement({name: 'food'})
    foodInput.sendKeys('banana')
    var calorieInput = driver.findElement({name: 'calories'})
    calorieInput.sendKeys('200')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click();

    driver.findElement({id: 'food-td'}).getText().then(function functionName(food){
      assert.equal(food, "banana")
    });
    driver.findElement({id: 'calories-td'}).getText().then(function functionName(calories){
      assert.equal(calories, "200")
    });
    driver.findElement({id: 'delete-banana-200'}).getAttribute("innerHTML").then(function functionName(deletes){
      assert.equal(deletes, '<i id="trash" class="fa fa-trash-o" aria-hidden="true"></i>')
    });
  });

  test.it("user can delete a food", function(){
    driver.get('http://localhost:8080/foods.html');

    var foodInput = driver.findElement({name: 'food'})
    var calorieInput = driver.findElement({name: 'calories'})
    foodInput.sendKeys('apple')
    calorieInput.sendKeys('100')
    var submit = driver.findElement({id: 'submit-food'})

    submit.click()

    driver.findElement({id: 'food-td'}).getText().then(function functionName(food){
      assert.equal(food, "apple")
    });

    var trash = driver.findElement({id: 'trash'})
    trash.click()
    var noFood = driver.findElement({id: "t-body"}).innerHTML

    expect(noFood).to.be.empty;

    expect(noFood).to.be.empty;
    });
  });
