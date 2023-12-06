const dom = {
  ai: {
    gameboardDisplay: document.querySelector('.ai.gameboard'),
    header: document.querySelector('.ai.name'),
  },
  user: {
    gameboardDisplay: document.querySelector('.user.gameboard'),
    header: document.querySelector('.user.name'),
  },
  gameOver: {
    banner: document.querySelector('.game-over'),
    winner: document.querySelector('.winner'),
  },
};

export default dom;
