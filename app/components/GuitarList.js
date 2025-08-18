'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GUITARS } from '@/app/guitars/data';

const guitars = Object.values(GUITARS);

export default function GuitarList() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-5 gap-4 px-4 mb-12'>
      {guitars.map((g) => (
        <Link
          key={g.slug}
          href={`/guitars/${g.slug}`}
          className='bg-[#3f4a2e] bg-opacity-50 flex flex-col items-center justify-center p-4 rounded shadow cursor-pointer group'
        >
          <div className='w-full mb-4 bg-[#6a7149]'>
            <Image
              src={g.thumb}
              alt={g.name}
              width={400}
              height={600}
              className='w-full h-auto'
              sizes='(max-width: 768px) 100vw, 20vw'
            />
          </div>
          <span className='bg-[#a54c3c] px-4 py-2 text-sm font-bold group-hover:bg-white group-hover:text-black transition'>
            {g.name}
          </span>
        </Link>
      ))}
    </section>
  );
}
