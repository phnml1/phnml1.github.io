import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

interface CategoryMenusProps {
  categorys: string[];
  currentCategory: string;
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({ categorys, currentCategory }) => {
  const [scroll, setScroll] = useState(window.scrollY);
  const [mt, setMt] = useState('mt-0');
  const { resolvedTheme } = useTheme();
  const [] = useState();
  const [scrollBg, setScrollBg] = useState('custom-scroll');
  const [scrollpos, setScrollPos] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    if (scroll > 0) {
      setMt('-translate-y-4');
      setScrollPos('h-12 overflow-x-auto');
    } else {
      setMt('-translate-y-0');
      setScrollPos('h-auto flex-wrap');
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]);

  useEffect(() => {
    if (resolvedTheme == 'dark') {
      setScrollBg('custom-scroll-dark');
    } else {
      setScrollBg('custom-scroll');
    }
  }, [resolvedTheme]);
  return (
    <div className="sticky w-full top-20 h-auto flex items-end lg:w-72 lg:h-[calc(100vh-5rem)] bg-white dark:bg-dark-primary">
      <div className={`w-full ${mt} transition-all lg:absolute lg:top-16 lg:block`}>
        <div className="text-lg font-bold mt-4 text-center pr-2 hidden lg:block">Categories</div>
        <div
          className={`${scrollBg} rounded-xl ${scrollpos} mb-1 w-full pr-2 flex items-center cursor-pointer overflow-y-hidden lg:overflow-y-auto lg:flex-nowrap mt-4 lg:overflow-x-hidden lg:flex-col lg:h-80`}
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
