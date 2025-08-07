'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function GuitarList({ menuItems }) {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const zoomRef = useRef(null);

  const closeOverlay = () => {
    setSelectedGuitar(null);
    setZoomVisible(false);
  };

  const handleMouseMove = (e) => {
    const rect = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      <section className='grid grid-cols-1 md:grid-cols-5 gap-4 px-4 mb-12'>
        {menuItems.map((item) => (
          <div
            key={item}
            className='bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 rounded shadow cursor-pointer'
            onClick={() => setSelectedGuitar(item)}
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

          <div
            ref={zoomRef}
            className='relative max-w-full max-h-full hidden md:block'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setZoomVisible(true)}
            onMouseLeave={() => setZoomVisible(false)}
          >
            <Image
              src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
              alt={selectedGuitar}
              width={1200}
              height={1800}
              className='w-auto h-full max-h-[100vh] mx-auto select-none'
              priority
            />

            {/* Zoom lens */}
            {zoomVisible && (
              <div
                className='absolute w-64 h-64 border-2 border-white rounded-full overflow-hidden pointer-events-none z-40'
                style={{
                  top: `calc(${zoomPosition.y}% - 128px)`,
                  left: `calc(${zoomPosition.x}% - 128px)`,
                  backgroundImage: `url(/guitar-thumbs/${selectedGuitar.toLowerCase()}.png)`,
                  backgroundSize: '2000px auto',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            )}
          </div>

          {/* Mobile fallback image (no zoom) */}
          <div className='md:hidden max-w-full max-h-full'>
            <Image
              src={`/guitar-thumbs/${selectedGuitar.toLowerCase()}.png`}
              alt={selectedGuitar}
              width={1200}
              height={1800}
              className='w-auto h-full max-h-[100vh] mx-auto'
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
