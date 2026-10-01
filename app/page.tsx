import FeaturedPosts from '@/components/home/FeaturedPost';
import HomeCapabilities from '@/components/home/HomeCapabilities';
import HomeIntro from '@/components/home/HomeIntro';
import Reveal from '@/components/motion/Reveal';
import Link from 'next/link';
import type { Metadata } from 'next';
import { recentPosts } from '@/utils/Post-Util';

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
  contribution: string;
};

const selectedProjects: HomeProject[] = [
  {
    title: 'NP WMS Picking',
    href: '/projects/np-wms-picking',
    type: '회사 프로젝트 · MJ Corporation',
    period: '2026.07 - 2026.08',
    summary: 'PDA 작업자의 스캔·피킹 순서를 작은 화면에 맞추고, 연결이 끊겨도 작업 명령을 보존했습니다.',
    contribution: 'PDA UI · 스캐너 입력 통합 · IndexedDB outbox',
  },
  {
    title: 'NP-OIS',
    href: '/projects/np-ois',
    type: '회사 프로젝트 · MJ Corporation',
    period: '2026.05 - 2026.07',
    summary: 'Excel/VBA 주문 가공 업무를 업로드·변환·검수·산출물 생성 화면으로 연결했습니다.',
    contribution: 'React 업무 화면 · 조건부 polling · 검수 API 연동',
  },
  {
    title: 'CodeMate',
    href: '/projects/codemate',
    type: '개인 프로젝트',
    period: '2026.02 - 현재',
    summary: 'GitHub PR 리뷰와 실시간 댓글·알림을 다루는 코드 리뷰 협업 플랫폼입니다.',
    contribution: 'TanStack Query 댓글 캐시 · Socket.io · AI 리뷰 상태',
  },
  {
    title: 'Fly:On',
    href: '/projects/fly-on',
    type: '팀 프로젝트 · 모바일',
    period: '2025.06 - 2025.11',
    summary: '패러글라이딩 비행·관광 일정을 편집하는 React Native 앱입니다.',
    contribution: 'Drag & Drop · 렌더링 성능 개선 · 인증 상태 복원',
  },
];

export default function HomePage() {
  const posts = JSON.parse(JSON.stringify(recentPosts));

  return (
    <>
      <HomeIntro />

      <ProjectSection
        eyebrow="Selected Case Studies"
        title="대표 프로젝트"
        description="회사에서 맡은 업무와 개인·팀 프로젝트의 구현 범위를 구분해 정리했습니다."
        projects={selectedProjects}
      />

      <HomeCapabilities />

      <section className="w-full px-5 py-28 md:px-12" aria-labelledby="journal-title">
        <div className="mx-auto w-full max-w-[1440px]">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                  Tech Journal
                </span>
                <h2
                  id="journal-title"
                  className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl"
                >
                  기술 기록
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
  description,
  projects,
  surface = 'low',
}: {
  eyebrow: string;
  title: string;
  description: string;
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
          <header className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </span>
              <h2 className="max-w-4xl font-headline text-4xl font-black tracking-[-0.05em] md:text-6xl">
                {title}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-secondary">{description}</p>
          </header>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
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
      <article className="flex h-full min-h-[250px] min-w-0 flex-col">
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
          <p className="mt-3 text-sm leading-7 text-text-secondary">
            {project.summary}
          </p>
        </div>
        <div className="mt-auto flex min-w-0 items-end justify-between gap-5 border-t border-outline/70 pt-5">
          <p className="min-w-0 text-sm font-medium leading-6 text-primary">{project.contribution}</p>
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
