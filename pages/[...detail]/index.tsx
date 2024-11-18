// import { getNextData, getPostData, getPrevData, posts } from '@/utils/Post-Util';
// import { Post } from '@/.contentlayer/generated';
import PostDetailLayout from '@/components/layouts/PostDetailLayout';
import { Post } from '@/types';
import { getAllPosts, getNextData, getPostData, getPrevData, } from '@/utils/Post-Util';
import { GetStaticProps } from 'next';
import readingTime from 'reading-time'
import Head from 'next/head';
import Layout from '@/components/layouts/Layout';

interface PostDetailProps {
  post: Post;
  category: string;
  prevData:Post;
  nextData:Post;
}
export function PostDetailPage(props:PostDetailProps) {
  return (
    <>
    <Head>
          <title>{props.post.title}</title>
          <meta name="description" content={`${props.post.summary}`} />
          <meta property="og:title" content={props.post.title} />
          <meta property="og:description" content={props.post.summary} />
          <meta
            property="og:image"
            content={`https://phnml1.github.io/${props.post.slug}/${props.post.image}`}
          />
          <meta property="og:url" content={`https://phnml1.github.io/${props.post.slug}`} />
          <meta property="og:type" content="article" />

          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={props.post.title} />
          <meta name="twitter:description" content={props.post.summary} />
          <meta name="twitter:image" content={`https://phnml1.github.io/${props.post.slug}/${props.post.image}`} /> */}

        </Head>
      <PostDetailLayout post={props.post} category = {props.category} prevData = {props.prevData} nextData={props.nextData}>
      </PostDetailLayout>
      </>
  );
}
export const getStaticProps :GetStaticProps = ({params}) => {
  const {detail} = params as {detail:string[]};
  const detailPath = detail.join('/')+'.mdx';
  const postData = getPostData(`${detailPath}`);
  const prevData = getPrevData(`${detailPath}`);
  const nextData = getNextData(`${detailPath}`);
  postData.readingMinutes = Math.ceil(readingTime(postData.content).minutes)
  return {
    props: {
      post: JSON.parse(JSON.stringify(postData)),
      category: detail[1],
      prevData: JSON.parse(JSON.stringify(prevData)),
      nextData: JSON.parse(JSON.stringify(nextData)),
    },
  };
}

export function getStaticPaths() {
  const slugs = getAllPosts().map((file:Post) => file.slug);
  return {
    paths: slugs.map((slug: string) => {
      const detail = slug.split('/');
      return { params: { detail } };
    }),
    fallback: false,
  };
}
export default PostDetailPage;
