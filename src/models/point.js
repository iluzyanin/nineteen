export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isWithinMatrix(matrix) {
    return this.x >= 0 && this.x < matrix.length &&
      this.y >= 0 && this.y < matrix[0].length;
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