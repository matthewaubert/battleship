import Gameboard from './gameboard.js';
import Ship from './ship.js';

// before each test, create a new Gameboard instance
let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

test('returns a new Gameboard instance', () => {
  expect(gameboard instanceof Gameboard).toBeTruthy();
});

describe('places ship', () => {
  // before each test, place ship of given length at given loc
  const loc = 23
  const length = 4;
  beforeEach(() => {
    gameboard.placeShip(Ship, loc, length);
  });

  test('cell before ship loc does not contain ship', () => {
    expect(
      gameboard.boardData[loc - 1].ship instanceof Ship,
    ).toBeFalsy();
  });

  test('cell at ship loc contains ship', () => {
    expect(
      gameboard.boardData[loc].ship instanceof Ship,
    ).toBeTruthy();
  });

  test('cell before end of ship length contains ship', () => {
    expect(
      gameboard.boardData[loc + (length - 1)]
        .ship instanceof Ship,
    ).toBeTruthy();
  });

  test('cell at end of ship length does not contain ship', () => {
    expect(
      gameboard.boardData[loc + length].ship instanceof
        Ship,
    ).toBeFalsy();
  });
});

describe('receives attack', () => {
  // before each test, place ship of given length at given loc
  const loc = 23
  const length = 4;
  beforeEach(() => {
    gameboard.placeShip(Ship, loc, length);
  });

  test('does not receive attack if invalid loc given', () => {
    expect(() => gameboard.receiveAttack([11, 11])).toThrow(Error);
  });

  test('cell with ship records hit', () => {
    gameboard.receiveAttack(loc);
    expect(gameboard.boardData[loc].hit).toBeTruthy();
  });

  test('cell without ship records hit', () => {
    gameboard.receiveAttack(0);
    expect(gameboard.boardData[0].hit).toBeTruthy();
  });

  test('hits ship at appropriate loc', () => {
    gameboard.receiveAttack(loc);
    expect(gameboard.boardData[loc].ship.hits).toBe(1);
  });

  test('does not hit ship if cell has already been hit', () => {
    for (let i = 0; i < length; i++) gameboard.receiveAttack(loc);
    expect(gameboard.boardData[loc].ship.hits).toBe(1);
  });

  test('sinks ship after appropriate num of hits', () => {
    for (let i = 0; i < length; i++) {
      expect(gameboard.boardData[loc].ship.isSunk()).toBeFalsy();
      gameboard.receiveAttack(loc + i);
    }
    expect(gameboard.boardData[loc].ship.hits).toBe(4);
    expect(gameboard.boardData[loc].ship.isSunk()).toBeTruthy();
  });

  test('does not sink ship if hit in same place', () => {
    for (let i = 0; i < length; i++) {
      gameboard.receiveAttack(loc);
      expect(gameboard.boardData[loc].ship.isSunk()).toBeFalsy();
    }
  });

  test('reports whether or not all ships have been sunk', () => {
    expect(gameboard.allShipsSunk()).toBeFalsy();
    for (let i = 0; i < length; i++) {
      gameboard.receiveAttack(loc + i);
    }
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });
});
