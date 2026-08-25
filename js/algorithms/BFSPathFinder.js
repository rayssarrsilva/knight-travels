import PathFinder from '../core/PathFinder.js';

export default class BFSPathFinder extends PathFinder {
  constructor(moveProvider) {
    super();
    this.moveProvider = moveProvider;
  }

  findPath(start, end) {
    if (start.equals(end)) return [start];

    const visited = new Set([start.toKey()]);
    const queue = [{ position: start, path: [start] }];

    while (queue.length > 0) {
      const { position, path } = queue.shift();

      for (const next of this.moveProvider.getPossibleMoves(position)) {
        if (visited.has(next.toKey())) continue;

        const newPath = [...path, next];
        if (next.equals(end)) return newPath;

        visited.add(next.toKey());
        queue.push({ position: next, path: newPath });
      }
    }

    return null; 
  }
}
