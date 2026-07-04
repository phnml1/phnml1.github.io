import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layouts/Layout';

export const metadata: Metadata = {
  title: {
    default: 'phnml1 | Frontend Portfolio',
    template: '%s | phnml1',
  },
  description: '성능과 구조 개선을 중심으로 기록하는 프론트엔드 개발자 포트폴리오',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
