import { allTags, getPostsByTags } from '@/utils/Post-Util';
import PostLayout from '@/components/layouts/PostLayout';
import Layout from '@/components/layouts/Layout';
import CategoryMenus from '@/components/posts/CategoryMenus';

export default function PostTagPage(props) {
  return (
    <Layout>
      <CategoryMenus currentCategory={props.currentTag} categorys={props.tags} theme='tag'/>
    <PostLayout currentCategory={props.currentTag} categorys={props.tags} posts = {props.posts} theme='tag'>
    </PostLayout>
    </Layout>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { tag } = params;
  const tags = allTags;
  const postData = getPostsByTags(tag);
  return {
    props: {
        tags: tags,
        currentTag: tag,
        posts:postData,
    },
    revalidate: 600
  };
}

export function getStaticPaths() {
  const tags = allTags;
  tags.push('all');
  return {
    paths: tags.map(tag => ({params: {tag:tag}})),
    fallback: false,
  }
  
}