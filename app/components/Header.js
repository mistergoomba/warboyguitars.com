'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GUITARS } from '@/app/guitar/data';

export default function Header({ enableScrollBehavior = false }) {
  // HomePage: starts hidden (enableScrollBehavior=true)
  // Other pages: starts visible (enableScrollBehavior=false)
  const [visible, setVisible] = useState(!enableScrollBehavior);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (enableScrollBehavior) {
        // HomePage behavior: hide at top, hide on scroll down, show on scroll up
        if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
          // Scrolling up and past initial threshold
          setVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setVisible(false);
        } else if (currentScrollY <= 50) {
          // Near top of page, hide header
          setVisible(false);
        }
      } else {
        // Other pages behavior: show at top, hide on scroll down, show on scroll up
        if (currentScrollY <= 50) {
          // At top of page, always show header
          setVisible(true);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enableScrollBehavior]);

  useEffect(() => {
    if (open) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  const GUITAR_LIST = Object.values(GUITARS).map(({ name, slug }) => ({ name, slug }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 border-b border-white/10 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
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
              <Link href='/' className='block'>
                <Image
                  src='/logo-horiz.webp'
                  alt='Warboy Logo'
                  width={300}
                  height={80}
                  className={`transition-all duration-300 cursor-pointer md:w-[150px] w-[120px] md:h-[40px] h-[30px]`}
                />
              </Link>
            </div>

            {/* Right: Tagline (desktop only) */}
            <div className='flex justify-end items-center gap-2'>
              <span className='hidden md:inline font-russo tracking-wide uppercase text-right text-sm text-[#e6e3db]/90'>
                quality guitars
                <br />
                for less
              </span>
              <Image
                src='/ca-usa-badge.png'
                alt='California, USA'
                width={66}
                height={75}
                className={`transition-all duration-300 cursor-pointer md:w-[35px] w-[26px] md:h-[40px] h-[30px]`}
              />
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
                    href={`/guitar/${g.slug}`}
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
