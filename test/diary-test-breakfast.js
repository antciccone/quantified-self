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


  test.it("user should see list of foods in food table", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}, {food: 'pear', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'food-td'}).getText().then(function functionName(food){
      assert.equal(food, "apple")
    });
    driver.findElement({id: 'calories-td'}).getText().then(function functionName(cal){
      assert.equal(cal, "100")
    });
  });

});
