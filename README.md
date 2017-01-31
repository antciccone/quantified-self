# Quantified Self

An application to track daily caloric intake and exercise. Compare calorie intake for each meal to predefined goals.

## Installing

```shell
git clone https://github.com/antciccone/quantified-self.git
npm install
```

## Run the Server

To see your code in action, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

## Run Tests in the Terminal

Tests were written using Selenium. To run all of your tests:

```js
npm test
```

## Features

* User can add foods and calories to a food log and exercises and calories burned to an exercise log
* User can visit daily diary and add foods to specified meal, or exercises to their exercise diary
* Calories are added in the daily diary and compared to a 2000-calorie diet

## Contributing

* If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

## Technology Used

* Chai 3.5.0
* Mocha 3.1.2
* Selenium Webdriver 3.0.1
* jQuery 3.1.1
* Webpack 1.14.0
* Node SASS 4.3.0

## Technical Details

* localStorage to persist data
* Selenium integration tests
* jQuery based DOM traversal
* jQuery based Event handling
* jQuery based State management
* Using pivotal tracker to manage a project with multiple developers
* Using a production git workflow
