const dom = {
  main: document.querySelector('main'),
  ai: {
    gameboardDisplay: document.querySelector('.ai.gameboard'),
  },
  user: {
    gameboardDisplay: document.querySelector('.user.gameboard'),
  },
  setup: {
    display: document.querySelector('.setup'),
    instruct: document.querySelector('.setup > .instruct'),
    rotate: document.querySelector('.setup > .rotate'),
    gameboardDisplay: document.querySelector('.setup > .gameboard'),
  },
  gameOver: {
    banner: document.querySelector('.game-over'),
    winner: document.querySelector('.winner'),
  },
};

export default dom;
