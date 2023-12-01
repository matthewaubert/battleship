// create a new Ship instance
// input: length (num of cells ship occupies)
export default class Ship {
  constructor(length) {
    this.length = length; // num of cells ship occupies
    this.hits = 0; // num of times ship has been hit
  }

  // increment ship's num of hits
  hit() {
    this.hits++;
  }

  // return boolean value whether ship has been sunk
  isSunk() {
    return this.hits >= this.length;
  }
}
