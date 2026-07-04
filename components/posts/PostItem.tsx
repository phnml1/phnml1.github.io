import Link from 'next/link';
import Image from 'next/image';
import Tag from './Tag';
import { format } from 'date-fns';
import { Post } from '@/types';
import { postHref } from '@/utils/Route-Util';

interface PostItemProps {
  content: Post;
  offset?: boolean;
}

const PostItem: React.FC<PostItemProps> = ({ content, offset = false }) => {
  const date = format(new Date(content.date), 'yyyy.MM.dd');

  return (
    <Link href={postHref(content.slug)} className={`group flex flex-col ${offset ? 'md:mt-24' : ''}`}>
      <article className="h-full">
        <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-xl bg-surface-container">
          <Image
            src={`/${content.slug}/${content.image}`}
            alt={content.title}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
        <div className="mb-4 flex items-center gap-4 font-label text-[10px] uppercase tracking-[0.24em]">
          <span className="text-primary">{content.tags?.[0] ?? 'Frontend'}</span>
          <span className="text-text-secondary">{date}</span>
        </div>
        <h3 className="text-3xl font-black leading-tight tracking-[-0.04em] transition-colors group-hover:text-primary">
          {content.title}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-7 text-text-secondary">{content.summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </article>
    </Link>
  );
};

export default PostItem;
