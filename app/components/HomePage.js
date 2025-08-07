'use client';

import { motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import GuitarList from './GuitarList';
import Footer from './Footer';

const menuItems = ['WARPIG', 'THUNDERPIG', 'SPECTER', 'CLAWTOOTH', 'ARCWIND'];

export default function HomePage() {
  return (
    <motion.div
      className='min-h-[100dvh] bg-camo bg-fixed text-white flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <Header menuItems={menuItems} />
      <Hero />
      <GuitarList menuItems={menuItems} />
      <Footer />
    </motion.div>
  );
}
