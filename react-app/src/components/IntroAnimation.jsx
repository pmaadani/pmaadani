import { useEffect, useRef } from 'react';

const PALETTE = ['#8b5cf6', '#3b82f6', '#ffffff'];

export default function IntroAnimation({ onFinish }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let fontSize = 18;
    let columns = 0;
    let drops = [];
    let frame = 0;
    let rainIntensity = 1;
    let animationFrameId;
    let finished = false;

    function fitCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function setupRain() {
      columns = Math.max(12, Math.floor(window.innerWidth / fontSize));

      drops = Array.from(
        { length: columns },
        () => Math.random() * -(window.innerHeight / fontSize),
      );
    }

    function drawRain() {
      ctx.fillStyle = 'rgba(34, 41, 55, 0.14)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`;

      let activeColumns = 0;

      for (let index = 0; index < columns; index += 1) {
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        if (drops[index] > -30) {
          ctx.globalAlpha = 0.82;
          ctx.fillStyle = PALETTE[(index + frame) % PALETTE.length];
          ctx.fillText(Math.random() < 0.5 ? '0' : '1', x, y);
          activeColumns += 1;
        }

        drops[index] += 2;

        if (y > window.innerHeight) {
          if (Math.random() < rainIntensity) {
            drops[index] = Math.random() * -18;
          } else {
            drops[index] = -9999;
          }
        }
      }

      ctx.globalAlpha = 1;
      return activeColumns;
    }

    function finish() {
      if (finished) {
        return;
      }

      finished = true;
      onFinish();
    }

    function animate() {
      frame += 1;
      const activeColumns = drawRain();

      if (frame > 24) {
        rainIntensity *= 0.972;
      }

      if (rainIntensity < 0.04 || activeColumns === 0) {
        finish();
        return;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function handleResize() {
      fitCanvas();
      setupRain();
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [onFinish]);

  return (
    <div className="intro-screen">
      <canvas ref={canvasRef} />
    </div>
  );
}