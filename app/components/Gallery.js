// Gallery.js
'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

export default function Gallery({ images = [], name, manifestUrl }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [items, setItems] = useState([]); // {thumb, large, alt}

  // Parse "path 400w, path 800w, ..." => pick by width
  function pickWidth(srcSetStr, target) {
    if (!srcSetStr) return null;
    const parts = srcSetStr.split(',').map((s) => s.trim());
    // normalize to [ {url, w}, ... ]
    const entries = parts
      .map((p) => {
        const [url, wtoken] = p.split(' ');
        const w = parseInt((wtoken || '').replace('w', ''), 10);
        return { url, w };
      })
      .filter((e) => e.url && Number.isFinite(e.w))
      .sort((a, b) => a.w - b.w);

    // exact match -> otherwise closest larger -> fallback to largest
    const exact = entries.find((e) => e.w === target);
    if (exact) return exact.url;
    const larger = entries.find((e) => e.w >= target);
    return (larger || entries[entries.length - 1])?.url || null;
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // If no manifest, map provided images as-is
      if (!manifestUrl) {
        const basic = images.map((src) => ({ thumb: src, large: src, alt: name }));
        if (!cancelled) setItems(basic);
        return;
      }
      try {
        const res = await fetch(`${manifestUrl}?v=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const mapped = (data.images || []).map((img) => {
          let thumb = pickWidth(img.srcSetJpeg, 400) || pickWidth(img.srcSetJpeg, 800);
          let large = pickWidth(img.srcSetJpeg, 1600) || pickWidth(img.srcSetJpeg, 1200);

          return {
            thumb: thumb || '/placeholder.jpg',
            large: large || thumb,
            alt: img.alt || name,
          };
        });
        if (!cancelled) setItems(mapped);
      } catch (err) {
        // Fallback to provided images if manifest fetch fails
        const basic = images.map((src) => ({ thumb: src, large: src, alt: name }));
        if (!cancelled) setItems(basic);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [manifestUrl, images, name]);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const next = useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length]
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

  if (!items.length) return null;

  return (
    <>
      {/* Thumbs */}
      <div className='mt-8 grid grid-cols-3 sm:grid-cols-4 gap-3'>
        {items.map((it, i) => (
          <button
            key={`${it.thumb}-${i}`}
            onClick={() => openAt(i)}
            className='transition'
            aria-label={`Open ${name} image ${i + 1}`}
          >
            <div className='relative aspect-square overflow-hidden border border-white/10 hover:border-white/40 rounded cursor-pointer'>
              <Image
                src={it.thumb}
                alt={`${name} ${i + 1}`}
                fill
                sizes='(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw'
                className='object-cover w-full h-full'
                draggable={false}
              />
            </div>
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

          {/* Large image */}
          <div className='relative w-[92vw] md:w-[80vw] h-[80vh]'>
            <Image
              src={items[idx].large}
              alt={`${name} ${idx + 1}`}
              fill
              sizes='(max-width: 768px) 92vw, 80vw'
              className='object-contain'
              priority
              draggable={false}
            />
          </div>

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
