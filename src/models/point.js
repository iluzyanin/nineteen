export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(otherPoint) {
    if (!otherPoint) {
      return false;
    }
    if (!(otherPoint instanceof Point)) {
      return false;
    }

    if (this === otherPoint) {
      return true;
    }

    return this.x === otherPoint.x &&
      this.y === otherPoint.y;
  }
}