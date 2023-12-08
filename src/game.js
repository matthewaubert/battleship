// create Game instance
// input: Player class, Gameboard class, player names
export default class Game {
  constructor(Player, Gameboard, name1 = 'Player', name2 = 'Enemy') {
    this.player1 = new Player(Gameboard, name1);
    this.player2 = new Player(Gameboard, name2);
    this.activePlayer = this.player1;
  }

  // add click event listener to AI gameboard display, starting the game
  // input: Player class, cached DOM, render functions
  startGame(Player, dom, renderAttack, renderGameOver) {
    const startRound = (e) => {
      if (
        this.activePlayer.name === this.player1.name &&
        e.target.classList.contains('cell') &&
        !e.target.classList.contains('hit') &&
        !e.target.classList.contains('miss')
      ) {
        console.log('attack!');
        // let each player take turn
        // if one player's ships have all been sunk, end game
        this.userTurn(Player, e.target, renderAttack);
        if (this.checkGameOver(renderGameOver, startRound, dom)) return;
        this.aiTurn(Player, dom, renderAttack);
        this.checkGameOver(renderGameOver, startRound, dom);
      }
    };

    // add attack event listener to AI gameboard
    dom.ai.gameboardDisplay.addEventListener('click', startRound);
  }

  // attack AI gameboard, render attack
  // input: Player class, clicked cell, render func
  userTurn(Player, target, renderAttack) {
    // user attack enemy gameboard at target index
    Player.attack(this.player2.gameboard, target.dataset.index);
    // render attack
    renderAttack(
      target,
      this.player2.gameboard.boardData[target.dataset.index],
    );

    this.activePlayer = this.player2;
  }

  // AI attack enemy at random index after 2 seconds
  // input: Player class, cached DOM, render func
  aiTurn(Player, dom, renderAttack) {
    setTimeout(() => {
      const loc = Player.randomAttack(this.player1.gameboard);
      renderAttack(
        dom.user.gameboardDisplay.children[loc],
        this.player1.gameboard.boardData[loc],
      );

      this.activePlayer = this.player1;
    }, 2000);
  }

  // check whether attacked player's ships have all been sunk
  // if so, remove event listener from AI gameboard and render game over
  // input: render func, startRound func, cached DOM
  // output: boolean val (whether game is over)
  checkGameOver(renderGameOver, startRound, dom) {
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
