import { getPortfolioProject, getPortfolioProjectSlugs } from '@/utils/PortfolioProject-Util';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'unified';
import raw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Reveal from '@/components/motion/Reveal';

const projectMedia: Record<string, { src: string; alt: string; caption: string }[]> = {
  codemate: [
    { src: '/projects/codemate/codemate-comment.gif', alt: 'CodeMate PR 댓글 화면에서 댓글을 작성하는 과정', caption: 'PR 댓글 흐름' },
    { src: '/projects/codemate/codemate-ai-review.gif', alt: 'CodeMate AI 리뷰 요청과 결과 화면', caption: 'AI 리뷰 흐름' },
  ],
  'fly-on': [
    { src: '/projects/fly-on/dragdrop.gif', alt: 'Fly:On 모바일 일정 카드 Drag & Drop 편집 화면', caption: '모바일 일정 편집' },
  ],
};

const primaryProblemIndex: Record<string, number> = {
  'np-wms-picking': 1,
  'runners-high': 1,
};

const designSectionTitles = new Set([
  '시스템 또는 데이터 흐름',
  '핵심 상태 머신',
  'Frontend 상태 동기화와 검수 UX',
  '선택한 해결 방법',
  '고려한 대안과 Trade-offs',
  'Tech Stack & Reason',
  'Trade-offs / Limitations',
]);

