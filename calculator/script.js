const btnAll = document.querySelectorAll(".btn-container");
const expressionEl = document.querySelector("#expression");
const outputEl = document.querySelector("#output");

let expression = "";
let output = "";

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
      case "addition":
      case "subtraction":
      case "multiply":
      case "division":
        if (expression === "" && output !== "") {
          startFromOutput(value);
        } else if (expression !== "" && !isLastCharOperator()) {
          addValue(value);
        }
        break;
      case "calculate":
        calculate();
        break;
      case "sign-change":
        signChange();
        break;
      case "percent":
        percentage();
        break;
      case "decimal":
        decimal();
        break;
    }
    updateDisplay(expression, output);
  });
});

function addValue(value) {
  expression += value;
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

function isLastCharOperator() {
  const lastChar = expression.slice(-1);
  return ["+", "-", "*", "/"].includes(lastChar);
}
function startFromOutput(value) {
  expression += output + value;
}

function calculate() {
  output = evaluateExpression();
  expression = "";
}

function evaluateExpression() {
  const evalOutput = eval(expression);
  return isNaN(evalOutput) || !isFinite(evalOutput)
    ? ""
    : evalOutput < 1
    ? parseFloat(evalOutput.toFixed(10))
    : parseFloat(evalOutput.toFixed(2));
}

//nagate the digit like if output is 5, it becomes -5 and If output is -5, it becomes 5
function signChange() {
  if (expression === "" && output !== "") {
    output = -output;
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

function percentage() {
  if (expression !== "") {
    output = evaluateExpression();
    expression = "";

    if (!isNaN(output) && isFinite(output)) {
      output /= 100;
    } else {
      output = "";
    }
  } else if (output !== "") {
    output = parseFloat(output) / 100;
  }
}

function decimal() {
  const lastOperatorIndex = Math.max(
    expression.lastIndexOf("+"),
    expression.lastIndexOf("-"),
    expression.lastIndexOf("*"),
    expression.lastIndexOf("/")
  );

  const currentNumber = expression.slice(lastOperatorIndex + 1);
  if (!currentNumber.includes(".")) {
    // If starting fresh or just pressed an operator, add "0."
    if (expression === "" || isLastCharOperator()) {
      expression += "0.";
    } else {
      expression += ".";
    }
  }
}
