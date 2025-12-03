'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { GUITARS } from '@/app/guitar/data';

export default function Hero() {
  const [logoComplete, setLogoComplete] = useState(false);
  const [guitarComplete, setGuitarComplete] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const GUITAR_LIST = Object.values(GUITARS).map(({ name, slug }) => ({ name, slug }));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const chevronOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const handleGuitarComplete = () => {
    setGuitarComplete(true);
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 300);
  };

  return (
    <>
      <div ref={containerRef} data-hero-section className='relative w-full min-h-[90vh] md:min-h-[100vh]'>
        <motion.div
          className='w-full h-[90vh] md:h-[100vh] flex flex-col overflow-visible md:overflow-hidden md:sticky top-0'
          animate={
            shouldShake
              ? {
                  x: [0, -5, 5, -5, 5, -3, 3, 0],
                  y: [0, -2, 2, -2, 2, -1, 1, 0],
                }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload='metadata'
            className='absolute inset-0 w-full h-full object-cover z-0'
          >
            <source src='/main-ad-bg.webm' type='video/webm' />
            <source src='/main-ad-bg.mp4' type='video/mp4' />
          </video>
          <div className='relative z-20 pt-8 px-8 flex-shrink-0'>
            {/* Left: Hamburger - Absolutely positioned */}
            <motion.div className='absolute top-2 left-2 md:top-8 md:left-8 z-30'>
              <button
                aria-label='Open menu'
                aria-expanded={menuOpen}
                aria-controls='site-menu'
                onClick={() => setMenuOpen(true)}
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
            </motion.div>

            {/* Right: Tagline and badge - Absolutely positioned */}
            <motion.div className='absolute top-2 right-2 md:top-8 md:right-8 z-30 flex items-center gap-2'>
              <span className='hidden md:inline font-russo tracking-wide uppercase text-right text-sm text-[#e6e3db]/90'>
                quality guitars
                <br />
                for less
              </span>
              <Image
                src='/ca-usa-badge.webp'
                alt='California, USA'
                width={66}
                height={75}
                className='transition-all duration-300 cursor-pointer md:w-[35px] w-[26px] md:h-[40px] h-[30px]'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={guitarComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onAnimationComplete={() => setLogoComplete(true)}
              className='mb-8'
            >
              <Image
                src='/logo-big.webp'
                alt='Warboy Guitars Logo'
                width={800}
                height={400}
                className='w-auto h-auto mx-auto'
                priority
              />
            </motion.div>
            <div className='md:flex md:items-start md:gap-8 md:max-w-[650px] md:mx-auto'>
              <motion.div className='text-left max-w-4xl mx-auto md:mx-0 font-bold text-4xl'>
                <motion.div
                  initial='hidden'
                  animate={logoComplete && guitarComplete ? 'visible' : 'hidden'}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                >
                  <motion.div
                    className='hero-tagline'
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    Handcrafted.
                  </motion.div>
                  <motion.div
                    className='hero-tagline'
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    Battle-Tested.
                  </motion.div>
                  <motion.div
                    className='hero-tagline'
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    Ready to Shred.
                  </motion.div>
                  <motion.div
                    className='hero-title'
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    This is Warboy.
                  </motion.div>
                </motion.div>
              </motion.div>
              <div
                className={`hidden md:block md:flex-1 md:text-left md:text-white md:mt-0 fade-in`}
              >
                <p className='text-base leading-relaxed max-w-[253px] md:ml-auto'>
                  Warboy Guitars were born on the battlefield of creativity, built by musicians who
                  demanded more. Every Warboy is a precision-crafted instrument engineered for
                  speed, tone, and power. Our guitars deliver custom-shop quality at half the price
                  of commercial brands. Forget the cookie-cutter imports. This is your weapon of
                  choice. Built by musicians, for musicians.
                </p>
              </div>
            </div>
          </div>
          <motion.div
            className='absolute bottom-0 left-0 right-0 z-0 pb-8 h-[60vh]'
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onAnimationComplete={handleGuitarComplete}
          >
            <Image
              src='/main-ad-guitar.webp'
              alt='Guitar'
              width={1200}
              height={800}
              className='w-auto h-full mx-auto object-contain'
              priority
            />
          </motion.div>
          <motion.div
            className='fixed bottom-0 left-1/2 transform -translate-x-1/2 z-30'
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ opacity: chevronOpacity }}
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='opacity-50'
            >
              <path
                d='M6 9L12 15L18 9'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide-over Menu */}
      {menuOpen && (
        <div
          className='fixed inset-0 z-40'
          role='dialog'
          aria-modal='true'
          onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
        >
          <div className='absolute inset-0 bg-black/60' onClick={() => setMenuOpen(false)} />
          <nav
            id='site-menu'
            className='absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-[#10130d] text-[#e6e3db] border-r border-white/10 shadow-xl p-6 overflow-y-auto'
          >
            <div className='flex items-center justify-between mb-6'>
              <span className='font-blackops text-xl'>Menu</span>
              <button
                aria-label='Close menu'
                onClick={() => setMenuOpen(false)}
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
                    onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
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
