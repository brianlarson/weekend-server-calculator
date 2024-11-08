
// Get our mathematical sign buttons
let addBtn = document.getElementById("addBtn");
let subtractBtn = document.getElementById("subtractBtn");
let multiplyBtn = document.getElementById("multiplyBtn");
let divideBtn = document.getElementById("divideBtn");

// Make an array of the sign buttons
let signButtons = [addBtn, subtractBtn, multiplyBtn, divideBtn];

// Create function to handle selecting singular sign buttons
// so the group behaves like a radio button group in a form
function handleSignSelect(event) {

  // Prevent default behavior of button elem
  event.preventDefault();

  // Get button clicked and put its class list in an array
  let button = event.target;
  let buttonClasses = Array.from(button.classList);

  // First we reset ALL buttons in case one is already selected
  resetSignButtons();

  // After resetting all buttons we select the new one
  button.classList.remove("btn-primary");
  button.classList.add("btn-success");
  button.setAttribute("data-selected", "true");

}

// Create function to reset sign buttons
function resetSignButtons() {
  for (const button of signButtons) {
    // Get class list as an array of button
    const classList = Array.from(button.classList);
    // If any one is selected reset it
    if (classList.includes("btn-success")) {
      button.classList.remove("btn-success");
      button.classList.add("btn-primary");
      button.setAttribute("data-selected", "false");
    }
  }
}