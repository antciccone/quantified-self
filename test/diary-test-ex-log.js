var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect    = require('chai').expect;

test.describe('testing index.html', function() {
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


  test.it("user can add an exercise to their exercise table", function(){
    driver.get('http://localhost:8080/index.html');
    var exAarray = JSON.stringify([{exercise: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exAarray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=exercise-0]'}).click();
    driver.findElement({id: 'submit-exercise'}).click()

    driver.findElement({id: 'exercise-td'}).getText().then(function functionName(ex){
      assert.equal(ex, "running")
    });
  });

  test.it("user can delete an exercise from their exercise table", function(){
    driver.get('http://localhost:8080/index.html');
    var exAarray = JSON.stringify([{exercise: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exAarray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=exercise-0]'}).click();
    driver.findElement({id: 'submit-exercise'}).click()

    driver.findElement({id: 'exercise-td'}).getText().then(function functionName(ex){
      assert.equal(ex, "running")
    });

    driver.findElement({id: 'trash'}).click()
    var noFood = driver.findElement({id: "daily-exercise"}).innerHTML

    expect(noFood).to.be.empty;
  });

  test.it("when a user add's an exercise the exercise table the calories burned increases", function(){
    driver.get('http://localhost:8080/index.html');
    var exAarray = JSON.stringify([{exercise: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exAarray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=exercise-0]'}).click();
    driver.findElement({id: 'submit-exercise'}).click()

    driver.findElement({id: 'exercise-calorie-total'}).getText().then(function functionName(ex){
      assert.equal(ex, 'Total Calories 100')
    });
  });


  test.it("when a user an exercise to the exercise table your calories burned will go up", function(){
    driver.get('http://localhost:8080/index.html');
    var exAarray = JSON.stringify([{exercise: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exAarray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=exercise-0]'}).click();
    driver.findElement({id: 'submit-exercise'}).click()


    driver.findElement({id: 'remaining-green'}).getText().then(function functionName(ex){
      assert.equal(ex, "100")
    });
  });


});
