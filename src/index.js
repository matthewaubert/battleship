import Player from './classes/player.js';
import Gameboard from './classes/gameboard.js';
import Ship from './classes/ship.js';
import Game from './game.js';
import initSetup from './setup.js';
import { renderGrid, hideSetup, renderFleet } from './render.js';

document.addEventListener('DOMContentLoaded', initGame);

// game loop
async function initGame() {
  // create user and AI Players, each with a Gameboard
  const game = new Game(Player, Gameboard);

  // init setup
  renderGrid(game.player1, 'setup');
  await initSetup(Ship, game.player1.gameboard);
  hideSetup();

  // render grids
  renderGrid(game.player2, 'ai');
  renderGrid(game.player1, 'user');
  // place ai fleet
  game.player2.gameboard.placeFleet(Ship);
  // render user fleet
  renderFleet(game.player1);

  game.startGame(Player);
}
