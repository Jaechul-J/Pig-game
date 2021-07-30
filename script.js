'use strict';

// Selecting elements
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.querySelector('#score--1');
const current0Elm = document.querySelector('#current--0');
const current1Elm = document.querySelector('#current--1');

const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;

  diceElm.classList.add('hidden');
  player0Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--winner');
  player0Elm.classList.add('player--active');
  player1Elm.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elm.classList.toggle('player--active');
  player1Elm.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElm.classList.remove('hidden');
    diceElm.src = `dice-${dice}.png`;
    // 3. Check for rolled: 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Initialize currentScore to 0, Switch to next player
      switchPlayer();
    }
  }
});

// Holding functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100, finish the game
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceElm.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // Switch to next player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
