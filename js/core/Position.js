export default class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  isValid(boardSize = 8) {
    return this.x >= 0 && this.x < boardSize && this.y >= 0 && this.y < boardSize;
  }

  toKey() {
    return `${this.x},${this.y}`;
  }

  toArray() {
    return [this.x, this.y];
  }

  static fromArray(arr) {
    return new Position(arr[0], arr[1]);
  }
}
