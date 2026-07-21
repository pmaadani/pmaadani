import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';

const importedPhotos = import.meta.glob(
  '../assets/photos/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
  },
);

function formatTitle(path) {
  const filename = path
    .split('/')
    .pop()
    .replace(/\.[^/.]+$/, '');

  return filename
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

const photos = Object.entries(importedPhotos)
  .sort(([firstPath], [secondPath]) =>
    firstPath.localeCompare(secondPath, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
  .map(([path, src], index) => ({
    id: path,
    src,
    title: formatTitle(path) || `Photograph ${index + 1}`,
    location: 'Personal collection',
  }));

function createSpreads(items) {
  const spreads = [];

  for (let index = 0; index < items.length; index += 2) {
    spreads.push({
      left: items[index],
      right: items[index + 1] ?? null,
    });
  }

  return spreads;
}

function PhotoPage({ photo, pageNumber, empty = false }) {
  if (empty) {
    return (
      <article className="book-page book-page-empty">
        <div className="empty-book-page">
          <span>End of collection</span>
        </div>
      </article>
    );
  }

  return (
    <article className="book-page">
      <div className="book-photo-frame">
        <img
          className="book-photo"
          src={photo.src}
          alt={`${photo.title}, photographed by Parisa Maadani`}
        />
      </div>

      <div className="book-caption">
        <div>
          <h2>{photo.title}</h2>
          <p>{photo.location}</p>
        </div>

        <span>{String(pageNumber).padStart(2, '0')}</span>
      </div>
    </article>
  );
}

export default function Photos() {
  const spreads = useMemo(() => createSpreads(photos), []);
  const [currentSpread, setCurrentSpread] = useState(0);

  const currentPage = spreads[currentSpread];
  const isFirstSpread = currentSpread === 0;
  const isLastSpread = currentSpread === spreads.length - 1;

  function showPrevious() {
    setCurrentSpread((current) => Math.max(current - 1, 0));
  }

  function showNext() {
    setCurrentSpread((current) =>
      Math.min(current + 1, spreads.length - 1),
    );
  }

  if (photos.length === 0) {
    return (
      <div className="photos-page">
        <Navbar />

        <main className="photo-book-container">
          <header className="photo-book-header">
            <div>
              <p className="eyebrow">Personal photography</p>
              <h1>Through my lens</h1>
            </div>

            <p className="photo-book-intro">
              Every photograph in this album was taken by me.
            </p>
          </header>

          <div className="empty-album">
            Add photos to <code>src/assets/photos</code>.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="photos-page">
      <Navbar />

      <main className="photo-book-container">
        <header className="photo-book-header">
          <div>
            <p className="eyebrow">Personal photography</p>
            <h1>Through my lens</h1>
          </div>

          <p className="photo-book-intro">
            A collection of places, details, and everyday moments.
            Every photograph in this album was taken by me.
          </p>
        </header>

        <section
          className="photo-book"
          aria-label="Photography book by Parisa Maadani"
        >
          <div className="book-spine" />

          <PhotoPage
            photo={currentPage.left}
            pageNumber={currentSpread * 2 + 1}
          />

          <PhotoPage
            photo={currentPage.right}
            pageNumber={currentSpread * 2 + 2}
            empty={!currentPage.right}
          />
        </section>

        <div className="book-controls">
          <button
            type="button"
            onClick={showPrevious}
            disabled={isFirstSpread}
          >
            <span aria-hidden="true">←</span>
            Previous
          </button>

          <div className="page-progress">
            <span>
              Spread {currentSpread + 1} of {spreads.length}
            </span>

            <small>{photos.length} photographs</small>
          </div>

          <button
            type="button"
            onClick={showNext}
            disabled={isLastSpread}
          >
            Next
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <footer className="photo-credit">
          All photographs were taken by Parisa Maadani.
        </footer>
      </main>
    </div>
  );
}