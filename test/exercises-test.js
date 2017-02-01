var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect    = require('chai').expect;

test.describe('testing exercises.html', function() {
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

  test.it("should allow me to add exercise and calories to table", function(){
    driver.get('http://localhost:8080/exercises.html');

    var foodInput = driver.findElement({name: 'exercise'})

    var calInput = driver.findElement({name:'calories'})
    foodInput.sendKeys('running')
    calInput.sendKeys('120')


    var submit = driver.findElement({id: 'submit-exercise'})
    submit.click()

    driver.findElement({id: 'exercise-td'}).getText().then(function functionName(food){
      assert.equal(food, "running")
    });
  });

  test.it("user should see error if no exercise is entered", function(){
    driver.get('http://localhost:8080/exercises.html');

    var caloriesInput = driver.findElement({name: 'calories'})
    // var calInput = driver.findElement({name:'calories'})
    caloriesInput.sendKeys('100')
    // calInput.sendKeys('')
    var submit = driver.findElement({id: 'submit-exercise'})

    submit.click()

    driver.findElement({id: 'exercise-error'}).getText().then(function functionName(error){
      assert.equal(error, "Please enter a exercise name")
    });
  });

  test.it("user should see error if no calories are entered", function(){
    driver.get('http://localhost:8080/exercises.html');

    var foodInput = driver.findElement({name: 'exercise'})
    foodInput.sendKeys('run')
    var submit = driver.findElement({id: 'submit-exercise'})

    submit.click()

    driver.findElement({id: 'calories-error'}).getText().then(function functionName(error){
      assert.equal(error, "Please enter a calorie amount")
    });
  });

  test.it("user can delete a exercise", function(){
    driver.get('http://localhost:8080/exercises.html');

    var exerciseInput = driver.findElement({name: 'exercise'})
    var calorieInput = driver.findElement({name: 'calories'})
    exerciseInput.sendKeys('run')
    calorieInput.sendKeys('100')
    var submit = driver.findElement({id: 'submit-exercise'})

    submit.click()

    driver.findElement({id: 'exercise-td'}).getText().then(function functionName(food){
      assert.equal(food, "run")
    });

    var trash = driver.findElement({id: 'trash'})
    trash.click()
    var noExercise = driver.findElement({id: "t-body"}).innerHTML

    expect(noExercise).to.be.empty;
    });
  });
