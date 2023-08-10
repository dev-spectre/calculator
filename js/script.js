const operation = {
  isDecimalNumber: false,
  firstOperand: null,
  secondOperand: null,
  operator: null,
  isWaitingForSecondOperand: false,
  isResultDisplayed: false,
};

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () =>
    displayNumber(".screen .primary", numberButton.innerText)
  );
});
window.addEventListener("keydown", (event) => {
  if ("1234567890.%".includes(event.key)) displayNumber(".primary", event.key);
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);
window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Backspace") clearDisplay();
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", onDelete);
window.addEventListener("keydown", (event) => {
  if (!event.ctrlKey && event.key === "Backspace") onDelete();
});

const operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
  operator.addEventListener("click", () => onOperatorClick(operator.innerText));
});
window.addEventListener("keydown", (event) => {
  if (event.key === "/") event.preventDefault();
  if ("-+".includes(event.key)) onOperatorClick(event.key);
  if (event.key === "/") onOperatorClick("÷");
  else if (event.key === "*") onOperatorClick("×");
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  const primaryDisplay = document.querySelector(".primary");
  operation.secondOperand = Number(primaryDisplay.innerText);
  operate();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "=") {
    const primaryDisplay = document.querySelector(".primary");
    operation.secondOperand = Number(primaryDisplay.innerText);
    operate();
  }
});

function operate() {
  if (
    operation.firstOperand == null ||
    operation.secondOperand == null ||
    operation.operator == null ||
    operation.isResultDisplayed
  )
    return;

  let result;
  switch (operation.operator) {
    case "÷":
      if (operation.secondOperand === 0) {
        window.open(
          "https://www.youtube.com/watch?v=NKmGVE85GUU&pp=ygUdd2h5IHlvdSBjYW4ndCBkaXZpZGUgYnkgemVybyA%3D",
          "blank"
        );
        result = "Error";
        break;
      }
      result = operation.firstOperand / operation.secondOperand;
      break;
    case "×":
      result = operation.firstOperand * operation.secondOperand;
      break;
    case "-":
      result = operation.firstOperand - operation.secondOperand;
      break;
    case "+":
      result = operation.firstOperand + operation.secondOperand;
      break;
  }

  const primaryDisplay = document.querySelector(".primary");
  const secondaryDisplay = document.querySelector(".secondary");

  primaryDisplay.innerText = result;
  secondaryDisplay.innerText = "";

  operation.secondOperand = null;
  operation.isDecimalNumber = false;
  operation.isResultDisplayed = true;
}

function onOperatorClick(operator) {
  const primaryDisplay = document.querySelector(".primary");
  if (!primaryDisplay.innerText.length || primaryDisplay.innerText === "0")
    return;
  operation.firstOperand = Number(primaryDisplay.innerText);

  const secondaryDisplay = document.querySelector(".secondary");
  secondaryDisplay.innerText = primaryDisplay.innerText.concat(operator);
  secondaryDisplay.scrollLeft = 9999999;
  operation.operator = operator;
  operation.isWaitingForSecondOperand = true;
  operation.isDecimalNumber = false;
  operation.isResultDisplayed = false;
}

function onDelete() {
  const display = document.querySelector(".screen .primary");
  if (display.innerText.length && !operation.isWaitingForSecondOperand) {
    display.innerText = display.innerText.slice(0, -1);
  } else if (
    operation.isWaitingForSecondOperand ||
    (!display.innerText.length && operation.operator)
  ) {
    const secondaryDisplay = document.querySelector(".secondary");
    display.innerText = secondaryDisplay.innerText.slice(0, -1);
    secondaryDisplay.innerText = "";
    operation.operator = null;
    operation.firstOperand = null;
    operation.isWaitingForSecondOperand = false;
  }
  operation.isDecimalNumber = display.innerText.includes(".");
}

function displayNumber(screenQuery, value) {
  const display = document.querySelector(screenQuery);

  if (value === "%" && display.innerText.length) {
    display.innerText = Number(display.innerText) / 100;
    display.scrollLeft = 9999999;
    return;
  }
  if (value === "." && operation.isDecimalNumber) return;
  if (value === ".") operation.isDecimalNumber = true;
  if (display.innerText === "0" || operation.isWaitingForSecondOperand) {
    display.innerText = "";
    operation.isWaitingForSecondOperand = false;
  }
  display.innerText += value;
  display.scrollLeft = 99999999;
}

function clearDisplay() {
  const primaryDisplay = document.querySelector(".screen .primary");
  const secondaryDisplay = document.querySelector(".screen .secondary");
  primaryDisplay.innerText = "0";
  secondaryDisplay.innerText = "";
  operation.isDecimalNumber = false;
  operation.firstOperand = null;
  operation.secondOperand = null;
  operation.operator = null;
  operation.isWaitingForSecondOperand = false;
  operation.isResultDisplayed = false;
}
