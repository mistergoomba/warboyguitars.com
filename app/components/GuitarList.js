'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function GuitarList({ menuItems }) {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // pan state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // bounds math
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const scaleWhenZoomed = 4; // tweak if you want
  const scale = zoomed ? scaleWhenZoomed : 1;

  // disable page scroll while overlay is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', !!selectedGuitar);
    return () => document.body.classList.remove('overflow-hidden');
  }, [selectedGuitar]);

  const closeOverlay = () => {
    setSelectedGuitar(null);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  };

  const getBounds = useCallback(() => {
    // Computes max pan so the image cannot fully leave the screen
    // (i.e., always some part remains visible).
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return { maxX: 0, maxY: 0 };

    const cRect = container.getBoundingClientRect();
    const iRect = img.getBoundingClientRect();

    // iRect reflects current transform; we want the base (unscaled) size.
    // We can derive it by dividing by current scale.
    const baseWidth = iRect.width / scale;
    const baseHeight = iRect.height / scale;

    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;

    // If the scaled image is smaller than the container along an axis,
    // we don't allow panning on that axis (max = 0).
    const maxX = Math.max(0, (scaledWidth - cRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - cRect.height) / 2);

    return { maxX, maxY };
  }, [scale]);

  const clampOffset = useCallback(
    (x, y) => {
      const { maxX, maxY } = getBounds();
      return {
        x: Math.min(Math.max(x, -maxX), maxX),
        y: Math.min(Math.max(y, -maxY), maxY),
      };
    },
    [getBounds]
  );

  // Re-clamp whenever zoom changes or window resizes (so it never gets stuck off-screen)
  useEffect(() => {
    const onResize = () => setOffset((o) => clampOffset(o.x, o.y));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [clampOffset]);

  const startDrag = (x, y) => {
    if (!zoomed) return;
    setStartPos({ x, y });
    setIsDragging(true);
  };

  const drag = (x, y) => {
    if (!zoomed || !startPos) return;
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    setOffset((prev) => clampOffset(prev.x + dx, prev.y + dy));
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
      // After zooming in, clamp in case prior offsets exist
      setOffset((o) => clampOffset(o.x, o.y));
    }
  };

  return (
    <>
      {/* Grid */}
      <section className={`grid grid-cols-1 md:grid-cols-${menuItems.length} gap-4 px-4 mb-12`}>
        {menuItems.map((item) => (
          <div
            key={item}
            className='bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 rounded shadow cursor-pointer'
            onClick={() => {
              setSelectedGuitar(item);
              setImageLoaded(false);
              setZoomed(false);
              setOffset({ x: 0, y: 0 });
            }}
          >
            <div className='w-full mb-4 bg-[#616435]'>
              <Image
                src={`/guitar-thumbs/${item.toLowerCase()}.png`}
                alt={item}
                width={400}
                height={600}
                className='w-full h-auto'
                sizes='(max-width: 768px) 100vw, 20vw'
              />
            </div>
            <button className='border border-white px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition cursor-pointer'>
              {item}
            </button>
          </div>
        ))}
      </section>

      {/* Fullscreen overlay */}
      {selectedGuitar && (
        <div className='fixed inset-0 z-40 bg-black/90'>
          {/* Controls (always on top) */}
          <button
            className='fixed top-4 right-4 text-white text-4xl font-bold z-50'
            onClick={closeOverlay}
          >
            &times;
          </button>

          {imageLoaded && (
            <button
              className='fixed bottom-6 right-6 z-50 bg-white text-black px-3 py-1 rounded-full items-center gap-2 text-sm font-bold cursor-pointer flex'
              onClick={toggleZoom}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
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
            <div className='absolute inset-0 z-40 flex items-center justify-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white/50'></div>
            </div>
          )}

          {/* Drag surface (entire screen) */}
          <div
            ref={containerRef}
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
          >
            {/* Centering wrapper so scale/translate feels natural */}
            <div className='w-full h-full flex items-center justify-center'>
              <Image
                ref={imageRef}
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
