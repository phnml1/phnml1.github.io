import Image from 'next/image';
import SideBarIcon from '@/public/navbar/sidebar.svg';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface SideBarButtonProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarButton: React.FC<SideBarButtonProps> = (props: SideBarButtonProps) => {
  const { resolvedTheme } = useTheme();
  const [iconColor, setColor] = useState('');
  useEffect(() => {
    if(resolvedTheme == 'dark') {
      setColor('white');
    } else {
      setColor('black');
    }
  },[resolvedTheme]);

  return (
    <div
      className="cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-dark-secondary"
      onClick={() => {
        props.setSideBar((prev) => !prev);
      }}
    >
       {<SideBarIcon fill={iconColor} width={40} height={40} />}
    </div>
  );
};
export default SideBarButton;
