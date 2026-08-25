import Position from './Position.js';

const KNIGHT_OFFSETS = [
  [1, 2], [2, 1], [2, -1], [1, -2],
  [-1, -2], [-2, -1], [-2, 1], [-1, 2],
];

export default class KnightMoveProvider {
  constructor(boardSize = 8) {
    this.boardSize = boardSize;
  }

  getPossibleMoves(position) {
    return KNIGHT_OFFSETS
      .map(([dx, dy]) => new Position(position.x + dx, position.y + dy))
      .filter((next) => next.isValid(this.boardSize));
  }
}
