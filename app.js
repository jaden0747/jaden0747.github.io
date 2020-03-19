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

/* --------------------------------- script --------------------------------- */
document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {
     if (!end) {
          dice = Math.floor(Math.random() * 6) + 1;
          document.querySelector(".dice").style.display = "block";
          document.querySelector(".dice").src = "asset/dice-" + dice + ".png";
          if (dice != 1) {
               roundScore += dice;
               document.querySelector("#score-" + activePlayer).textContent = roundScore;
          } else {
               roundScore = 0;
               document.querySelector("#score-" + activePlayer).textContent = roundScore;
               document.querySelector("#current-" + activePlayer).textContent = scores[activePlayer];
               document.querySelector("#score-" + activePlayer).textContent = 0;
               document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
               activePlayer = 1 - activePlayer;
               document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
          }
     }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
     if (!end) {
          scores[activePlayer] += roundScore;
          roundScore = 0;
          if (scores[activePlayer] > 30) {
               scores[activePlayer] = 30;
               end = true;
               alert("player " + activePlayer + " win!");
          }
          document.querySelector("#current-" + activePlayer).textContent = scores[activePlayer];
          document.querySelector("#score-" + activePlayer).textContent = 0;
          document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
          activePlayer = 1 - activePlayer;
          document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
     }
});

document.querySelector(".btn-new").addEventListener("click", function() {
     if (document.querySelector("#score-" + activePlayer).textContent >= 100) {
          activePlayer = 1 - activePlayer;
     }
     //reset statistic
     document.querySelector("#current-0").textContent = 0;
     document.querySelector("#score-0").textContent = 0;
     document.querySelector("#current-1").textContent = 0;
     document.querySelector("#score-1").textContent = 0;
     document.querySelector(".dice").style.display = "none";
     end = false;
});
