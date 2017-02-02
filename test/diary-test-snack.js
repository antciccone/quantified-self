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

  test.it("user can add a food to their snack table", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");
    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=food-0]'}).click();
    driver.findElement({id: 'submit-snacks'}).click()

    driver.findElement({id: '02/01/2017-apple-td'}).getText().then(function functionName(food){
      assert.equal(food, "apple")
    });
  });

  test.it("user can delete a food from their snack table", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=food-0]'}).click();
    driver.findElement({id: 'submit-snacks'}).click()

    driver.findElement({id: '02/01/2017-apple-td'}).getText().then(function functionName(food){
      assert.equal(food, "apple")
    });

    driver.findElement({id: 'trash'}).click()
    var noFood = driver.findElement({id: "b-body"}).innerHTML

    expect(noFood).to.be.empty;
  });

  test.it("when a user adds a food to snack the total calories for the snack table increase by calorie amount", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=food-0]'}).click();
    driver.findElement({id: 'submit-snacks'}).click()

    driver.findElement({id: 'snacksTable-calories-total-td'}).getText().then(function functionName(food){
      assert.equal(food, "100")
    });
  });

  test.it("when a user adds a food to snack the remaining calories decrease by calorie amount", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=food-0]'}).click();
    driver.findElement({id: 'submit-snacks'}).click()

    driver.findElement({id: 'snacksTable-remaining-total'}).getText().then(function functionName(food){
      assert.equal(food, "100")
    });
  });

  test.it("when a user adds a food to snack your total daily calories table changes", function(){
    driver.get('http://localhost:8080/index.html');
    var foodArray = JSON.stringify([{food: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=food-0]'}).click();
    driver.findElement({id: 'submit-snacks'}).click()

    driver.findElement({id: 'remaining-green'}).getText().then(function functionName(food){
      assert.equal(food, "1900")
    });
    driver.findElement({id: 'cal-consumed'}).getText().then(function functionName(food){
      assert.equal(food, "100")
    });
  });


});
