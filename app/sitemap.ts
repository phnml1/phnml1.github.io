import type { MetadataRoute } from 'next';
import { allTags, getAllPosts, getCategorys } from '@/utils/Post-Util';
import { getPortfolioProjects } from '@/utils/PortfolioProject-Util';

export const dynamic = 'force-static';

const siteUrl = 'https://phnml1.github.io';

function toUrl(path: string) {
  return `${siteUrl}${encodeURI(path)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/projects', '/posts/all', '/posts/tag/all'];
  const projectRoutes = getPortfolioProjects()
    .filter((project) => project.frontmatter.category !== 'archive')
    .map((project) => `/projects/${project.slug}`);
  const categoryRoutes = getCategorys().map((category) => `/posts/${category}`);
  const tagRoutes = allTags.map((tag) => `/posts/tag/${tag}`);
  const postRoutes = getAllPosts().map((post) => `/${post.slug}`);

  return [...new Set([...staticRoutes, ...projectRoutes, ...categoryRoutes, ...tagRoutes, ...postRoutes])].map((path) => ({
    url: toUrl(path),
  }));
}
