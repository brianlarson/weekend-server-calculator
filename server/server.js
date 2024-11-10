const express = require("express");
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static("server/public"));

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Log latest calculations data
console.log("Calculations is currently:", calculations);

// GET /calculations route
app.get("/calculations", (req, res) => {
  console.log("GET request received…");

  // Return our calculations data set back to the client
  res.send(calculations);
});

// POST /calculations route
app.post("/calculations", (req, res) => {
  console.log("POST request received…");

  // Create new obj from request
  const newCalc = req.body;

  // Create result and make incoming number props integers
  // instead of strings
  let result;
  const num1 = Number(newCalc.numOne);
  const num2 = Number(newCalc.numTwo);
  const operator = newCalc.operator;

  // Perform calculation and set result accordingly
  switch (newCalc.operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      result = NaN;
  }

  // Add result prop to our newCalc obj
  newCalc.result = result;

  // Add our new calculation to the end of the array
  // * Use of unshift() instead of push() makes tests fail
  // * History must be chronological
  calculations.push(newCalc);

  // Log latest calculations data
  console.log("Calculations is now:", calculations);

  // Created successfully so return a 201 http status code
  res.sendStatus(201);

});

// TODO: Create DELETE route to clear all calculations data
// DELETE /calculations route


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5002;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
