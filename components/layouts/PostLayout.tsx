import { Fragment } from 'react';
import Head from 'next/head';
import PostsContents from '../posts/PostsContents';

export default function PostLayout(props) {
  return (
      <Fragment>
        <Head>
          <title>phnml1{`'`}s blog</title>
          <meta
            name="description"
            content={`${props.currentCategory}와 관련한 글 모두 보여주기`}
          />
        </Head>
        <div className="w-full relative h-auto flex items-start justify-center mb-8 md:w-4/5 px-8 flex-col">
          
          <div className="w-full h-auto mt-10">
          
            <div className="mt-16 text-3xl font-extrabold w-full ml-5 mb-16 flex gap-2">
              <div>
              {props.currentCategory === 'all' ? 'All Posts' : props.currentCategory}
              {(props.theme == 'search') && 'Filtered Posts'}
              </div>
              
              <div>
               (
              {props.posts.length})
              
              </div>
            </div>
            <PostsContents contents={props.posts} />
          </div>
        </div>
      </Fragment>
  );
}
