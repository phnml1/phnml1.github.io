import { getNextData, getPostData, getPrevData, posts } from '@/utils/Post-Util';
import { Post } from '@/.contentlayer/generated';
import Layout from '@/components/layouts/Layout';
import PostDetailLayout from '@/components/layouts/PostDetailLayout';

export function PostDetailPage(props) {
  return (
    <Layout>
      <PostDetailLayout post={props.post} category = {props.category} prevData = {props.prevData} nextData={props.nextData}/>
    </Layout>
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
