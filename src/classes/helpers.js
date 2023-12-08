// return random integer btw min (inclusive) and max (exclusive)
export default function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
