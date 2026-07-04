import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { postHref } from '@/utils/Route-Util';

interface FeaturedPostsProps {
  post: {
    slug: string;
    title: string;
    date: Date;
    summary: string;
    image: string;
    tags?: string[];
  };
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ post }) => {
  const date = format(new Date(post.date), 'yyyy.MM.dd');

  return (
    <Link href={postHref(post.slug)} className="group block">
      <article className="overflow-hidden rounded-xl bg-surface-container transition-all duration-300 hover:scale-[1.015] hover:bg-surface-high">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-lowest">
          <Image
            src={`/${post.slug}/${post.image}`}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
        <div className="p-7 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-label text-[10px] uppercase tracking-[0.24em] text-primary">
            <span>{post.tags?.[0] ?? 'Frontend'}</span>
            <span className="h-px w-8 bg-outline" />
            <span className="text-text-secondary">{date}</span>
          </div>
          <h3 className="text-2xl font-black leading-tight tracking-[-0.035em] text-white md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-7 text-text-secondary">{post.summary}</p>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedPosts;
