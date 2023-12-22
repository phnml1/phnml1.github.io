import useObservation from "@/utils/useObservation";
import { useEffect, useState } from "react"

const TOC = () => {
  const [currentId,setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1,h2,h3'));
    setHeadingEls(headingElements);
  },[])
  useObservation(setCurrentId,headingEls);
  console.log(currentId);
  return(<></>);
}
export default TOC;