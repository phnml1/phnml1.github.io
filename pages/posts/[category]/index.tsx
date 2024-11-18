import Layout from "@/components/layouts/Layout";
import PostLayout from "@/components/layouts/PostLayout";
import BlogIntroduce from "@/components/posts/BlogIntroduce";
import CategoryMenus from "@/components/posts/CategoryMenus";
import { Post } from "@/types";
import { getCategorys, getPostsByCategory } from "@/utils/Post-Util";
import { GetStaticPaths, GetStaticProps } from "next";
interface PostsCategoryPageProps {
  currentCategory: string;
  categorys: string[];
  posts: Post[];
}
export default function PostsCategoryPage(props:PostsCategoryPageProps) {
  return (
    <>
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
    </>
  );
}
// 블로그하자
export const getStaticProps: GetStaticProps = ({params}) => {
  // 명시적 타입 단언
  const {category} = params as {category: string};

  const postData: Post[] = getPostsByCategory(category);
  if(postData){
  const categorys: string[] = getCategorys();
  
  return {
    props: {
      posts: JSON.parse(JSON.stringify(postData)) ,
      categorys: categorys,
      currentCategory: category,
    }
  };
}
  return {
    notFound:true
  }
  
} 


export const getStaticPaths: GetStaticPaths = () => {
  const categorys:string[] = getCategorys();
  categorys.push('all');

  return {
    paths: categorys.map((category) => ({ params: { category: category } })),
    fallback: false,
  };
}