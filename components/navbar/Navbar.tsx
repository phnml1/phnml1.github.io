import React, { useState } from 'react';
import DarkModeButton from './components/DarkModeButton';
import SideBarButton from './components/SideBarButton';
import Link from 'next/link';
import Modal from '../modal/Modal';
const Navbar: React.FC = () => {
  const [darkmode, setDarkMode] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <header className="w-full flex justify-center">
      <div className="flex w-full md:w-4/5 h-20 justify-between items-center">
        <div className="flex gap-24 items-center ml-8">
          <Link href = '/'><div className="font-bold font-kanit text-2xl">Phnml1</div></Link>
          <div className='text-lg hidden md:block'>이주영의 개발 블로그</div>
        </div>
        <div className='mr-8 flex gap-2'>
          <DarkModeButton setDarkMode = {setDarkMode} mode = {darkmode}/>
          <SideBarButton setModal = {setModal}/>
        </div>
      </div>
      {modal && (<Modal setModal={setModal}/>)}
    </header>
  );
};

export default Navbar;
