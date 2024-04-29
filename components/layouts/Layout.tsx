import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Navbar from '../navbar/Navbar';
import { cls } from '@/utils/Utils';
import { Kanit, Noto_Sans_KR, Open_Sans } from 'next/font/google';
import { Providers } from '../Providers';
import SideBar from '../sidebar/SideBar';
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});
const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--opensans',
});
const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--kanit',
});

export default function Layout({ children }: React.PropsWithChildren) {
  const [sidebar,setSideBar] = useState(false);
  useEffect(()=>{
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },[sidebar]);

  // ESC 키를 눌렀을 때 모달을 닫는 함수
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSideBar(false);
    }
  };
  
  // 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Providers>
      
      <main
        className={cls(
          notoSansKr.className,
          opensans.variable,
          kanit.variable,
          'w-full relative flex flex-col items-center dark:bg-dark-primary dark:text-dark-primary transition-[background]',
        )}
      >
        <Navbar setSideBar = {setSideBar}/>
        <div className="w-full flex flex-col items-center">{children}</div>
        {sidebar && (<SideBar setSideBar={setSideBar}/>)}
        <Footer />
      </main>
    </Providers>
  );
}
