// create new Cell instance
export default class Cell {
  constructor() {
    this.ship = null; // contains null or a Ship object
    this.hit = false; // boolean value whether cell has been hit (false by default)
  }
}
