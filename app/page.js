'use client';

import Hero from './components/Hero';
import GuitarList from './components/GuitarList';
import Footer from './components/Footer';
import GuitarProgressTimeline from './components/GuitarProgressTimeline';

// Order: warpig, ravenhawk, specter, arcwind, clawtooth, thunderpig
const guitarOrder = ['warpig', 'ravenhawk', 'specter', 'arcwind', 'clawtooth', 'thunderpig'];

export default function Home() {
  return (
    <div className='min-h-[100vh]'>
      <GuitarProgressTimeline guitarOrder={guitarOrder} />
      <Hero />
      {/* Mobile Ad Copy - appears after hero scroll */}
      <section className='md:hidden text-white py-12 px-8'>
        <p className='text-xl text-center leading-relaxed max-w-4xl mx-auto'>
          Warboy Guitars were born on the battlefield of creativity, built by musicians who demanded
          more. Every Warboy is a precision-crafted instrument engineered for speed, tone, and
          power. Our guitars deliver custom-shop quality at half the price of commercial brands.
          Forget the cookie-cutter imports. This is your weapon of choice. Built by musicians, for
          musicians.
        </p>
      </section>
      <GuitarList guitarOrder={guitarOrder} />
      <Footer />
    </div>
  );
}
