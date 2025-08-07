'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function GuitarList({ menuItems }) {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);

  const imageRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', !!selectedGuitar);
    return () => document.body.classList.remove('overflow-hidden');
  }, [selectedGuitar]);

  const closeOverlay = () => {
    setSelectedGuitar(null);
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  };

  const startDrag = (x, y) => setStartPos({ x, y });

  const drag = (x, y) => {
    if (!zoomed || !startPos) return;
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setStartPos({ x, y });
  };

  const stopDrag = () => setStartPos(null);

  const toggleZoom = () => {
    if (zoomed) {
      setZoomed(false);
      setOffset({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  };

  const renderZoomImage = (isMobile) => (
    <div
      className={`${isMobile ? 'md:hidden' : 'hidden md:block'} max-w-full max-h-full ${
        !imageLoaded ? 'invisible' : ''
      }`}
      onClick={() => setZoomed(true)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => drag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={stopDrag}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onMouseMove={(e) => drag(e.clientX, e.clientY)}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onDoubleClick={toggleZoom}
      style={{
        cursor: zoomed ? 'grab' : 'zoom-in',
        overflow: 'hidden',
      }}
    >
      <Image
        ref={imageRef}
        src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
        alt={selectedGuitar}
        width={1200}
        height={1800}
        className='w-auto h-full max-h-[90vh] md:max-h-[90vh] mx-auto select-none pointer-events-none'
        priority
        onLoad={() => setImageLoaded(true)}
        style={{
          transform: zoomed
            ? `scale(4) translate(${offset.x / 2}px, ${offset.y / 2}px)`
            : 'scale(1)',
          transition: 'transform 0.25s ease',
          transformOrigin: 'center',
        }}
      />
    </div>
  );

  const renderZoomButton = (isMobile) =>
    imageLoaded && (
      <div
        className={`fixed bottom-6 right-6 z-50 bg-white text-black px-3 py-1 rounded-full ${
          isMobile ? 'md:hidden' : 'hidden md:flex'
        } items-center gap-2 text-sm font-bold cursor-pointer`}
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
      </div>
    );

  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-5 gap-4 px-4 mb-12'>
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

      {selectedGuitar && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4'>
          <button
            className='absolute top-4 right-4 text-white text-4xl font-bold z-50'
            onClick={closeOverlay}
          >
            &times;
          </button>

          {!imageLoaded && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50'></div>
            </div>
          )}

          {renderZoomImage(false)}
          {renderZoomImage(true)}
          {renderZoomButton(false)}
          {renderZoomButton(true)}
        </div>
      )}
    </>
  );
}
