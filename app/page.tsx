import FeaturedPosts from '@/components/home/FeaturedPost';
import Link from 'next/link';
import { recentPosts } from '@/utils/Post-Util';
import HomeIntro from '@/components/home/HomeIntro';

const featuredProjects = [
  {
    title: 'Dashboard Data Fetching Refactor',
    href: '/projects/dashboard-performance',
    metric: '2x',
    label: 'faster response',
    summary: 'Next.js 서버 컴포넌트의 순차 요청을 병렬화하고 로딩 경계를 나눠 대시보드 체감 응답을 개선했습니다.',
  },
  {
    title: 'React Native Kanban Optimization',
    href: '/projects/native-kanban',
    metric: '-40%',
    label: 'render pressure',
    summary: 'PanResponder, Zustand, React.memo를 조합해 드래그 중 불필요한 리렌더링과 제스처 불안정을 줄였습니다.',
  },
];

export default function HomePage() {
  const posts = JSON.parse(JSON.stringify(recentPosts));

  return (
    <>
      <HomeIntro />
      <section className="w-full bg-surface-low px-5 py-28 md:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                Selected Projects
              </span>
              <h2 className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl">Case studies.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-secondary">
              단순 결과물이 아니라 문제 정의, 해결 과정, 결과 지표가 드러나는 작업만 전면에 배치했습니다.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.href}
                href={project.href}
                className={`group rounded-xl bg-surface-container p-8 transition-all duration-300 hover:scale-[1.015] hover:bg-surface-high ${
                  index === 1 ? 'lg:mt-24' : ''
                }`}
              >
                <article className="grid min-h-[360px] grid-rows-[1fr_auto]">
                  <div>
                    <div className="mb-8 font-label text-xs uppercase tracking-[0.24em] text-primary">
                      Project 0{index + 1}
                    </div>
                    <h3 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.045em] text-white">
                      {project.title}
                    </h3>
                    <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary">{project.summary}</p>
                  </div>
                  <div className="mt-12 flex items-end justify-between gap-6">
                    <div>
                      <div className="text-gradient text-6xl font-black tracking-[-0.06em]">{project.metric}</div>
                      <div className="font-label text-xs uppercase tracking-[0.2em] text-text-secondary">{project.label}</div>
                    </div>
                    <span className="text-3xl text-primary transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full px-5 py-28 md:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
                Tech Journal
              </span>
              <h2 className="font-headline text-5xl font-black tracking-[-0.05em] md:text-6xl">Recent posts.</h2>
            </div>
            <Link
              href="/posts/all"
              className="w-fit rounded-lg bg-surface-container px-6 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-surface-high"
            >
              All Posts
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {posts.map((post) => (
              <FeaturedPosts key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
