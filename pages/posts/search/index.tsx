import { Post } from '@/.contentlayer/generated';
import Layout from '@/components/layouts/Layout';
import PostLayout from '@/components/layouts/PostLayout';
import SearchInput from '@/components/search/SearchInput';
import { posts } from '@/utils/Post-Util';
import { searchPosts } from '@/utils/Utils';
import { useEffect, useState } from 'react';

export default function PostSearchPage(props) {
  const [posts,setPosts] = useState(props.posts);
  const [keyword,setKeyword] = useState('');
  useEffect(()=>{
    const filteredPosts:Post[] = searchPosts(props.posts,keyword);
    
    setPosts(filteredPosts);
  },[keyword]);
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

export function getStaticProps(context) {
  const allPosts = posts;
  return {
    props: {
        posts:allPosts,
    },
    revalidate: 600
  };
}