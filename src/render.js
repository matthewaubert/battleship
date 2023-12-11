import dom from './dom.js';
import { kebabize } from './helpers.js';

// for given Player, render 10x10 grid of cells on given gameboard display
function renderGrid(player, elName) {
  // for each Cell in Player Gameboard
  player.gameboard.boardData.forEach((cell, i) => {
    // create a new div with 'cell' class and data-index
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = i;
    div.style.gridRow = Math.floor(i / player.gameboard.gridSize) + 1;
    div.style.gridColumn = (i % player.gameboard.gridSize) + 1;

    // add div to appropriate gameboard display
    dom[elName].gameboardDisplay.appendChild(div);
  });
}

// hide initial setup screen
function hideSetup() {
  dom.setup.display.classList.add('hidden');
}

// render all given Player's Ships to user gameboard display
function renderFleet(player) {
  player.gameboard.ships.forEach((ship) => {
    renderShip(ship, player.gameboard, 'user');
  });
}

// render given Ship to user gameboard display
function renderShip(ship, gameboard, elName) {
  // find index of first Cell that contains Ship
  let startIndex;
  for (let i = 0, n = gameboard.boardData.length; i < n; i++) {
    const cell = gameboard.boardData[i];
    if (cell.ship && cell.ship.name === ship.name) {
      startIndex = i;
      break;
    }
  }

  // create ship element and append to gameboard display
  dom[elName].gameboardDisplay.append(createShipElem(ship, startIndex));
}

// create ship HTML element
// input: ship, start index
// output: HTML element
function createShipElem(ship, startIndex) {
  // create ship element
  const shipElem = document.createElement('div');
  shipElem.classList.add('ship');
  shipElem.id = kebabize(ship.name);
  shipElem.draggable = true;

  // calc grid-area of ship element
  switch (ship.orientation) {
    case 'horizontal':
      shipElem.style.gridRowStart = Math.floor(startIndex / 10) + 1;
      shipElem.style.gridRowEnd = Math.floor(startIndex / 10) + 2;
      shipElem.style.gridColumnStart = (startIndex % 10) + 1;
      shipElem.style.gridColumnEnd = (startIndex % 10) + ship.length + 1;
      break;
    default:
      shipElem.style.gridRowStart = Math.floor(startIndex / 10) + 1;
      shipElem.style.gridRowEnd = Math.floor(startIndex / 10) + ship.length + 1;
      shipElem.style.gridColumnStart = (startIndex % 10) + 1;
      shipElem.style.gridColumnEnd = (startIndex % 10) + 2;
  }

  return shipElem;
}

// render attack as hit or miss
function renderAttack(target, cell) {
  // if hit target, add hit class to target
  if (cell.ship) target.classList.add('hit');
  // else, add miss class to target
  else target.classList.add('miss');
}

// show game over banner
function renderGameOver(msg) {
  dom.gameOver.winner.innerText = msg;
  dom.gameOver.banner.classList.remove('hidden');
}

export {
  renderGrid,
  hideSetup,
  renderFleet,
  renderShip,
  renderAttack,
  renderGameOver,
};
