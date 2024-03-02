import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Line from '../Line';

interface CategoryMenusProps {
  categorys: string[];
  currentCategory: string;
  theme: string;
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({ categorys, currentCategory, theme }) => {
  const [mt, setMt] = useState('mt-0');
  const { resolvedTheme } = useTheme();
  const [scrollPos,setScrollPos] = useState('top-20');
  const [scrollBg, setScrollBg] = useState('custom-scroll');
  const [scrollHeight, setScrollHeight] = useState('');
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    if(moving>200) {
      setVisible(moving < position);
    } else {
      setVisible(true);
    }
    setPosition(moving);
  },[position]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  useEffect(()=>{
    if(!visible) {
      setScrollPos('top-0');
    }
    else {
      setScrollPos('top-20');
    }
  },[visible])
  useEffect(()=> {
    if(position>50) {
      setScrollHeight('h-auto overflow-x-auto overflow-y-hidden')
    } else {
      setScrollHeight('h-auto flex-wrap')
    }
  },[position])
  useEffect(() => {
    if (resolvedTheme == 'dark') {
      setScrollBg('custom-scroll-dark');
    } else {
      setScrollBg('custom-scroll');
    }
  }, [resolvedTheme]);

  const categoryLink = (category:string):string => {
    if(theme === 'tag') {
      return `/posts/tag/${category}`;
    } else {
      return `/posts/${category}`
    }
  }
  return (
    <div className={`sticky w-full ${scrollPos} transition-all pl-8 pr-8 md:w-4/5 z-40 h-auto flex items-end left-0 right-0 backdrop-blur-lg border-r-0`}>
      <div className={`w-full h-auto ${mt} transition-all top-0`}>
        <div
          className={`top-0 ${scrollBg} rounded-xl h-auto ${scrollHeight} mb-1 w-full pr-2 py-2 gap-2 flex justify-center items-center cursor-pointer`}
        >
          {(currentCategory!=='all') && (<Link
                href = {`/posts/all`}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-slate-100 hover:bg-[#2196f3] hover:text-white dark:bg-dark-secondary dark:hover:bg-[#2196f3]"
              >
                All Posts
              </Link>)}
          {
          categorys?.map((a, i) => {
            if (a==currentCategory) {
            return (
              <Link
                href = {`${categoryLink(a)}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-[#2196f3] text-white dark:bg-[#2196f3]"
              >
                {a}
              </Link>
            );
            } else {
              return (
                <Link
                href = {`${categoryLink(a)}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-slate-100 hover:bg-[#2196f3] hover:text-white dark:bg-dark-secondary dark:hover:bg-[#2196f3]"
              >
                {a}
              </Link>
              )
            }
          })}
        </div>
      </div>
      
    </div>
  );
};
export default CategoryMenus;
