import Layout from '@/components/layouts/Layout';
import PostLayout from '@/components/layouts/PostLayout';
import { posts } from '@/utils/Post-Util';
import { Fragment, useState } from 'react';

export default function PostSearchPage(props) {
  const [posts,setPosts] = useState(props.posts);
  const [keyword,setKeyword] = useState('');
  return (
    <Layout>
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