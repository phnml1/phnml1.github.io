import React from "react";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";
import { cls } from "@/utils/Utils";
import { Kanit, Noto_Sans_KR, Open_Sans } from 'next/font/google';
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"], 
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});
const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["300","400","700"],
  variable: '--opensans'
});
const kanit = Kanit({
  subsets: ['latin'],
  weight : ['100','400','700','900'],
  variable: '--kanit'
})

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className={cls(notoSansKr.className, opensans.variable, kanit.variable,'w-full flex flex-col items-center')}>
      <Navbar />
      <div className="w-full">{children}</div>
      <Footer />
    </main>
  );
}