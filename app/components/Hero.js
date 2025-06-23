'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className='relative w-full mb-12 flex items-center justify-center text-white overflow-hidden'>
      <Image src='/hero-1.jpg' alt='Hero Spotlight' width={1024} height={512} priority />
    </section>
  );
}
