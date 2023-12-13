import dom from './dom.js';
import { renderShip } from './render.js';

const shipData = {
  carrier: { name: 'carrier', length: 5, orientation: 'horizontal' },
  battleship: { name: 'battleship', length: 4, orientation: 'horizontal' },
  destroyer: { name: 'destroyer', length: 3, orientation: 'horizontal' },
  submarine: { name: 'submarine', length: 3, orientation: 'horizontal' },
  patrolBoat: { name: 'patrol boat', length: 2, orientation: 'horizontal' },
};

let Ship;
let gameboard;
let key;

// loop thru shipData, wait for user to click on grid to place each ship,
// show feedback for example ship placement as user hovers over squares
export default async function initSetup(ShipClass, gameboardInstance) {
  Ship = ShipClass;
  gameboard = gameboardInstance;

  dom.setup.gameboardDisplay.addEventListener('click', resolveContinue);

  // placing ships: for each ship:
  for (const currKey in shipData) {
    if (Object.hasOwn(shipData, currKey)) {
      key = currKey;
      // render ship name in setup.instruct
      dom.setup.instruct.innerText =
        `place your ${shipData[key].name}`.toUpperCase();

      // allow player to rotate ship
      dom.setup.rotate.addEventListener('click', rotateShip);

      // when player hovers over board, show ship placement
      dom.setup.gameboardDisplay.addEventListener('mouseover', showShipPlace);
      dom.setup.gameboardDisplay.addEventListener('mouseout', hideShipPlace);

      // when player clicks on board, place ship and continue to next iteration
      await waitForClick();

      // remove hover event listeners
      dom.setup.gameboardDisplay.removeEventListener(
        'mouseover',
        showShipPlace,
      );
      dom.setup.gameboardDisplay.removeEventListener('mouseout', hideShipPlace);
    }
  }

  dom.setup.gameboardDisplay.removeEventListener('click', resolveContinue);
}

// change orientation of current ship
function rotateShip() {
  shipData[key].orientation =
    shipData[key].orientation === 'horizontal' ? 'vertical' : 'horizontal';
}

// render example ship placement on mouseover
function showShipPlace(e) {
  if (e.target.classList.contains('cell')) {
    const startingLoc = Number(e.target.dataset.index);

    // if user hovered on valid gameboard cell:
    if (
      gameboard.isValidLoc(startingLoc, shipData[key]) &&
      !gameboard.shipExists(startingLoc, shipData[key])
    ) {
      // show example ship placement
      for (let i = 0; i < shipData[key].length; i++) {
        const loc =
          startingLoc + gameboard.getDeltas()[shipData[key].orientation] * i;
        dom.setup.gameboardDisplay.children[loc].classList.add('ship-hover');
      }
      // else: show cell to be invalid
    } else {
      e.target.classList.add('invalid');
    }
  }
}

// remove example ship placement on mouseout
function hideShipPlace(e) {
  if (e.target.classList.contains('cell')) {
    const startingLoc = Number(e.target.dataset.index);

    // if user mouse left valid gameboard cell:
    if (
      gameboard.isValidLoc(startingLoc, shipData[key]) &&
      !gameboard.shipExists(startingLoc, shipData[key])
    ) {
      // clear example ship placement
      for (let i = 0; i < shipData[key].length; i++) {
        const loc =
          startingLoc + gameboard.getDeltas()[shipData[key].orientation] * i;
        dom.setup.gameboardDisplay.children[loc].classList.remove('ship-hover');
      }
      // else: clear rendering showing cell to be invalid
    } else {
      e.target.classList.remove('invalid');
    }
  }
}

// resolve promise returned by waitForClick
let waitForClickResolve;

// return new promise that resolves when user clicks on
// gameboard display to place ship
function waitForClick() {
  return new Promise((resolve) => {
    waitForClickResolve = resolve;
  });
}

// if user clicked on valid gameboard cell: place and render ship, call func
// to resolve promise to continue to next iteration of ship placement loop
function resolveContinue(e) {
  const startingLoc = Number(e.target.dataset.index);

  // if user clicked on valid gameboard cell:
  if (
    waitForClickResolve &&
    e.target.classList.contains('cell') &&
    gameboard.isValidLoc(startingLoc, shipData[key]) &&
    !gameboard.shipExists(startingLoc, shipData[key])
  ) {
    // place and render ship
    gameboard.placeShip(
      Ship,
      startingLoc,
      shipData[key].name,
      shipData[key].length,
      shipData[key].orientation,
    );
    renderShip(gameboard.ships.at(-1), gameboard, 'setup');

    waitForClickResolve(); // resolve promise
  }
}
