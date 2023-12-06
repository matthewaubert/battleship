import Player from './classes/player.js';
import Gameboard from './classes/gameboard.js';
import Ship from './classes/ship.js';
import Game from './game.js';
import dom from './dom.js';
import {
  renderGrids,
  renderFleet,
  renderAttack,
  renderGameOver,
} from './render.js';

document.addEventListener('DOMContentLoaded', initGame);

// game loop
function initGame() {
  // create user and AI Players, each with a Gameboard
  const game = new Game(Player, Gameboard);
  // render grids
  renderGrids(game);
  // place fleets
  Game.placeFleet(Ship, game.player1);
  Game.placeFleet(Ship, game.player2);
  // render user fleet
  renderFleet(game.player1);

  game.startGame(Player, dom, renderAttack, renderGameOver);
}
