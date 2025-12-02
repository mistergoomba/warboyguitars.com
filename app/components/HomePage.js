'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [logoComplete, setLogoComplete] = useState(false);
  const [guitarComplete, setGuitarComplete] = useState(false);

  return (
    <div
      className='relative w-full min-h-screen flex flex-col overflow-hidden'
      style={{
        backgroundImage: 'url(/main-ad-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative z-20 pt-8 px-8 flex-shrink-0'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => setLogoComplete(true)}
          className='mb-8'
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
        <div className='text-left max-w-4xl mx-auto font-bold text-4xl'>
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
        </div>
      </div>
      <motion.div
        className='fixed bottom-0 left-0 right-0 z-0 pb-8 h-[60vh]'
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onAnimationComplete={() => setGuitarComplete(true)}
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
    </div>
  );
}
