'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b border-white/10 transition-all duration-300 ${
        scrolled ? 'opacity-75' : 'opacity-100'
      }`}
    >
      <div className='bg-camo bg-cover py-1'>
        <div className='mx-auto max-w-6xl px-4 flex items-center justify-between transition-all duration-300'>
          <Image
            src='/logo-horiz.png'
            alt='Warboy Logo'
            width={300}
            height={80}
            className={`mx-auto transition-all duration-300 ${
              scrolled
                ? 'md:w-[150px] w-[120px] md:h-[40px] h-[30px]'
                : 'md:w-[300px] w-[240px] md:h-[80px] h-[60px]'
            }`}
          />
        </div>
      </div>
    </header>
  );
}
