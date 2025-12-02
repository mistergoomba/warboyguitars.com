'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

export default function HomePage() {
  const [logoComplete, setLogoComplete] = useState(false);
  const [guitarComplete, setGuitarComplete] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);
  const containerRef = useRef(null);
  const adCopyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const taglinesY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const adCopyY = useTransform(scrollYProgress, [0.3, 0.7], [100, 0]);
  const adCopyOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const guitarOpacity = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.5]);

  const handleGuitarComplete = () => {
    setGuitarComplete(true);
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 300);
  };

  return (
    <div ref={containerRef} className='relative w-full min-h-[200vh]'>
      <motion.div
        className='w-full h-screen md:min-h-screen flex flex-col overflow-hidden sticky top-0'
        style={{
          backgroundImage: 'url(/main-ad-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
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
        <div className='relative z-20 pt-8 px-8 flex-shrink-0'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={guitarComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => setLogoComplete(true)}
            className='mb-8'
            style={{ y: logoY }}
          >
            <Image
              src='/logo-big.png'
              alt='Warboy Guitars Logo'
              width={800}
              height={400}
              className='w-auto h-auto mx-auto'
              priority
            />
          </motion.div>
          <div className='md:flex md:items-start md:gap-8 md:max-w-[650px] md:mx-auto'>
            <motion.div
              className='text-left max-w-4xl mx-auto md:mx-0 font-bold text-4xl'
              style={{ y: taglinesY }}
            >
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
            <div className='hidden md:block md:flex-1 md:text-left md:text-white md:mt-0'>
              <p className='text-base leading-relaxed max-w-[253px] md:ml-auto'>
                Warboy Guitars were born on the battlefield of creativity, built by musicians who
                demanded more. Every Warboy is a precision-crafted instrument engineered for speed,
                tone, and power. Our guitars deliver custom-shop quality at half the price of
                commercial brands. Forget the cookie-cutter imports. This is your weapon of choice.
                Built by musicians, for musicians.
              </p>
            </div>
          </div>
          <motion.div
            ref={adCopyRef}
            className='md:hidden px-8 pt-12 text-white h-full'
            style={{ y: adCopyY, opacity: adCopyOpacity }}
          >
            <p className='text-base leading-relaxed max-w-4xl mx-auto'>
              Warboy Guitars were born on the battlefield of creativity, built by musicians who
              demanded more. Every Warboy is a precision-crafted instrument engineered for speed,
              tone, and power. Our guitars deliver custom-shop quality at half the price of
              commercial brands. Forget the cookie-cutter imports. This is your weapon of choice.
              Built by musicians, for musicians.
            </p>
          </motion.div>
        </div>
        <motion.div
          className='fixed bottom-0 left-0 right-0 z-0 pb-8 h-[60vh]'
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onAnimationComplete={handleGuitarComplete}
          style={{ opacity: guitarOpacity }}
        >
          <Image
            src='/main-ad-guitar.png'
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
  );
}
