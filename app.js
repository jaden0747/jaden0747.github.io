/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, 
it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//
// ─── INITIALIZE ─────────────────────────────────────────────────────────────────
//

// eslint-disable-next-line no-unused-vars
var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";

//
// ─────────────────────────────────────────────────────────── END INITIALIZE ─────
//

//
// ─── CALLBACK ───────────────────────────────────────────────────────────────────
//

document.querySelector(".btn-roll").addEventListener("click", function () {
     // 1. generate a random number
     var dice = Math.floor(Math.random() * 6) + 1;
     var current = document.querySelector("#current-" + activePlayer);
     var image = document.querySelector(".dice");

     // 2. display result image
     current.textContent = dice + 1;
     image.display = "block";
     image.src = "/asset/dice-" + dice + ".png";
     // 3. update round score if the number != 1
     if (dice !== 1) {
          roundScore += dice;
          current.textContent = roundScore;
     }
     // 4. if the number == 1, discard all the score earned and switch player's turn
     else {
          // reset round score
          roundScore = 0;
          current.textContent = roundScore;
          // switch player's turn
          activePlayer = 1 - activePlayer;
     }
});
//
// ───────────────────────────────────────────────────────────────── CALLBACK ─────
//
