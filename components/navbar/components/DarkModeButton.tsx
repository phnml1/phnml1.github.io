import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const DarkModeButton: React.FC = () => {
  const { systemTheme, setTheme, resolvedTheme } = useTheme();
  const [prevsys, setPrevsys] = useState(systemTheme);
  useEffect(()=> {
    if (prevsys != systemTheme) {
      setTheme(systemTheme);
      setPrevsys(systemTheme);
    }
  },[systemTheme]);

  return (
    <div
      className="cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      {resolvedTheme == 'dark' && (
        <Image src="/navbar/night-mode.png" width={40} height={40} alt="switch to daymode" />
      )}
      {resolvedTheme == 'light' && (
        <Image src="/navbar/day-mode.png" width={40} height={40} alt="switch to darkmode" />
      )}
    </div>
  );
};
export default DarkModeButton;
