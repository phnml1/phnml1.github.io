import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface CategoryMenusProps {
  categorys: string[];
  currentCategory: string;
  visible: boolean;
  position: number;
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({ categorys, currentCategory, position, visible }) => {
  const [scroll, setScroll] = useState(0);
  const [mt, setMt] = useState('mt-0');
  const { resolvedTheme } = useTheme();
  const [scrollPos,setScrollPos] = useState('top-20');
  const [scrollBg, setScrollBg] = useState('custom-scroll');
  const [scrollHeight, setScrollHeight] = useState('');
  console.log(position);
  useEffect(() => {
    if (!visible) {
      setScrollPos('top-0');
    } else {
      setScrollPos('top-20');
    }
  }, [visible]);

  useEffect(()=>{
    if(position>200) {
      setScrollHeight('h-12 overflow-x-auto');
    }
    else {
      setScrollHeight('h-auto flex-wrap');
    }
  },[position])

  useEffect(() => {
    if (resolvedTheme == 'dark') {
      setScrollBg('custom-scroll-dark');
    } else {
      setScrollBg('custom-scroll');
    }
  }, [resolvedTheme]);
  return (
    <div className={`sticky w-full ${scrollPos} transition-all h-auto flex items-end lg:w-72 lg:h-[calc(100vh-5rem)] bg-white dark:bg-dark-primary`}>
      <div className={`w-full ${mt} transition-all lg:absolute lg:top-16 lg:block`}>
        <div className="text-lg font-bold mt-4 text-center pr-2 hidden lg:block">Categories</div>
        <div
          className={`${scrollBg} rounded-xl h-auto ${scrollHeight} mb-1 w-full pr-2 py-2 gap-2 flex items-center cursor-pointer overflow-y-hidden lg:overflow-y-auto lg:flex-nowrap mt-4 lg:overflow-x-hidden lg:flex-col lg:h-80`}
        >
          {(currentCategory!=='all') && (<Link
                href = {`/posts/all`}
                className="rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-slate-100 dark:bg-dark-secondary"
              >
                All Posts
              </Link>)}
          {
          categorys?.map((a, i) => {
            if (a==currentCategory) {
            return (
              <Link
                href = {`/posts/${a}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-[#2196f3] text-white dark:bg-dark-secondary"
              >
                {a}
              </Link>
            );
            } else {
              return (
                <Link
                href = {`/posts/${a}`}
                key={i}
                className="transition-all rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-slate-100 hover:bg-[#2196f3] hover:text-white dark:bg-dark-secondary"
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
