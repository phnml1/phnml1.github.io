import { allTags, getPostsByTags } from '@/utils/Post-Util';
import PostLayout from '@/components/layouts/PostLayout';
import Layout from '@/components/layouts/Layout';
import CategoryMenus from '@/components/posts/CategoryMenus';
import { Post } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
interface PostTagPageProps {
  currentTag: string;
  tags: string[];
  posts: Post[];
}
export default function PostTagPage(props:PostTagPageProps) {
  return (
    <>
      <CategoryMenus currentCategory={props.currentTag} categorys={props.tags} theme='tag'/>
    <PostLayout currentCategory={props.currentTag} posts = {props.posts} theme='tag'>
    </PostLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = ({params}) => {
  const { tag } = params as {tag: string};
  const tags:string[] = allTags;
  const postData:Post[] = getPostsByTags(tag);
  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
        tags: tags,
        currentTag: tag,
        posts:JSON.parse(JSON.stringify(postData)),
    },
  };
}

export const getStaticPaths:GetStaticPaths = () => {
  const tags:string[] = allTags;
  tags.push('all');
  return {
    paths: tags.map(tag => ({params: {tag:tag}})),
    fallback: false,
  }
  
}