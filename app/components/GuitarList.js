'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const guitarList = ['WARPIG', 'SPECTER', 'CLAWTOOTH', 'ARCWIND'];

export default function GuitarList() {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // pan state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // bounds math
  const scaleWhenZoomed = 4; // tweak if you want
  const scale = zoomed ? scaleWhenZoomed : 1;

  // disable page scroll while overlay is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', !!selectedGuitar);
    return () => document.body.classList.remove('overflow-hidden');
  }, [selectedGuitar]);

  useEffect(() => {
    if (!selectedGuitar) return;
    const onKey = (e) => e.key === 'Escape' && closeOverlay();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedGuitar]);

  const closeOverlay = () => {
    setSelectedGuitar(null);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  };

  const startDrag = (x, y) => {
    if (!zoomed) return;
    setStartPos({ x, y });
    setIsDragging(true);
  };

  const drag = (x, y) => {
    if (!zoomed || !startPos) return;
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setStartPos({ x, y });
  };

  const stopDrag = () => {
    setStartPos(null);
    setIsDragging(false);
  };

  const toggleZoom = () => {
    if (zoomed) {
      setZoomed(false);
      setOffset({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  };

  return (
    <>
      {/* Grid */}
      <section className={`grid grid-cols-1 md:grid-cols-4 gap-4 px-4 mb-12`}>
        {guitarList.map((item) => (
          <div
            key={item}
            className='bg-[#3f4a2e] bg-opacity-50 flex flex-col items-center justify-center p-4 rounded shadow cursor-pointer'
            onClick={() => {
              setSelectedGuitar(item);
              setImageLoaded(false);
              setZoomed(false);
              setOffset({ x: 0, y: 0 });
            }}
          >
            <div className='w-full mb-4 bg-[#6a7149]'>
              <Image
                src={`/guitar-thumbs/${item.toLowerCase()}.png`}
                alt={item}
                width={400}
                height={600}
                className='w-full h-auto'
                sizes='(max-width: 768px) 100vw, 20vw'
              />
            </div>
            <button className='bg-[#a54c3c] px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition cursor-pointer'>
              {item}
            </button>
          </div>
        ))}
      </section>

      {/* Fullscreen overlay */}
      {selectedGuitar && (
        <div
          className='fixed inset-0 z-40 bg-black/90'
          role='dialog'
          aria-modal='true'
          aria-label={`Zoomed view of ${selectedGuitar}`}
        >
          {/* Controls (always on top) */}
          <button
            type='button'
            className='fixed top-4 right-4 text-white text-4xl font-bold z-50'
            onClick={closeOverlay}
            aria-label='Close'
          >
            &times;
          </button>

          {imageLoaded && (
            <button
              type='button'
              className='fixed bottom-6 right-6 z-50 bg-white text-black px-3 py-1 rounded-full items-center gap-2 text-sm font-bold cursor-pointer flex'
              onClick={toggleZoom}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-4.35-4.35m1.7-4.65a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              {zoomed ? 'Zoom Out' : 'Zoom In'}
            </button>
          )}

          {/* Loading spinner */}
          {!imageLoaded && (
            <div
              className='absolute inset-0 z-40 flex items-center justify-center'
              aria-live='polite'
            >
              <div
                className='animate-spin rounded-full h-16 w-16 border-t-4 border-white/50'
                role='status'
                aria-label='Loading image'
              />
            </div>
          )}

          {/* Drag surface (entire screen) */}
          <div
            className='absolute inset-0 z-40 touch-none'
            onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
            onMouseMove={(e) => drag(e.clientX, e.clientY)}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => drag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={stopDrag}
            onDoubleClick={toggleZoom}
            style={{
              cursor: zoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            }}
            aria-label='Pan area'
          >
            {/* Centering wrapper so scale/translate feels natural */}
            <div className='w-full h-full flex items-center justify-center'>
              <Image
                src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
                alt={selectedGuitar}
                width={1200}
                height={1800}
                className='max-h-[90vh] w-auto select-none pointer-events-none'
                priority
                onLoad={() => setImageLoaded(true)}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease',
                  transformOrigin: 'center',
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
