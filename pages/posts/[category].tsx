import { Fragment, useState } from 'react';
import Head from 'next/head';
import CategorySwiper from '@/components/posts/CategorySwiper';
import PostsContents from '@/components/posts/PostsContents';
import { useRouter } from 'next/router';

export default function PostsCategoryPage(props) {
  const router = useRouter();
  const { category } = router.query;
  const DUMMY_CATEGORYS = [
    { id:0, text: 'React', image: '/next.svg' },
    { id:1, text: 'Javascript', image: '/next.svg' },
    { id:2, text: 'Algorhythm', image: '/next.svg' },
    { id:3, text: 'React', image: '/next.svg' },
    { id:4, text: 'Javascript', image: '/next.svg' },
    { id:5, text: 'Algorhythm', image: '/next.svg' },
  ];
  const DUMMY_CONTENTS = [
    { title: 'React DeepDive 정리 1', date: '23/12/02', summary: 'React deepdive에 대한 정리입니다', tag: ['React', 'Study', 'React', 'Study']},
    { title: 'React DeepDive 정리 2', date: '23/12/02', summary: 'React deepdive에 대한 정리입니다', tag: ['React', 'Study']},
    { title: 'React DeepDive 정리 3', date: '23/12/02', summary: 'React deepdive에 대한 정리입니다', tag: ['React', 'Study']},
    { title: 'React DeepDive 정리 4', date: '23/12/02', summary: 'React deepdive에 대한 정리입니다', tag: ['React', 'Study']},
    { title: 'React DeepDive 정리 5', date: '23/12/02', summary: 'React deepdive에 대한 정리입니다', tag: ['React', 'Study']}
  ]

  return (
    <Fragment>
      <Head>
        <title>{category}</title>
        <meta name="description" content="모든 포스트 보여주기" />
      </Head>
      <div className="w-full flex flex-col items-center md:w-4/5">
        <div className="w-full flex justify-center mt-4">
          <CategorySwiper content={DUMMY_CATEGORYS} />
        </div>
        <div className="mt-16 text-3xl font-extrabold w-full ml-10 mb-12">{category} (39)</div>
        <PostsContents contents = {DUMMY_CONTENTS}/>
      </div>
    </Fragment>
  );
}


