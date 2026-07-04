'use client';

import PostLayout from '@/components/layouts/PostLayout';
import SearchInput from '@/components/search/SearchInput';
import { Post } from '@/types';
import { searchPosts } from '@/utils/Utils';
import { useEffect, useState } from 'react';

export default function SearchPageClient({ allPosts }: { allPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setPosts(searchPosts(allPosts, keyword));
  }, [allPosts, keyword]);

  return (
    <>
      <div className="w-full px-5 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto w-full max-w-[1440px]">
          <span className="mb-5 block font-label text-sm font-bold uppercase tracking-[0.28em] text-primary">
            Search Archive
          </span>
          <h1 className="mb-10 font-headline text-5xl font-black tracking-[-0.05em] md:text-7xl">Find a note.</h1>
          <SearchInput keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>
      <PostLayout posts={posts} currentCategory={keyword} theme="search" />
    </>
  );
}
