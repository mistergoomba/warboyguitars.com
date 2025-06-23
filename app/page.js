'use client';
import { useState } from 'react';
import Intro from './components/Intro';
import HomePage from './components/HomePage';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className='min-h-[100dvh] bg-black'>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      {introComplete && <HomePage />}
    </div>
  );
}
