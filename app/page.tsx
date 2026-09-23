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
  metric: string;
  label: string;
  summary: string;
  context?: string;
};

const selectedProjects: HomeProject[] = [
  {
    title: 'CodeMate',
    href: '/projects/codemate',
    metric: '10→0',
    label: 'synthetic 댓글 이벤트 10건의 추가 API 요청',
    summary:
      'Socket.io 연결과 PR room 수명주기를 분리하고, 댓글 이벤트를 TanStack Query 캐시에 직접 반영한 실시간 협업 제품입니다.',
  },
  {
    title: 'NP WMS Picking',
    href: '/projects/np-wms-picking',
    metric: '55 / 224',
    label: 'Mobile FE / Backend tests',
    summary:
      '640×480급 PDA, 물리 스캐너, IndexedDB outbox와 부분 피킹 상태를 연결한 현장 실행 프론트엔드입니다.',
    context: 'Same company · Warehouse operations',
  },
  {
    title: 'NP-OIS',
    href: '/projects/np-ois',
    metric: '8 stages',
    label: 'upload → archive workflow',
    summary:
      '기존 MVP를 확장해 업로드부터 snapshot 고정, 검수, 산출물 보관까지 장기 실행 업무 흐름을 연결했습니다.',
    context: 'Same company · Order operations',
  },
];

const mobileProjects: HomeProject[] = [
  {
    title: 'Fly:On',
    href: '/projects/fly-on',
    metric: '211.5→72.9ms',
    label: '동일 Drag & Drop 시나리오 · total commit duration',
    summary:
      'PanResponder와 floating layer로 일정 편집을 구현하고, React Profiler 측정 뒤 memoization과 컴포넌트 분리로 렌더 범위를 줄였습니다.',
  },
  {
    title: "Runner's High",
    href: '/projects/runners-high',
    metric: '10s',
    label: '이동 거리 기반 pace window',
    summary:
      'STOMP 재연결·재구독, 미전송 위치 frame queue와 인증 refresh queue로 위치 기반 모바일 흐름의 복구 경로를 설계했습니다.',
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
        description="이력서에 정리한 회사 프로젝트와 개인 프로젝트를 구현 범위, 사용 기술, 검증 근거 중심으로 정리했습니다."
        projects={selectedProjects}
      />

      <ProjectSection
        eyebrow="Mobile & Realtime Experience"
        title="모바일·실시간 프로젝트"
        description="React Native 일정 화면, 위치 공유, 댓글 동기화처럼 모바일과 실시간 이벤트가 포함된 프로젝트 경험입니다."
        projects={mobileProjects}
        compact
        surface="default"
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

      <section
        className="w-full bg-surface-low px-5 py-24 md:px-12"
        aria-labelledby="home-cta-title"
      >
        <Reveal className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-8 rounded-2xl border border-outline/70 bg-surface-container p-7 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Next Step
              </span>
              <h2
                id="home-cta-title"
                className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] text-white md:text-5xl"
              >
                프로젝트 상세 내용을 확인해 보세요.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-lg bg-primary px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.18em] text-surface transition-colors hover:bg-white"
              >
                All Projects
              </Link>
              <Link
                href="https://github.com/phnml1"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-primary/50 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-surface"
              >
                GitHub
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ProjectSection({
  eyebrow,
  title,
  description,
  projects,
  compact = false,
  surface = 'low',
}: {
  eyebrow: string;
  title: string;
  description: string;
  projects: HomeProject[];
  compact?: boolean;
  surface?: 'low' | 'default';
}) {
  return (
    <section
      className={`w-full px-5 py-28 md:px-12 ${surface === 'low' ? 'bg-surface-low' : ''}`}
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

        <div className={`grid gap-6 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {projects.map((project, index) => (
            <Reveal key={project.href} delay={index * 0.07} className="h-full">
              <HomeProjectCard project={project} index={index + 1} compact={compact} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeProjectCard({
  project,
  index,
  compact,
}: {
  project: HomeProject;
  index: number;
  compact: boolean;
}) {
  return (
    <Link
      href={project.href}
      aria-label={`${project.title} Case Study 보기`}
      className="group block h-full min-w-0 rounded-2xl border border-outline/70 bg-surface-container p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-surface-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:p-8"
    >
      <article
        className={`grid h-full min-w-0 grid-rows-[1fr_auto] ${
          compact ? 'min-h-[320px]' : 'min-h-[410px]'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Case {String(index).padStart(2, '0')}
            </span>
            {project.context ? (
              <span className="rounded-full border border-outline/70 px-3 py-1 text-[10px] leading-5 text-text-secondary">
                {project.context}
              </span>
            ) : null}
          </div>
          <h3 className="mt-7 break-words text-3xl font-black leading-tight tracking-[-0.045em] text-white transition-colors group-hover:text-primary md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-5 text-sm leading-7 text-text-secondary md:text-base">
            {project.summary}
          </p>
        </div>
        <div className="mt-10 flex min-w-0 items-end justify-between gap-5 border-t border-outline/70 pt-6">
          <div className="min-w-0">
            <div
              className={`text-gradient break-words font-black tracking-[-0.055em] ${
                compact ? 'text-[clamp(2rem,7vw,3.25rem)]' : 'text-[clamp(2rem,8vw,3.5rem)]'
              }`}
            >
              {project.metric}
            </div>
            <div className="mt-2 max-w-xs font-label text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-text-secondary">
              {project.label}
            </div>
          </div>
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
