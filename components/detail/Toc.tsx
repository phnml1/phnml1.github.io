import useObservation from '@/utils/useObservation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostContentProps {
  title: string;
}

const TOC = (props) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1,h2,h3'));
    setHeadingEls(headingElements);
  }, []);
  useObservation(setCurrentId, headingEls);
  return (
    <div className="mt-12 ml-auto relative">
      <div className='sticky top-32 min-w-[240px]'>
      
        <div className='p-4  rounded-xl border-solid border-slate-300 border-2 items-start gap-6'>
        <div className='font-bold mb-2'>Table of Content</div>
        <ul className='mb-2 text-sm flex flex-col gap-2'>
          {
            headingEls.map((a,i) => {
              const elementType:string = a.nodeName;
              const elementContent:string = a.innerHTML;
              const isCurrent:string = currentId==a.innerHTML? 'font-bold':'';
              if(elementType == 'H2') { 
                return (<li key={i} className={`${isCurrent}`}><Link href={`#${elementContent}`} onClick={() => {setCurrentId(elementContent)}} className='py-1'>{elementContent}</Link></li>)
              } else {
                return (<li key={i} className={`${isCurrent} ml-4`}><Link href={`#${elementContent}`} onClick={() => {setCurrentId(elementContent)}}>{elementContent}</Link></li>)
              }
            }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TOC;
