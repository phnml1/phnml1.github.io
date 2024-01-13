import { Fragment } from 'react';
import Head from 'next/head';
import CategorySwiper from '@/components/posts/CategorySwiper';
import PostsContents from '@/components/posts/PostsContents';
import { allCategorys, posts} from '@/utils/Post-Util';
import { transformCategory } from '@/utils/Utils';
import { Post } from '@/.contentlayer/generated';
export default function AllPostsPage(props) {
  console.log(props.posts);
  return (
    <Fragment>
      <Head>
        <title>모든 포스트</title>
        <meta name="description" content="모든 포스트 보여주기" />
      </Head>
      <div className="w-full h-fit flex flex-col items-center mb-8 md:w-4/5">
        <div className="w-full flex justify-center mt-8">
          <CategorySwiper content={props.categorys} />
        </div>
        <div className="mt-16 text-3xl font-extrabold text-center w-full ml-10 mb-16">All posts ({props.posts.length})</div>
        <PostsContents contents = {props.posts}/>
      </div>
    </Fragment>
  );
}
export function getStaticProps() {
  const allPosts = posts;
  const categorys = transformCategory(allCategorys);
  
  return {
    props: {
      posts: posts,
      categorys: categorys,
    }
  }
}
