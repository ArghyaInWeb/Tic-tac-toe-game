const body = document.querySelector("body");
const wrapper = document.querySelector(".wrapper");
const theme = document.querySelector("#theme");
const cells = document.querySelectorAll(".cells");
const X_SVG = '<img src="assets/cross.svg" height="70px" alt="" />';
const O_SVG = '<img src="assets/circle-ring.svg" height="50px" alt="" />';

const newSpan = document.createElement("span");
const newImg = document.createElement("img");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let gameStarted = false;

let player1Wins = 0;
let player2Wins = 0;
let player1Loss = 0;
let player2Loss = 0;
let tie = 0;

theme.addEventListener("click", (e) => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    theme.innerHTML = '<img src="assets/dark-mode.svg">';
  } else {
    theme.innerHTML = '<img src="assets/light-mode.svg">';
  }
});

const start = document.querySelector(".start");
start.addEventListener("click", startGame);

//? Function: Start the Game
function startGame() {
  resetBoard();
  gameStarted = true;

  // checkOverwrite(index)
}

const reset = document.querySelector(".reset");
reset.addEventListener("click", resetBoard);

//? Function: Reset Board
function resetBoard() {
  currentPlayer = "X";
  gameOver = false;
  board = Array(9).fill("");

  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("win");
  });
}

//? Function: Prevent Overwriting cells
function checkOverwrite(index) {
  return board[index] !== "";
}

//? Function: Check Win
function checkWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    if (pattern.every((index) => board[index] === player)) {
      pattern.forEach((index) => {
        cells[index].classList.add("win");
      });
      return true;
    }
  }

  return false;
}

function updateScore(player) {
  const winPlayer1 = document.querySelector("#player1-wins");
  const lossPlayer1 = document.querySelector("#player1-loss");
  const winPlayer2 = document.querySelector("#player2-wins");
  const lossPlayer2 = document.querySelector("#player2-loss");

  if (player === "X") {
    player1Wins++;
    player2Loss++;
    winPlayer1.innerHTML = ` ${player1Wins}`;
    lossPlayer2.innerHTML = ` ${player2Loss}`;
  } else if (player === "O") {
    player2Wins++;
    player1Loss++;
    winPlayer2.innerHTML = ` ${player2Wins}`;
    lossPlayer1.innerHTML = ` ${player1Loss}`;
  }
}
const draws = document.querySelectorAll(".draws");
//? Function: Check Draw
function checkTie() {
  return board.every((cell) => cell !== "");
}

const activeTurn = document.querySelector(".active-turn");
const spanInActiveTurn = activeTurn.querySelector("span");
const imgInActiveTurn = activeTurn.querySelector("img");

//? Function: Show Turn Message
function showTurnMessage(player) {
  newSpan.innerHTML = player === "X" ? "Player 1" : "Player 2";
  newImg.src = player === "X" ? "assets/cross.svg" : "assets/circle-ring.svg";

  spanInActiveTurn.replaceWith(newSpan);
  imgInActiveTurn.replaceWith(newImg);
}

//? Function: Show Winner
function showWinner(player) {
  const winningMsg = document.querySelector(".winning-msg");
  const spanInWinningMsg = winningMsg.querySelector("span");
  spanInWinningMsg.innerHTML = player === "X" ? `Player 1 Won` : `Player 2 Won`;

  winningMsg.classList.toggle("win-alert-in");

  setTimeout(() => {
    winningMsg.classList.toggle("win-alert-in");
  }, 3000);
}

//? Function: Show Draw
function showDrawMsg() {
  const winningMsg = document.querySelector(".winning-msg");
  const originalHTML = winningMsg.innerHTML;

  winningMsg.innerHTML = "Round Draw";
  winningMsg.classList.toggle("win-alert-in");

  setTimeout(() => {
    winningMsg.classList.toggle("win-alert-in");
    winningMsg.innerHTML = originalHTML;
  }, 3000);
}

//? Function: Show New Round
// function showNewRoundMsg() {

//   setTimeout(() => {
//     startGame();
//   }, 5000);
// }

function showNewRoundMsg() {
  console.log("new Round");
  const roundMsg = document.querySelector(".next-round-msg");
  let countdown = 4;

  roundMsg.classList.add("new-round-popup");
  roundMsg.innerText = `New round starting in ${countdown}s...`;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      roundMsg.innerText = `New round starting in ${countdown}s...`;
    } else {
      clearInterval(interval);
      roundMsg.innerText = ""; // clear message
      roundMsg.classList.remove("new-round-popup");
      startGame(); // Start new round
    }
  }, 1000);
}

//? Event Listener for Cell Clicks
cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const index = Number(cell.dataset.index);

    if (!gameStarted) {
      alert("start the game");
      return;
    }

    if (checkOverwrite(index)) {
      const gameBoard = document.querySelector(".game-board");
      gameBoard.classList.add("shake");

      setTimeout(() => {
        gameBoard.classList.remove("shake");
      }, 400);
      return;
    }

    board[index] = currentPlayer;
    cell.innerHTML = currentPlayer === "X" ? X_SVG : O_SVG;

    if (checkWin(currentPlayer)) {
      gameOver = true;
      updateScore(currentPlayer);
      showWinner(currentPlayer);
      showNewRoundMsg();
    } else if (checkTie()) {
      gameOver = true;
      tie++;
      draws.forEach((draw) => {
        draw.innerHTML = `Draw ${tie}`;
      });
      showDrawMsg();
      showNewRoundMsg();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      showTurnMessage(currentPlayer);
    }
  });
});
