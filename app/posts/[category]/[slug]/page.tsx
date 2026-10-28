import PostDetailLayout from '@/components/layouts/PostDetailLayout';
import { getNextData, getPostByRoute, getPostRoutes, getPrevData } from '@/utils/Post-Util';
import { decodeRouteSegment, postHref } from '@/utils/Route-Util';
import type { Post } from '@/types';
import Link from 'next/link';
import readingTime from 'reading-time';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getPostRoutes().map((route) => {
    const [, category, slug] = route.split('/');
    return { category, slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = decodeRouteSegment(rawCategory);
  const slug = decodeRouteSegment(rawSlug);
  const route = getPostByRoute(category, slug);

  if (!route) {
    return {};
  }

  const { post, isAlias } = route;
  const assetSlug = post.assetSlug ?? post.slug;

  return {
    title: isAlias ? `${post.title} 주소 변경 안내` : post.title,
    description: isAlias ? `글의 새 주소를 안내합니다. ${post.summary}` : post.summary,
    robots: isAlias ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: `/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url: `https://phnml1.github.io/${post.slug}`,
      images: [`https://phnml1.github.io/${assetSlug}/${post.image}`],
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: rawCategory, slug: rawSlug } = await params;
  const category = decodeRouteSegment(rawCategory);
  const slug = decodeRouteSegment(rawSlug);
  const route = getPostByRoute(category, slug);

  if (!route) {
    notFound();
  }

  const { post: postData, isAlias } = route;

  if (isAlias) {
    return <MovedPostNotice post={postData} />;
  }

  const prevData = getPrevData(postData.slug);
  const nextData = getNextData(postData.slug);
  postData.readingMinutes = Math.ceil(readingTime(postData.content).minutes);

  return (
    <PostDetailLayout
      post={JSON.parse(JSON.stringify(postData))}
      category={category}
      prevData={JSON.parse(JSON.stringify(prevData))}
      nextData={JSON.parse(JSON.stringify(nextData))}
    />
  );
}

function MovedPostNotice({ post }: { post: Post }) {
  return (
    <section className="w-full px-5 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto max-w-3xl border-y border-outline/70 py-14">
        <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
          URL Updated
        </span>
        <h1 className="mt-5 font-headline text-4xl font-black leading-tight text-white md:text-5xl">
          글 주소가 변경되었습니다
        </h1>
        <p className="mt-6 break-keep text-lg leading-8 text-text-secondary">
          글 제목과 현재 내용을 기준으로 주소를 정리했습니다. 같은 글을 새 주소에서 계속 읽을 수
          있습니다.
        </p>
        <p className="mt-5 font-semibold text-white">{post.title}</p>
        <Link
          href={postHref(post.slug)}
          className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-bold text-surface transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          새 주소에서 글 읽기{' '}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
