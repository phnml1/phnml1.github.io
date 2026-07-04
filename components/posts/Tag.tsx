import Link from 'next/link';
import { tagHref } from '@/utils/Route-Util';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  return (
    <Link
      href={tagHref(name)}
      className="w-fit rounded-full bg-surface-container px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:bg-surface-high hover:text-primary"
    >
      {name}
    </Link>
  );
};

export default Tag;
