'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function GuitarProgressTimeline({ guitarOrder = [] }) {
  const TOTAL_SECTIONS = 1 + guitarOrder.length + 1; // Home + guitars + Contact
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const guitarRefs = useRef([]);
  const contactRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const updateActiveSection = () => {
      // Get refs from DOM
      const hero = document.querySelector('[data-hero-section]');
      const contact = document.querySelector('[data-contact-section]');

      // Get guitar sections
      const guitars = guitarOrder.map((slug) =>
        document.querySelector(`[data-guitar-section="${slug}"]`)
      );

      if (!hero) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportMidpoint = viewportHeight * 0.5; // 50% of viewport

      // Show timeline when we're past initial scroll
      if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setActiveSection(0);
        return;
      }

      // Simplified logic: Section is active when its top is above viewport midpoint
      // We check all sections and find the last one whose top is above midpoint
      let currentActive = 0; // Default to home

      // Check hero section
      const heroRect = hero.getBoundingClientRect();
      if (heroRect.top <= viewportMidpoint) {
        currentActive = 0; // Home is active
      }

      // Check all guitar sections (in order)
      guitars.forEach((guitarRef, index) => {
        if (guitarRef) {
          const rect = guitarRef.getBoundingClientRect();
          // If top of section is above midpoint, this section becomes active
          // (later sections will override if they also meet the condition)
          if (rect.top <= viewportMidpoint) {
            currentActive = index + 1; // +1 because 0 is home
          }
        }
      });

      // Check contact section (last, so it overrides if active)
      if (contact) {
        const contactRect = contact.getBoundingClientRect();
        if (contactRect.top <= viewportMidpoint) {
          currentActive = TOTAL_SECTIONS - 1; // Contact is last
        }
      }

      setActiveSection(Math.min(Math.max(currentActive, 0), TOTAL_SECTIONS - 1));
    };

    // Initial check
    updateActiveSection();

    // Listen to scroll
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const getStarState = (index) => {
    if (index < activeSection) {
      return 'past'; // Solid white
    } else if (index === activeSection) {
      return 'current'; // Red with white border
    } else {
      return 'future'; // White outline
    }
  };

  const StarIcon = ({ state, index }) => {
    const isHome = index === 0;
    const isContact = index === TOTAL_SECTIONS - 1;

    if (isHome) {
      // Home icon
      return (
        <Link
          href='/'
          className='block transition-opacity hover:opacity-80 cursor-pointer'
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={state === 'current' ? 'text-[#a54c3c]' : 'text-white'}
          >
            <path
              d='M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill={state === 'current' ? 'currentColor' : 'none'}
            />
          </svg>
        </Link>
      );
    }

    if (isContact) {
      // Envelope icon
      return (
        <Link
          href='#contact'
          className='block transition-opacity hover:opacity-80 cursor-pointer'
          onClick={(e) => {
            e.preventDefault();
            const contactRef = document.querySelector('[data-contact-section]');
            if (contactRef) {
              // Calculate absolute position in document
              let elementTop = 0;
              let element = contactRef;
              while (element) {
                elementTop += element.offsetTop;
                element = element.offsetParent;
              }
              window.scrollTo({ top: elementTop, behavior: 'smooth' });
            }
          }}
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={state === 'current' ? 'text-[#a54c3c]' : 'text-white'}
          >
            <path
              d='M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
          </svg>
        </Link>
      );
    }

    // Star icon for guitars
    const isPast = state === 'past';
    const isCurrent = state === 'current';
    const guitarSlug = guitarOrder[index - 1]; // -1 because index 0 is home

    return (
      <Link
        href={`#${guitarSlug}`}
        className='block transition-opacity hover:opacity-80 cursor-pointer'
        onClick={(e) => {
          e.preventDefault();
          const guitarRef = document.querySelector(`[data-guitar-section="${guitarSlug}"]`);
          if (guitarRef) {
            // For sticky elements, calculate position by summing heights of preceding elements
            // This works regardless of whether the element is currently stuck
            const hero = document.querySelector('[data-hero-section]');
            let elementTop = 0;

            // Add hero height
            if (hero) {
              elementTop += hero.offsetHeight;
            }

            // Add mobile ad copy section height (if exists)
            const mobileAdCopy = document.querySelector('section.md\\:hidden');
            if (mobileAdCopy) {
              elementTop += mobileAdCopy.offsetHeight;
            }

            // Add heights of all guitar sections before the target
            const currentIndex = guitarOrder.indexOf(guitarSlug);
            for (let i = 0; i < currentIndex; i++) {
              const prevGuitar = document.querySelector(
                `[data-guitar-section="${guitarOrder[i]}"]`
              );
              if (prevGuitar) {
                elementTop += prevGuitar.offsetHeight;
              }
            }

            window.scrollTo({ top: elementTop, behavior: 'smooth' });
          }
        }}
      >
        <svg
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill={isPast ? 'white' : isCurrent ? '#a54c3c' : 'none'}
            className={isCurrent ? 'drop-shadow-[0_0_2px_white]' : ''}
          />
        </svg>
      </Link>
    );
  };

  return (
    <div
      ref={timelineRef}
      className='fixed left-0 bottom-[200px] z-50 flex flex-col items-center gap-4 pl-1 transition-opacity duration-500 ease-in-out'
      style={{
        opacity: isVisible ? 0.5 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => {
        const state = getStarState(index);
        return (
          <div key={index} className='flex items-center justify-center'>
            <StarIcon state={state} index={index} />
          </div>
        );
      })}
    </div>
  );
}
