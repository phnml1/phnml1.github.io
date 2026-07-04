'use client';

import useObservation from '@/utils/useObservation';
import { useEffect, useRef, useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import UndoButton from './UndoButton';
import { useParams } from 'next/navigation';

interface TocProps {
  title: string;
  slug: string;
}

const TOC: React.FC<TocProps> = (props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const [currentId, setCurrentId] = useState<string>('');
  const [headingEls, setHeadingEls] = useState<HTMLElement[]>([]);
  const tocHeadingEls = headingEls.filter((heading, index) => !(index === 0 && heading.nodeName === 'H1'));

  useEffect(() => {
    const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('h1,h2,h3'));
    setHeadingEls(headingElements);
    setCurrentId('');
  }, [props.slug]);

  useEffect(() => {
    const currentItem = listRef.current?.querySelector('[data-active="true"]');
    if (currentItem && listRef.current) {
      const parentTop = listRef.current.getBoundingClientRect().top;
      const itemTop = currentItem.getBoundingClientRect().top;
      listRef.current.scrollTop += itemTop - parentTop;
    }
  }, [currentId]);

  useObservation(setCurrentId, tocHeadingEls);

  const category = typeof params?.category === 'string' ? params.category : 'all';

  return (
    <aside className="relative hidden lg:block">
      <div className="sticky top-28 overflow-hidden rounded-xl bg-surface-container">
        <div className="p-5 pt-4">
          <div ref={listRef} className="custom-scroll max-h-[420px] overflow-y-auto pr-2">
            <ul className="flex flex-col gap-2 text-sm">
              {tocHeadingEls.map((heading, index) => {
                const tocId = heading.id;
                const isCurrent = currentId === tocId;
                const level = heading.nodeName === 'H1' ? 'pl-0' : heading.nodeName === 'H2' ? 'pl-3' : 'pl-6';

                return (
                  <li key={`${tocId}-${index}`} data-active={isCurrent}>
                    <Link
                      to={tocId}
                      spy
                      smooth
                      duration={400}
                      offset={-100}
                      className={`${level} block cursor-pointer py-1 leading-6 transition-colors ${
                        isCurrent ? 'font-bold text-primary' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      {heading.textContent}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex h-12 items-center justify-between bg-surface-high px-5">
          <UndoButton category={category} />
          <button
            type="button"
            className="font-label text-xs uppercase tracking-[0.16em] text-primary"
            onClick={() => scroll.scrollToTop()}
          >
            Top
          </button>
          <Link to="giscus" spy smooth duration={400} className="cursor-pointer font-label text-xs uppercase tracking-[0.16em] text-primary">
            Comment
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default TOC;
