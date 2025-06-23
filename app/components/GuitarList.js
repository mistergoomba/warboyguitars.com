'use client';

import Image from 'next/image';

export default function GuitarList({ menuItems }) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-5 gap-4 px-4 mb-12'>
      {menuItems.map((item) => (
        <div
          key={item}
          className='bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 rounded shadow'
        >
          <div className='w-full mb-4 bg-[#616435]'>
            <Image
              src={`/guitar-thumbs/${item.toLowerCase()}.png`}
              alt={item}
              width={400}
              height={600}
              className='w-full h-auto'
              sizes='(max-width: 768px) 100vw, 20vw'
            />
          </div>
          <button className='border border-white px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition cursor-pointer'>
            {item}
          </button>
        </div>
      ))}
    </section>
  );
}
