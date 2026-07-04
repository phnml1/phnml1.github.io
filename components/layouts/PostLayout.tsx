import { Fragment } from 'react';
import PostsContents from '../posts/PostsContents';
import { Post } from '@/types';

interface PostLayoutProps {
  posts: Post[];
  currentCategory: string;
  theme: string;
}

export default function PostLayout(props: PostLayoutProps) {
  const label =
    props.theme === 'search'
      ? props.currentCategory
        ? `Search: ${props.currentCategory}`
        : 'Search'
      : props.currentCategory === 'all' || props.currentCategory === ''
        ? 'All Posts'
        : props.currentCategory;

  return (
    <Fragment>
      <section className="w-full px-5 py-20 md:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-headline text-4xl font-black tracking-[-0.05em] md:text-5xl">
              {label}
              <span className="text-primary">.</span>
            </h2>
            <div className="font-label text-xs uppercase tracking-[0.22em] text-text-secondary">
              {props.posts.length} articles
            </div>
          </div>
          <PostsContents contents={props.posts} />
        </div>
      </section>
    </Fragment>
  );
}
