import PostLayout from '@/components/layouts/PostLayout';
import CategoryMenus from '@/components/posts/CategoryMenus';
import { allTags, getPostsByTags } from '@/utils/Post-Util';
import { decodeRouteSegment } from '@/utils/Route-Util';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [...allTags, 'all'].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeRouteSegment(rawTag);
  return {
    title: tag === 'all' ? 'All Tags' : `#${tag}`,
    description: `${tag} tagged articles from phnml1`,
  };
}

export default async function PostTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeRouteSegment(rawTag);

  if (tag !== 'all' && !allTags.includes(tag)) {
    notFound();
  }

  const posts = JSON.parse(JSON.stringify(getPostsByTags(tag)));

  return (
    <>
      <CategoryMenus currentCategory={tag} categorys={allTags} theme="tag" />
      <PostLayout currentCategory={tag} posts={posts} theme="tag" />
    </>
  );
}
