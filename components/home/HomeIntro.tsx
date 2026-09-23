import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';

const experienceSnapshots = [
  {
    title: 'MJ Corporation',
    body: 'React·TypeScript 업무 화면을 개발하고 Kotlin·Spring Boot 기반 주문·물류 API 연동과 기능 개선에 참여했습니다.',
  },
  {
    title: 'NP-OIS / NP WMS Picking',
    body: 'Excel 주문 업로드·변환·검수 화면과 PDA 스캐너·피킹·오프라인 작업 흐름을 구현했습니다.',
  },
  {
    title: 'CodeMate / Fly:On',
    body: 'PR 댓글·알림 실시간 동기화, AI 리뷰 상태, React Native 일정 화면과 Drag & Drop 성능 개선을 다뤘습니다.',
  },
];

const HomeIntro: React.FC = () => {
  return (
    <>
      <section className="w-full pt-28 md:pt-36">
        <div className="mx-auto grid min-h-[720px] w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 pb-20 md:px-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal amount={0.05}>
              <span className="mb-6 block font-label text-sm font-bold uppercase tracking-[0.3em] text-primary">
                이주영 · Frontend Engineer
              </span>
              <h1 className="font-headline text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                React와 TypeScript로 업무 화면과 데이터 흐름을 구현합니다.
              </h1>
            </Reveal>
            <Reveal delay={0.08} amount={0.05}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                Next.js·React·TypeScript로 화면부터 API·데이터 처리 흐름까지 구현해 왔습니다.
                PostgreSQL 기반 서비스, 실시간 이벤트, 주문 변환·검수, PDA·WebView 연동을 경험했고
                기존 코드와 실제 업무를 분석해 기능을 확장했습니다.
              </p>
            </Reveal>
            <Reveal delay={0.16} amount={0.05}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="rounded-lg bg-gradient-to-br from-primary to-accent-strong px-7 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-[#001a42] transition-colors hover:brightness-110"
                >
                  프로젝트 보기
                </Link>
                <Link
                  href="https://github.com/phnml1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-surface-container px-7 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-surface-high"
                >
                  GitHub
                </Link>
                <Link
                  href="mailto:juyung0903@naver.com"
                  className="rounded-lg border border-outline px-7 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-primary hover:text-white"
                >
                  이메일
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-4" delay={0.2} amount={0.05}>
            <aside aria-label="핵심 기술과 검증 지표">
              <div className="overflow-hidden rounded-2xl border border-outline/70 bg-surface-container p-6 md:p-8">
                <div className="font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Frontend First
                </div>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white">
                  React + TypeScript
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  업무 화면, 서버 상태, 실시간 이벤트, 모바일 인터랙션을 프로젝트 성격에 맞게
                  구현했습니다.
                </p>
                <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-xl bg-surface-low p-4">
                    <dt className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                      Comment requests
                    </dt>
                    <dd className="text-gradient mt-2 text-3xl font-black tracking-[-0.05em]">
                      10→0
                    </dd>
                  </div>
                  <div className="rounded-xl bg-surface-low p-4">
                    <dt className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                      Drag duration
                    </dt>
                    <dd className="text-gradient mt-2 text-xl font-black tracking-[-0.05em]">
                      211.5→72.9ms
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-outline/70 pt-6">
                  <div className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Supporting Full-stack
                  </div>
                  <div className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
                    API · Data · WebView
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    Next.js Route Handler, Prisma·PostgreSQL, Kotlin·Spring Boot API 연동,
                    Android WebView와 IndexedDB 기반 로컬 데이터를 다뤘습니다.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
              Experience Snapshot
            </span>
            <h2 className="font-headline text-4xl font-black tracking-[-0.05em] md:text-5xl">
              이력서에 정리한 주요 경험입니다.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary">
              회사 프로젝트와 개인·팀 프로젝트에서 맡은 역할, 사용 기술, 실제로 구현한 화면과
              연동 범위를 기준으로 정리했습니다.
            </p>
          </Reveal>
          <div className="grid gap-5 lg:col-span-8">
            {experienceSnapshots.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="grid gap-4 rounded-xl border border-outline/70 bg-surface-container p-6 sm:grid-cols-[80px_minmax(0,1fr)] sm:items-start">
                  <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.035em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeIntro;
