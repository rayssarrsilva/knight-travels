import Position from '../core/Position.js';

export default class KnightMovesService {
  constructor(pathFinder) {
    this.pathFinder = pathFinder;
  }

  knightMoves(startArr, endArr) {
    const start = Position.fromArray(startArr);
    const end = Position.fromArray(endArr);
    const path = this.pathFinder.findPath(start, end);

    if (!path) {
      throw new Error('Nenhum caminho encontrado entre essas casas.');
    }

    return path.map((position) => position.toArray());
  }

  formatConsoleOutput(path) {
    const moves = path.length - 1;
    const lines = [
      `You made it in ${moves} move${moves === 1 ? '' : 's'}!  Here's your path:`,
    ];
    path.forEach(([x, y]) => lines.push(`  [${x},${y}]`));
    return lines.join('\n');
  }
}
