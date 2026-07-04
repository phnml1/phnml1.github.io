import PostLayout from '@/components/layouts/PostLayout';
import BlogIntroduce from '@/components/posts/BlogIntroduce';
import CategoryMenus from '@/components/posts/CategoryMenus';
import { getCategorys, getPostsByCategory } from '@/utils/Post-Util';
import { decodeRouteSegment } from '@/utils/Route-Util';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [...getCategorys(), 'all'].map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params;
  const category = decodeRouteSegment(rawCategory);
  return {
    title: category === 'all' ? 'All Posts' : `${category} Posts`,
    description: `${category} articles from phnml1`,
  };
}

export default async function PostsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params;
  const category = decodeRouteSegment(rawCategory);
  const categories = getCategorys();

  if (category !== 'all' && !categories.includes(category)) {
    notFound();
  }

  const posts = JSON.parse(JSON.stringify(getPostsByCategory(category)));

  return (
    <>
      <BlogIntroduce />
      <CategoryMenus currentCategory={category} categorys={categories} theme="category" />
      <PostLayout currentCategory={category} posts={posts} theme="category" />
    </>
  );
}
