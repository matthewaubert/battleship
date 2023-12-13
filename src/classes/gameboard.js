import Cell from './cell.js';
import { getRandInt } from '../helpers.js';

// create new Gameboard instance
export default class Gameboard {
  constructor(gridSize = 10) {
    this.gridSize = gridSize; // num of Cells in x and y axis
    this.boardData = Gameboard.#buildBoard(gridSize); // build array of Cells to represent gameboard
    this.ships = []; // array of ships placed in Gameboard
  }

  // return array of gridSize ** 2 empty Cells to represent gameboard
  static #buildBoard(gridSize) {
    const boardData = [];
    for (let i = 0; i < gridSize ** 2; i++) boardData.push(new Cell());

    return boardData;
  }

  // build new Ship of given length (via dependency injection)
  // and place at appropriate index in boardData based on provided location
  placeShip(Ship, startingLoc, name, length, orientation) {
    const ship = new Ship(name, length, orientation);
    this.ships.push(ship);

    // do this length times: place new Ship instance at cell
    for (let i = 0; i < length; i++) {
      const loc = startingLoc + this.getDeltas()[ship.orientation] * i;
      this.boardData[loc].ship = ship;
    }
  }

  // return deltas for Ship placement in both orientations
  getDeltas() {
    return {
      horizontal: 1,
      vertical: this.gridSize,
    };
  }

  // marks cell at given location as hit; if Ship, increments Ship hits
  receiveAttack(loc) {
    const cell = this.boardData[loc];
    // if cell has not yet been hit:
    if (!cell.hit) {
      if (cell.ship) cell.ship.hit(); // if cell has ship, increment Ship hits
      cell.hit = true; // mark cell as hit
    }
  }

  // report whether or not all Ships have been sunk
  // output: boolean value
  allShipsSunk() {
    // iterate over all ships in Gameboard
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) return false; // if Ship is not sunk, return false
    }

    return true; // if all Ships reported sunk, return true
  }

  // place 5 Ships on Gameboard
  // input: Ship class
  placeFleet(Ship) {
    const shipData = {
      carrier: { name: 'carrier', length: 5 },
      battleship: { name: 'battleship', length: 4 },
      destroyer: { name: 'destroyer', length: 3 },
      submarine: { name: 'submarine', length: 3 },
      patrolBoat: { name: 'patrol boat', length: 2 },
    };

    // for each ship: get random orientation and location, place Ship
    Object.keys(shipData).forEach((key) => {
      shipData[key].orientation = Ship.getRandOrientation();
      shipData[key].loc = this.#getRandLoc(shipData[key]);

      this.placeShip(
        Ship,
        shipData[key].loc,
        shipData[key].name,
        shipData[key].length,
        shipData[key].orientation,
      );
    });
  }

  // input: ship data (orientation, length)
  // output: random valid starting location
  // (valid if all successive locations are in bounds and w/o a Ship)
  #getRandLoc(shipData) {
    let startingLoc;

    // continue to get random starting int btw 0 and gridSize ** 2
    // until all successive locs are in bounds and w/o a Ship
    do {
      startingLoc = getRandInt(0, this.gridSize ** 2);
    } while (
      !this.isValidStartingLoc(startingLoc, shipData) ||
      this.shipExists(startingLoc, shipData)
    );

    return startingLoc;
  }

  // return boolean value whether given starting location
  // is valid given ship data (orientation and length)
  isValidStartingLoc(startingLoc, shipData) {
    const conditions = {
      horizontal:
        startingLoc % this.gridSize <
        (startingLoc + shipData.length - 1) % this.gridSize,
      vertical:
        startingLoc + (shipData.length - 1) * this.gridSize <
        this.gridSize ** 2,
    };

    return conditions[shipData.orientation];
  }

  // check if Ship already exists at Cells where a new Ship would go
  // input: starting location and ship data (length and orientation)
  // output: boolean value
  shipExists(startingLoc, shipData) {
    for (let i = 0; i < shipData.length; i++) {
      const loc = startingLoc + this.getDeltas()[shipData.orientation] * i;
      // if Ship exists at given location, return true
      if (this.boardData[loc].ship !== null) return true;
    }

    // if no Ships exist at any reviewed locations, return false
    return false;
  }

  isValidNextLoc(startingLoc, nextLoc) {
    const directions = {
      right: nextLoc % this.gridSize > startingLoc % this.gridSize,
      left: nextLoc % this.gridSize < startingLoc % this.gridSize,
      up: nextLoc < this.gridSize ** 2,
      down: nextLoc > 0,
    };

    return directions[this.getDeltaDirection(startingLoc, nextLoc)];
  }

  getDeltaDirection(startingLoc, nextLoc) {
    switch(nextLoc) {
      case startingLoc + 1:
        return 'right';
      case startingLoc - 1:
        return 'left';
      case startingLoc + this.gridSize:
        return 'up';
      default:
        return 'down';
    }
  }
}
