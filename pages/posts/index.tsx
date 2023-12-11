import { Fragment } from "react";
import Head from "next/head";
import CategorySwiper from "@/components/posts/CategorySwiper";


export default function AllPostsPage(props) {
  const DUMMY_CONTENTS = [
    {text: 'react', image: '/next.svg'},
    {text: 'javascript', image: '/next.svg'},
    {text: 'porrr', image: '/next.svg'},
    {text: 'react', image: '/next.svg'},
    {text: 'javascript', image: '/next.svg'},
    {text: 'porrr', image: '/next.svg'},
  ];
  return (
    <Fragment>
      <Head>
        <title>모든 포스트</title>
        <meta name = "description" content = "모든 포스트 보여주기" />
      </Head>
      <div className="w-4/5 flex flex-col items-center">
        <div className="w-full flex justify-center mt-4">
      <CategorySwiper content = {DUMMY_CONTENTS}/>
      </div>
      </div>
    </Fragment>
  )
}
