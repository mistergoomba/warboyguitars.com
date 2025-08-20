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

  return (
    <div className='min-h-[100dvh] text-[#e6e3db]'>
      <Header />
      <GuitarNav tabs={tabs} slug={slug} />
      <GuitarClient slug={slug} />
      <Footer />
    </div>
  );
}
