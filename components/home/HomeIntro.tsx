import Link from 'next/link';

const stack = [
  {
    category: 'Frontend Core',
    items: 'React, TypeScript, Next.js',
    note: 'CodeMate의 PR 협업 화면, Career Hub의 지원 상태 UI, 물류 운영 화면을 React와 TypeScript로 구현했습니다.',
  },
  {
    category: 'State & Realtime',
    items: 'TanStack Query, Zustand, WebSocket',
    note: '댓글 캐시 직접 갱신, 지원 단계 동기화, 실시간 위치 공유처럼 화면 상태와 서버 상태의 경계를 나눴습니다.',
  },
  {
    category: 'TypeScript & SQL',
    items: 'Next.js, Prisma, PostgreSQL',
    note: 'CodeMate에서 TypeScript 기반 Route Handler와 관계형 데이터 모델로 리뷰·댓글·알림 흐름을 연결했습니다.',
  },
  {
    category: 'Backend Support',
    items: 'Kotlin, Spring Boot, MySQL',
    note: '물류 프로젝트에서 주문 변환, 피킹 상태 전이, Excel 산출물처럼 화면과 맞물린 서버 로직을 구현했습니다.',
  },
];

const outcomes = [
  { value: '10→0', label: 'CodeMate 댓글 이벤트 10건 기준 추가 API 요청' },
  { value: '211.5→72.9ms', label: 'Fly:On 동일 Drag & Drop 시나리오의 total commit duration' },
  { value: '55 / 224', label: 'NP WMS Picking에서 통과한 Mobile FE / Backend 테스트' },
];

const experienceSnapshots = [
  {
    title: '물류 운영 웹 전환',
    body: 'Excel VBA 주문 처리 업무를 업로드, 변환 큐, 검수, 산출물 보관이 가능한 웹 워크플로로 전환했습니다.',
  },
  {
    title: '현장 PDA 피킹 UX',
    body: '작은 화면, 물리 스캐너, 네트워크 단절, 부분 피킹 같은 현장 제약을 상태 흐름과 입력 검증으로 다뤘습니다.',
  },
  {
    title: '테스트와 빌드 기반 검증',
    body: '운영 효과를 임의 수치로 설명하지 않고, 통과한 테스트와 빌드 결과를 기준으로 구현 범위를 확인했습니다.',
  },
];

const HomeIntro: React.FC = () => {
  return (
    <>
      <section className="w-full pt-28 md:pt-36">
        <div className="mx-auto grid min-h-[720px] w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 pb-20 md:px-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="mb-6 block font-label text-sm font-bold uppercase tracking-[0.3em] text-primary">
              이주영 · 신입 프론트엔드 개발자
            </span>
            <h1 className="font-headline text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
              사용자 흐름을 구현하고, 성능을 근거로 개선합니다.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              React와 TypeScript를 중심으로 업무 화면, 서버 상태, 실시간 동기화를 구현했습니다. CodeMate에서는 댓글
              이벤트 10건의 추가 조회를 10회에서 0회로 줄였고, Fly:On에서는 Drag & Drop 렌더링 시간을 React Profiler로
              측정해 개선했습니다. 서버 로직은 Next.js와 SQL로 연결하고, 물류 프로젝트에서는 Kotlin/Spring까지 구현했습니다.
            </p>
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
          </div>
          <aside className="lg:col-span-4" aria-label="핵심 기술과 검증 지표">
            <div className="overflow-hidden rounded-2xl border border-outline/70 bg-surface-container p-6 md:p-8">
              <div className="font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">Frontend First</div>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] text-white">React + TypeScript</h2>
              <p className="mt-4 text-sm leading-7 text-text-secondary">
                화면 상태와 서버 데이터의 경계를 나누고, 입력·동기화·실패 복구가 이어지는 흐름을 구현합니다.
              </p>
              <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-xl bg-surface-low p-4">
                  <dt className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                    Comment requests
                  </dt>
                  <dd className="text-gradient mt-2 text-3xl font-black tracking-[-0.05em]">10→0</dd>
                </div>
                <div className="rounded-xl bg-surface-low p-4">
                  <dt className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                    Drag duration
                  </dt>
                  <dd className="text-gradient mt-2 text-xl font-black tracking-[-0.05em]">211.5→72.9ms</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-outline/70 pt-6">
                <div className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary">Supporting Full-stack</div>
                <div className="mt-2 text-xl font-black tracking-[-0.03em] text-white">TypeScript + SQL</div>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  Next.js Route Handler와 Prisma/PostgreSQL로 웹 기능을 연결했고, Kotlin/Spring 경험은 프로젝트별 담당 범위로 구분했습니다.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
              Experience Snapshot
            </span>
            <h2 className="font-headline text-4xl font-black tracking-[-0.05em] md:text-5xl">실무 문제를 화면과 상태로 정리합니다.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-text-secondary">
              물류 운영에서 마주한 입력, 검수, 동기화 문제를 React와 TypeScript 기반 화면 흐름으로 풀어 왔습니다.
            </p>
          </div>
          <div className="grid gap-5 lg:col-span-8">
            {experienceSnapshots.map((item, index) => (
              <article key={item.title} className="grid gap-4 rounded-xl border border-outline/70 bg-surface-container p-6 sm:grid-cols-[80px_minmax(0,1fr)] sm:items-start">
                <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.035em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-low px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">The Stack</h2>
            <p className="mt-4 max-w-xs text-sm leading-7 text-text-secondary">
              React와 TypeScript를 중심으로 사용한 기술과 그 근거가 되는 프로젝트를 함께 표시합니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
            {stack.map((item) => (
              <div key={item.category} className="group rounded-xl bg-surface-container p-6 transition-colors hover:bg-surface-high">
                <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">{item.category}</div>
                <div className="mt-3 text-2xl font-black tracking-[-0.04em] text-white transition-colors group-hover:text-primary">
                  {item.items}
                </div>
                <div className="my-5 h-px bg-outline/60" />
                <p className="text-sm leading-6 text-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 md:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item.value} className="rounded-xl bg-surface-container p-8">
              <div className="text-gradient break-words text-[clamp(2rem,10vw,3.75rem)] font-black tracking-[-0.06em]">{item.value}</div>
              <p className="mt-5 font-label text-xs uppercase leading-6 tracking-[0.18em] text-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeIntro;
