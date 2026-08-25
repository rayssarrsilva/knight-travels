import KnightMoveProvider from './core/KnightMoveProvider.js';
import BFSPathFinder from './algorithms/BFSPathFinder.js';
import KnightMovesService from './services/KnightMovesService.js';
import BoardRenderer from './ui/BoardRenderer.js';
import PathAnimator from './ui/PathAnimator.js';
import ConsoleLogger from './ui/ConsoleLogger.js';

const BOARD_SIZE = 8;

const moveProvider = new KnightMoveProvider(BOARD_SIZE);
const pathFinder = new BFSPathFinder(moveProvider);
const knightService = new KnightMovesService(pathFinder);

const boardEl = document.getElementById('board');
const outputEl = document.getElementById('output');
const statusEl = document.getElementById('status');
const castBtn = document.getElementById('cast-btn');
const resetBtn = document.getElementById('reset-btn');

const boardRenderer = new BoardRenderer(boardEl, BOARD_SIZE);
const pathAnimator = new PathAnimator(boardRenderer);
const logger = new ConsoleLogger(outputEl);

let selection = { start: null, end: null };

function updateStatus() {
  if (!selection.start) {
    statusEl.textContent = 'gToque a casa onde o cavaleiro começa...';
  } else if (!selection.end) {
    statusEl.textContent = 'Agora toque o destino...';
  } else {
    statusEl.textContent = 'Pronto! Lance o feitiço para ver o caminho.';
  }
}

function resetSelection() {
  selection = { start: null, end: null };
  boardRenderer.clearMarks();
  logger.clear();
  updateStatus();
}

function handleCellClick(coords) {
  if (selection.start && selection.end) {
    resetSelection();
  }

  if (!selection.start) {
    selection.start = coords;
    boardRenderer.markStart(coords);
  } else if (!selection.end) {
    selection.end = coords;
    boardRenderer.markEnd(coords);
  }

  updateStatus();
}

async function castSpell() {
  const { start, end } = selection;

  if (!start || !end) {
    logger.error('Escolha a casa inicial e a casa final antes de conjurar!');
    return;
  }

  castBtn.disabled = true;
  try {
    const path = knightService.knightMoves(start, end);

    logger.clear();
    logger.log(knightService.formatConsoleOutput(path));

    boardRenderer.markPath(path);
    await pathAnimator.animate(path);
  } catch (err) {
    logger.error(err.message);
  } finally {
    castBtn.disabled = false;
  }
}

boardRenderer.render(handleCellClick);
castBtn.addEventListener('click', castSpell);
resetBtn.addEventListener('click', resetSelection);
updateStatus();
