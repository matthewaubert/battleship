import Player from './player.js';
import Gameboard from './gameboard.js';

// before each test, create new Player instance with a Gameboard
let player;
beforeEach(() => {
  player = new Player(Gameboard);
});

describe('player creation', () => {  
  // before each test, create new Player instance
  test('creates a new Player instance', () => {
    expect(player instanceof Player).toBeTruthy();
  });

  test('has a Gameboard', () => {
    expect(player.gameboard instanceof Gameboard).toBe(true);
  });
});

describe('attacking', () => {
  test('Player can attack enemy Gameboard', () => {
    const coords = [2, 3];
    const index = player.gameboard.getIndex(coords);
    Player.attack(player.gameboard, coords);
    expect(player.gameboard.boardData[index].hit).toBeTruthy();
  });

  test('AI Player can make random attack', () => {
    Player.randomAttack(player.gameboard);
    expect(player.gameboard.boardData.filter((cell) => cell.hit).length).toBe(1);
  });

  test('AI will not attack same coordinate twice', () => {
    const numAttacks = player.gameboard.gridSize ** 2;
    for (let i = 0; i < numAttacks; i++) Player.randomAttack(player.gameboard);
    expect(player.gameboard.boardData.filter((cell) => cell.hit).length).toBe(
      numAttacks,
    );
  });
});
