'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SearchButton from './components/SearchButton';
import SideBarButton from './components/SideBarButton';

interface NavBarProps {
  sidebarOpen: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/posts/all', label: 'Blog' },
  { href: '/posts/search', label: 'Search' },
];

const Navbar: React.FC<NavBarProps> = ({ sidebarOpen, setSideBar }) => {
  const [hidden, setHidden] = useState(false);
  const position = useRef(0);

  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    setHidden(moving > 160 && moving > position.current);
    position.current = moving;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`glass-nav fixed top-0 z-50 w-full transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 md:px-12">
        <Link href="/" aria-label="이주영 포트폴리오 홈" className="font-headline text-2xl font-black tracking-[-0.04em] text-primary">
          phnml1
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-label text-sm font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SearchButton setSideBar={setSideBar} theme="dark" />
          <Link
            href="mailto:juyung0903@naver.com"
            className="hidden rounded-lg bg-gradient-to-br from-primary to-accent-strong px-5 py-2.5 font-label text-xs font-bold uppercase tracking-[0.18em] text-[#001a42] transition-transform hover:scale-[1.02] md:inline-flex"
          >
            Contact
          </Link>
          <SideBarButton open={sidebarOpen} setSideBar={setSideBar} theme="dark" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
