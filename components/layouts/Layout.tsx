'use client';

import React, { useEffect, useState } from 'react';
import { Inter, Noto_Sans_KR, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Footer from '../Footer';
import Navbar from '../navbar/Navbar';
import SideBar from '../sidebar/SideBar';
import { cls } from '@/utils/Utils';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-kr',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space',
});

export default function Layout({ children }: React.PropsWithChildren) {
  const [sidebar, setSideBar] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = sidebar ? 'hidden' : '';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebar]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div
        className={cls(
          notoSansKr.className,
          inter.variable,
          spaceGrotesk.variable,
          'min-h-screen w-full bg-surface text-white font-body antialiased',
        )}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[70] -translate-y-20 rounded-lg bg-primary px-4 py-3 font-label text-sm font-bold text-surface transition-transform focus:translate-y-0"
        >
          본문으로 건너뛰기
        </a>
        <div aria-hidden={sidebar || undefined} inert={sidebar ? true : undefined}>
          <Navbar sidebarOpen={sidebar} setSideBar={setSideBar} />
          <main id="main-content" tabIndex={-1} className="flex w-full flex-col items-center">
            {children}
          </main>
          <Footer />
        </div>
        {sidebar && <SideBar setSideBar={setSideBar} />}
      </div>
    </ThemeProvider>
  );
}
