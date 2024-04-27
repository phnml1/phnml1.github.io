import Link from "next/link"
import Undo from '../../public/detail/undo.svg';
interface UndoButtonProps {
  category:string
}
const UndoButton = (props:UndoButtonProps) => {
  return (<Link href={`/posts/${props.category}`} className='w-auto h-auto fill-[#666666] dark:fill-[rgb(181,181,181)] rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 p-2 transition-colors cursor-pointer text-neutral-700'>
    <Undo />
  </Link>)
}
export default UndoButton;