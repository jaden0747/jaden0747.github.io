/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, 
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* -------------------------------- variable -------------------------------- */
var scores, roundScore, activePlayer, dice, end;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
end = false;

/* -------------------------------- function -------------------------------- */

function rollDice() {
     if (!end) {
          dice = Math.floor(Math.random() * 6) + 1;
          setImage(".dice", dice);
          if (dice != 1) roundScore += dice;
          else {
               roundScore = 0;
               document.querySelector("#score-" + activePlayer).textContent = roundScore;
               updateScore();
          }
          document.querySelector("#score-" + activePlayer).textContent = roundScore;
     }
}

function updateScore() {
     if (!end) {
          scores[activePlayer] += roundScore;
          roundScore = 0;
          if (scores[activePlayer] > 100) {
               scores[activePlayer] = 100;
               end = true;
          }
          document.querySelector("#current-" + activePlayer).textContent = scores[activePlayer];
          document.querySelector("#score-" + activePlayer).textContent = 0;
          document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
          activePlayer = 1 - activePlayer;
          document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
     }
}

function reset() {
     if (document.querySelector("#score-" + activePlayer).textContent >= 100) activePlayer = 1 - activePlayer;
     //reset statistic
     document.querySelector("#current-0").textContent = 0;
     document.querySelector("#score-0").textContent = 0;
     document.querySelector("#current-1").textContent = 0;
     document.querySelector("#score-1").textContent = 0;
     document.querySelector(".dice").style.display = "none";
     end = false;
}

function setImage(att, val) {
     document.querySelector(att).style.display = "block";
     document.querySelector(att).src = "asset/dice-" + val + ".png";
}

/* --------------------------------- script --------------------------------- */
document.querySelector(".dice").style.display = "none";
document.querySelector(".btn-roll").addEventListener("click", rollDice);
document.querySelector(".btn-hold").addEventListener("click", updateScore);
document.querySelector(".btn-new").addEventListener("click", reset);
