const btnAll = document.querySelectorAll(".btn-container");
const expressionEl = document.querySelector("#expression");
const outputEl = document.querySelector("#output");

let expression = "";
let output = "";
let operation = null;

const displayOutput = document.getElementById("output");

btnAll.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const value = e.target.dataset.value;
    console.log(action);

    switch (action) {
      case "digit":
        addValue(value);
        break;
      case "clear":
        clear();
        break;
      case "backspace":
        backspace();
        break;
      case "operator":
        if (operation === "+") {
        }
    }
    updateDisplay(expression, output);
  });
});

function addValue(value) {
  expression += value;
  //   output += value;
  console.log(expression);
}

function updateDisplay(expression, output) {
  expressionEl.textContent = expression;
  outputEl.textContent = output;
}

function clear() {
  expression = "";
  output = "";
}

function backspace() {
  expression = expression.slice(0, -1);
}
