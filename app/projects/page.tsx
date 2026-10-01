import Link from 'next/link';
import { PortfolioProject, getPortfolioProjects } from '@/utils/PortfolioProject-Util';
import ProjectArchive from '@/components/projects/ProjectArchive';
import Reveal from '@/components/motion/Reveal';

export const metadata = {
  title: 'Projects',
  description:
    '현재 프로젝트의 핵심 문제와 검증 결과, 직접 구축·운영하는 포트폴리오 플랫폼, 이전 프론트엔드 협업 경험을 구분해 정리한 프로젝트 목록',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | 이주영',
    description:
      '프로젝트 Case Study와 포트폴리오 플랫폼, 이전 프론트엔드 협업 경험을 구분해 정리한 목록',
    url: '/projects',
  },
};

const PROJECT_ORDER = [
  'np-wms-picking',
  'np-ois',
  'codemate',
  'fly-on',
  'runners-high',
  'career-hub',
];

const PRIMARY_PROJECTS = ['np-wms-picking', 'np-ois', 'codemate'];
const MOBILE_PROJECTS = ['fly-on', 'runners-high'];

const PROJECT_SIGNALS: Record<string, { label: string; value: string; tone: string }> = {
  'np-ois': {
    label: 'Workflow stages',
    value: '8',
    tone: 'Upload → snapshot lock → archive',
  },
  'fly-on': {
    label: 'Drag duration',
    value: '211.5→72.9ms',
    tone: 'Same React Profiler scenario',
  },
};

const PROJECT_GROUPS = [
  {
    label: 'Selected Case Studies',
    description:
      'MJ Corporation 계약직에서 맡은 현장 피킹·주문 운영 화면과 개인 프로젝트 CodeMate를 구분해 설명합니다.',
    slugs: PRIMARY_PROJECTS,
  },
  {
    label: 'Mobile & Realtime Experience',
    description:
      '모바일 Drag & Drop의 렌더링 비용과 위치 스트림의 재연결·복구를 제품 경험으로 구현했습니다.',
    slugs: MOBILE_PROJECTS,
  },
];

export default function ProjectsPage() {
  const projects = getPortfolioProjects()
    .filter((project) => PROJECT_ORDER.includes(project.slug))
    .sort((a, b) => getProjectOrder(a.slug) - getProjectOrder(b.slug));

  return (
    <section className="w-full px-5 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal amount={0.05}>
          <header className="grid gap-10 border-b border-outline/70 pb-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <span className="mb-5 block font-label text-sm font-bold uppercase tracking-[0.28em] text-primary">
                Projects
              </span>
              <h1 className="font-headline text-[clamp(3.2rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                Projects with evidence.
              </h1>
            </div>
            <p className="max-w-md text-base leading-8 text-text-secondary">
              React와 TypeScript로 복잡한 업무 상태, 실시간 이벤트, 오프라인 복구와 물리 입력을 다룬
              과정과 검증 범위를 정리했습니다.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-14">
          {PROJECT_GROUPS.map((group) => {
            const groupProjects = group.slugs
              .map((slug) => projects.find((project) => project.slug === slug))
              .filter((project): project is PortfolioProject => Boolean(project));

            if (groupProjects.length === 0) {
              return null;
            }

            return (
              <section key={group.label} className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)] md:items-end">
                  <h2 className="font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                    {group.label}
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-text-secondary">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {groupProjects.map((project, index) => (
                    <Reveal key={project.slug} delay={index * 0.06} className="h-full">
                      <ProjectCard project={project} index={index + 1} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <Reveal>
          <ProjectArchive />
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { frontmatter } = project;
  const signal = PROJECT_SIGNALS[project.slug];
  const groupLabel = PRIMARY_PROJECTS.includes(project.slug) ? 'Case' : 'Mobile';

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${frontmatter.title} 프로젝트 상세 보기`}
      className="group grid h-full min-h-[350px] rounded-lg border border-outline/70 bg-surface-container p-6 transition duration-300 hover:border-primary/60 hover:bg-surface-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="grid h-full grid-rows-[auto_1fr_auto]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
              {groupLabel} {String(index).padStart(2, '0')}
            </span>
            <span className="rounded-full border border-outline/70 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-text-secondary transition-colors group-hover:border-primary/70 group-hover:text-primary">
              Detail
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-black leading-tight text-white transition-colors group-hover:text-primary">
            {frontmatter.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 grid content-start gap-2">
          <MetaRow label="Period" value={frontmatter.period} />
          <MetaRow label="Role" value={frontmatter.role} />
          <MetaRow label="Team" value={frontmatter.team} />

          {signal ? (
            <div className="mt-2 border-t border-outline/60 pt-3">
              <div className="text-gradient text-2xl font-black">
                {signal.value}
              </div>
              <div className="mt-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                {signal.label}
              </div>
              <p className="mt-2 text-xs leading-5 text-text-secondary">{signal.tone}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {frontmatter.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
          {frontmatter.github || frontmatter.demo ? (
            <div className="mt-4 flex flex-wrap gap-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              {frontmatter.github ? <span>GitHub available</span> : null}
              {frontmatter.demo ? <span>· Live demo</span> : null}
            </div>
          ) : null}
          <div className="mt-5 flex items-center justify-between border-t border-outline/70 pt-4">
            <span className="font-label text-xs font-bold uppercase tracking-[0.18em] text-primary opacity-80 group-hover:opacity-100">
              Open Case Study
            </span>
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 text-xl text-primary transition duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-surface"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function MetaRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 text-sm leading-6">
      <span className="font-label text-[10px] font-bold uppercase tracking-[0.16em] text-text-secondary">
        {label}
      </span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function getProjectOrder(slug: string) {
  const index = PROJECT_ORDER.indexOf(slug);
  return index === -1 ? PROJECT_ORDER.length : index;
}
