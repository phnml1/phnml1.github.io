import PostContent from '@/components/detail/PostContent';
import PostHeader from '@/components/detail/PostHeader';
import { getPostData, posts } from '@/utils/Post-Util';
import Head from 'next/head';
import { Fragment } from 'react';
import { Post } from '@/.contentlayer/generated';

export function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={`${props.post.summary}`}></meta>
      </Head>
    <div className="mt-4 w-full md:w-4/5 px-8 flex flex-col items-center">
      <PostHeader title={props.post.title} category={props.category} date={props.post.date} tags={props.post.tags}/>
      <div className='w-full flex mt-8'>
        <PostContent title = {props.post.title} content={props.post.body.code} slug = {props.post.slug}/>
      </div>
    </div>
    </Fragment>
  );
}
export function getStaticProps(context) {
  const { params } = context;
  const { detail } = params;
  const detailPath = detail.slice(1).join('/');
  const postData = getPostData(`${detailPath}.mdx`);
  console.log(postData);
  return {
    props: {
      post: postData,
      category: detail[1],
    },
  };
}

export function getStaticPaths() {
  const slugs = posts.map((file:Post) => file.slug);
  return {
    paths: slugs.map((slug:string) => {
      const detail = slug.split('/').slice(1);
      return { params: { detail } };
    }),
    fallback: false,
  };
}
export default PostDetailPage;
