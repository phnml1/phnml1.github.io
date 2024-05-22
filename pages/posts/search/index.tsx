import Layout from '@/components/layouts/Layout';
import PostLayout from '@/components/layouts/PostLayout';
import SearchInput from '@/components/search/SearchInput';
import { Post } from '@/types';
import { getAllPosts } from '@/utils/Post-Util';
import { searchPosts } from '@/utils/Utils';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export default function PostSearchPage(props: {posts:Post[]}) {
  const [posts,setPosts] = useState<Post[]>(props.posts);
  const [keyword,setKeyword] = useState<string>('');
  useEffect(()=>{
    const filteredPosts:Post[] = searchPosts(props.posts,keyword);
    setPosts(filteredPosts);
  },[keyword, props.posts]);
  return (
    <Layout>
      <div className='w-full mt-8 md:w-4/5 px-8'>
      <SearchInput keyword={keyword} setKeyword = {setKeyword}/>
      </div>
      <PostLayout posts={posts} currentCategory={keyword} theme='search'>

      </PostLayout>
    </Layout>
  );
}

export const getStaticProps:GetStaticProps = () => {
  const allPosts:Post[] = getAllPosts();
  return {
    props: {
        posts:JSON.parse(JSON.stringify(allPosts)),
    },
  };
}