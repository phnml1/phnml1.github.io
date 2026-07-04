'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface SidebarProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/posts/all', label: 'Blog' },
  { href: '/posts/tag/all', label: 'Tags' },
  { href: '/posts/search', label: 'Search' },
];

const SideBar: React.FC<SidebarProps> = ({ setSideBar }) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSideBar(false);
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setSideBar]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
      setSideBar(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-20 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <div ref={sideBarRef} className="w-full max-w-xl rounded-xl bg-surface-container p-6 shadow-[0_20px_60px_rgba(173,198,255,0.08)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="font-headline text-2xl font-black tracking-[-0.04em] text-primary">phnml1</div>
            <p className="mt-1 text-sm text-text-secondary">Portfolio and tech journal</p>
          </div>
          <button
            type="button"
            className="rounded-lg bg-surface-high px-3 py-2 font-label text-xs uppercase tracking-[0.16em] text-primary"
            onClick={() => setSideBar(false)}
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSideBar(false)}
              className="rounded-lg px-4 py-4 font-label text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-surface-high hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 rounded-lg bg-surface-low p-5">
          <div className="font-label text-xs uppercase tracking-[0.22em] text-primary">Contact</div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-text-secondary">
            <Link href="mailto:juyung0903@gmail.com" onClick={() => setSideBar(false)} className="hover:text-white">
              juyung0903@gmail.com
            </Link>
            <Link href="https://github.com/phnml1" target="_blank" onClick={() => setSideBar(false)} className="hover:text-white">
              github.com/phnml1
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
