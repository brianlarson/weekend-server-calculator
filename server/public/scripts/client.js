// Initialize on load
onReady();
function onReady() {
  getCalculations();
}

// Get our number inputs
const firstNumInput = document.getElementById("firstNumInput");
const secondNumInput = document.getElementById("secondNumInput");

// Get our mathematical sign buttons
let addBtn = document.getElementById("addBtn");
let subtractBtn = document.getElementById("subtractBtn");
let multiplyBtn = document.getElementById("multiplyBtn");
let divideBtn = document.getElementById("divideBtn");

// Make an array of the sign buttons
let signButtons = [addBtn, subtractBtn, multiplyBtn, divideBtn];

// Get <ul> elements where calculations are displayed on the page
let recentResultUl = document.getElementById("recentResult");
let resultHistoryUl = document.getElementById("resultHistory");

// Set result area on first page load
recentResultUl.innerHTML = `
  <li class="list-group-item list-group-item-success h3 fw-bold p-3 text-center">
    &nbsp;
  </li>
`;

// Function used to get calculations from the server and
// render to the DOM
function getCalculations() {
  console.log("Getting calculations...");
  // Send HTTP GET request to the server to get the data
  axios({
    method: "GET",
    url: "/calculations"
  })
    .then((response) => {
      // Request was successful so append data to our list
      // in the DOM
      console.log("GET successful - calculations data from server:", response.data);
      if (response.data.length > 0) {
        renderResultToDom(response.data);
        renderHistoryToDom(response.data);
      } else {
        resultHistoryUl.innerHTML = `
          <li class="list-group-item list-group-item-light">
            <i class="text-secondary">No calculations</i>
          </li>
        `;
      }
    })
    .catch((error) => {
      // There is an error with the request
      console.log("Error with /calculations GET request:", error);
      // TODO: send proper status code?
  });
}

// Function to show result of latest calculation after it's received
// from the server
function renderResultToDom(calculations) {
  console.log("Rendering latest result to DOM...", calculations[0].result);
  // Get latest calc in data (always the last one) and render it formatted with commas
  // * Most recent calc must be last in the array to satisfy tests
  const latestCalc = calculations[calculations.length - 1];
  const result = new Intl.NumberFormat('en-US').format(latestCalc.result);
  recentResultUl.innerHTML = `
    <li class="list-group-item list-group-item-success h3 fw-bold p-3 text-center">
      ${result}
    </li>
  `;
}

// Function for rendering output to the DOM
function renderHistoryToDom(calculations) {
  console.log("Rendering history to DOM...", calculations);

  // Clear the current list before rendering or if empty, show message
  if (calculations.length > 0) {
    resultHistoryUl.innerHTML = "";
  } else {
    resultHistoryUl.innerHTML = `
      <li class="list-group-item list-group-item-light">
        <i class="text-secondary">No calculations</i>
      </li>
    `;
  }

  // Then we loop through calculations and re-render it
  for (const calc of calculations) {
    // Format all numbers to have commas if over 999
    const numOne = new Intl.NumberFormat('en-US').format(calc.numOne);
    const numTwo = new Intl.NumberFormat('en-US').format(calc.numTwo);
    const result = new Intl.NumberFormat('en-US').format(calc.result);
    // Render to DOM
    resultHistoryUl.innerHTML += `
      <li class="list-group-item list-group-item-light">
        ${numOne} ${calc.operator} ${numTwo} = ${result}
      </li>
    `;
  }

}

// Create function to send latest calculation to the server
function postCalculations(event) {
  console.log("Sending calculations to server...");
  // Prevent default behavior since it's a button within a form elem
  event.preventDefault();
  // Create new calculation obj to send to server
  const newCalculation = {
    numOne: Number(firstNumInput.value),
    numTwo: Number(secondNumInput.value),
    operator: getCurrentOperator()
  };
  console.log("newCalculation:", newCalculation);
  axios({
    method: "POST",
    url: "/calculations",
    data: newCalculation
  })
    .then((response) => {
      // Request was successful so send new calculation to the server
      console.log("POST successful - calculations data from server:", response.data);
      // Get latest calculations data and render to DOM
      getCalculations();
    })
    .catch((error) => {
      // There is an error with the request
      console.log("Error with /calculations POST request:", error);
      // TODO: send proper status code?
  });
}

// Create function to handle selecting singular sign buttons
// so the group behaves like a radio button group in a form
function signSelect(event) {
  // Prevent default behavior of button elem
  event.preventDefault();
  // Get button clicked and put its class list in an array
  let button = event.target;
  let buttonClasses = Array.from(button.classList);
  // First we reset ALL buttons in case one is already selected
  resetSignButtons();
  // After resetting all buttons we select the new one
  button.classList.remove("btn-primary");
  button.classList.add("btn-warning");
  button.setAttribute("data-selected", "true");

}

// Create function to reset sign buttons
function resetSignButtons() {
  for (const button of signButtons) {
    // Get class list as an array of button
    const classList = Array.from(button.classList);
    // If any one is selected reset it
    if (classList.includes("btn-warning")) {
      button.classList.remove("btn-warning");
      button.classList.add("btn-primary");
      button.setAttribute("data-selected", "false");
    }
  }
}

// Create function to retrieve the currently selected operator button value
function getCurrentOperator() {
  // Loop through operator buttons and return sign value of the selected one
  for (const button of signButtons) {
    // console.log(`button is:`, button);
    // console.log(`...and [data-selected] is:`, button.getAttribute("data-selected"));
    // console.log(`...and [data-value] is:`, button.getAttribute("data-value"));
    const isSelected = button.getAttribute("data-selected") === "true" ? true : false;
    console.log(`isSelected = `, isSelected);
    if (isSelected) {
      const operatorSign = button.getAttribute("data-value");
      // console.log(`operatorSign is:`, operatorSign);
      return operatorSign;
    }
  }
  // TODO: Add alert if user forgot to select an operator/sign
  // Nothing is selected
  return null;
}