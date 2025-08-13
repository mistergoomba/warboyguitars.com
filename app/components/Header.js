import Image from 'next/image';

export default function Header() {
  return (
    <header className='bg-gradient-to-b from-black to-[#616435] p-4 relative'>
      <div className='relative flex flex-col items-center justify-center'>
        {/* Logo */}
        <Image
          src='/logo-horiz.png'
          alt='Warboy Logo'
          width={300}
          height={80}
          className='mx-auto md:w-[300px] w-[240px]'
        />
      </div>
    </header>
  );
}
