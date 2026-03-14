import { lines } from './content.js';
import { createTerminalTyper } from './terminal.js';
import { createIntroAnimation } from './intro.js';

const body = document.body;
const intro = document.getElementById('intro');
const mainUI = document.getElementById('mainUI');
const introCanvas = document.getElementById('introCanvas');
const term = document.getElementById('term');
const terminalBox = document.getElementById('terminalBox');

const terminalTyper = createTerminalTyper(term, terminalBox, lines, {
  typeSpeed: 18,
  lineDelay: 260
});

const introAnimation = createIntroAnimation({
  body,
  intro,
  mainUI,
  canvas: introCanvas,
  onFinish: () => {
    terminalTyper.start();
  }
});

introAnimation.start();