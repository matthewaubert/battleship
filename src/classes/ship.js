import getRandInt from './helpers.js';

// create a new Ship instance
// input: name, length (num of cells), orientation (horizontal/vertical)
export default class Ship {
  constructor(name, length, orientation) {
    this.name = name;
    this.length = length; // num of cells Ship occupies
    this.orientation = orientation; // horizontal or vertical
    this.hits = 0; // num of times Ship has been hit
  }

  // randomly return 'horizontal' or 'vertical'
  static getRandOrientation() {
    const orientations = ['horizontal', 'vertical'];
    return orientations[getRandInt(0, 2)];
  }

  // increment Ship's num of hits
  hit() {
    this.hits++;
  }

  // return boolean value whether Ship has been sunk
  isSunk() {
    return this.hits >= this.length;
  }
}
