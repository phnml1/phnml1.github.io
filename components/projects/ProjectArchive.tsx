import Link from 'next/link';
import { currentPortfolioProject, projectArchive } from '@/data/projectArchive';

export default function ProjectArchive() {
  return (
    <>
      <section
        className="mt-24 border-t border-outline/70 pt-16"
        aria-labelledby="current-platform-title"
      >
        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_420px] md:items-end">
          <div>
            <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
              Ongoing Personal Platform
            </span>
            <h2
              id="current-platform-title"
              className="font-headline text-4xl font-black tracking-[-0.05em] text-white md:text-5xl"
            >
              {currentPortfolioProject.title}.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-text-secondary">
            프로젝트의 문제 해결 과정과 기술 학습 기록을 같은 콘텐츠 구조에서 지속적으로 관리하고
            있습니다.
          </p>
        </header>

        <article className="mt-8 grid gap-7 rounded-2xl border border-outline/70 bg-surface-container p-6 md:p-8 lg:grid-cols-[minmax(230px,0.75fr)_minmax(0,1.6fr)] lg:gap-10">
          <div>
            <div className="inline-flex rounded-full border border-primary/50 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              Built &amp; Maintained
            </div>
            <p className="mt-5 font-label text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {currentPortfolioProject.period}
            </p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {currentPortfolioProject.role}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={currentPortfolioProject.blog}
                className="rounded-full bg-primary px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-surface transition-colors hover:bg-white"
              >
                Browse Articles
              </Link>
              <Link
                href={currentPortfolioProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/50 px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-surface"
              >
                View Source
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-base leading-8 text-text-secondary">
              {currentPortfolioProject.summary}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {currentPortfolioProject.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="grid grid-cols-[20px_minmax(0,1fr)] gap-2 text-sm leading-6 text-text-secondary"
                >
                  <span aria-hidden="true" className="text-primary">
                    →
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-outline/70 pt-5">
              {currentPortfolioProject.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section
        className="mt-24 border-t border-outline/70 pt-16"
        aria-labelledby="project-archive-title"
      >
        <header className="grid gap-6 md:grid-cols-[minmax(0,1fr)_420px] md:items-end">
          <div>
            <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
              Past Projects / Archive
            </span>
            <h2
              id="project-archive-title"
              className="font-headline text-4xl font-black tracking-[-0.05em] text-white md:text-5xl"
            >
              Project Archive.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-text-secondary">
            현재의 Case Study와 구분해, 이전에 경험한 프론트엔드 학습과 협업의 흐름을 간결하게
            정리했습니다.
          </p>
        </header>

        <div className="mt-12 grid gap-12">
          {projectArchive.map((group) => (
            <section
              key={group.year}
              className="grid gap-5 md:grid-cols-[132px_minmax(0,1fr)] md:gap-8"
            >
              <header className="md:pt-6">
                <h3 className="text-gradient font-headline text-4xl font-black tracking-[-0.05em]">
                  {group.year}
                </h3>
                <p className="mt-2 font-label text-[10px] font-bold uppercase leading-5 tracking-[0.16em] text-text-secondary">
                  {group.context}
                </p>
              </header>

              <div className="divide-y divide-outline/70 border-y border-outline/70">
                {group.projects.map((project) => (
                  <article
                    key={project.title}
                    className="grid gap-5 py-7 sm:px-5 lg:grid-cols-[minmax(210px,0.7fr)_minmax(0,1.6fr)] lg:gap-8"
                  >
                    <div>
                      <h4 className="text-2xl font-black tracking-[-0.035em] text-white">
                        {project.title}
                      </h4>
                      <p className="mt-2 font-label text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        {project.period}
                      </p>
                      <p className="mt-3 text-xs leading-6 text-text-secondary">{project.role}</p>
                    </div>

                    <div className="min-w-0">
                      <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                        {project.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-outline/70 px-3 py-1.5 text-xs font-semibold text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.href ? (
                          <Link
                            href={project.href}
                            className="ml-0 inline-flex rounded-full px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-surface-high hover:text-white sm:ml-1"
                            aria-label={`${project.title} ${project.linkLabel ?? '열기'}`}
                          >
                            {project.linkLabel ?? 'Open'} →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
