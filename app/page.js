'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Intro from './components/Intro';
import HomePage from './components/HomePage';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  const searchParams = useSearchParams();
  const skipParam = searchParams.get('no-intro') === '1';

  const showHome = skipParam || introComplete;

  return (
    <div className='min-h-[100dvh]'>
      {showHome ? <HomePage /> : <Intro onComplete={() => setIntroComplete(true)} />}
    </div>
  );
}
