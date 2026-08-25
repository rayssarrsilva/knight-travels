export default class PathAnimator {
  constructor(boardRenderer, delay = 550) {
    this.boardRenderer = boardRenderer;
    this.delay = delay;
  }

  async animate(path) {
    const knightEl = document.createElement('span');
    knightEl.classList.add('knight-token');
    knightEl.textContent = '🧙‍♂️';

    for (const step of path) {
      const cell = this.boardRenderer.getCell(step);
      cell.classList.add('square--current');
      cell.appendChild(knightEl);

      await this._wait(this.delay);
    }
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}