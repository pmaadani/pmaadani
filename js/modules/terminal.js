export function createTerminalTyper(termElement, terminalBox, lines, options = {}) {
  let li = 0;
  let ci = 0;
  let started = false;

  const typeSpeed = options.typeSpeed ?? 18;
  const lineDelay = options.lineDelay ?? 260;

  function highlight(s) {
    let e = s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (/&lt;!--.*--&gt;/.test(e)) {
      return `<span class="comment">${e}</span>`;
    }

    e = e.replace(
      /(&lt;\/?)([a-zA-Z0-9-]+)\s*([^&]*?)(&gt;)/g,
      (m, open, tag, attrs, close) => {
        const attrsHL = attrs.replace(
          /([a-zA-Z_:.-]+)(=)("[^"]*"|'[^']*')/g,
          `<span class="attr">$1</span>$2<span class="val">$3</span>`
        ).trim();

        return `<span class="angle">${open}</span><span class="tag">${tag}</span>${attrsHL ? ' ' + attrsHL : ''}<span class="angle">${close}</span>`;
      }
    );

    return e;
  }

  function typeNext() {
    if (li >= lines.length) return;

    if (ci === 0) {
      const line = document.createElement('div');
      line.className = 'line';
      termElement.appendChild(line);
    }

    const current = termElement.querySelectorAll('.line')[li];
    const text = lines[li];

    current.innerHTML = highlight(text.substring(0, ci + 1));
    ci++;
    termElement.scrollTop = termElement.scrollHeight;

    if (ci < text.length) {
      setTimeout(typeNext, typeSpeed);
    } else {
      ci = 0;
      li++;
      setTimeout(typeNext, lineDelay);
    }
  }

  function start() {
    if (started) return;
    started = true;
    terminalBox.classList.add('show');
    typeNext();
  }

  return { start };
}