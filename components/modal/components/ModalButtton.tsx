import Link from "next/link";

interface ModalButtonProps {
  theme: string; // 혹은 실제로 사용되는 테마 값에 맞게 수정
  contents: {
    korName: string;
    engName: string;
  }[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PageLinksObj = {
  'All Posts': 'posts',
  'main': '',
  'web': 'posts/web',
  'algorhythm': 'posts/algorhythm',
  'React': 'posts/React',
  'javascript': 'posts/javascript',
}
const ModalButton: React.FC<ModalButtonProps> = (props:ModalButtonProps) => {

  return ( 
  <div className='w-full'>
      <div className='py-4 mt-4 mb-4  w-full h-3'><div className='mx-8 text-sm text-slate-800'>{props.theme}</div></div>
      {
        props.contents.map((a,i) => (
      <Link key = {i} href={`/${PageLinksObj[a.engName]}`} onClick={()=>{props.setModal(false)}}><div  className='w-full h-auto py-4 cursor-pointer rounded-lg hover:bg-slate-200'><div className='mx-12 text-md text-black'>{a.korName}({a.engName})</div></div></Link>
        ))
      }
      </div>);
}
export default ModalButton;