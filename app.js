/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get 
added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's 
the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added 
to his GLOBAL score. After that, 
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//
// ─── INITIALIZE ─────────────────────────────────────────────────────────────────
//

var scores, roundScore, activePlayer, gameEnd, endCondition;
initNewGame();

//
// ─────────────────────────────────────────────────────────── END INITIALIZE ─────
//

//
// ─── FUNCITON ───────────────────────────────────────────────────────────────────
//

function changeActivePlayer() {
     activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
     document.querySelector(".player-0-panel").classList.toggle("active");
     document.querySelector(".player-1-panel").classList.toggle("active");
     document.querySelector(".dice").style.display = "none";
}

function updateScore() {
     // 1. update score
     scores[activePlayer] = scores[activePlayer] + roundScore;
     document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

     // 2. reset player's current score
     roundScore = 0;
     document.querySelector("#current-" + activePlayer).textContent = 0;
}

function initNewGame() {
     // reset global variables
     scores = [0, 0];
     roundScore = 0;
     activePlayer = 0;
     gameEnd = false;
     endCondition = 10;

     // reset dice
     document.querySelector(".dice").style.display = "none";

     // reset UI
     document.getElementById("score-0").textContent = "0";
     document.getElementById("score-1").textContent = "0";
     document.getElementById("current-0").textContent = "0";
     document.getElementById("current-1").textContent = "0";
     document.querySelector("#name-0").textContent = "Player 1";
     document.querySelector("#name-1").textContent = "Player 2";
     document.querySelector(".player-0-panel").classList.remove("active");
     document.querySelector(".player-1-panel").classList.remove("active");
     document.querySelector(".player-0-panel").classList.remove("winner");
     document.querySelector(".player-1-panel").classList.remove("winner");
     document.querySelector(".player-0-panel").classList.add("active");
}
//
// ───────────────────────────────────────────────────────────── END FUNCTION ─────
//

//
// ─── CALLBACK ───────────────────────────────────────────────────────────────────
//

document.querySelector(".btn-roll").addEventListener("click", function() {
     // 0. if game is ended, return
     if (gameEnd) return;

     // 1. generate a random number
     var dice, current, diceDOM;
     dice = Math.floor(Math.random() * 6) + 1;
     current = document.querySelector("#current-" + activePlayer);
     diceDOM = document.querySelector(".dice");

     // 2. display result image
     current.textContent = dice + 1;
     diceDOM.style.display = "block";
     diceDOM.src = "/asset/dice-" + dice + ".png";

     // 3. update round score if the number != 1
     if (dice !== 1) {
          // add score
          roundScore += dice;
          current.textContent = roundScore;
     }

     // 4. if the number == 1, discard all the score earned and switch player's turn
     else {
          // update player's score
          roundScore = 0; // discard any score earned this turn
          updateScore();

          // change active player
          changeActivePlayer();
     }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
     // 1. if game ended, return
     if (gameEnd) return;

     // 2. Update player's score and UI
     updateScore();

     // 3. Check if final score is defined
     var finalScore = document.querySelector(".final-score").nodeValue;
     if (finalScore) endCondition = finalScore;

     // 4. if current player score < endCondition, switch to other
     // player's turn, else anounce the winner and stop the game
     if (scores[activePlayer] >= endCondition) {
          gameEnd = true;
          document.querySelector(".dice").style.display = "none";
          document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
          document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
          document.querySelector("#name-" + activePlayer).textContent = "Winner";
     } else changeActivePlayer();
});

document.querySelector(".btn-new").addEventListener("click", initNewGame);
//
// ───────────────────────────────────────────────────────────────── CALLBACK ─────
//
