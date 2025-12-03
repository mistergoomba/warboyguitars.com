'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GUITARS } from '@/app/guitar/data';

// Order: warpig, ravenhawk, specter, arcwind, clawtooth
const guitarOrder = ['warpig', 'ravenhawk', 'specter', 'arcwind', 'clawtooth'];
const guitars = guitarOrder.map((slug) => GUITARS[slug]).filter(Boolean);

// Check WebP support
function useWebPSupport() {
  const [supportsWebP, setSupportsWebP] = useState(true); // Default to true for SSR

  useEffect(() => {
    const webP = new window.Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

  return supportsWebP;
}

function GuitarRow({ guitar, index }) {
  // z-index increases: 0, 10, 20, 30 for stacking effect
  const zIndex = index * 10;
  const supportsWebP = useWebPSupport();
  const bgImage = supportsWebP ? guitar.bg : guitar.bgFallback || guitar.bg;

  return (
    <div
      className='sticky top-0 w-full h-[100dvh] flex items-start justify-center pt-8'
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex,
      }}
    >
      <motion.div
        className='flex flex-col items-center gap-1'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <Link
            href={`/guitar/${guitar.slug}`}
            className='text-white text-4xl md:text-6xl font-bold hover:opacity-80 transition'
            style={{ fontFamily: 'Rockwell, serif' }}
          >
            {guitar.name}
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <Link
            href={`/guitar/${guitar.slug}`}
            className='bg-[#a54c3c] text-white text-lg md:text-xl font-bold px-4 py-2 rounded hover:bg-[#863d30] transition'
          >
            more info
          </Link>
        </motion.div>
        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Image
            src={guitar.thumb}
            alt={guitar.name}
            width={400}
            height={600}
            className='w-auto h-[70dvh] object-contain'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={index === 0}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function GuitarList() {
  return (
    <section className='relative w-full'>
      {guitars.map((guitar, index) => (
        <GuitarRow key={guitar.slug} guitar={guitar} index={index} />
      ))}
    </section>
  );
}
