import Ship from './ship.js';

// before each test, create a new Ship instance with length of 2
const length = 4;
let ship;
beforeEach(() => {
  ship = new Ship(length);
});

test('returns a new Ship instance', () => {
  expect(ship instanceof Ship).toBe(true)
});

test('ship accepts a hit', () => {
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('ship shows when not sunk', () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('ship shows when sunk', () => {
  for (let i = 0; i < length; i++) ship.hit();
  expect(ship.isSunk()).toBe(true);
});
