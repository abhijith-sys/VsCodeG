const BOARD_SIZE = 3;
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
let currentPlayer = X_CLASS;
let isGameActive = true;

startGame();

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.classList.remove('occupied');
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  setBoardHoverClass();
  result.innerText = '';
  isGameActive = true;
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
  markCell(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function markCell(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.classList.add('occupied');
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  board.classList.add(currentPlayer);
}

function checkWin(currentClass) {
  return WINNING_COMBOS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  isGameActive = false;
  if (draw) {
    result.innerText = 'Draw!';
  } else {
    result.innerText = `${currentPlayer === X_CLASS ? "X's" : "O's"} Wins!`;
  }
}

restartButton.addEventListener('click', startGame);
