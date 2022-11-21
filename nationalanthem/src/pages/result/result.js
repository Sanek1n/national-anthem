let playerScore;

if (localStorage.getItem('score')) {
  playerScore = JSON.parse(localStorage.getItem('score'));
};

for (let i = 0; i < playerScore.length; i++) {
  document.querySelector(`.score-${i}`).textContent = playerScore[i];
}

let sum = playerScore.reduce((sum, val) => sum + val, 0);
document.querySelector('.score-6').textContent = sum;

if (sum === 30) {
  document.querySelector('.main__title').textContent = 'Поздравляю!!! Максимальный результат!';
  document.querySelector('.main__repeat').textContent = 'Вы гений?!';
} else if(sum <= 29 && sum >= 20) {
  document.querySelector('.main__title').textContent = 'Поздравляю!!! Отличный результат.';
  document.querySelector('.main__repeat').textContent = 'Попробуйте еще раз.';
} else if(sum <= 19 && sum >= 11) {
  document.querySelector('.main__title').textContent = 'Поздравляю!!! Хороший результат.';
  document.querySelector('.main__repeat').textContent = 'Попробуйте еще раз.';
} else {
  document.querySelector('.main__title').textContent = 'Поздравляю!!! Видимо, это не ваше.';
  document.querySelector('.main__repeat').textContent = 'Может попробуете еще раз?';
}ж


