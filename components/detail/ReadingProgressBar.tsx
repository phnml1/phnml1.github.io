import { useEffect, useState } from "react";

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const element = document.documentElement;
    const ScrollTop = element.scrollTop || document.body.scrollTop;
    const ScrollHeight = element.scrollHeight || document.body.scrollHeight;
    const percent = (ScrollTop / (ScrollHeight - element.clientHeight)) * 100;

    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  }, []);
  return <div className='fixed z-50 top-17 -mt-1 left-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500' style = {{width: `${width}%`}}></div>;
};
export default ReadingProgressBar