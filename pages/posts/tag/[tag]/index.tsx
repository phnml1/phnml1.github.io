import { allTags, getPostsByTags } from '@/utils/Post-Util';
import PostLayout from '@/components/layouts/PostLayout';

export default function PostTagPage(props) {
  return (
    <PostLayout currentCategory={props.currentTag} categorys={props.tags} posts = {props.posts}>
    </PostLayout>
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
  return {
    paths: tags.map(tag => ({params: {tag:tag}})),
    fallback: false,
  }
  
}