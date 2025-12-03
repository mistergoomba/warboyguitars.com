'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GUITARS } from '@/app/guitar/data';

// Order: warpig, specter, arcwind, clawtooth
const guitarOrder = ['warpig', 'specter', 'arcwind', 'clawtooth'];
const guitars = guitarOrder.map((slug) => GUITARS[slug]).filter(Boolean);

function GuitarRow({ guitar, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);

  return (
    <div
      ref={ref}
      className='relative w-full h-[100dvh] flex items-end justify-center pb-8'
      style={{
        backgroundImage: `url(${guitar.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        className='flex flex-col items-center gap-1'
        style={{
          opacity,
          y,
        }}
      >
        <div className='mb-4'>
          <Image
            src={guitar.thumb}
            alt={guitar.name}
            width={400}
            height={600}
            className='w-auto h-[70dvh] object-contain'
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={index === 0}
          />
        </div>
        <Link
          href={`/guitar/${guitar.slug}`}
          className='text-white text-4xl md:text-6xl font-bold hover:opacity-80 transition'
          style={{ fontFamily: 'Rockwell, serif' }}
        >
          {guitar.name}
        </Link>
        <Link
          href={`/guitar/${guitar.slug}`}
          className='bg-[#a54c3c] text-white text-lg md:text-xl font-bold px-4 py-2 rounded hover:bg-[#863d30] transition'
        >
          more info
        </Link>
      </motion.div>
    </div>
  );
}

export default function GuitarList() {
  return (
    <section className='w-full'>
      {guitars.map((guitar, index) => (
        <GuitarRow key={guitar.slug} guitar={guitar} index={index} />
      ))}
    </section>
  );
}
