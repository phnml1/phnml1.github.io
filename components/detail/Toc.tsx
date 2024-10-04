'use client'
import useObservation from '@/utils/useObservation';
import { useEffect, useState } from 'react';
import { Link , animateScroll as scroll} from 'react-scroll';
import ArrowUpward from '../../public/detail/arrow_upward.svg';
import Comment from '../../public/detail/comment.svg';
import UndoButton from './UndoButton';
import { useRouter } from 'next/router';
interface PostContentProps {
  title: string;
  slug: string;
}

const TOC: React.FC<PostContentProps> = (props) => {
  const router = useRouter();
  const textColor = {
    light:'fill#666666',
    dark:'fill-rgb(181,181,181)'
  }
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1,h2,h3'));
    setHeadingEls(headingElements);
    setCurrentId('');
   }, [props.slug]);
  useObservation(setCurrentId,headingEls);
  return (
    <div className="mt-12 ml-auto relative hidden lg:block">
      <div className="sticky top-32 w-60">
        <div className="p-4 rounded-t-xl border-solid border-slate-200 border-[0.5px] border-b-0 dark:border-gray-600 items-start gap-6">
          <div className="font-bold mb-2">{props.title}</div>
          <hr className='w-full border-neutral-400 dark:border-gray-600' />
          <ul className="mb-2 text-sm flex flex-col gap-2 mt-4">
            {headingEls.map((a:HTMLElement, i) => {
              const elementType: string = a.nodeName;
              const elementContent: string = a.innerHTML;
              const tocId: string = a.id;
              const isCurrent: string = currentId == tocId ? 'font-bold text-indigo-500' : '';
              if (elementType === 'H1'){
                return (
                  <li key={i} className={`${isCurrent}`}>
                    <Link
                      to={`${tocId}`}
                      spy={true} smooth={true} duration={400}
                      className={`${isCurrent} py-1 cursor-pointer transition-colors`}
                      offset={-100}
                    >
                      {elementContent}
                    </Link>
                  </li>
                );
              }
              if (elementType === 'H2') {
                return (
                  <li key={i}>
                    <Link
                      to={`${tocId}`}
                      spy={true} smooth={true} duration={400}
                      offset={-100}
                      className={`${isCurrent} py-1 pl-2 whitespace-pre-line cursor-pointer transition-colors block`}
                    >
                      {elementContent}
                      </Link>
                  </li>
                );
              } else {
                return (
                  <li key={i}>
                    <Link
                      to={`${tocId}`}
                      spy={true} smooth={true} duration={400}
                      offset={-50}
                      className={`${isCurrent} py-1 pl-6 whitespace-pre-line cursor-pointer transition-colors block`}
                    >
                      {elementContent}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className='rounded-b-xl border-[0.5px] px-6 w-full h-12 border-solid bg-slate-100 dark:bg-[#363636] dark:border-gray-600  flex items-center justify-between'>
            <UndoButton category = {router.query.detail[1]}/>
            <ArrowUpward onClick={() => {scroll.scrollToTop()}} className='w-auto h-auto rounded-lg hover:bg-slate-200 p-2 cursor-pointer text-white transition-colors dark:hover:bg-gray-800 fill-[#666666] dark:fill-[rgb(181,181,181)]'/>
            <Link to='giscus' spy={true} smooth={true} duration={400}><Comment className='w-auto h-auto rounded-lg p-2 hover:bg-slate-200 cursor-pointer text-neutral-700 transition-colors dark:hover:bg-slate-800 fill-[#666666] dark:fill-[rgb(181,181,181)]'/></Link>
        </div>
      </div>
    </div>
  );
};
export default TOC;
