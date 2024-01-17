import PostContent from '@/components/detail/PostContent';
import PostHeader from '@/components/detail/PostHeader';
import { getNextData, getPostData, getPrevData, posts } from '@/utils/Post-Util';
import Head from 'next/head';
import { Fragment } from 'react';
import { Post } from '@/.contentlayer/generated';
import PostFooter from '@/components/detail/PostFooter';
import Line from '@/components/Line';

export function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={`${props.post.summary}`}></meta>
      </Head>
      <div className="mt-4 w-full md:w-4/5 px-8 flex flex-col items-center">
        <PostHeader
          title={props.post.title}
          category={props.category}
          date={props.post.date}
          tags={props.post.tags}
        />
        <PostContent
          title={props.post.title}
          content={props.post.body.code}
          slug={props.post.slug}
        />
        <Line mt='8'/>
        <PostFooter prevData = {props.prevData} nextData={props.nextData}/>
        
      </div>
    </Fragment>
  );
}
export function getStaticProps(context) {
  const { params } = context;
  const { detail } = params;
  const detailPath = detail.slice(1).join('/');
  const postData = getPostData(`${detailPath}.mdx`);
  const prevData = getPrevData(`${detailPath}.mdx`);
  const nextData = getNextData(`${detailPath}.mdx`);
  return {
    props: {
      post: postData,
      category: detail[1],
      prevData: prevData,
      nextData: nextData,
    },
  };
}

export function getStaticPaths() {
  const slugs = posts.map((file: Post) => file.slug);
  return {
    paths: slugs.map((slug: string) => {
      const detail = slug.split('/').slice(1);
      return { params: { detail } };
    }),
    fallback: false,
  };
}
export default PostDetailPage;
