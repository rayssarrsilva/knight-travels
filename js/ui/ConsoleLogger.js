export default class ConsoleLogger {
  constructor(outputEl) {
    this.outputEl = outputEl;
  }

  clear() {
    this.outputEl.textContent = '';
  }

  log(message) {
    this.outputEl.textContent += `${message}\n`;
  }

  error(message) {
    this.outputEl.textContent += `⚠ ${message}\n`;
  }
}
