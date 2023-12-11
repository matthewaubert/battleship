// return random integer btw min (inclusive) and max (exclusive)
function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// return normal string converted to kebab-case
// e.g. kebabize('Patrol boat') == 'patrol-boat'
function kebabize(string) {
  return string.toLowerCase().replace(' ', '-');
}

// return Promise that resolves in given milliseconds
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { getRandInt, kebabize, wait };
