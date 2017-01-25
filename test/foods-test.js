var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing foods.html', function() {
  var driver;
  this.timeout(10000);

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

    driver.getElementsByTagName("td").getText().then(function functionName(food){
      assert.equal(food, "apple")
    });
  });

});
