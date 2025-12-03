'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import GuitarList from './components/GuitarList';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className='min-h-[100dvh]'>
      <Header enableScrollBehavior={true} />
      <Hero />
      <GuitarList />
      <Footer />
    </div>
  );
}
