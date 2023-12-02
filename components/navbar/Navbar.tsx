import React, { useState } from 'react';
import DarkModeButton from './DarkModeButton';
import SideBarButton from './SideBarButton';
import Link from 'next/link';
const Navbar: React.FC = () => {
  const [darkmode, setDarkMode] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  
  console.log(sidebar);
  return (
    <header className="w-full flex justify-center">
      <div className="flex w-full md:w-4/5 h-20 justify-between items-center">
        <div className="flex gap-24 items-center ml-3">
          <Link href = '/'><div className="font-bold font-kanit text-2xl">Phnml1</div></Link>
          <div className='text-lg hidden md:block'>이주영의 개발 기록장</div>
        </div>
        <div className='mr-3 flex gap-2'>
          <DarkModeButton setDarkMode = {setDarkMode} mode = {darkmode}/>
          <SideBarButton setSideBar = {setSideBar}/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
