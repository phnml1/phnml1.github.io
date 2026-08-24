import type { MetadataRoute } from 'next';
import { allTags, getAllPosts, getCategorys } from '@/utils/Post-Util';
import { getPortfolioProjectSlugs } from '@/utils/PortfolioProject-Util';

export const dynamic = 'force-static';

const siteUrl = 'https://phnml1.github.io';

function toUrl(path: string) {
  return `${siteUrl}${encodeURI(path)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/projects', '/posts/all', '/posts/tag/all'];
  const projectRoutes = getPortfolioProjectSlugs().map((slug) => `/projects/${slug}`);
  const categoryRoutes = getCategorys().map((category) => `/posts/${category}`);
  const tagRoutes = allTags.map((tag) => `/posts/tag/${tag}`);
  const postRoutes = getAllPosts().map((post) => `/${post.slug}`);

  return [...new Set([...staticRoutes, ...projectRoutes, ...categoryRoutes, ...tagRoutes, ...postRoutes])].map((path) => ({
    url: toUrl(path),
  }));
}
