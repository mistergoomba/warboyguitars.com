// app/guitar/[slug]/page.js
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import GuitarNav from '../components/GuitarNav';
import GuitarClient from '../components/GuitarClient';
import { GUITARS, ALL } from '../data';

export default async function Page({ params }) {
  const _p = params && typeof params.then === 'function' ? await params : params;
  const { slug } = _p;

  // No hooks in a Server Component
  const tabs = ALL.map((s) => ({ slug: s, name: GUITARS[s].name }));
  const guitar = GUITARS[slug] ?? GUITARS['warpig'];

  return (
    <div className='min-h-[100dvh] text-[#e6e3db] pt-13 relative'>
      {/* Background image */}
      <div className='fixed inset-0 -z-10'>
        <picture className='w-full h-full'>
          <source srcSet={guitar.bg} type='image/webp' />
          <img
            src={guitar.bgFallback}
            alt=''
            className='w-full h-full object-cover'
            aria-hidden='true'
          />
        </picture>
      </div>
      <Header />
      <GuitarNav tabs={tabs} slug={slug} />
      <GuitarClient slug={slug} />
      <Footer />
    </div>
  );
}
