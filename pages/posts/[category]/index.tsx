import { getPostsByCategory, allCategorys } from '@/utils/Post-Util';
import CategoryMenus from '@/components/posts/CategoryMenus';
import PostLayout from '@/components/layouts/PostLayout';
import Layout from '@/components/layouts/Layout';
import BlogIntroduce from '@/components/posts/BlogIntroduce';

export default function PostsCategoryPage(props) {
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
  const categorys = allCategorys;
  const postData = getPostsByCategory(category);
  return {
    props: {
      posts: postData,
      categorys: categorys,
      currentCategory: category,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const categorys = allCategorys;
  categorys.push('all');

  return {
    paths: categorys.map((category) => ({ params: { category: category } })),
    fallback: false,
  };
}
