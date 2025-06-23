'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Intro({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true);
  const [screen, setScreen] = useState({ width: 0, height: 0, landscape: true });

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setScreen({
      width,
      height: height + 100,
      landscape: width >= height * 0.95, // Treat nearly-square as landscape
    });

    const timeout = setTimeout(() => {
      setShowIntro(false);
      onComplete();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (screen.width === 0) return null; // Prevent layout glitches on first render

  const unit = screen.landscape ? screen.width * 0.3 : screen.width - 10; // 30% width or height
  const margin = screen.width * 0.05; // 5% margin
  const starSize = unit;
  const manSize = unit / 7.5;
  const warSize = unit * 0.9;
  const boySize = unit * 0.9;

  const warTarget = screen.landscape
    ? { x: -screen.width / 2 + margin + unit / 2, y: 0 } // left side
    : { x: 0, y: -screen.height / 2 + margin + unit / 2 }; // top

  const boyTarget = screen.landscape
    ? { x: screen.width / 2 - margin - unit / 2, y: 0 } // right side
    : { x: 0, y: screen.height / 2 - margin - unit / 2 }; // bottom

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className='fixed inset-0 bg-black z-50 flex items-center justify-center'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
        >
          {/* Man + Star Container */}
          <div
            className='absolute flex items-center justify-center'
            style={{
              width: starSize,
              height: starSize,
            }}
          >
            {/* Star */}
            <motion.img
              src='/logo/star.png'
              alt='Star'
              style={{ width: starSize }}
              className='absolute'
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />

            {/* Man */}
            <motion.img
              src='/logo/man.png'
              alt='Man'
              style={{ width: manSize }}
              className='absolute'
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* WAR */}
          <motion.img
            src='/logo/war.png'
            alt='WAR'
            style={{ width: warSize, position: 'absolute' }}
            initial={{
              x: screen.landscape ? -screen.width : 0,
              y: screen.landscape ? 0 : -screen.height,
            }}
            animate={warTarget}
            transition={{
              delay: 0.9,
              duration: 0.4,
              type: 'spring',
              stiffness: 500,
              mass: 0.5,
            }}
          />

          {/* BOY */}
          <motion.img
            src='/logo/boy.png'
            alt='BOY'
            style={{ width: boySize, position: 'absolute' }}
            initial={{
              x: screen.landscape ? screen.width : 0,
              y: screen.landscape ? 0 : screen.height,
            }}
            animate={boyTarget}
            transition={{
              delay: 1.2,
              duration: 0.4,
              type: 'spring',
              stiffness: 500,
              mass: 0.5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
