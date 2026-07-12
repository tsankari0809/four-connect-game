const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "blue";
let gameOver = false;

const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
  boardElement.innerHTML = "";
  board = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", handleClick);
      boardElement.appendChild(cell);
      row.push("");
    }
    board.push(row);
  }
}

function handleClick(e) {
  if (gameOver) return;

  let col = parseInt(e.target.dataset.col);

  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === "") {
      board[r][col] = currentPlayer;
      updateBoard();

      if (checkWin(r, col)) {
        statusText.innerText = currentPlayer.toUpperCase() + " Player Wins! 🎉";
        highlightWin(r, col);
        alert(currentPlayer.toUpperCase() + " Player Wins!");
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "blue" ? "white" : "blue";
        statusText.innerText =
          currentPlayer.toUpperCase() + " Player's Turn";
      }
      break;
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    let r = parseInt(cell.dataset.row);
    let c = parseInt(cell.dataset.col);

    cell.classList.remove("blue", "white");

    if (board[r][c]) {
      cell.classList.add(board[r][c]);
    }
  });
}

function checkDirection(r, c, dr, dc) {
  let cells = [];
  let player = board[r][c];

  for (let i = -3; i <= 3; i++) {
    let nr = r + dr * i;
    let nc = c + dc * i;

    if (
      nr >= 0 && nr < ROWS &&
      nc >= 0 && nc < COLS &&
      board[nr][nc] === player
    ) {
      cells.push([nr, nc]);
      if (cells.length === 4) return cells;
    } else {
      cells = [];
    }
  }
  return null;
}

function checkWin(r, c) {
  return (
    checkDirection(r, c, 0, 1) ||
    checkDirection(r, c, 1, 0) ||
    checkDirection(r, c, 1, 1) ||
    checkDirection(r, c, 1, -1)
  );
}

function highlightWin(r, c) {
  let winCells =
    checkDirection(r, c, 0, 1) ||
    checkDirection(r, c, 1, 0) ||
    checkDirection(r, c, 1, 1) ||
    checkDirection(r, c, 1, -1);

  if (winCells) {
    const allCells = document.querySelectorAll(".cell");
    winCells.forEach(([row, col]) => {
      allCells[row * COLS + col].classList.add("win");
    });
  }
}

function restartGame() {
  currentPlayer = "blue";
  gameOver = false;
  statusText.innerText = "Blue Player's Turn";
  createBoard();
}

createBoard();