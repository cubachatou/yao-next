'use client';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const isStudio = usePathname().startsWith('/studio');

  return !isStudio && <footer className="h-16"></footer>;
}
