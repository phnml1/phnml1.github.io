import { useCallback, useEffect, useState } from "react";

const useScroll = (page) => {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(0);
  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    if(page!=='home' && moving>200) {
      setVisible(moving < position);
    } else {
      setVisible(true);
    }
    setPosition(moving);
    if (page == 'detail') {
      const element = document.documentElement;
      const ScrollTop = element.scrollTop || document.body.scrollTop;
      const ScrollHeight = element.scrollHeight || document.body.scrollHeight;
      const percent = (ScrollTop / (ScrollHeight - element.clientHeight)) * 100;
      setWidth(percent);
    }
  }, [position]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  
  return {visible,position,width};
}
export default useScroll;