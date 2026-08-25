import Link from 'next/link';
import { PortfolioProject, getPortfolioProjects } from '@/utils/PortfolioProject-Util';
import ProjectArchive from '@/components/projects/ProjectArchive';

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
  'codemate',
  'np-wms-picking',
  'fly-on',
  'np-ois',
  'career-hub',
  'runners-high',
];

const PRIMARY_PROJECTS = ['codemate', 'np-wms-picking', 'fly-on'];

const PROJECT_SIGNALS: Record<string, { label: string; value: string; tone: string }> = {
  'np-wms-picking': {
    label: 'Mobile FE / Backend tests',
    value: '55 / 224',
    tone: 'Scanner input and offline outbox',
  },
  'np-ois': {
    label: 'Backend tests',
    value: '59',
    tone: 'Excel VBA to web workflow',
  },
  codemate: {
    label: 'Comment API requests',
    value: '10->0',
    tone: 'Realtime cache update',
  },
  'career-hub': {
    label: 'Detail refetch',
    value: '1->0',
    tone: 'Application status sync',
  },
  'fly-on': {
    label: 'Drag duration',
    value: '211.5->72.9ms',
    tone: 'React Native profiling',
  },
  'runners-high': {
    label: 'Pace window',
    value: '10s',
    tone: 'GPS and realtime recovery',
  },
};

const PROJECT_GROUPS = [
  {
    label: 'Frontend Evidence',
    description:
      '댓글 동기화, PDA 스캔, 모바일 제스처에서 상태 관리와 입력 처리, 렌더링 성능을 개선했습니다.',
    slugs: PRIMARY_PROJECTS,
  },
  {
    label: 'Full-stack & More',
    description:
      '주문 변환, 지원 단계 관리, 위치 동기화에 필요한 API와 데이터 흐름까지 연결했습니다.',
    slugs: ['np-ois', 'career-hub', 'runners-high'],
  },
];

export default function ProjectsPage() {
  const projects = getPortfolioProjects()
    .filter((project) => PROJECT_ORDER.includes(project.slug))
    .sort((a, b) => getProjectOrder(a.slug) - getProjectOrder(b.slug));

  return (
    <section className="w-full px-5 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto w-full max-w-[1440px]">
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
            각 프로젝트에서 맡은 역할과 개인 기여, 기술 선택의 근거, 확인 가능한 결과를
            정리했습니다.
          </p>
        </header>

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
                    <ProjectCard key={project.slug} project={project} index={index + 1} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <ProjectArchive />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const { frontmatter } = project;
  const signal = PROJECT_SIGNALS[project.slug];
  const groupLabel = PRIMARY_PROJECTS.includes(project.slug) ? 'Frontend' : 'More';

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${frontmatter.title} 프로젝트 상세 보기`}
      className="group grid min-h-[420px] rounded-2xl border border-outline/70 bg-surface-container p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-surface-high hover:shadow-[0_22px_60px_rgba(0,0,0,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
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

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.045em] text-white transition-colors group-hover:text-primary">
            {frontmatter.title}
          </h2>
          <p className="mt-5 line-clamp-4 text-sm leading-7 text-text-secondary">
            {project.summary}
          </p>
        </div>

        <div className="mt-8 grid content-start gap-3">
          <MetaRow label="Period" value={frontmatter.period} />
          <MetaRow label="Role" value={frontmatter.role} />
          <MetaRow label="Team" value={frontmatter.team} />

          {signal ? (
            <div className="mt-2 rounded-xl border border-outline/60 bg-surface-low p-4">
              <div className="text-gradient text-4xl font-black tracking-[-0.05em]">
                {signal.value}
              </div>
              <div className="mt-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">
                {signal.label}
              </div>
              <p className="mt-2 text-xs leading-5 text-text-secondary">{signal.tone}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-8">
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
          <div className="mt-8 flex items-center justify-between border-t border-outline/70 pt-5">
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
