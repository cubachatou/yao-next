'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import gsap from 'gsap';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ children, href, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    // If we are already on the page we are trying to navigate to, do nothing
    // This is a simple check, might need to be more robust for query params etc.
    if (window.location.pathname === href) return;

    const container = document.getElementById('transition-overlay');

    if (container) {
      await gsap
        .to(container, {
          onStart: () => {
            gsap.set(container, { visibility: 'visible' });
          },
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        })
        .then(() => {
          router.push(href.toString());
        });
    } else {
      router.push(href.toString());
    }
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
}
