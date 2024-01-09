import React, { useEffect, useRef, useState } from 'react';
import SideBarLinks from './components/SideBarLinks';
import { getCategory } from '@/utils/Post-Util';

interface SidebarProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState();


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
      className="fixed z-40 flex justify-center items-start top-0 left-0 bottom-0 right-0 bg-black bg-opacity-40"
      onClick={handleOutsideClick}
      style={{ padding: '12vh 16px' }}
    >
      <div
        ref={sideBarRef}
        className="relative w-full flex flex-col items-center justify-center max-w-2xl h-full bg-white rounded-lg shadow-xl transition-all z-50 transform-gpu"
      >
        <div className="w-full h-full my-2 flex flex-col items-start overflow-auto">
          <SideBarLinks
            theme="Category"
            setSideBar={props.setSideBar}
            contents={[
              { korName: '웹', engName: 'web' },
              { korName: '알고리즘', engName: 'algorhythm' },
              { korName: '리엑트', engName: 'React' },
              { korName: '자바스크립트', engName: 'javascript' },
            ]}
          />
          <SideBarLinks
            theme="Page"
            setSideBar={props.setSideBar}
            contents={[
              { korName: '메인', engName: 'main' },
              { korName: '모든 포스트', engName: 'All Posts' },
            ]}
          />
          <SideBarLinks
            theme="preference"
            setSideBar={props.setSideBar}
            contents={[{ korName: '다크 모드', engName: 'darkmode' }]}
          />
          <div className="py-4 mt-8 w-full h-3">
            <div className="mx-8 text-sm text-slate-800">About me</div>
          </div>
          <div className="mt-4 w-full flex flex-col items-center">
            <div className="w-1/2 text-center mt-8">
              프론트엔드 개발을 공부하고 있는
              <br /> 이주영 이라고 합니다.
            </div>
            <div className="mt-4 w-full flex flex-col items-center">
              <div className="w-1/2 mt-2 text-center text-sm text-gray-400">
                한국공학대학교 3학년
              </div>
              <div className="w-1/2 mt-2 mb-4 text-center text-sm text-gray-400">
                juyung0903@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
