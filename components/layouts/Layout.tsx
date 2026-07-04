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
    document.body.style.overflow = sidebar ? 'hidden' : 'auto';
  }, [sidebar]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSideBar(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <Navbar setSideBar={setSideBar} />
        <main className="w-full flex flex-col items-center">{children}</main>
        {sidebar && <SideBar setSideBar={setSideBar} />}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
