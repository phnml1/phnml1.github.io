import Link from 'next/link';
import Undo from '../../public/detail/undo.svg';

interface UndoButtonProps {
  category: string;
}

const UndoButton = (props: UndoButtonProps) => {
  return (
    <Link
      href={`/posts/${props.category}`}
      aria-label="글 목록으로 돌아가기"
      className="h-auto w-auto cursor-pointer rounded-lg fill-[#666666] p-2 text-neutral-700 transition-colors hover:bg-slate-200 dark:fill-[rgb(181,181,181)] dark:hover:bg-slate-800"
    >
      <Undo aria-hidden="true" focusable="false" />
    </Link>
  );
};

export default UndoButton;
