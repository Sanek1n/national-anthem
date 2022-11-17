let playerScore;

if (localStorage.getItem('score')) {
  playerScore = JSON.parse(localStorage.getItem('score'));
};

for (let i = 0; i < playerScore.length; i++) {
  document.querySelector(`.score-${i}`).textContent = playerScore[i];
}

let sum = playerScore.reduce((sum, val) => sum + val, 0);
document.querySelector('.score-5').textContent = sum;
