import Image from 'next/image';

interface DarkModeButtonProps {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  mode: boolean;
}

const DarkModeButton : React.FC<DarkModeButtonProps>  = (props: DarkModeButtonProps) => {
  return (
    <div className = 'cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200' onClick={() => {props.setDarkMode((prev) => !prev)}}>

      {!props.mode && (<Image src = '/navbar/day-mode.png' width={40} height={40} alt = 'switch to darkmode'/>)}
      {props.mode && (<Image src = '/navbar/night-mode.png' width={40} height={40} alt = 'switch to daymode'/>)}
    </div>
  )
}
export default DarkModeButton;