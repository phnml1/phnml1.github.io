import { Fragment } from 'react';
import Head from 'next/head';
import PostsContents from '@/components/posts/PostsContents';
import { allCategorys, posts} from '@/utils/Post-Util';
import CategoryMenus from '@/components/posts/CategoryMenus';
export default function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>모든 포스트</title>
        <meta name="description" content="모든 포스트 보여주기" />
      </Head>
      <div className='w-full h-auto flex items-start justify-center gap-8 mb-8 md:w-4/5 pl-8 pr-8 flex-col lg:flex-row lg:gap-16'>
      <CategoryMenus categorys = {['React','javascript','Algorithm','React','javascript','Algorithm','React','javascript','Algorithm','React','javascript','Algorithm','React','javascript']}/>
      <div className='w-full h-auto'>

        <div className="mt-16 text-3xl font-extrabold w-full ml-5 mb-16">All posts ({props.posts.length})</div>
        
        <PostsContents contents = {props.posts}/>
        
        </div>
        
        </div>
    </Fragment>
  );
}
export function getStaticProps() {
  const allPosts = posts;
  const categorys = allCategorys;
  
  return {
    props: {
      posts: posts,
      categorys: categorys,
    }
  }
}
