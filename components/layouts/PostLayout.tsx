import { Fragment, useState } from 'react';
import Layout from './Layout';
import Head from 'next/head';
import CategoryMenus from '../posts/CategoryMenus';
import PostsContents from '../posts/PostsContents';
import useScroll from '@/utils/useScroll';
import NavButton from '../NavButton';

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
          
          <div className="w-full flex justify-center mt-6">
            <NavButton link={`/posts/${(props.theme==='category')?'tag/all':'all'}`} content={`Show Posts by ${(props.theme==='category')?'Tag':'Category'}`} />
          </div>
          <div className="w-full h-auto mt-10">
            {
            (props.theme != 'search') && (
            <div className="mt-16 text-3xl font-extrabold w-full ml-5 mb-16">
              {props.currentCategory === 'all' ? 'All Posts' : props.currentCategory} (
              {props.posts.length})
              
              </div>
            )
            }
            <PostsContents contents={props.posts} />
          </div>
        </div>
      </Fragment>
  );
}
