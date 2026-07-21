import { useEffect, useMemo, useRef, useState } from 'react';
import { terminalLines } from '../data/content';

function highlightLine(text) {
  let escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (/&lt;!--.*--&gt;/.test(escaped)) {
    return `<span class="comment">${escaped}</span>`;
  }

  escaped = escaped.replace(
    /(&lt;\/?)([a-zA-Z0-9-]+)\s*([^&]*?)(&gt;)/g,
    (match, open, tag, attrs, close) => {
      const highlightedAttributes = attrs
        .replace(
          /([a-zA-Z_:.-]+)(=)("[^"]*"|'[^']*')/g,
          '<span class="attr">$1</span>$2<span class="val">$3</span>',
        )
        .trim();

      return `<span class="angle">${open}</span><span class="tag">${tag}</span>${
        highlightedAttributes ? ` ${highlightedAttributes}` : ''
      }<span class="angle">${close}</span>`;
    },
  );

  return escaped;
}

export default function Terminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const terminalRef = useRef(null);

  const visibleLines = useMemo(() => {
    return terminalLines.slice(0, lineIndex + 1);
  }, [lineIndex]);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      return undefined;
    }

    const currentLine = terminalLines[lineIndex];
    const lineComplete = characterIndex >= currentLine.length;

    const timeout = window.setTimeout(
      () => {
        if (lineComplete) {
          setLineIndex((current) => current + 1);
          setCharacterIndex(0);
        } else {
          setCharacterIndex((current) => current + 1);
        }
      },
      lineComplete ? 260 : 18,
    );

    return () => window.clearTimeout(timeout);
  }, [lineIndex, characterIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lineIndex, characterIndex]);

  return (
    <div className="terminal show" ref={terminalRef}>
      <div className="dots">
        <i />
        <i />
        <i />
      </div>

      <div className="code">
        {visibleLines.map((line, index) => {
          const visibleText =
            index === lineIndex
              ? line.slice(0, characterIndex)
              : line;

          return (
            <div
              className="line"
              key={`${index}-${line}`}
              dangerouslySetInnerHTML={{
                __html: highlightLine(visibleText),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}