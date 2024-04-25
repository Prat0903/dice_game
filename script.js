'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // We can also select an element by id using getElementById() method.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let globalScores, currentScore, activePlayer, playing; // State variables

// Starting conditions
const init = function () {
    globalScores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Role the dice
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `Dice-${diceRoll}.png`;

        // 3. Check for rolled 1: 
        if (diceRoll !== 1) {
            // Adding dice roll to current score  
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
})

// Holding score functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's global score
        globalScores[activePlayer] += currentScore; // This is same as: globalScores[0] = globalScores[0] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = globalScores[activePlayer];

        // 2. Check if player's score is >= 100
        if (globalScores[activePlayer] >= 100) {
            // If yes, then finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // If no, switch to next player
            switchPlayer();
        }
    }
})

// Resetting game functionality
btnNew.addEventListener('click', init)