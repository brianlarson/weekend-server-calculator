// Initialize on load
onReady();

function onReady() {
  getCalculations();
}

// Get our mathematical sign buttons
let addBtn = document.getElementById("addBtn");
let subtractBtn = document.getElementById("subtractBtn");
let multiplyBtn = document.getElementById("multiplyBtn");
let divideBtn = document.getElementById("divideBtn");

// Make an array of the sign buttons
let signButtons = [addBtn, subtractBtn, multiplyBtn, divideBtn];

// Get <ul> elements where calculations are displayed on the page
let recentResultSection = document.getElementById("recentResultUl");
let resultHistorySection = document.getElementById("resultHistoryUl");

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
      console.log("Calculations data from server:", response.data);
      renderHistoryToDom(response.data);
    })
    // Error with the request
    // TODO: send proper status code
    .catch((error) => {
      console.log("Error with /calculations GET request:", error);
  });
}

// Function for rendering output to the DOM
function renderHistoryToDom(calculations) {
  console.log("Rendering to DOM...");
  // First we clear the current list
  resultHistorySection.innerHTML = "";
  // Then we loop through calculations and re-render it
  for (const calc of calculations) {
    resultHistorySection.innerHTML += `
      <li class="list-group-item list-group-item-light">
        ${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}
      </li>
    `;
  }
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