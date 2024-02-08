import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  width:number;
  visible:boolean
}
const ReadingProgressBar: React.FC<ReadingProgressBarProps> = (props) => {
  const [pos,setPos] = useState('');
  useEffect(()=>{
    if(props.visible) {
      setPos('top-20');
    } else{
      setPos('top-1');
    }
  },[props.visible]);
  return <div className={`fixed z-50 ${pos} transtion-all -mt-1 left-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500`} style = {{width: `${props.width}%`}}></div>;
};
export default ReadingProgressBar