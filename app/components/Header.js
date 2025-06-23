'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header({ menuItems }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-gradient-to-b from-black to-green-900 p-4 relative'>
      <div className='relative flex flex-col items-center justify-center'>
        {/* Mobile Hamburger */}
        <div className='md:hidden absolute left-4 top-1'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-[2rem] font-bold cursor-pointer z-20'
          >
            ☰
          </button>
        </div>

        {/* Logo */}
        <Image
          src='/logo-horiz.png'
          alt='Warboy Logo'
          width={300}
          height={80}
          className='mx-auto md:w-[300px] w-[240px]'
        />

        {/* Desktop menu */}
        <nav className='hidden md:flex mt-4 divide-x divide-white/20'>
          {menuItems.map((item, index) => (
            <button
              key={item}
              className={`text-lg font-bold px-4 cursor-pointer ${
                index === 0 ? '' : 'border-l border-white/20'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className='md:hidden mt-2 flex flex-col items-center z-10'>
            {menuItems.map((item) => (
              <button key={item} className='py-1 text-lg font-bold cursor-pointer'>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
