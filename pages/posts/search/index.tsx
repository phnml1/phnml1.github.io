import Layout from '@/components/layouts/Layout';
import PostLayout from '@/components/layouts/PostLayout';
import SearchInput from '@/components/search/SearchInput';
import { posts } from '@/utils/Post-Util';
import { useState } from 'react';

export default function PostSearchPage(props) {
  const [posts,setPosts] = useState(props.posts);
  const [keyword,setKeyword] = useState('');
  return (
    <Layout>
      <div className='w-full mt-4 md:w-4/5 px-8'>
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