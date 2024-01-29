import React, { useEffect, useState } from 'react';
import DarkModeButton from './components/DarkModeButton';
import SideBarButton from './components/SideBarButton';
import Link from 'next/link';
import SideBar from '../sidebar/SideBar';
import Line from '../Line';
const Navbar: React.FC = () => {
  const [sidebar, setSideBar] = useState(false);
  const [scrollHeight, setScrollHeight] = useState('h-20');
  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-lg">
      <div className='w-full flex justify-center '>
      <div className={`flex w-full md:w-4/5 ${scrollHeight} transition-all justify-between items-center`}>
        <div className="flex gap-24 items-center ml-8">
          <Link href = '/'><div className="font-bold font-kanit text-2xl">Phnml1</div></Link>
          <Link href = '/posts/all' className='text-lg hidden md:block'>이주영의 개발 블로그</Link>
        </div>
        <div className='mr-8 flex gap-2'>
          <DarkModeButton/>
          <SideBarButton setSideBar = {setSideBar}/>
        </div>
      </div>
      </div>
      {sidebar && (<SideBar setSideBar={setSideBar}/>)}
      <Line mt='0'/>
    </header>
  );
};

export default Navbar;
