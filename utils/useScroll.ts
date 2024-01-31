import { useCallback, useEffect, useState } from "react";

const useScroll = () => {
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    if (moving>200) {
      setVisible(position > moving);
    } else {
      setVisible(true);
    }
    setPosition(moving);
  }, [position]);
  return {visible,position};
}
export default useScroll;