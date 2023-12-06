// create new Player instance
// with 2 static methods to attack Gameboard
export default class Player {
  constructor(Gameboard, name = 'Player 1') {
    this.gameboard = new Gameboard();
    this.name = name;
  }

  // cause given gameboard at given coordinates to receive attack
  static attack(gameboard, coords) {
    gameboard.receiveAttack(coords);
  }

  // generate random valid coordinates and cause given gameboard to receive attack
  static randomAttack(gameboard) {
    let x;
    let y;

    // continue to generate random ints for x, y until coords are valid
    // (coords are defined and Gameboard Cell at coords has not already been hit)
    do {
      x = Player.#getRandInt(gameboard.gridSize);
      y = Player.#getRandInt(gameboard.gridSize);
    } while (gameboard.boardData[gameboard.getIndex([x, y])].hit);

    Player.attack(gameboard, [x, y]); // cause gameboard to receive attack
  }

  static #getRandInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
