import { Fragment, useState } from 'react';
import Head from 'next/head';
import PostsContents from '@/components/posts/PostsContents';
import { getPostsByCategory, allCategorys } from '@/utils/Post-Util';
import CategoryMenus from '@/components/posts/CategoryMenus';
import PostLayout from '@/components/layouts/PostLayout';

export default function PostsCategoryPage(props) {
  return (
    <PostLayout currentCategory={props.currentCategory} posts = {props.posts} categorys={props.categorys}>
    </PostLayout>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { category } = params;
  const categorys = allCategorys;
  const postData = getPostsByCategory(category);
  return {
    props: {
        posts: postData,
        categorys: categorys,
        currentCategory: category
    },
    revalidate: 600
  };
}

export function getStaticPaths() {
  const categorys = allCategorys;
  categorys.push('all');

  return {
    paths: categorys.map(category => ({params: {category:category}})),
    fallback: false,
  }
  
}