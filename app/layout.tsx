import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Layout from '@/components/layouts/Layout';

export const metadata: Metadata = {
  metadataBase: new URL('https://phnml1.github.io'),
  title: {
    default: '이주영 | Frontend Developer',
    template: '%s | 이주영',
  },
  description: 'React와 TypeScript 기반 프로젝트의 문제, 기여 범위, 기술 판단, 검증 결과를 정리한 이주영의 프론트엔드 포트폴리오',
  authors: [{ name: '이주영', url: 'https://github.com/phnml1' }],
  creator: '이주영',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '이주영 | Frontend Developer',
    description: '프로젝트의 문제, 기여 범위, 기술 판단, 검증 결과를 정리한 프론트엔드 포트폴리오',
    siteName: '이주영 프론트엔드 포트폴리오',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '이주영 | Frontend Developer',
    description: '프로젝트의 문제, 기여 범위, 기술 판단, 검증 결과를 정리한 프론트엔드 포트폴리오',
  },
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
