import Image from 'next/image';
import SideBarIcon from '@/public/navbar/sidebar.svg';
import { useEffect, useState } from 'react';

interface SideBarButtonProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string
}

const SideBarButton: React.FC<SideBarButtonProps> = (props: SideBarButtonProps) => {
  const [iconColor, setColor] = useState('');
  useEffect(() => {
    if(props.theme == 'dark') {
      setColor('white');
    } else {
      setColor('black');
    }
  },[props.theme]);

  return (
    <div
      className="cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700"
      onClick={() => {
        props.setSideBar((prev) => !prev);
      }}
    >
      <div>
       {<SideBarIcon fill={iconColor} width={40} height={40} />}
       </div>
    </div>
  );
};
export default SideBarButton;
