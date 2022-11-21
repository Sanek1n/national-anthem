
import { Game } from "./game.js";

let gameArray = [];
let currentArea = 0;

for(let i = 0; i < 6; i++) {
  gameArray.push(Math.floor(Math.random() * ((9-i) + 1)));
}

console.log(gameArray)
const mainGame = new Game(currentArea, gameArray);
mainGame.initGame();
