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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const menuTrigger = document.querySelector<HTMLButtonElement>('[aria-controls="site-menu-dialog"]');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSideBar(false);
        return;
      }

      if (event.key !== 'Tab' || !sideBarRef.current) return;

      const focusableElements = Array.from(
        sideBarRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      menuTrigger?.focus();
    };
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
      <div
        id="site-menu-dialog"
        ref={sideBarRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-menu-title"
        className="w-full max-w-xl rounded-xl bg-surface-container p-6 shadow-[0_20px_60px_rgba(173,198,255,0.08)]"
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div id="site-menu-title" className="font-headline text-2xl font-black tracking-[-0.04em] text-primary">메뉴</div>
            <p className="mt-1 text-sm text-text-secondary">Portfolio and tech journal</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="rounded-lg bg-surface-high px-3 py-2 font-label text-xs uppercase tracking-[0.16em] text-primary"
            onClick={() => setSideBar(false)}
          >
            Close
          </button>
        </div>
        <nav aria-label="전체 메뉴" className="flex flex-col gap-2">
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
            <Link href="https://github.com/phnml1" target="_blank" rel="noopener noreferrer" onClick={() => setSideBar(false)} className="hover:text-white">
              github.com/phnml1
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
