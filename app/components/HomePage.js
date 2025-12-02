'use client';

import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import GuitarList from './GuitarList';

export default function HomePage() {
  return (
    <>
      <Header enableScrollBehavior={true} />
      <Hero />
      <GuitarList />
      <Footer />
    </>
  );
}
