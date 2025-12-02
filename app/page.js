'use client';
import { useState, useEffect } from 'react';
import Intro from './components/Intro';
import HomePage from './components/HomePage';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [skipIntro, setSkipIntro] = useState(true);

  useEffect(() => {
    // Check if URL ends with #no-intro
    if (window.location.hash === '#no-intro') {
      setSkipIntro(true);

      const url = new URL(window.location.href);
      url.hash = '';
      history.replaceState(null, '', url.toString());
    }
  }, []);

  const showHome = skipIntro || introComplete;

  return (
    <div className='min-h-[100dvh]'>
      {showHome ? <HomePage /> : <Intro onComplete={() => setIntroComplete(true)} />}
    </div>
  );
}
