import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect } from 'react';

const DarkModeButton : React.FC  = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  console.log(systemTheme);
  useEffect(()=> {
    setTheme(systemTheme);
  },[systemTheme])
  return (
    <div className = 'cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700' onClick={()=>{
      setTheme(theme === 'dark' ? 'light' : 'dark');
  }}>
      {theme=='dark' && (<Image src = '/navbar/night-mode.png' width={40} height={40} alt = 'switch to daymode'/>)}
      {theme=='light' && (<Image src = '/navbar/day-mode.png' width={40} height={40} alt = 'switch to darkmode'/>)}
      
    </div>
  )
}
export default DarkModeButton;