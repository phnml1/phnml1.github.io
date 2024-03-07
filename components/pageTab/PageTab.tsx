import { useState } from 'react';
import PageButton from './PageButton';
import { postPages } from '@/Constants';
interface PageTabProps {
  currentPage: string;
}
const PageTab: React.FC<PageTabProps> = (props) => {
  const [index,setIndex] = useState(999);
  console.log(index);
  return (
    <div className="w-full h-12 bg-indigo-200 flex justify-center items-center">
      <div className="ml-14 w-full h-full md:w-4/5 flex justify-start items-center">
       <div className={`py-1 w-[2px] h-10 bg-indigo-200 ${(index!==0 && props.currentPage!=='Category') && ('bg-indigo-300')} ${(props.currentPage==='Category') && ('bg-white')}`}></div>
        {postPages.map((a, i) => {
          return (
            <div key={i} className="flex items-center h-full">
              <PageButton index={i} currentPage = {props.currentPage} setIndex={setIndex} name={a.name} link={a.link} />
             <div className={`py-1 w-[2px] h-10 ${(props.currentPage===`${a.name}`) && ('bg-white')} ${((index!==i && index!==i+1 && props.currentPage!==`${a.name}`)?'bg-indigo-300':'bg-indigo-200')} `}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PageTab;
