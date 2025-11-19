const SELECTIONS = [
  { name: "rock", emoji: "👊", beats: "scissors" },
  { name: "paper", emoji: "✋", beats: "rock" },
  { name: "scissors", emoji: "✌️", beats: "paper" },
];

const selectionBtns = document.querySelectorAll("[data-selection]");
const playerScore = document.querySelector("[data-selection-playerScore]");
const computerScore = document.querySelector("[data-selection-computerScore]");
const result = document.querySelector(".result");

const playerEl = document.querySelector(".player");
const computerEl = document.querySelector(".computer");
const boardEl = document.querySelector(".board");

selectionBtns.forEach((btns) => {
  btns.addEventListener("click", () => {
    const selectionName = btns.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    isSelection(selection);
  });
});

function isSelection(selection) {
  const computerSelection = randomSelection();
  const playerWinner = determineWinner(selection, computerSelection);
  const computerWinner = determineWinner(computerSelection, selection);

  playerEl.querySelectorAll("div").forEach((div) => div.remove());
  computerEl.querySelectorAll("div").forEach((div) => div.remove());

  render(computerSelection, computerWinner, computerEl);
  render(selection, playerWinner, playerEl);
  displayResult(playerWinner, computerWinner);

  if (playerWinner) incrementScore(playerScore);
  if (computerWinner) incrementScore(computerScore);
  displayResult(playerWinner, computerWinner);

  console.log(computerWinner);
}

function incrementScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
}

function render(selection, winner, targetElement) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  if (winner) div.classList.add("winner");

  targetElement.appendChild(div);
}

function displayResult(playerWin, computerWin) {
  boardEl.innerHTML = "";
  const resultDiv = document.createElement("div");
  if (playerWin) {
    resultDiv.innerText = "🎉 You Win!";
    resultDiv.style.color = "green";
  } else if (computerWin) {
    resultDiv.innerText = "😢 You Lose!";
    resultDiv.style.color = "red";
  } else {
    resultDiv.innerText = "🤝 Draw!";
    resultDiv.style.color = "orange";
  }

  boardEl.appendChild(resultDiv);
}

function determineWinner(selection, comSelection) {
  return selection.beats === comSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
