
let addBtn = document.getElementById("addBtn");
let subtractBtn = document.getElementById("subtractBtn");
let multiplyBtn = document.getElementById("multiplyBtn");
let divideBtn = document.getElementById("divideBtn");

let signButtons = [addBtn, subtractBtn, multiplyBtn, divideBtn];

function handleSignSelect(event) {
  event.preventDefault();
  let button = event.target;
  let buttonClasses = Array.from(button.classList);
  let lastSelected;
  for (const className of buttonClasses) {
    switch (className) {
      case "btn-primary":
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
        button.setAttribute("data-selected", "true");
        lastSelected = button.id;
        break;
      case "btn-success":
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");
        button.setAttribute("data-selected", "false");
        break;
    }
  }
  // for (const button of signButtons) {
  //   console.log(button.getAttribute("data-selected"));
  // }
}