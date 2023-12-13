import dom from './dom.js'
import { renderShip, renderAttack, renderGameOver } from './render.js';

// create Game instance
// input: Player class, Gameboard class, player names
export default class Game {
  constructor(Player, Ai, Gameboard, name1 = 'Player', name2 = 'Enemy') {
    this.player1 = new Player(Gameboard, name1);
    this.player2 = new Ai(Gameboard, name2);
    this.activePlayer = this.player1;
  }

  // add click event listener to AI gameboard display, starting the game
  // input: Player class
  startGame() {
    const startRound = (e) => {
      // if user is active player, target is a cell,
      // and target hasn't already been attacked
      if (
        this.activePlayer.name === this.player1.name &&
        e.target.classList.contains('cell') &&
        !e.target.classList.contains('hit') &&
        !e.target.classList.contains('miss')
      ) {
        console.log('attack!');
        // let each player take turn
        // if one player's ships have all been sunk, end game
        this.userTurn(e.target);
        if (this.checkGameOver(renderGameOver, startRound, dom)) return;
        this.aiTurn();
        this.checkGameOver(renderGameOver, startRound, dom);
      }
    };

    // add attack event listener to AI gameboard
    dom.ai.gameboardDisplay.addEventListener('click', startRound);
  }

  // attack AI gameboard, render attack
  // input: Player class, clicked cell
  userTurn(target) {
    // user attack enemy gameboard at target index
    this.player1.attack(this.player2.gameboard, target.dataset.index);

    const cell = this.player2.gameboard.boardData[target.dataset.index];
    renderAttack(target, cell);
    // if ship at loc is sunk, render ship to ai gameboard display
    if (cell.ship && cell.ship.isSunk())
      renderShip(cell.ship, this.player2.gameboard, 'ai');

    this.activePlayer = this.player2;
  }

  // attack user gameboard at random index after 1 second, render attack
  // input: Player class
  aiTurn() {
    setTimeout(() => {
      const loc = this.player2.aiAttack(this.player1.gameboard);
      renderAttack(
        dom.user.gameboardDisplay.children[loc],
        this.player1.gameboard.boardData[loc],
      );

      this.activePlayer = this.player1;
    }, 1000);
  }

  // check whether attacked player's ships have all been sunk
  // if so, remove event listener from AI gameboard and render game over
  // input: startRound func
  // output: boolean val (whether game is over)
  checkGameOver(startRound) {
    if (this.activePlayer.gameboard.allShipsSunk()) {
      dom.ai.gameboardDisplay.removeEventListener('click', startRound);
      this.activePlayer.name === this.player1.name
        ? renderGameOver('YOU LOSE :(')
        : renderGameOver('YOU WIN!');

      return true;
    }

    return false;
  }
}
