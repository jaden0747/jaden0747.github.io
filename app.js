/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* -------------------------------- variable -------------------------------- */
var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 1;

/* -------------------------------- function -------------------------------- */

function rollDice() {
     dice = Math.floor(Math.random() * 6) + 1;
     setImage(".dice", dice);
     document.querySelector("#score-" + activePlayer).textContent = dice;
     if (dice != 1) roundScore += dice;
     else {
          roundScore = 0;
          updateScore();
     }
}

function updateScore() {
     scores[activePlayer] += roundScore;
     document.querySelector("#current-" + activePlayer).textContent = scores[activePlayer];
     activePlayer = 1 - activePlayer;
}

function setImage(att, val) {
     document.querySelector(att).style.display = "block";
     document.querySelector(att).src = "asset/dice-" + val + ".png";
}

/* --------------------------------- script --------------------------------- */
document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", rollDice);
document.querySelector(".btn-hold").addEventListener("click", updateScore);
