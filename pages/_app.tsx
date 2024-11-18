import Layout from '@/components/layouts/Layout';
import '@/styles/globals.css';
import { cls } from '@/utils/Utils';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Kanit, Noto_Sans_KR, Open_Sans } from 'next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' >
    <Layout>
      <div className=
          'w-full relative flex flex-col items-center dark:bg-dark-primary dark:text-dark-primary transition-[background]'
      >
        <Component {...pageProps} />
        </div>
        </Layout>
    </ThemeProvider>
  );
}
