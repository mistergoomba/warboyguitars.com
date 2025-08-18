'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

export default function Gallery({ images, name }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next, prev]);

  return (
    <>
      {/* Thumbs */}
      <div className='mt-8 grid grid-cols-3 sm:grid-cols-4 gap-3'>
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            className='border border-white/10 hover:border-white/40 transition'
          >
            <Image
              src={src}
              alt={`${name} ${i + 1}`}
              width={400}
              height={300}
              className='w-full h-auto cursor-pointer'
            />
          </button>
        ))}
      </div>

      {/* Fullscreen viewer */}
      {open && (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center'>
          <button
            className='absolute top-4 right-4 text-white text-4xl font-bold'
            onClick={() => setOpen(false)}
            aria-label='Close'
          >
            &times;
          </button>

          <button
            className='absolute left-4 md:left-8 text-3xl text-white/80 hover:text-white'
            onClick={prev}
            aria-label='Previous'
          >
            ‹
          </button>
          <Image
            src={images[idx]}
            alt={`${name} ${idx + 1}`}
            width={1600}
            height={1000}
            className='max-h-[90vh] w-auto'
          />
          <button
            className='absolute right-4 md:right-8 text-3xl text-white/80 hover:text-white'
            onClick={next}
            aria-label='Next'
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
