'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/public/svg/logo.svg';

import TransitionLink from './TransitionLink';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isWorks = pathname.startsWith('/works');
  const isAbout = pathname === '/about';

  return (
    <header className={`flex items-center px-8 py-5 z-10 ${isHome ? 'text-white fixed w-full' : 'text-black relative'}`}>
      <nav className="w-full font-medium uppercase">
        <ul className="flex items-start justify-between gap-8">
          <li>
            <TransitionLink href="/works" className={isWorks ? 'menu-item-active' : ''}>Works</TransitionLink>
          </li>

          <li>
            {isHome ? (
              <Logo className="inline-flex w-[clamp(5rem,-6.429rem+17.857vw,15rem)] h-auto" />
            ) : (
              <TransitionLink href="/">
                <Logo className="inline-flex w-[clamp(5rem,-6.429rem+17.857vw,15rem)] h-auto" />
              </TransitionLink>
            )}
          </li>

          <li>
            <TransitionLink href="/about" className={isAbout ? 'menu-item-active' : ''}>About</TransitionLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
