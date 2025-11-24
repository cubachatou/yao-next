'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/public/svg/logo.svg';

import TransitionLink from './TransitionLink';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isWorks = pathname === '/works';
  const isWorkDetail = pathname?.startsWith('/works/');
  const isAbout = pathname === '/about';

  const renderCenter = () => {
    if (isHome) {
      return (<></>
        // <TransitionLink href="/" className="inline-flex w-[clamp(5rem,-6.429rem+17.857vw,15rem)] h-auto">
        //   <Logo />
        // </TransitionLink>
      );
    }

    if (isWorks || isWorkDetail) {
      return isWorks ? (
        <span className="menu-item-active cursor-default">Works</span>
      ) : (
        <TransitionLink href="/works" className="menu-item-active">
          Works
        </TransitionLink>
      );
    }

    if (isAbout) {
      return <span className="menu-item-active cursor-default">About</span>;
    }

    return null;
  };

  return (
    <header className={`flex items-center px-8 py-5 relative z-10 ${isHome ? 'text-white' : 'text-black'}`}>
      <nav className="w-full font-medium uppercase">
        <ul className="flex items-start justify-between gap-8">
          <li>{isHome ? <TransitionLink href="/works">Works</TransitionLink> : <TransitionLink href="/">Home</TransitionLink>}</li>

          <li>{renderCenter()}</li>

          <li>
            {isHome || isWorks || isWorkDetail ? <TransitionLink href="/about">About</TransitionLink> : <TransitionLink href="/works">Works</TransitionLink>}
          </li>
        </ul>
      </nav>
    </header>
  );
}
