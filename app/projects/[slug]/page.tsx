import { getPortfolioProject, getPortfolioProjectSlugs } from '@/utils/PortfolioProject-Util';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getPortfolioProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.frontmatter.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  notFound();
}
