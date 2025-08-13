import Image from 'next/image';

export default function Hero() {
  return (
    <section className='relative w-full mb-12 text-white'>
      <picture>
        {/* Desktop image */}
        <source srcSet='/hero-desktop.jpg' media='(min-width: 768px)' />
        {/* Mobile fallback */}
        <Image
          src='/hero-mobile.jpg'
          alt='Hero Spotlight'
          width={1600}
          height={900}
          priority
          className='w-full h-auto max-w-full'
        />
      </picture>
    </section>
  );
}
