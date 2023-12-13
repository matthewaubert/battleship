import Ai from './ai.js';
import Player from './player.js';
import Gameboard from './gameboard.js';
import Ship from './ship.js';

// before each test, create new Ai instance with a Gameboard
let ai;
beforeEach(() => {
  ai = new Ai(Gameboard);
});

describe('ai creation', () => {
  test('creates a new Ai instance', () => {
    expect(ai instanceof Ai).toBeTruthy();
  });

  test('inherits from Player', () => {
    expect(Ai.prototype instanceof Player).toBeTruthy();
  });

  test('has a Gameboard', () => {
    expect(ai.gameboard instanceof Gameboard).toBe(true);
  });
});

describe('attacking', () => {
  const loc = 23;
  const name = 'battleship';
  const length = 4;
  const orientation = 'horizontal';

  let player;
  beforeEach(() => {
    player = new Player(Gameboard);
  });

  test('Ai can make a random attack', () => {
    ai.randomAttack(player.gameboard);
    expect(player.gameboard.boardData.filter((cell) => cell.hit).length).toBe(
      1,
    );
  });

  test('Ai will not attack same coordinate twice', () => {
    player.gameboard.placeFleet(Ship);

    const numAttacks = player.gameboard.gridSize ** 2;
    for (let i = 0; i < numAttacks; i++) ai.aiAttack(player.gameboard);
    expect(player.gameboard.boardData.filter((cell) => cell.hit).length).toBe(
      numAttacks,
    );
  });

  test('Ai knows when it has hit a Ship', () => {
    player.gameboard.placeShip(Ship, loc, name, length, orientation);

    expect(ai.logic.lastHit).toBe(null);
    do {
      ai.randomAttack(player.gameboard, loc);
    } while (!ai.logic.lastHit);
    expect(typeof ai.logic.lastHit).toBe('number');
  });

  test('Ai forgets logic when it sinks a ship', () => {
    player.gameboard.placeShip(Ship, loc, name, length, orientation);
    
    ai.attack(player.gameboard, loc);
    expect(typeof ai.logic.lastHit).toBe('number');
    do {
      ai.aiAttack(player.gameboard);
    } while (!player.gameboard.boardData[loc].ship.isSunk());
    expect(ai.logic.lastHit).toBe(null);
  });

  test('Ai attacks adjacent square after it hits a Ship', () => {
    player.gameboard.placeShip(Ship, loc, name, length, orientation);
    const { boardData } = player.gameboard;

    ai.attack(player.gameboard, loc);
    ai.aiAttack(player.gameboard);
    expect(
      boardData[loc + 1].hit ||
        boardData[loc - 1].hit ||
        boardData[loc + player.gameboard.gridSize].hit ||
        boardData[loc - player.gameboard.gridSize].hit,
    ).toBeTruthy();
  });

  test('Ai targets horizontal Ship until sunk', () => {
    // attack loc
    ai.attack(player.gameboard, loc + 1);
    // aiAttack 6 times
    for (let i = 0; i < 6; i++) ai.aiAttack(player.gameboard);
    // expect ship to be sunk
    expect(player.gameboard.boardData[loc].ship.isSunk()).toBeTruthy();
  });

  test('Ai targets vertical Ship until sunk', () => {
    const loc2 = 45;
    player.gameboard.placeShip(Ship, loc2, name, length, 'vertical');

    // attack loc
    ai.attack(player.gameboard, loc + player.gameboard.gridSize);
    // aiAttack 6 times
    for (let i = 0; i < 6; i++) ai.aiAttack(player.gameboard);
    // expect ship to be sunk
    expect(player.gameboard.boardData[loc2].ship.isSunk()).toBeTruthy();
  });
});
