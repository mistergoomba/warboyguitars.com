'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function GuitarNav({ tabs, slug }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click / ESC
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const activeTab = tabs.find((t) => t.slug === slug) ?? tabs[0];

  return (
    <nav className='relative z-50 bg-[#0f1113]/80 backdrop-blur'>
      <div className='mx-auto max-w-6xl px-4'>
        {/* Mobile: big title + red chevron that opens a dropdown */}
        <div className='md:hidden py-3 relative'>
          {/* Whole row is a button */}
          <button
            ref={buttonRef}
            type='button'
            aria-expanded={open}
            aria-controls='guitar-select-menu'
            onClick={() => setOpen((v) => !v)}
            className='flex w-full items-center justify-between rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
          >
            <h2 className='text-2xl font-blackops tracking-wide text-white'>{activeTab?.name}</h2>

            {/* Red down arrow */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className={`w-6 h-6 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden='true'
            >
              <path
                d='M6 9l6 6 6-6'
                fill='none'
                stroke='#ef4444' /* Tailwind red-500 */
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              ref={menuRef}
              id='guitar-select-menu'
              role='menu'
              className='absolute inset-x-0 mt-2 z-30 rounded-lg border border-white/15 bg-[#0f1113]/95 shadow-xl overflow-hidden'
            >
              <ul className='max-h-[60vh] overflow-y-auto'>
                {tabs.map((t) => {
                  const active = t.slug === slug;
                  return (
                    <li key={t.slug}>
                      <Link
                        href={`/guitars/${t.slug}`}
                        role='menuitem'
                        onClick={() => setOpen(false)}
                        className={`block w-full text-left px-4 py-3 transition font-blackops ${
                          active ? 'bg-[#a54c3c] text-white' : 'text-white/90 hover:bg-white/10'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {t.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop: tab row */}
        <ul
          className='hidden md:flex w-full
          overflow-x-auto md:overflow-visible
          gap-2 md:gap-0
          border-b md:border-b border-white/20
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          snap-x snap-mandatory md:snap-none
          py-0 md:py-0'
        >
          {tabs.map((t) => {
            const active = t.slug === slug;
            return (
              <li key={t.slug} className='snap-start md:flex-1'>
                <Link
                  href={`/guitars/${t.slug}`}
                  aria-current={active ? 'page' : undefined}
                  className={`
                    inline-flex items-center justify-center
                    whitespace-nowrap
                    rounded-full md:rounded-none md:rounded-t-lg
                    px-4 py-2 md:py-3
                    transition
                    font-blackops
                    md:w-full
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                    ${
                      active
                        ? 'bg-[#a54c3c] text-white md:bg-transparent md:text-white md:border-b-2 md:border-[#a54c3c]'
                        : 'bg-white/5 text-white/80 hover:bg-white/10 md:bg-transparent md:text-white/70 md:hover:text-white md:border-b-2 md:border-transparent'
                    }
                  `}
                >
                  {t.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
