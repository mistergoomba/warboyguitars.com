'use client';

import { useState } from 'react';
import Image from 'next/image';
import ZoomOverlay from '@/app/components/ZoomOverlay';
import Gallery from '@/app/components/Gallery';
import { GUITARS, ALL } from '../data';

export default function GuitarClient({ slug }) {
  const guitar = GUITARS[slug] ?? GUITARS['warpig'];
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <>
      {/* Content row */}
      <section className='mx-auto max-w-6xl px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left: hero image with overlay zoom control */}
        <div className='relative'>
          <div className='relative bg-[#20251a] p-3 rounded group'>
            {/* Magnifying glass button (top-right) */}
            <button
              type='button'
              onClick={() => setZoomOpen(true)}
              aria-label='Open zoom overlay'
              className='absolute top-4 right-4 z-10 rounded-full p-2 bg-black/60 hover:bg-black/80 transition shadow cursor-pointer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-white'
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
            </button>

            {/* Entire hero is clickable (and keyboard accessible) */}
            <div
              role='button'
              tabIndex={0}
              onClick={() => setZoomOpen(true)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZoomOpen(true)}
              className='cursor-zoom-in outline-none'
            >
              <Image
                src={guitar.hero}
                alt={guitar.name}
                width={1200}
                height={1600}
                className='w-full h-auto select-none'
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Right: name + specs + testimonial */}
        <div className='text-center'>
          <h1 className='text-4xl tracking-wide font-blackops'>{guitar.name}</h1>

          <ul className='mt-4 space-y-2 text-2xl leading-relaxed font-russo list-none'>
            {guitar.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          {guitar.testimonial && (
            <blockquote className='mt-6 border-l-4 border-white/20 pl-4 italic text-white/80'>
              {guitar.testimonial}
            </blockquote>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className='mx-auto max-w-6xl px-4 mb-16'>
        <Gallery images={guitar.images} name={guitar.name} />
      </section>

      {/* Zoom overlay (reuses your old behavior) */}
      {zoomOpen && (
        <ZoomOverlay
          src={guitar.hero}
          alt={`${guitar.name} zoomed`}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </>
  );
}
