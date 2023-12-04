import Cell from './cell.js';

// create new Gameboard instance
export default class Gameboard {
  constructor(gridSize = 10) {
    this.gridSize = gridSize; // num of cells in x and y axis
    this.boardData = Gameboard.#buildBoard(gridSize); // build array of cells to represent gameboard
    this.ships = []; // array of ships placed in gameboard
  }

  // return array of gridSize ** 2 null cells to represent gameboard
  static #buildBoard(gridSize) {
    const boardData = [];
    // do this gridSize ** 2 times: add a cell (null) to boardData
    for (let i = 0; i < gridSize ** 2; i++) boardData.push(new Cell());

    return boardData;
  }

  // return calculated index based on given coordinates and grid size
  getIndex(coords) {
    return coords[0] * this.gridSize + coords[1];
  }

  // build new Ship of given length (via dependency injection)
  // and place at appropriate index in boardData based on provided x, y coords
  placeShip(Ship, coords, length) {
    const startIndex = this.getIndex(coords);
    const ship = new Ship(length);
    this.ships.push(ship);
    // do this length times: place new Ship instance at cell
    for (let i = 0; i < length; i++) this.boardData[startIndex + i].ship = ship;
  }

  // marks cell at given coords as hit; if ship, increments ship hits
  receiveAttack(coords) {
    const cell = this.boardData[this.getIndex(coords)];
    // if cell has not yet been hit:
    if (!cell.hit) {
      if (cell.ship) cell.ship.hit(); // if cell has ship, increment ship hits
      cell.hit = true; // mark cell as hit
    }
  }

  // report whether or not all ships have been sunk; return boolean value
  allShipsSunk() {
    // iterate over all ships in Gameboard
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk()) return false; // if ship is not sunk, return false
    }

    return true; // if all ships reported sunk, return true
  }
}