const designSectionLabels: Record<string, string> = {
  '시스템 또는 데이터 흐름': '전체 처리 흐름',
  '핵심 상태 머신': '상태 변화와 복구',
  'Frontend 상태 동기화와 검수 UX': '화면 상태 동기화',
  '선택한 해결 방법': '핵심 기술 선택',
  '고려한 대안과 Trade-offs': '고려한 대안과 Trade-off',
  'Tech Stack & Reason': '기술 선택과 이유',
  'Trade-offs / Limitations': '고려한 대안과 Trade-off',
};

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
    robots: project.frontmatter.category === 'archive' ? { index: false, follow: true } : undefined,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.frontmatter.title} | 이주영`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  const { frontmatter } = project;
  const technicalSection = project.sections.find((section) => section.kind === 'technical');
  const technicalProblems = technicalSection
    ? parseProblemSolutionBlocks(technicalSection.content)
    : [];
  const featuredIndex = primaryProblemIndex[project.slug] ?? 0;
  const featuredProblem = technicalProblems[featuredIndex];
  const additionalProblems = technicalProblems.filter((_, index) => index !== featuredIndex);
  const designSections = project.sections.filter((section) =>
    designSectionTitles.has(section.displayTitle),
  );

  return (
    <section className="w-full px-5 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto w-full max-w-[1440px]">
        <Link
          href="/projects"
          aria-label="프로젝트 목록으로 돌아가기"
          className="mb-10 inline-flex rounded-lg border border-primary/50 px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-surface"
        >
          Back to Projects
        </Link>

        <Reveal amount={0.05}>
          <header className="max-w-5xl border-b border-outline/70 pb-10">
            <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {frontmatter.category === 'archive' ? '이전 팀 프로젝트' : frontmatter.team}
            </span>
            <h1 className="mt-5 break-words font-headline text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {frontmatter.title}
            </h1>
            <p className="mt-5 max-w-4xl break-keep text-xl leading-9 text-white md:text-2xl md:leading-10">
              {project.summary}
            </p>
            <p className="mt-5 text-sm text-text-secondary">
              {[frontmatter.period, frontmatter.role].filter(Boolean).join(' · ')}
            </p>
          </header>
        </Reveal>

        <section className="mt-8 max-w-5xl" aria-label="프로젝트 핵심 정보">
          <dl className="divide-y divide-outline/70 border-y border-outline/70">
            <ProjectFact label="사용자" value={frontmatter.audience} />
            <ProjectFact label="해결 과제" value={frontmatter.problem} />
            <ProjectFact label="내 기여" value={frontmatter.contribution} />
          </dl>
        </section>

        {frontmatter.userFlow?.length ? (
          <section className="mt-16" aria-labelledby="project-user-flow">
            <SectionTitle id="project-user-flow" eyebrow="User flow" title="사용자는 이렇게 사용합니다" />
            <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {frontmatter.userFlow.map((step, index) => (
                <li key={step} className="min-h-24 border-t-2 border-primary/60 bg-surface-low px-4 py-4">
                  <span className="font-label text-xs font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-3 break-keep text-sm font-semibold leading-6 text-white">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {projectMedia[project.slug] ? (
          <section className="mt-16" aria-label="프로젝트 실제 화면">
            <SectionTitle eyebrow="Product screens" title="실제 사용 화면" />
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {projectMedia[project.slug].map((media) => (
                <figure key={media.src} className="min-w-0">
                  {/* Existing project GIFs preserve the original interaction and aspect ratio. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media.src} alt={media.alt} loading="lazy" className="h-auto w-full rounded-lg border border-outline/70" />
                  <figcaption className="mt-2 text-sm text-text-secondary">{media.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {featuredProblem ? (
          <section className="mt-20 max-w-5xl" aria-labelledby="featured-problem">
            <SectionTitle id="featured-problem" eyebrow="Representative case" title="대표 문제 해결" />
            <h3 className="mt-7 break-keep text-2xl font-bold text-white">
              {cleanProblemTitle(featuredProblem.problemTitle)}
            </h3>
            <div className="mt-5 divide-y divide-outline/70 border-y border-outline/70">
              <StoryRow label="상황"><MarkdownContent content={featuredProblem.problemContent} compact /></StoryRow>
              <StoryRow label="판단"><p>{frontmatter.decision}</p></StoryRow>
              <StoryRow label="구현"><MarkdownContent content={featuredProblem.solutionContent} compact /></StoryRow>
              <StoryRow label="확인"><p>{frontmatter.evidence}</p></StoryRow>
            </div>
          </section>
        ) : null}

        {additionalProblems.length ? (
          <section className="mt-20 max-w-5xl" aria-labelledby="additional-problems">
            <SectionTitle id="additional-problems" eyebrow="More cases" title="추가 문제 해결" />
            <TechnicalHighlights blocks={additionalProblems} />
          </section>
        ) : null}

        {designSections.length ? (
          <details className="group mt-16 max-w-5xl border-y border-outline/70">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 marker:content-none">
              <span className="text-base font-bold text-white group-open:text-primary">기술 설계 더 보기</span>
              <span className="flex items-center gap-3 text-right text-xs font-semibold leading-5 text-text-secondary">
                <span>처리 흐름 · 기술 선택 · 대안</span>
                <span
                  aria-hidden="true"
                  className="text-lg font-normal text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <article className="mt-8 grid max-w-5xl gap-8">
              {designSections.map((section, index) => (
                <section key={section.title} className="border-t border-outline/70 pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-label text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-lg font-bold text-white">
                      {designSectionLabels[section.displayTitle] ?? section.displayTitle}
                    </h2>
                  </div>
                  <div className="mt-4"><MarkdownContent content={section.content} /></div>
                </section>
              ))}
            </article>
            <div className="h-8" aria-hidden="true" />
          </details>
        ) : null}

        <footer className="mt-20 flex flex-wrap items-center gap-3 border-t border-outline/70 pt-6">
          {frontmatter.stack.slice(0, 8).map((tech) => (
            <span key={tech} className="rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold text-text-secondary">{tech}</span>
          ))}
          {frontmatter.github ? <ProjectLink href={frontmatter.github} label="GitHub" /> : null}
          {frontmatter.demo ? <ProjectLink href={frontmatter.demo} label="Live Demo" /> : null}
          {frontmatter.store ? <ProjectLink href={frontmatter.store} label="원스토어 앱" /> : null}
        </footer>
      </div>
    </section>
  );
}

function TechnicalHighlights({ blocks }: { blocks: ProblemSolutionBlock[] }) {
  return (
    <div className="mt-7 divide-y divide-outline/70 border-y border-outline/70">
      {blocks.map((block, index) => (
        <details key={block.problemTitle} className="group py-5">
          <summary className="cursor-pointer break-keep text-base font-semibold leading-7 text-white group-open:text-primary">
            <span className="mr-4 font-label text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
            {cleanProblemTitle(block.problemTitle)}
          </summary>
          <div className="mt-5 grid gap-6 pl-7 text-sm leading-7 lg:grid-cols-2">
            <div><span className="font-label text-xs font-bold text-primary">문제</span><MarkdownContent content={block.problemContent} compact /></div>
            <div><span className="font-label text-xs font-bold text-primary">해결</span><MarkdownContent content={block.solutionContent} compact /></div>
          </div>
        </details>
      ))}
    </div>
  );
}

function MarkdownContent({ content, compact }: { content: string; compact?: boolean }) {
  return (
    <div
      className={`portfolio-prose prose prose-invert max-w-none prose-headings:font-black prose-p:text-text-secondary prose-li:text-text-secondary prose-img:rounded-xl ${
        compact ? 'prose-p:my-2 prose-ul:my-2' : ''
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[raw, rehypeSlug] as PluggableList}
        components={{
          img: ({ alt, src }) => (
            // Markdown assets have mixed intrinsic ratios, so the browser preserves their own dimensions.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-xl"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

type ProblemSolutionBlock = {
  problemTitle: string;
  problemContent: string;
  solutionContent: string;
};

function parseProblemSolutionBlocks(content: string): ProblemSolutionBlock[] {
  const items = splitByH3(content);
  const blocks: ProblemSolutionBlock[] = [];

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];

    if (!isProblemHeading(item.title)) {
      continue;
    }

    const next = items[index + 1];
    const solutionContent = next && isSolutionHeading(next.title) ? next.body : '';

    if (solutionContent) {
      index += 1;
    }

    blocks.push({
      problemTitle: item.title,
      problemContent: item.body,
      solutionContent,
    });
  }

  return blocks;
}

function splitByH3(content: string) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const items: { title: string; body: string }[] = [];
  let currentTitle = '';
  let currentContent: string[] = [];

  const flush = () => {
    if (!currentTitle) {
      return;
    }

    items.push({
      title: currentTitle,
      body: currentContent.join('\n').trim(),
    });
  };

  for (const line of lines) {
    const match = line.match(/^###\s+(.+)$/);

    if (match) {
      flush();
      currentTitle = match[1].trim();
      currentContent = [];
      continue;
    }

    if (currentTitle) {
      currentContent.push(line);
    }
  }

  flush();
  return items;
}

function isProblemHeading(title: string) {
  return title.toLowerCase().startsWith('problem');
}

function isSolutionHeading(title: string) {
  return title.toLowerCase().startsWith('solution');
}

function cleanProblemTitle(title: string) {
  return title.replace(/^Problem\s*\d*\s*[-–—:]?\s*/i, '').trim() || title;
}

function ProjectFact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6">
      <dt className="font-label text-xs font-bold text-primary">{label}</dt>
      <dd className="m-0 max-w-4xl break-keep text-sm leading-7 text-white md:text-base">{value}</dd>
    </div>
  );
}

function SectionTitle({ id, eyebrow, title }: { id?: string; eyebrow: string; title: string }) {
  return (
    <div>
      <span className="font-label text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</span>
      <h2 id={id} className="mt-3 break-keep font-headline text-2xl font-bold text-white md:text-3xl">{title}</h2>
    </div>
  );
}

function StoryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6">
      <span className="font-label text-xs font-bold text-primary">{label}</span>
      <div className="max-w-4xl break-keep text-sm leading-7 text-text-secondary md:text-base">{children}</div>
    </div>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/50 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-surface">
      {label}
    </Link>
  );
}
