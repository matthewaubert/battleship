import { getRandInt } from '../helpers.js';

// create new Player instance
// with 2 static methods to attack Gameboard
export default class Player {
  constructor(Gameboard, name) {
    this.gameboard = new Gameboard();
    this.name = name;
  }

  // cause given gameboard at given location to receive attack
  static attack(gameboard, loc) {
    gameboard.receiveAttack(loc);
  }

  // generate random valid location and cause given gameboard to receive attack
  static randomAttack(gameboard) {
    // continue to generate random int for loc until it's valid
    // (Gameboard Cell at loc has not already been hit)
    let loc;
    do {
      loc = getRandInt(0, gameboard.gridSize ** 2);
    } while (gameboard.boardData[loc].hit);

    Player.attack(gameboard, loc); // cause gameboard to receive attack

    return loc;
  }
}
