import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface CategoryMenusProps {
  categorys: string[];
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({categorys}) => {
  const [scroll,setScroll] = useState(window.scrollY);
  const [mt, setMt] = useState('mt-0');
  const {resolvedTheme} = useTheme();
  const [scrollBg, setScrollBg] = useState('custom-scroll');
  useEffect(()=>{
    const handleScroll = () => {
    setScroll(window.scrollY);
    }
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
   
  },[scroll]);
  useEffect(() => {
    // Optional: If you want to handle scroll behavior on initial mount
    if (scroll > 0) {
      setMt('-translate-y-4');
    } else {
      setMt('-translate-y-0');
    }
  }, [scroll]);
  useEffect(()=> {
    if(resolvedTheme == 'dark') {
      setScrollBg('custom-scroll-dark');
    } else {
      setScrollBg('custom-scroll');
    }
    
    
  },[resolvedTheme])
  return (
    <div className="sticky w-full top-36 h-auto flex items-end lg:w-72 lg:h-[calc(100vh-5rem)] bg-white dark:bg-dark-primary">
  <div className={`w-full h-auto ${mt} transition-all lg:absolute lg:top-0 lg:block`}>
    <div className = 'text-lg font-bold mt-4 text-center pr-2 hidden lg:block'>Categories</div>
    <div 
      className = {`${scrollBg} rounded-xl mb-1 h-auto w-full pr-2 flex items-center cursor-pointer overflow-y-hidden lg:overflow-y-scroll mt-4 lg:overflow-x-hidden lg:flex-col lg:h-80`}
      >
      
      {
        categorys?.map((a,i) => {
          return (
          <div key={i} className='rounded-lg w-auto text-xs md:text-sm lg:text-md lg:w-48 text-center flex-wrap py-2 px-2 my-2 mx-2 bg-slate-100'>
            {a}
          </div>
        )})
      }
    </div>
  </div>
  </div>
  )
}
export default CategoryMenus;