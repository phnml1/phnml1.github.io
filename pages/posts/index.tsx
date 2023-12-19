import { Fragment } from 'react';
import Head from 'next/head';
import CategorySwiper from '@/components/posts/CategorySwiper';
import PostsContents from '@/components/posts/PostsContents';
import {getAllPosts} from '@/utils/Post-Util';
export default function AllPostsPage(props) {
  const DUMMY_CATEGORYS = [
    { id:0, text: 'React', image: '/next.svg' },
    { id:1, text: 'Javascript', image: '/next.svg' },
    { id:2, text: 'Algorhythm', image: '/next.svg' },
    { id:3, text: 'React', image: '/next.svg' },
    { id:4, text: 'Javascript', image: '/next.svg' },
    { id:5, text: 'Algorhythm', image: '/next.svg' },
  ];
  return (
    <Fragment>
      <Head>
        <title>모든 포스트</title>
        <meta name="description" content="모든 포스트 보여주기" />
      </Head>
      <div className="w-full flex flex-col items-center md:w-4/5">
        <div className="w-full flex justify-center mt-4">
          <CategorySwiper content={DUMMY_CATEGORYS} />
        </div>
        <div className="mt-16 text-3xl font-extrabold w-full ml-10 mb-12">All posts (39)</div>
        <PostsContents contents = {props.posts}/>
      </div>
    </Fragment>
  );
}
export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts
    }
  }
}
