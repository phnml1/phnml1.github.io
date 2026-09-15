import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';

const experienceSnapshots = [
  {
    title: '실무형 운영 프론트엔드',
    body: '같은 물류 운영 환경에서 NP-OIS의 장기 변환·검수 흐름과 NP WMS Picking의 스캐너·오프라인 작업 흐름을 연결했습니다.',
  },
  {
    title: '제품형 모바일·실시간 경험',
    body: '실시간 댓글과 위치 이벤트, 모바일 Drag & Drop처럼 빠르게 바뀌는 상태를 서버 캐시·편집 상태와 분리했습니다.',
  },
  {
    title: '측정과 실패 경계',
    body: '성능은 같은 시나리오에서 측정하고, 로컬 저장·서버 수락·외부 시스템 반영처럼 서로 다른 성공 상태를 구분합니다.',
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
                복잡한 상태를 설계하고, 실패 이후의 흐름을 복구합니다.
              </h1>
            </Reveal>
            <Reveal delay={0.08} amount={0.05}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                React와 TypeScript를 중심으로 현장 입력, 실시간 이벤트, 장기 실행 작업의 실패 상태를
                화면과 데이터 흐름으로 연결합니다. 렌더링 병목은 측정으로 확인하고, Kotlin/Spring
                경험은 프론트엔드가 의존하는 API·트랜잭션·데이터 경계를 이해하는 데 활용합니다.
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
                  href="mailto:juyung0903@gmail.com"
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
                  서버 상태와 편집 상태를 분리하고, 연결 실패와 재처리까지 사용자가 이해할 수 있는
                  흐름으로 설계합니다.
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
                    TypeScript + SQL
                  </div>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    Next.js·Prisma와 Kotlin/Spring 경험을 바탕으로 API 계약, 데이터 소유권, 트랜잭션
                    경계를 프론트엔드 의사결정에 반영합니다.
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
              화면 밖의 실패까지 상태로 다룹니다.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary">
              기능 수보다 상태 전이, 책임 경계, 검증 방법을 먼저 설명합니다. 사용자가 다음 행동을
              판단할 수 있어야 구현이 끝났다고 봅니다.
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
