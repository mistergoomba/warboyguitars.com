'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ZoomOverlay({ src, alt, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const scaleWhenZoomed = 4;
  const scale = zoomed ? scaleWhenZoomed : 1;

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const startDrag = (x, y) => {
    if (!zoomed) return;
    setStartPos({ x, y });
    setIsDragging(true);
  };
  const drag = (x, y) => {
    if (!zoomed || !startPos) return;
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    setOffset((p) => ({ x: p.x + dx, y: p.y + dy }));
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
    } else setZoomed(true);
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/90'>
      <button
        type='button'
        className='fixed top-4 right-4 text-white text-4xl font-bold z-50'
        onClick={onClose}
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

      {!imageLoaded && (
        <div className='absolute inset-0 z-40 flex items-center justify-center' aria-live='polite'>
          <div
            className='animate-spin rounded-full h-16 w-16 border-t-4 border-white/50'
            role='status'
            aria-label='Loading image'
          />
        </div>
      )}

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
        style={{ cursor: zoomed ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      >
        <div className='w-full h-full flex items-center justify-center'>
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1600}
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
  );
}
