'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function GuitarList({ menuItems }) {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mobileZoomed, setMobileZoomed] = useState(false);
  const [mobileOffset, setMobileOffset] = useState({ x: 0, y: 0 });
  const [mobileStart, setMobileStart] = useState(null);

  const imageRef = useRef(null);
  const zoomRef = useRef(null);

  const closeOverlay = () => {
    setSelectedGuitar(null);
    setZoomVisible(false);
  };

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPosition({ x, y, width: rect.width, height: rect.height });
  };

  const handleTouchStart = (e) => {
    if (!mobileZoomed) return;
    const touch = e.touches[0];
    setMobileStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!mobileZoomed || !mobileStart) return;
    const touch = e.touches[0];
    const dx = touch.clientX - mobileStart.x;
    const dy = touch.clientY - mobileStart.y;
    setMobileOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setMobileStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleDoubleTap = () => {
    setMobileZoomed(false);
    setMobileOffset({ x: 0, y: 0 });
  };

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

      {/* Overlay with full image + zoom + close */}
      {selectedGuitar && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4'>
          {/* Close Button */}
          <button
            className='absolute top-4 right-4 text-white text-4xl font-bold z-50'
            onClick={closeOverlay}
          >
            &times;
          </button>

          {/* Loading Spinner */}
          {!imageLoaded && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50'></div>
            </div>
          )}

          {/* Desktop Image with Zoom */}
          <div
            ref={zoomRef}
            className={`relative max-w-full max-h-full hidden md:block ${
              !imageLoaded ? 'invisible' : ''
            }`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setZoomVisible(true)}
            onMouseLeave={() => setZoomVisible(false)}
          >
            <Image
              ref={imageRef}
              src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
              alt={selectedGuitar}
              width={1200}
              height={1800}
              className='w-auto h-full max-h-[90vh] mx-auto select-none'
              priority
              onLoad={() => setImageLoaded(true)}
            />

            {zoomVisible && (
              <div className='absolute inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300 pointer-events-none' />
            )}

            {zoomVisible && imageLoaded && (
              <div
                className={`absolute w-64 h-64 border-2 border-white rounded-full overflow-hidden pointer-events-none z-40 transition-opacity duration-300 ${
                  zoomVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  top: `${zoomPosition.y - 128}px`,
                  left: `${zoomPosition.x - 128}px`,
                  backgroundImage: `url(/guitar-thumbs/${selectedGuitar.toLowerCase()}.png)`,
                  backgroundSize: `3000px auto`,
                  backgroundPosition: `${(zoomPosition.x / zoomPosition.width) * 100}% ${
                    (zoomPosition.y / zoomPosition.height) * 100
                  }%`,
                }}
              />
            )}
          </div>

          {/* Mobile Image */}
          <div
            className={`md:hidden max-w-full max-h-full ${!imageLoaded ? 'invisible' : ''}`}
            onClick={() => setMobileZoomed(!mobileZoomed)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onDoubleClick={handleDoubleTap}
          >
            <Image
              src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
              alt={selectedGuitar}
              width={1200}
              height={1800}
              className='w-auto h-full max-h-[100vh] mx-auto select-none pointer-events-none'
              priority
              onLoad={() => setImageLoaded(true)}
              style={{
                transform: mobileZoomed
                  ? `scale(4) translate(${mobileOffset.x / 2}px, ${mobileOffset.y / 2}px)`
                  : 'scale(1)',
                transition: 'transform 0.25s ease',
                transformOrigin: 'center',
              }}
            />
            {imageLoaded && (
              <div className='absolute bottom-6 right-6 z-50 bg-white text-black px-3 py-1 rounded-full md:hidden flex items-center gap-2 text-sm font-bold'>
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
                {mobileZoomed ? 'Zoom Out' : 'Zoom In'}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
