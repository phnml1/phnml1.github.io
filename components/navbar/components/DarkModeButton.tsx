import Image from 'next/image';

interface DarkModeButtonProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

const DarkModeButton : React.FC<DarkModeButtonProps>  = (props: DarkModeButtonProps) => {
  console.log(props.theme);
  
  return (
    <div className = 'cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200' onClick={()=>{
      props.setTheme(props.theme === 'dark' ? 'light' : 'dark');
  }}>

      {props.theme=='light' && (<Image src = '/navbar/day-mode.png' width={40} height={40} alt = 'switch to darkmode'/>)}
      {props.theme=='dark' && (<Image src = '/navbar/night-mode.png' width={40} height={40} alt = 'switch to daymode'/>)}
    </div>
  )
}
export default DarkModeButton;