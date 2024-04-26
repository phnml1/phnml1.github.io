import Layout from "@/components/layouts/Layout";
import PostLayout from "@/components/layouts/PostLayout";
import BlogIntroduce from "@/components/posts/BlogIntroduce";
import CategoryMenus from "@/components/posts/CategoryMenus";
import { Post } from "@/types";
import { getCategory, getPostsByCategory } from "@/utils/Post-Util";

interface PostsCategoryPageProps {
  currentCategory: string;
  categorys: string[];
  posts: Post[];
}
export default function PostsCategoryPage(props:PostsCategoryPageProps) {
  return (
    <Layout>
      <BlogIntroduce />
      <CategoryMenus
        currentCategory={props.currentCategory}
        categorys={props.categorys}
        theme="category"
      />
      <PostLayout
        currentCategory={props.currentCategory}
        posts={props.posts}
        theme="category"
      ></PostLayout>
    </Layout>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { category } = params;
  const postData:Post[] = getPostsByCategory(category);
  const categorys:string[] = getCategory();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(postData)) ,
      categorys: categorys,
      currentCategory: category,
    }
  };
}

export function getStaticPaths() {
  const categorys = getCategory();
  categorys.push('all');

  return {
    paths: categorys.map((category) => ({ params: { category: category } })),
    fallback: false,
  };
}