'use client'
import useObservation, { ObservationType } from '@/utils/useObservation';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface PostContentProps {
  title: string;
  slug: string;
}

const TOC: React.FC<PostContentProps> = (props) => {
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1,h2,h3'));
    setHeadingEls(headingElements);
    setCurrentId('');
   }, []);
  useObservation(setCurrentId,headingEls);
  return (
    <div className="mt-12 ml-auto relative hidden lg:block">
      <div className="sticky top-32 w-60">
      
        <div className="p-4  rounded-xl border-solid border-slate-300 border-2 items-start gap-6">
          <div className="font-bold mb-2">{props.title}</div>
          <hr className='border-1 w-full border-neutral-300 transition-all' />
          <ul className="mb-2 text-sm flex flex-col gap-2 mt-4">
            {headingEls.map((a, i) => {
              const elementType: string = a.nodeName;
              const elementContent: string = a.innerHTML;
              const tocId: string = a.id;
              const isCurrent: string = currentId == tocId ? 'font-bold' : '';
              if (elementType == 'H2') {
                return (
                  <li key={i}>
                    <a
                      href={`#${tocId}`}
                      onClick={() => {
                        setCurrentId(tocId);
                      }}
                      className={`${isCurrent} py-1`}
                    >
                      {elementContent}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={i} className={`${isCurrent} ml-4`}>
                    <a
                      href={`#${tocId}`}
                      onClick={() => {
                        setCurrentId(tocId);
                      }}
                      className={`${isCurrent} py-1`}
                    >
                      {elementContent}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TOC;
