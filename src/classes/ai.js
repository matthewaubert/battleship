import Player from './player.js';
import AiLogic from './ai-logic.js';
import { getRandInt } from '../helpers.js';

// create new Ai instance
export default class Ai extends Player {
  constructor(Gameboard, name) {
    super(Gameboard, name);
    this.logic = AiLogic();
  }

  // cause given gameboard at given location to receive attack
  attack(gameboard, loc) {
    gameboard.receiveAttack(loc);
    this.#checkHit(gameboard, loc); // check for hit
  }

  #checkHit(gameboard, loc) {
    // if Cell at loc has a Ship:
    if (gameboard.boardData[loc].ship) {
      // if Ship is sunk: reset logic
      if (gameboard.boardData[loc].ship.isSunk()) this.logic = AiLogic();
      // else: set logic.lastHit to loc
      else {
        // this.logic.options[gameboard.getDeltaDirection(this.logic.lastHit, loc)]
        this.logic.lastHit = loc;
      }
      // if Ai has a lastHit
    } else if (this.logic.lastHit) {
      this.logic.options[gameboard.getDeltaDirection(this.logic.lastHit, loc)] =
        false;
    }
  }

  aiAttack(gameboard) {
    const options = {
      up: -gameboard.gridSize,
      down: gameboard.gridSize,
      left: -1,
      right: 1,
    };

    // if no lastHit: attack random loc
    if (!this.logic.lastHit) return this.randomAttack(gameboard);

    // else (if hit a Ship):
    // randomly attack 1 of available options
    let choice;
    let loc;
    let attempts = 0;
    do {
      choice = Object.keys(this.logic.options)[getRandInt(0, 4)];
      loc = this.logic.lastHit + options[choice];
      attempts++;

      // if loc is invalid, remove choice from options
      if (!gameboard.isValidNextLoc(this.logic.lastHit, loc))
        this.logic.options[choice] = false;
      // while (choice is false || cell has already been hit) && attempts < 4
    } while (
      (!this.logic.options[choice] || gameboard.boardData[loc].hit) &&
      attempts < 4
    );

    if (attempts === 4) return this.randomAttack(gameboard);

    this.attack(gameboard, loc);
    return loc;

    // attack random loc
    // if hit Ship:
    //   randomly attack 1 of 4 adjacent locs
    //   if Ship sunk: break
    //   if hit Ship and Ship not sunk:
    //     randomly attack 1 of 2 locs in that orientation (e.g. 'horizontal')
    //     if Ship sunk: break
    //     if hit Ship and Ship not sunk:
    //       attack again in that direction
    //       if hit Ship and Ship not sunk: repeat
    //       else if not hit Ship and Ship not sunk:
    //     attack 1 loc in other direction
    //   else if not hit and Ship not sunk: repeat
    // else: repeat
  }

  // generate random valid location and cause given gameboard to receive attack
  randomAttack(gameboard) {
    // continue to generate random int for loc until it's valid
    // (Gameboard Cell at loc has not already been hit)
    let loc;
    do {
      loc = getRandInt(0, gameboard.gridSize ** 2);
    } while (gameboard.boardData[loc].hit);

    this.attack(gameboard, loc); // cause gameboard to receive attack
    // this.#checkHit(gameboard, loc); // check for hit

    return loc;
  }
}
