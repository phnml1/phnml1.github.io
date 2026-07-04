import { format } from 'date-fns';
import Link from 'next/link';
import Category from '../posts/Category';
import Tag from '../posts/Tag';

interface PostHeaderProps {
  title: string;
  category: string;
  date: Date;
  tags: string[];
  readingTime: number;
  project?: {
    title: string;
    slug: string;
  };
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, category, date, tags, readingTime, project }) => {
  const formattedDate = format(new Date(date), 'yyyy.MM.dd');

  return (
    <header className="mb-20 grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Category text={category} />
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
        <h1 className="font-headline text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.055em]">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-4 font-label text-xs uppercase tracking-[0.22em] text-text-secondary lg:col-span-4 lg:items-end lg:text-right">
        <div>
          <span className="block text-primary">Published</span>
          <span>{formattedDate}</span>
        </div>
        <div>
          <span className="block text-primary">Read Time</span>
          <span>{readingTime} min read</span>
        </div>
        {project ? (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex rounded-lg border border-primary/50 px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-surface"
          >
            Related Project: {project.title}
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default PostHeader;
