'use strict';

// Selecting elements
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

// Starting conditions
score0Elm.textContent = 0;
score1Elm.textContent = 0;
diceEl.classList.add('hidden');
