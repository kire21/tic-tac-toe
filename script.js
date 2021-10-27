'use strict';

const gameBoard = (() => {
  const X_CLASS = 'x';
  const O_CLASS = 'o';
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let circleTurn;

  const cells = document.querySelectorAll('.cell');
  const winningMessage = document.querySelector('.winning-message');
  const message = document.querySelector('.message');
  // const restart = document.querySelector('.restart');
  const btnRestart = document.querySelector('.btn__restart');
  const btnPlay = document.querySelector('.btn__play');
  const welcome = document.querySelector('.welcome');
  const board = document.querySelector('.board');
  const source = document.querySelector('.source');
  const form = document.querySelector('form');
  const sectionDisplayPlayerNames = document.querySelector(
    '.player__name--score'
  );
  const player1Name = document.querySelector('#player1');
  const player2Name = document.querySelector('#player2');
  const displayPlayer1Name = document.querySelector('.player__one--name');
  const displayPlayer1Score = document.querySelector('.player__one--score');
  const displayPlayer2Name = document.querySelector('.player__two--name');
  const displayPlayer2Score = document.querySelector('.player__two--score');
  const activePlayer = document.querySelector('.active--player');

  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  btnRestart.addEventListener('click', startGame);
  form.addEventListener('submit', play);
  startGame();

  function play(e) {
    e.preventDefault();
    displayPlayer1Name.textContent = `${player1Name.value}`;
    displayPlayer2Name.textContent = `${player2Name.value}`;
    activePlayer.textContent = `${player1Name.value} is your turn`;

    welcome.classList.add('hidden');
    board.classList.remove('hidden');
    source.classList.remove('hidden');
    sectionDisplayPlayerNames.classList.remove('hidden');
  }

  function startGame() {
    circleTurn = false;
    cells.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    winningMessage.classList.remove('show');
  }

  function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
  }

  function endGame(draw) {
    if (draw) {
      message.textContent = `It's draw!`;
    } else {
      message.textContent = `${
        circleTurn ? player2Name.value : player1Name.value
      } is the winner!`;
      circleTurn ? scorePlayer2++ : scorePlayer1++;
      displayPlayer1Score.textContent = `Score: ${scorePlayer1}`;
      displayPlayer2Score.textContent = `Score: ${scorePlayer2}`;
    }
    winningMessage.classList.add('show');
  }

  function isDraw() {
    return [...cells].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      );
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    circleTurn = !circleTurn;
    circleTurn
      ? (activePlayer.textContent = `${player2Name.value} is your turn`)
      : (activePlayer.textContent = `${player1Name.value} is your turn`);
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cells[index].classList.contains(currentClass);
      });
    });
  }
})();
