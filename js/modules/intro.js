export function createIntroAnimation({
  body,
  intro,
  mainUI,
  canvas,
  onFinish
}) {
  const ctx = canvas.getContext('2d');

  const PALETTE = ['#8b5cf6', '#3b82f6', '#ffffff'];
  const pickColor = i => PALETTE[i % PALETTE.length];

  let fontSize = 18;
  let columns = 0;
  let drops = [];
  let frame = 0;
  let rainIntensity = 1;
  let introFinished = false;

  function fitCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setupRain() {
    columns = Math.max(12, Math.floor(window.innerWidth / fontSize));
    drops = Array.from(
      { length: columns },
      () => Math.random() * -(window.innerHeight / fontSize)
    );
  }

  function drawRain() {
    ctx.fillStyle = 'rgba(34, 41, 55, 0.14)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`;

    let activeCols = 0;

    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (drops[i] > -30) {
        ctx.globalAlpha = 0.82;
        ctx.fillStyle = pickColor(i + frame);
        ctx.fillText(Math.random() < 0.5 ? '0' : '1', x, y);
        activeCols++;
      }

      drops[i] += 2.0;

      if (y > window.innerHeight) {
        if (Math.random() < rainIntensity) {
          drops[i] = Math.random() * -18;
        } else {
          drops[i] = -9999;
        }
      }
    }

    ctx.globalAlpha = 1;
    return activeCols;
  }

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    mainUI.classList.add('ui-ready');
    body.classList.remove('intro-active');
    intro.remove();

    if (onFinish) onFinish();
  }

  function loop() {
    frame++;
    const activeCols = drawRain();

    if (frame > 24) {
      rainIntensity *= 0.972;
    }

    if (rainIntensity < 0.04 || activeCols === 0) {
      finishIntro();
      return;
    }

    requestAnimationFrame(loop);
  }

  function handleResize() {
    fitCanvas();
    setupRain();
  }

  function start() {
    handleResize();
    window.addEventListener('resize', handleResize);
    loop();
  }

  return { start };
}