import Image from 'next/image';


interface SideBarButtonProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarButton : React.FC<SideBarButtonProps>  = (props: SideBarButtonProps) => {
  return (
    <div className = 'cursor-pointer transition-all w-auto h-auto p-1 rounded-lg hover:bg-slate-200' onClick={() => {props.setSideBar((prev)=> !prev);}}>
      <Image src='/sidebar.svg' width={40} height={40} alt = 'open sidebar'/>
    </div>
  )
}
export default SideBarButton;