import FeaturedPosts from '@/components/home/FeaturedPost';
import HomeCapabilities from '@/components/home/HomeCapabilities';
import HomeIntro from '@/components/home/HomeIntro';
import Reveal from '@/components/motion/Reveal';
import Link from 'next/link';
import type { Metadata } from 'next';
import { recentPosts } from '@/utils/Post-Util';
import { getPortfolioProjects } from '@/utils/PortfolioProject-Util';

export const metadata: Metadata = {
  title: '이주영 | Frontend Engineer',
  description:
    'Next.js, React, TypeScript로 업무 화면, API 연동, 실시간 이벤트, 모바일 인터랙션을 구현해 온 이주영의 프론트엔드 포트폴리오',
  alternates: { canonical: '/' },
  openGraph: {
    title: '이주영 | Frontend Engineer',
    description: 'React와 TypeScript 기반 업무 화면, 데이터 흐름, 모바일 프로젝트 경험을 정리한 포트폴리오',
    url: '/',
    type: 'website',
  },
};

type HomeProject = {
  title: string;
  href: string;
  type: string;
  period: string;
  summary: string;
  problem: string;
  contribution: string;
};

const featuredProjects = [
  {
    slug: 'np-wms-picking',
    type: '회사 프로젝트 · MJ Corporation',
  },
  {
    slug: 'np-ois',
    type: '회사 프로젝트 · MJ Corporation',
  },
  {
    slug: 'codemate',
    type: '개인 프로젝트',
  },
];

const projectBySlug = new Map(getPortfolioProjects().map((project) => [project.slug, project]));
const selectedProjects: HomeProject[] = featuredProjects.map((item) => {
  const project = projectBySlug.get(item.slug);

  if (!project) {
    throw new Error(`Featured project not found: ${item.slug}`);
  }

  return {
    title: project.frontmatter.title,
    href: `/projects/${project.slug}`,
    type: item.type,
    period: project.frontmatter.period ?? '',
    summary: project.summary,
    problem: project.frontmatter.problem ?? '',
    contribution: project.frontmatter.contribution ?? '',
  };
});

export default function HomePage() {
  const posts = JSON.parse(JSON.stringify(recentPosts));

  return (
    <>
      <HomeIntro />

      <ProjectSection
        eyebrow="Selected Case Studies"
        title="대표 프로젝트"
        projects={selectedProjects}
      />

      <HomeCapabilities />

      <section className="w-full px-5 py-28 md:px-12" aria-labelledby="journal-title">
        <div className="mx-auto w-full max-w-[1440px]">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                  Tech Blog
                </span>
                <h2
                  id="journal-title"
                  className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl"
                >
                  기술 블로그
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/posts/Algorithm"
                  className="w-fit rounded-lg border border-outline px-5 py-3 font-label text-xs font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-primary hover:text-white"
                >
                  Algorithm Notes
                </Link>
                <Link
                  href="/posts/all"
                  className="w-fit rounded-lg bg-surface-container px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-surface-high"
                >
                  All Posts
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06} className="h-full">
                <FeaturedPosts post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

function ProjectSection({
  eyebrow,
  title,
  projects,
  surface = 'low',
}: {
  eyebrow: string;
  title: string;
  projects: HomeProject[];
  surface?: 'low' | 'default';
}) {
  return (
    <section
      className={`w-full px-5 py-20 md:px-12 ${surface === 'low' ? 'bg-surface-low' : ''}`}
      aria-label={eyebrow}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal>
          <header className="mb-14">
            <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
              {eyebrow}
            </span>
            <h2 className="max-w-4xl font-headline text-4xl font-black tracking-[-0.05em] md:text-6xl">
              {title}
            </h2>
          </header>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.href} delay={index * 0.07} className="h-full">
              <HomeProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeProjectCard({
  project,
}: {
  project: HomeProject;
}) {
  return (
    <Link
      href={project.href}
      aria-label={`${project.title} Case Study 보기`}
      className="group block h-full min-w-0 rounded-lg border border-outline/70 bg-surface-container p-6 transition duration-300 hover:border-primary/60 hover:bg-surface-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:p-8"
    >
      <article className="flex h-full min-h-[300px] min-w-0 flex-col">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {project.type}
            </span>
            <span className="text-xs text-text-secondary">{project.period}</span>
          </div>
          <h3 className="mt-5 break-words text-2xl font-black leading-tight text-white transition-colors group-hover:text-primary md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 break-keep text-base leading-7 text-white">
            {project.summary}
          </p>
          <div className="mt-5 grid gap-2 border-t border-outline/70 pt-4 text-sm leading-6">
            <p className="text-text-secondary"><span className="mr-2 font-bold text-primary">핵심 문제</span>{project.problem}</p>
            <p className="text-text-secondary"><span className="mr-2 font-bold text-primary">내 역할</span>{project.contribution}</p>
          </div>
        </div>
        <div className="mt-auto flex min-w-0 items-end justify-end pt-5">
          <span
            aria-hidden="true"
            className="shrink-0 text-3xl text-primary transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
