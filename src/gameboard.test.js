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
  // before each test, place ship of given length at given coords
  const x = 2;
  const y = 3;
  const length = 4;
  beforeEach(() => {
    gameboard.placeShip(Ship, [x, y], length);
  });

  test('cell before ship coords does not contain ship', () => {
    expect(
      gameboard.boardData[x * gameboard.gridSize + y - 1].ship instanceof Ship,
    ).toBeFalsy();
  });

  test('cell at ship coords contains ship', () => {
    expect(
      gameboard.boardData[x * gameboard.gridSize + y].ship instanceof Ship,
    ).toBeTruthy();
  });

  test('cell before end of ship length contains ship', () => {
    expect(
      gameboard.boardData[x * gameboard.gridSize + y + (length - 1)]
        .ship instanceof Ship,
    ).toBeTruthy();
  });

  test('cell at end of ship length does not contain ship', () => {
    expect(
      gameboard.boardData[x * gameboard.gridSize + y + length].ship instanceof
        Ship,
    ).toBeFalsy();
  });
});

describe('receives attack', () => {
  // before each test, place ship of given length at given coords
  const x = 2;
  const y = 3;
  const length = 4;
  let startIndex;
  beforeEach(() => {
    gameboard.placeShip(Ship, [x, y], length);
    startIndex = gameboard.getIndex([x, y]);
  });

  test('does not receive attack if invalid coords given', () => {
    expect(() => gameboard.receiveAttack([11, 11])).toThrow(Error);
  });

  test('cell with ship records hit', () => {
    gameboard.receiveAttack([x, y]);
    expect(gameboard.boardData[startIndex].hit).toBeTruthy();
  });

  test('cell without ship records hit', () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.boardData[0].hit).toBeTruthy();
  });

  test('hits ship at appropriate coords', () => {
    gameboard.receiveAttack([x, y]);
    expect(gameboard.boardData[startIndex].ship.hits).toBe(1);
  });

  test('does not hit ship if cell has already been hit', () => {
    for (let i = 0; i < length; i++) gameboard.receiveAttack([x, y]);
    expect(gameboard.boardData[startIndex].ship.hits).toBe(1);
  });

  test('sinks ship after appropriate num of hits', () => {
    for (let i = 0; i < length; i++) {
      expect(gameboard.boardData[startIndex].ship.isSunk()).toBeFalsy();
      gameboard.receiveAttack([x, y + i]);
    }
    expect(gameboard.boardData[startIndex].ship.hits).toBe(4);
    expect(gameboard.boardData[startIndex].ship.isSunk()).toBeTruthy();
  });

  test('does not sink ship if hit in same place', () => {
    for (let i = 0; i < length; i++) {
      gameboard.receiveAttack([x, y]);
      expect(gameboard.boardData[startIndex].ship.isSunk()).toBeFalsy();
    }
  });

  test('reports whether or not all ships have been sunk', () => {
    expect(gameboard.allShipsSunk()).toBeFalsy();
    for (let i = 0; i < length; i++) {
      gameboard.receiveAttack([x, y + i]);
    }
    expect(gameboard.allShipsSunk()).toBeTruthy();
  });
});
