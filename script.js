'use strict';

let New_game = document.querySelector('.btn--new');
let Btn_roll = document.querySelector('.btn--roll');
let Hold = document.querySelector('.btn--hold');

let Player_1 = document.querySelector('.player--0');
let Player_2 = document.querySelector('.player--1');

let Score_1 = document.querySelector('#score--0');
let Score_2 = document.querySelector('#score--1');

Score_1.textContent = 0;
Score_2.textContent = 0;

let Dice = document.querySelector('.dice');
Dice.classList.add('hidden'); // hidden dice at the beginning

let Current_1 = document.querySelector('#current--0');
let Current_2 = document.querySelector('#current--1');

let Current_Score = 0;
let Active_Player = 0;
let Scores = [0, 0];
let Playing = true;

// flip color of player idx and idx ^ 1 (other player) and switch player
const flip_color = function (idx) {
  document.querySelector(`.player--${idx}`).classList.toggle('player--active');
  document
    .querySelector(`.player--${idx ^ 1}`)
    .classList.toggle('player--active');
};

// roll dice
Btn_roll.addEventListener('click', function () {
  if (!Playing) return;
  let Dice_Number = Math.trunc(Math.random() * 6) + 1;
  Dice.classList.remove('hidden');
  Dice.src = `dices/dice-${Dice_Number}.png`;

  if (Dice_Number !== 1) {
    Current_Score += Dice_Number;
    document.getElementById(`current--${Active_Player}`).textContent =
      Current_Score;
  } else {
    Current_Score = 0;
    document.getElementById(`current--${Active_Player}`).textContent =
      Current_Score;
    Active_Player ^= 1; // switch player
    flip_color(Active_Player);
  }
});

// update score of player idx and switch player
const updateScore = function (idx) {
  Scores[idx] += Current_Score;
  Current_Score = 0;
  if (!idx) {
    Score_1.textContent = Scores[0];
    Current_1.textContent = Current_Score;
  } else {
    Score_2.textContent = Scores[1];
    Current_2.textContent = Current_Score;
  }

  Active_Player ^= 1;

  if (Scores[idx] >= 100) {
    document.querySelector(`.player--${idx}`).classList.add('player--winner');
    document
      .querySelector(`.player--${idx}`)
      .classList.remove('player--active');
    Playing = false;
    return;
  }
};

Hold.addEventListener('click', function () {
  if (Playing) {
    flip_color(Active_Player);
    updateScore(Active_Player);
  } else {
    alert('Game Over');
  }
});

// reset game to initial state
New_game.addEventListener('click', function () {
  Playing = true;
  Scores = [0, 0];
  Current_Score = 0;
  Active_Player = 0;
  Dice.classList.add('hidden');
  Player_1.classList.remove('player--winner');
  Player_2.classList.remove('player--winner');
  Player_1.classList.add('player--active');
  Player_2.classList.remove('player--active');
  Score_1.textContent = Score_2.textContent = 0;
  Current_1.textContent = Current_2.textContent = 0;
});
