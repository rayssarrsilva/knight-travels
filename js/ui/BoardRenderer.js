export default class BoardRenderer {
  constructor(containerEl, boardSize = 8) {
    this.containerEl = containerEl;
    this.boardSize = boardSize;
    this.cells = new Map();
  }

  render(onCellClick) {
    this.containerEl.innerHTML = '';
    this.containerEl.style.setProperty('--board-size', this.boardSize);

    for (let y = this.boardSize - 1; y >= 0; y--) {
      for (let x = 0; x < this.boardSize; x++) {
        const cell = document.createElement('div');
        cell.classList.add('square', (x + y) % 2 === 0 ? 'square--light' : 'square--dark');
        cell.dataset.x = String(x);
        cell.dataset.y = String(y);
        cell.addEventListener('click', () => onCellClick([x, y]));
        this.containerEl.appendChild(cell);
        this.cells.set(`${x},${y}`, cell);
      }
    }
  }

  clearMarks() {
    this.cells.forEach((cell) => {
      cell.classList.remove('square--start', 'square--end', 'square--path', 'square--current');
      cell.innerHTML = '';
    });
  }

  markStart([x, y]) {
    this.getCell([x, y]).classList.add('square--start');
  }

  markEnd([x, y]) {
    this.getCell([x, y]).classList.add('square--end');
  }

  markPath(path) {
    path.forEach((step) => this.getCell(step).classList.add('square--path'));
  }

  getCell([x, y]) {
    return this.cells.get(`${x},${y}`);
  }
}
