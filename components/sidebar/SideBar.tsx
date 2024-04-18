import React, { useEffect, useRef, useState } from 'react';
import SideBarLinks from './components/SideBarLinks';
import { useTheme } from 'next-themes';

interface SidebarProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [scrollbg, setScrollBg] = useState('custom-scroll');
  const {resolvedTheme} = useTheme();
  useEffect(() => {
    if (resolvedTheme == 'dark') {
      setScrollBg('custom-scroll-dark');
    } else {
      setScrollBg('custom-scroll');
    }
  }, [resolvedTheme]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target as Node)) {
      props.setSideBar(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.setSideBar(false);
    }
  };
  document.addEventListener('keydown', handleEscapeKey);

  return (
    <div
      className="fixed z-40 flex top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-40"
      onClick={handleOutsideClick}
      style={{ padding: '12vh 16px' }}
    >
      <div
        ref={sideBarRef}
        className="w-full flex flex-col items-center justify-center max-w-2xl h-full bg-white rounded-lg shadow-xl transition-all z-50 transform-gpu dark:bg-dark-primary"
      >
        <div className={`${scrollbg} w-full h-full px-2 my-2 flex flex-col items-start overflow-auto`}>
          <SideBarLinks
            theme="Page"
            setSideBar={props.setSideBar}
            contents={[
              'Main',
              'Category',
              'Tag',
              'Search'
            ]}
          />
          <SideBarLinks
            theme="Contact"
            setSideBar={props.setSideBar}
            contents={['Email','Github']}
          />
          <SideBarLinks
            theme="Preference"
            setSideBar={props.setSideBar}
            contents={['다크 모드']}
          />
          <div className="py-4 mt-8 w-full h-3">
            <div className="mx-8 text-sm text-slate-800 dark:text-dark-secondary">About me</div>
          </div>
          <div className="mt-4 w-full flex flex-col items-center">
            <div className="w-1/2 text-center mt-8">
              프론트엔드 개발을 공부하고 있는
              <br /> 이주영 이라고 합니다.
            </div>
            <div className="mt-4 w-full flex flex-col items-center text-gray-400 dark:text-dark-primary">
              <div className="w-1/2 mt-2 text-center text-sm mb-8">
                한국공학대학교 3학년
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
