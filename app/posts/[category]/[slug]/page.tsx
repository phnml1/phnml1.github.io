import PostDetailLayout from '@/components/layouts/PostDetailLayout';
import { getAllPosts, getNextData, getPostData, getPrevData } from '@/utils/Post-Util';
import { decodeRouteSegment } from '@/utils/Route-Util';
import readingTime from 'reading-time';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllPosts().map((post) => {
    const [, category, slug] = post.slug.split('/');
    return { category, slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = decodeRouteSegment(rawCategory);
  const slug = decodeRouteSegment(rawSlug);
  const detailPath = `posts/${category}/${slug}.mdx`;

  try {
    const post = getPostData(detailPath);
    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        type: 'article',
        url: `https://phnml1.github.io/${post.slug}`,
        images: [`https://phnml1.github.io/${post.slug}/${post.image}`],
      },
    };
  } catch {
    return {};
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = decodeRouteSegment(rawCategory);
  const slug = decodeRouteSegment(rawSlug);
  const detailPath = `posts/${category}/${slug}.mdx`;
  let postData;
  let prevData;
  let nextData;

  try {
    postData = getPostData(detailPath);
    prevData = getPrevData(detailPath);
    nextData = getNextData(detailPath);
    postData.readingMinutes = Math.ceil(readingTime(postData.content).minutes);
  } catch {
    notFound();
  }

  return (
    <PostDetailLayout
      post={JSON.parse(JSON.stringify(postData))}
      category={category}
      prevData={JSON.parse(JSON.stringify(prevData))}
      nextData={JSON.parse(JSON.stringify(nextData))}
    />
  );
}
