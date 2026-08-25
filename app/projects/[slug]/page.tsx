import { getPortfolioProject, getPortfolioProjectSlugs } from '@/utils/PortfolioProject-Util';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'unified';
import raw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Reveal from '@/components/motion/Reveal';

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
          <header className="grid gap-10 border-b border-outline/70 pb-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div>
              <span className="mb-5 block font-label text-sm font-bold uppercase tracking-[0.28em] text-primary">
                Project Detail
              </span>
              <h1 className="font-headline text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                {frontmatter.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-text-secondary md:text-xl">
                {project.summary}
              </p>
            </div>

            <aside className="rounded-xl border border-outline/70 bg-surface-container p-5">
              <ProjectMeta label="Period" value={frontmatter.period} />
              <ProjectMeta label="Team" value={frontmatter.team} />
              <ProjectMeta label="Role" value={frontmatter.role} />
              <div className="mt-5 flex flex-wrap gap-2 border-t border-outline/70 pt-5">
                {frontmatter.stack.slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {frontmatter.github || frontmatter.demo ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {frontmatter.github ? (
                    <Link
                      href={frontmatter.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-primary/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-surface"
                    >
                      GitHub
                    </Link>
                  ) : null}
                  {frontmatter.demo ? (
                    <Link
                      href={frontmatter.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-surface transition-colors hover:bg-white"
                    >
                      Live Demo
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </aside>
          </header>
        </Reveal>

        {frontmatter.problem ||
        frontmatter.contribution ||
        frontmatter.implementation ||
        frontmatter.decision ||
        frontmatter.evidence ? (
          <section className="mt-10" aria-labelledby="project-summary">
            <h2
              id="project-summary"
              className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary"
            >
              Case Study Summary
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-6">
              <ProjectStoryCard
                number="01"
                title="Problem"
                content={frontmatter.problem}
                className="lg:col-span-3"
              />
              <ProjectStoryCard
                number="02"
                title="Role"
                content={[frontmatter.role, frontmatter.contribution].filter(Boolean).join(' · ')}
                className="lg:col-span-3"
              />
              <ProjectStoryCard
                number="03"
                title="Implementation"
                content={frontmatter.implementation}
                className="lg:col-span-2"
              />
              <ProjectStoryCard
                number="04"
                title="Technical Decision"
                content={frontmatter.decision}
                className="lg:col-span-2"
              />
              <ProjectStoryCard
                number="05"
                title="Result"
                content={frontmatter.evidence}
                className="lg:col-span-2"
                cardClassName="border-primary/35 bg-surface-low"
              />
            </div>
          </section>
        ) : null}

        <article className="mt-14 grid w-full gap-6">
          {project.sections.map((section, index) => (
            <Reveal key={section.title} delay={Math.min(index * 0.04, 0.12)}>
              <section className="rounded-3xl border border-outline/70 bg-background/55 p-5 md:p-6">
                <div className="mb-5 h-1 w-16 rounded-full bg-primary/80" />
                <h2 className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  {section.displayTitle}
                </h2>
                <div className="mt-5">
                  {section.kind === 'technical' ? (
                    <TechnicalHighlights content={section.content} />
                  ) : (
                    <MarkdownContent content={section.content} />
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </article>
      </div>
    </section>
  );
}

function TechnicalHighlights({ content }: { content: string }) {
  const blocks = parseProblemSolutionBlocks(content);

  if (blocks.length === 0) {
    return <MarkdownContent content={content} />;
  }

  return (
    <div className="grid gap-5">
      {blocks.map((block, index) => (
        <article
          key={`${block.problemTitle}-${index}`}
          className="overflow-hidden rounded-2xl border border-primary/35 bg-surface-container"
        >
          <div className="border-b border-outline/70 bg-surface-low px-5 py-4">
            <span className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Problem {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
              {cleanProblemTitle(block.problemTitle)}
            </h3>
          </div>

          <div className="grid gap-0 lg:grid-cols-2">
            <section className="border-b border-outline/70 px-5 py-5 lg:border-b-0 lg:border-r">
              <span className="mb-3 block font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Problem
              </span>
              <MarkdownContent content={block.problemContent} compact />
            </section>
            <section className="px-5 py-5">
              <span className="mb-3 block font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Solution
              </span>
              <MarkdownContent content={block.solutionContent} compact />
            </section>
          </div>
        </article>
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

function ProjectMeta({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="mt-3 first:mt-0">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-text-secondary">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function ProjectStoryCard({
  number,
  title,
  content,
  className = '',
  cardClassName = '',
}: {
  number: string;
  title: string;
  content?: string;
  className?: string;
  cardClassName?: string;
}) {
  if (!content) return null;

  return (
    <Reveal className={className} delay={(Number(number) - 1) * 0.04}>
      <article
        className={`h-full rounded-2xl border border-outline/70 bg-surface-container p-6 ${cardClassName}`}
      >
        <div className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {number} · {title}
        </div>
        <p className="mt-4 text-sm leading-7 text-text-secondary">{content}</p>
      </article>
    </Reveal>
  );
}
