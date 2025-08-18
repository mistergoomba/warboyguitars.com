import { useMemo } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import GuitarNav from '../components/GuitarNav';
import GuitarClient from '../components/GuitarClient';

import { GUITARS, ALL } from '../data';

export default function Page({ params }) {
  const tabs = useMemo(() => ALL.map((s) => ({ slug: s, name: GUITARS[s].name })), []);

  return (
    <div className='min-h-[100dvh] text-[#e6e3db]'>
      <Header />
      <GuitarNav tabs={tabs} slug={params.slug} />
      <GuitarClient slug={params.slug} />
      <Footer />
    </div>
  );
}
