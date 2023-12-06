import dom from './dom.js';

// render ai, user titles and 10x10 grids of cells
function renderGrids(game) {
  renderName(game.player2, dom.ai.header);
  renderName(game.player1, dom.user.header);
  renderGrid(game.player2, dom.ai.gameboardDisplay);
  renderGrid(game.player1, dom.user.gameboardDisplay);
}

// for given Player, render name in given headerTag
function renderName(player, headerTag) {
  headerTag.innerText = `${player.name.toUpperCase()}'S BOARD`;
}

// for given Player, render 10x10 grid of cells on given gameboard display
function renderGrid(player, gameboardDisplay) {
  // for each Cell in Player Gameboard
  player.gameboard.boardData.forEach((cell, i) => {
    // create a new div with 'Cell' class and data-index
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = i;
    // add div to appropriate gameboard display
    gameboardDisplay.appendChild(div);
  });
}

// render given Player's fleet to user gameboard display
function renderFleet(player) {
  // for each Cell in Player Gameboard
  player.gameboard.boardData.forEach((cell, i) => {
    // if cell has ship, render cell
    if (cell.ship) dom.user.gameboardDisplay.children[i].classList.add('ship');
  });
}

// render attack as hit or miss
function renderAttack(target, cell) {
  // create circle and append to target
  target.appendChild(document.createElement('div'));
  // if hit target, add hit class to target
  if (cell.ship) target.classList.add('hit');
  // else, add miss class to target
  else target.classList.add('miss');
}

// show game over banner
function renderGameOver(winner) {
  dom.gameOver.winner.innerText = winner.name.toUpperCase();
  dom.gameOver.banner.classList.remove('hidden');
}

export { renderGrids, renderFleet, renderAttack, renderGameOver };
