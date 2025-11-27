'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      // Force initial state immediately
      gsap.set(overlayRef.current, { opacity: 1, visibility: 'visible' });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden' });
        },
      });
    },
    { scope: containerRef, dependencies: [pathname] }
  );

  // Safety fallback: ensure overlay is hidden if animation fails or gets stuck
  useEffect(() => {
    const timer = setTimeout(() => {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
      }
    }, 2000); // Wait slightly longer than animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <div
        ref={overlayRef}
        id="transition-overlay"
        className="fixed top-0 left-0 w-screen h-screen bg-black z-9998 pointer-events-none"
      />
      {children}
    </div>
  );
}
