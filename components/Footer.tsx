import React from 'react';
import Line from './Line';
import GithubIcon from '@/public/profile/github-mark.svg';
import GmailIcon from '@/public/profile/gmail-icon.svg';
import Link from 'next/link';

const Footer: React.FC = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  return (
    <footer className="w-full flex flex-col items-center justify-center">
      <Line mt="0" />
      <div className="flex gap-4 mt-6">
        <Link href="https://github.com/phnml1" target="_blank">
          <GithubIcon
            width="25"
            height="25"
            className="fill-slate-500 transition-all cursor-pointer hover:fill-black dark:hover:fill-white"
          />
        </Link>
        <Link href="mailto:juyung0903@gmail.com" target="_blank">
          <GmailIcon
            width="25"
            height="25"
            className="fill-slate-500 transition-all cursor-pointer hover:fill-black dark:hover:fill-white"
          />
        </Link>
      </div>
      <div className='mt-2 mb-6 text-sm text-slate-600'>
      © {year}  jooyoung Powered by Next.js
      </div>
    </footer>
  );
};

export default Footer;
