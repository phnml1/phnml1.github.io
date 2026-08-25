import FeaturedPosts from '@/components/home/FeaturedPost';
import Link from 'next/link';
import type { Metadata } from 'next';
import { recentPosts } from '@/utils/Post-Util';
import HomeIntro from '@/components/home/HomeIntro';
import Reveal from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: '이주영 | 신입 프론트엔드 개발자',
  description:
    'React와 TypeScript로 업무 화면과 서버 상태를 구현하고, TypeScript·SQL 기반 서버 구현 경험을 함께 정리한 이주영의 프론트엔드 포트폴리오',
  alternates: { canonical: '/' },
  openGraph: {
    title: '이주영 | 신입 프론트엔드 개발자',
    description: '프로젝트의 문제, 기여 범위, 기술 판단, 검증 결과를 정리한 프론트엔드 포트폴리오',
    url: '/',
    type: 'website',
  },
};

const featuredProjects = [
  {
    title: 'CodeMate',
    href: '/projects/codemate',
    metric: '10→0',
    label: 'comment API requests',
    summary:
      'GitHub PR 댓글 이벤트를 TanStack Query 캐시에 직접 반영해 실시간 협업 흐름과 API 요청 비용을 개선한 개인 프로젝트입니다.',
  },
  {
    title: 'NP WMS Picking',
    href: '/projects/np-wms-picking',
    metric: '55 / 224',
    label: 'mobile FE / backend tests',
    summary:
      'PDA, Android WebView, WMS 계약을 연결해 스캐너 입력, 오프라인 복구, 부분 피킹 흐름을 다룬 실무 프로젝트입니다.',
  },
  {
    title: 'Fly:On',
    href: '/projects/fly-on',
    metric: '211.5→72.9ms',
    label: 'drag total commit duration',
    summary:
      'React Native 일정 Drag & Drop을 직접 구현하고 React Profiler 측정으로 렌더링 병목을 줄인 팀 프로젝트입니다.',
  },
];

const additionalProjects = [
  {
    title: 'Career Hub',
    href: '/projects/career-hub',
    metric: '1→0',
    label: 'detail refetch',
    summary:
      '지원 단계, 일정, 알림을 하나의 PWA 흐름으로 묶고 상태 동기화 규칙과 캐시 갱신 경로를 분리한 프로젝트입니다.',
  },
  {
    title: 'NP-OIS',
    href: '/projects/np-ois',
    metric: '59',
    label: 'backend tests',
    summary:
      'Excel VBA 주문 처리 업무를 업로드, 변환 큐, 검수, 산출물 보관이 가능한 웹 워크플로로 전환한 실무 프로젝트입니다.',
  },
  {
    title: "Runner's High",
    href: '/projects/runners-high',
    metric: '10s',
    label: 'pace window',
    summary:
      '실시간 위치 공유, 러닝 상태 분리, GPS pace 보정, 인증 복구 흐름을 다룬 위치 기반 모바일 프로젝트입니다.',
  },
];

export default function HomePage() {
  const posts = JSON.parse(JSON.stringify(recentPosts));

  return (
    <>
      <HomeIntro />
      <section className="w-full bg-surface-low px-5 py-28 md:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                  Representative Work
                </span>
                <h2 className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl">
                  운영 흐름을 다룬 프로젝트.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-text-secondary">
                댓글 동기화, PDA 피킹, 모바일 일정 편집 과정에서 상태 관리와 입력 처리, 렌더링
                성능을 개선했습니다.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Reveal
                key={project.href}
                delay={index * 0.07}
                className={index === 1 ? 'lg:mt-24' : ''}
              >
                <Link
                  href={project.href}
                  className="group block h-full min-w-0 rounded-xl border border-transparent bg-surface-container p-8 transition-colors duration-200 hover:border-primary/40 hover:bg-surface-high"
                >
                  <article className="grid min-h-[360px] min-w-0 grid-rows-[1fr_auto]">
                    <div>
                      <div className="mb-8 font-label text-xs uppercase tracking-[0.24em] text-primary">
                        Project 0{index + 1}
                      </div>
                      <h3 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.045em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary">
                        {project.summary}
                      </p>
                    </div>
                    <div className="mt-12 flex items-end justify-between gap-6">
                      <div>
                        <div className="text-gradient break-all text-[clamp(2.25rem,11vw,3.75rem)] font-black tracking-[-0.06em]">
                          {project.metric}
                        </div>
                        <div className="font-label text-xs uppercase tracking-[0.2em] text-text-secondary">
                          {project.label}
                        </div>
                      </div>
                      <span
                        aria-hidden="true"
                        className="text-3xl text-primary transition-transform group-hover:translate-x-2"
                      >
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <details className="group mt-10 rounded-2xl border border-outline/70 bg-surface-container p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    More Projects
                  </span>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    주문 처리 웹 전환, PWA, 위치 기반 프로젝트는 펼쳐서 확인할 수 있습니다.
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/50 text-lg text-primary transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>

              <div className="mt-6 grid gap-5 border-t border-outline/70 pt-6 lg:grid-cols-3">
                {additionalProjects.map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="group/card rounded-xl border border-outline/60 bg-surface-low p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-surface-high"
                  >
                    <article className="grid min-h-[250px] grid-rows-[1fr_auto]">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.035em] text-white transition-colors group-hover/card:text-primary">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-text-secondary">
                          {project.summary}
                        </p>
                      </div>
                      <div className="mt-8 flex items-end justify-between gap-4 border-t border-outline/70 pt-5">
                        <div>
                          <div className="text-gradient text-3xl font-black tracking-[-0.04em]">
                            {project.metric}
                          </div>
                          <div className="mt-1 font-label text-[10px] uppercase tracking-[0.18em] text-text-secondary">
                            {project.label}
                          </div>
                        </div>
                        <span
                          aria-hidden="true"
                          className="text-2xl text-primary transition-transform group-hover/card:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </details>
          </Reveal>
        </div>
      </section>
      <section className="w-full px-5 py-28 md:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <Reveal>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                  Tech Journal
                </span>
                <h2 className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl">
                  Recent posts.
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
