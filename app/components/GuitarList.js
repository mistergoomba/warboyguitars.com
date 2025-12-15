'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { GUITARS } from '@/app/guitar/data';

export default function GuitarList({ guitarOrder = [] }) {
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
    const bgImage = guitar.bg;
    const sectionRef = useRef(null);

    // Track scroll progress through this section
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ['start end', 'end start'],
    });

    // Title: scroll up and into position, landing when section reaches top
    // Start below (100px down) and move to final position (0) as section approaches top
    const titleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.8, 1]);

    // Button: hidden until 90% of scroll progress, then fade in quickly
    const buttonOpacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1]);

    // Guitar: subtle size growth as you scroll
    const guitarScale = useTransform(scrollYProgress, [0.2, 0.5], [0.6, 1.1]);

    return (
      <div
        ref={sectionRef}
        data-guitar-section={guitar.slug}
        className='sticky top-0 w-full h-[100vh] flex items-start justify-center pt-8'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex,
        }}
      >
        <div className='flex flex-col items-center gap-1'>
          <motion.div
            style={{
              y: titleY,
              opacity: titleOpacity,
            }}
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
            style={{
              opacity: buttonOpacity,
              paddingTop: '10px',
            }}
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
            style={{
              scale: guitarScale,
            }}
          >
            <Image
              src={guitar.thumb}
              alt={guitar.name}
              width={400}
              height={600}
              className='w-auto h-[70vh] object-contain'
              sizes='(max-width: 768px) 100vw, 50vw'
              priority={index === 0}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section className='relative w-full'>
      {guitars.map((guitar, index) => (
        <GuitarRow key={guitar.slug} guitar={guitar} index={index} />
      ))}
    </section>
  );
}
