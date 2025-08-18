'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GUITARS } from '@/app/guitars/data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  const GUITAR_LIST = Object.values(GUITARS).map(({ name, slug }) => ({ name, slug }));

  return (
    <>
      <header
        className={`sticky top-0 z-30 border-b border-white/10 transition-all duration-300 ${
          scrolled ? 'opacity-75' : 'opacity-100'
        }`}
      >
        <div className='bg-camo bg-cover py-1'>
          <div className='mx-auto max-w-6xl px-4 grid grid-cols-6 md:grid-cols-4 items-center'>
            {/* Left: Hamburger */}
            <div className='flex justify-start'>
              <button
                aria-label='Open menu'
                aria-expanded={open}
                aria-controls='site-menu'
                onClick={() => setOpen(true)}
                className='p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
            </div>

            {/* Center: Logo spans 2 columns (50%) */}
            <div className='col-span-4 md:col-span-2 flex justify-center'>
              <Link href='/#no-intro' className='block'>
                <Image
                  src='/logo-horiz.png'
                  alt='Warboy Logo'
                  width={300}
                  height={80}
                  className={`transition-all duration-300 cursor-pointer ${
                    scrolled
                      ? 'md:w-[150px] w-[120px] md:h-[40px] h-[30px]'
                      : 'md:w-[300px] w-[240px] md:h-[80px] h-[60px]'
                  }`}
                />
              </Link>
            </div>

            {/* Right: Tagline (desktop only) */}
            <div className='hidden md:flex justify-end'>
              <span className='font-russo tracking-wide uppercase text-sm text-[#e6e3db]/90'>
                quality guitars for less
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Menu (unchanged) */}
      {open && (
        <div
          className='fixed inset-0 z-40'
          role='dialog'
          aria-modal='true'
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
          <div className='absolute inset-0 bg-black/60' onClick={() => setOpen(false)} />
          <nav
            id='site-menu'
            className='absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-[#10130d] text-[#e6e3db] border-r border-white/10 shadow-xl p-6 overflow-y-auto'
          >
            <div className='flex items-center justify-between mb-6'>
              <span className='font-blackops text-xl'>Menu</span>
              <button
                aria-label='Close menu'
                onClick={() => setOpen(false)}
                className='p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <ul className='space-y-2'>
              <li className='text-xs uppercase tracking-wider text-white/60 mb-2'>Guitars</li>
              {GUITAR_LIST.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guitars/${g.slug}`}
                    onClick={() => setOpen(false)}
                    className='block rounded px-3 py-2 hover:bg-white/10'
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className='mt-6 border-t border-white/10 pt-4'>
              <Link
                href='#contact'
                onClick={() => setOpen(false)}
                className='inline-block rounded px-3 py-2 bg-[#a54c3c] hover:bg-[#863d30] text-white font-bold'
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
