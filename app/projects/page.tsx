import Link from 'next/link';
import { PortfolioProject, getPortfolioProjects } from '@/utils/PortfolioProject-Util';
import ProjectArchive from '@/components/projects/ProjectArchive';
import Reveal from '@/components/motion/Reveal';

export const metadata = {
  title: 'Projects',
  description:
    '현재 프로젝트의 핵심 문제와 구현 내용, 직접 구축·운영하는 포트폴리오 플랫폼, 이전 프론트엔드 협업 경험을 구분해 정리한 프로젝트 목록',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | 이주영',
    description:
      '프로젝트 Case Study와 포트폴리오 플랫폼, 이전 프론트엔드 협업 경험을 구분해 정리한 목록',
    url: '/projects',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '이주영 Frontend Developer 포트폴리오',
      },
    ],
  },
};

const PROJECT_ORDER = [
  'np-wms-picking',
  'np-ois',
  'np-cell-label-kiosk',
  'codemate',
  'fly-on',
  'runners-high',
  'career-hub',
];

const PROJECT_GROUPS = [
  {
    label: 'Main Projects',
    sections: [
      { label: '회사 프로젝트', slugs: ['np-wms-picking', 'np-ois', 'np-cell-label-kiosk'] },
      { label: '개인 프로젝트', slugs: ['codemate'] },
    ],
  },
  {
    label: 'Mobile & Realtime Experience',
    sections: [{ label: null, slugs: ['fly-on', 'runners-high'] }],
  },
];

const COMPANY_PROJECTS = new Set(['np-wms-picking', 'np-ois', 'np-cell-label-kiosk']);

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
              <h1 className="font-headline text-4xl font-black leading-tight text-white md:text-6xl">
                프로젝트
              </h1>
            </div>
            <p className="max-w-md text-base leading-8 text-text-secondary">
              무엇을 만들었고, 어떤 문제를 해결하려 했으며, 그 안에서 제가 맡은 일을 정리했습니다.
            </p>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-14">
          {PROJECT_GROUPS.map((group) => {
            const sections = group.sections
              .map((section) => ({
                ...section,
                projects: section.slugs
                  .map((slug) => projects.find((project) => project.slug === slug))
                  .filter((project): project is PortfolioProject => Boolean(project)),
              }))
              .filter((section) => section.projects.length > 0);

            if (sections.length === 0) {
              return null;
            }

            return (
              <section key={group.label} className="grid gap-8">
                <div>
                  <h2 className="font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                    {group.label}
                  </h2>
                </div>

                <div className="grid gap-10">
                  {sections.map((section) => (
                    <section
                      key={section.label ?? group.label}
                      aria-label={section.label ?? undefined}
                      className="grid gap-5"
                    >
                      {section.label ? (
                        <p className="border-b border-outline/70 pb-3 text-lg font-bold text-white">
                          {section.label}
                        </p>
                      ) : null}
                      <div className="grid gap-5 lg:grid-cols-2">
                        {section.projects.map((project, index) => (
                          <Reveal key={project.slug} delay={index * 0.06} className="h-full">
                            <ProjectCard project={project} />
                          </Reveal>
                        ))}
                      </div>
                    </section>
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

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { frontmatter } = project;

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${frontmatter.title} 프로젝트 상세 보기`}
      className="group block h-full rounded-lg border border-outline/70 bg-surface-container p-6 transition duration-300 hover:border-primary/60 hover:bg-surface-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="flex h-full min-h-[320px] flex-col">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-label text-xs font-bold text-primary">{frontmatter.team}</span>
            <span className="text-xs text-text-secondary">{frontmatter.period}</span>
          </div>

          <h3 className="mt-4 text-2xl font-black leading-tight text-white transition-colors group-hover:text-primary md:text-3xl">
            {frontmatter.title}
          </h3>
          <p className="mt-3 line-clamp-3 break-keep text-base leading-7 text-white">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 grid gap-3 border-t border-outline/70 pt-5">
          <CardFact label="핵심 문제" value={frontmatter.problem} />
          <CardFact label="내 역할" value={frontmatter.contribution} />
          <CardFact label="기술 선택 이유" value={frontmatter.decision} />
          <CardFact label="결과" value={frontmatter.result} />
        </div>

        {COMPANY_PROJECTS.has(project.slug) ? (
          <p className="mt-4 text-xs font-semibold text-text-secondary">
            사내 코드는 비공개입니다.
          </p>
        ) : null}

        {frontmatter.note ? (
          <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs leading-5 text-text-secondary">
            {frontmatter.note}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-end border-t border-outline/70 pt-4">
          <span
            aria-hidden="true"
            className="text-2xl text-primary transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}

function CardFact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid gap-1 text-sm leading-6 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-3">
      <span className="font-label text-xs font-bold text-primary">{label}</span>
      <span className="min-w-0 break-words text-text-secondary">{value}</span>
    </div>
  );
}

function getProjectOrder(slug: string) {
  const index = PROJECT_ORDER.indexOf(slug);
  return index === -1 ? PROJECT_ORDER.length : index;
}
