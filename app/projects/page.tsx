import Link from 'next/link';
import { PortfolioProject, getPortfolioProjects } from '@/utils/PortfolioProject-Util';

export const metadata = {
  title: 'Projects',
  description: '문제 상황, 해결 방식, 수치 기반 결과를 중심으로 정리한 프로젝트 페이지',
};

type ProblemSolution = {
  problem: string;
  solutions: string[];
  resultBlocks?: ResultBlock[];
  image?: string;
};

type ResultBlock = {
  title: string;
  body: string[];
  images?: {
    src: string;
    alt: string;
  }[];
};

type CaseStudySection = {
  overview: {
    line: string;
    value: string;
  };
  pairs: ProblemSolution[];
  techDecision: string[];
  performance: string[];
  result: string;
};

const CASE_STUDIES: Record<string, CaseStudySection> = {
  codemate: {
    overview: {
      line: 'GitHub PR 리뷰를 AI 분석, 실시간 댓글 협업, 통계 추적으로 연결한 코드 리뷰 워크플로우',
      value: '리뷰 대기 시간을 줄이고, PR 단위 협업 상태를 한 화면에서 추적 가능하게 만든 것',
    },
    pairs: [
      {
        problem: 'PR 상세 화면에서 댓글이 달릴 때마다 refetch에 의존하면 이벤트 수만큼 API 요청이 다시 발생했다.',
        image: '/projects/codemate/codemate-comment.gif',
        solutions: [
          'Socket.io 이벤트를 받은 뒤 TanStack Query `setQueryData`로 댓글 캐시를 직접 갱신해 refetch 경로를 제거했다.',
          '`/measurements/comments` 페이지에서 `invalidate/refetch`와 같은 조건으로 비교 측정도 함께 진행했다.',
          '댓글 이벤트 10회 기준 API 요청을 10회 -> 0회로 줄였고, 총 소요 시간을 21102ms -> 1235ms로 단축했다.',
          'synthetic socket 이벤트 10회 기준 클라이언트 반영 latency 평균 3.57ms, p95 7.2ms를 확인했다.',
        ],
        resultBlocks: [
          {
            title: '댓글 캐시 동기화 측정 결과',
            body: ['댓글 캐시 갱신 흐름과 비교 대상 화면을 함께 확인할 수 있도록 결과 이미지를 모아둔 블록입니다.'],
            images: [
              {
                src: encodeURI('/projects/codemate/댓글캐시동기화(1).png'),
                alt: '댓글 캐시 동기화 측정 결과 1',
              },
            ],
          },
          {
            title: '댓글 캐시 동기화 측정 요약',
            body: ['댓글 이벤트 10회 기준 API 요청을 10회 -> 0회로 줄였고, 총 소요 시간을 21102ms -> 1235ms로 단축했다.'],
            images: [
              {
                src: encodeURI('/projects/codemate/댓글캐시동기화(2).png'),
                alt: '댓글 캐시 동기화 측정 요약',
              },
            ],
          },
          {
            title: '댓글 이벤트 반영 latency 측정',
            body: ['synthetic socket 이벤트 10회 기준 클라이언트 반영 latency 평균 3.57ms, p95 7.2ms를 확인했다.'],
            images: [
              {
                src: encodeURI('/projects/codemate/댓글이벤트 반영 latency.png'),
                alt: '댓글 이벤트 반영 latency 측정',
              },
            ],
          },
        ],
      },
      {
        problem: 'AI 리뷰는 비동기 작업이라 요청 직후부터 완료 시점까지 상태가 비어 있었고, 중복 요청도 막기 어려웠다.',
        image: '/projects/codemate/codemate-ai-review.gif',
        solutions: [
          'AI 리뷰를 `PENDING -> IN_PROGRESS -> COMPLETED/FAILED` 상태 머신으로 나눠 요청 직후에도 진행 상태를 UI에 노출했다.',
          '리뷰 요청 중에는 `PENDING` 상태를 보여 주고, 완료 시점에 결과를 붙여 사용자가 흐름을 놓치지 않게 했다.',
          '리뷰 중복 생성을 막기 위해 PR당 활성 리뷰 1건만 허용하는 partial unique index를 적용했다.',
        ],
      },
      {
        problem: '소켓 연결 책임도 컴포넌트마다 퍼져 있어서 연결 상태와 room 구독을 한 곳에서 관리하기 어려웠다.',
        solutions: [
          '`useSyncExternalStore` 기반 소켓 store와 `useSocketRoom`으로 연결 상태와 room 구독을 분리했다.',
          'UI 컴포넌트는 connectionStatus만 구독하고, room join/leave는 hook이 담당하도록 책임을 나눴다.',
        ],
      },
      {
        problem: '대시보드 데이터가 여러 API와 차트 렌더링에 의존해 초기 렌더링 비용이 컸다.',
        solutions: [
          '서버 데이터 요청을 `Promise.all`로 병렬화하고, 무거운 차트와 diff viewer는 `next/dynamic`으로 분리했다.',
          '데이터 대기와 초기 렌더링 비용을 분리해 페이지 응답 흐름을 관리했다.',
        ],
      },
    ],
    techDecision: [
      '`Next.js App Router`를 선택해 PR 상세, 통계, API Route를 한 코드베이스에서 관리했다.',
      '`TanStack Query`를 사용해 서버 상태 캐시를 기준으로 실시간 이벤트를 UI에 직접 반영했다.',
      '`Socket.io`는 댓글/알림 동기화에, `useSyncExternalStore`는 React 컴포넌트 밖에서 소켓 연결 상태를 구독하기 위해 사용했다.',
      '`Prisma + PostgreSQL`로 PR, 댓글, 알림, 리뷰 상태를 관계형 모델로 유지했다.',
    ],
    performance: [
      '댓글 이벤트 10건 기준 API 요청 수를 `10회 -> 0회`로 줄였다.',
      '동일 시나리오 총 처리 시간을 `21102ms -> 1235ms`로 줄였다.',
      '배포 환경 synthetic socket event 10건 기준 클라이언트 반영 latency는 평균 `3.57ms`, p95 `7.2ms`를 확인했다.',
      '검증 범위는 `19개 suite`, `115개 테스트`로 유지했다.',
    ],
    result:
      '사용자는 PR을 새로고침하지 않아도 댓글과 리뷰 상태를 바로 확인할 수 있고, AI 분석이 끝날 때까지 현재 단계가 끊기지 않는다. 채용 관점에서는 실시간 이벤트, 캐시 일관성, 비동기 작업 UX를 각각 분리해서 설계할 수 있다는 점이 드러나는 프로젝트다.',
  },
  'career-hub': {
    overview: {
      line: '채용 공고, 지원 단계, 일정, 알림을 하나의 PWA 흐름으로 묶은 취업 준비 대시보드',
      value: '지원 상태가 화면마다 어긋나지 않도록 상태 규칙과 캐시 갱신 경로를 코드로 고정한 것',
    },
    pairs: [
      {
        problem: '서류, 과제, 면접, 최종 결과가 서로 다른 시점에 바뀌면서 현재 단계와 최종 결과가 쉽게 불일치했다.',
        solutions: [
          '`timelineSyncRules`로 단계 동기화 규칙을 분리해 상태 계산을 UI 밖으로 빼냈다.',
          '상세 수정은 `setQueryData`로 변경된 필드만 반영하고, 파일 URL처럼 서버 재생성이 필요한 케이스만 `invalidateQueries`로 분기했다.',
        ],
      },
      {
        problem: '지원 목록은 데이터가 늘어날수록 초기 로딩과 탐색 비용이 커졌다.',
        solutions: [
          '`useInfiniteQuery`와 `IntersectionObserver`를 조합하고 필터 조건을 queryKey에 포함했다.',
          '필터 변경 시 목록 캐시가 조건별로 분리되고, 다음 페이지는 커서 기준으로 이어서 로드된다.',
        ],
      },
      {
        problem: '브라우저와 설치 상태에 따라 웹 푸시 권한 요청 UX가 달라 같은 기능이 환경마다 다르게 동작했다.',
        solutions: [
          'FCM, Service Worker, iOS Safari/PWA 분기를 별도 권한 흐름으로 나눴다.',
          '알림은 foreground/background, 설치형/브라우저형 UX를 분리해 다뤘다.',
        ],
      },
      {
        problem: '브라우저에서 백엔드 API 주소와 인증 전달 방식을 직접 다루면 보안과 응답 처리 책임이 섞였다.',
        solutions: [
          'Next.js Route Handler 기반 BFF를 두고 클라이언트 요청과 백엔드 응답 처리 규칙을 분리했다.',
        ],
      },
    ],
    techDecision: [
      '`TanStack Query`를 써서 목록 무한 스크롤, 상세 캐시 부분 갱신, 수정 후 재검증을 한 체계로 관리했다.',
      '`Next.js Route Handler` 기반 BFF를 둬 클라이언트가 백엔드 주소와 인증 전달 규칙을 직접 알지 않도록 분리했다.',
      '`Firebase Cloud Messaging + Service Worker`를 사용해 foreground/background 알림 경로를 통합했다.',
      '`Zustand`는 필터 UI와 입력 상태처럼 서버 상태와 분리해야 하는 클라이언트 상태만 담당하게 했다.',
    ],
    performance: [
      '상세 수정 흐름에서 전체 상세 refetch `1회` 대신 변경 필드만 캐시에 반영해 불필요한 재요청을 `0회`로 만들었다.',
      '목록 로딩은 페이지 단위로 분리해 `useInfiniteQuery` + `IntersectionObserver` 조합으로 필요한 페이지까지만 조회했다.',
      '푸시 권한 흐름은 `iOS Safari / standalone PWA / 일반 브라우저 / 권한 거부 상태`로 분기해 예외 케이스를 수치 단위 조건으로 관리했다.',
    ],
    result:
      '사용자는 현재 지원 단계와 최종 결과를 같은 기준으로 보게 되고, 수정 직후에도 화면 전체가 다시 흔들리지 않는다. 채용 관점에서는 CRUD 구현보다 상태 규칙, 캐시 전략, 플랫폼 제약을 먼저 설계한 프로젝트로 읽힌다.',
  },
  'fly-on': {
    overview: {
      line: '여행 일정 생성과 편집을 모바일에서 직접 조작할 수 있게 만든 React Native 플래너',
      value: '복잡한 일정 편집 경험을 모바일 제스처와 성능 기준까지 맞춰 구현한 것',
    },
    pairs: [
      {
        problem: 'React Native에는 웹처럼 바로 가져다 쓸 Drag & Drop API가 없어서 일정 카드 이동을 직접 구현해야 했다.',
        solutions: [
          '`PanResponder`, layout 측정, floating layer를 조합해 카드 이동을 구현했다.',
          'Drag 중 렌더 비용은 React DevTools Profiler로 먼저 측정한 뒤 `React.memo`, Zustand selector, drag layer 분리로 줄였다.',
        ],
      },
      {
        problem: '일정 생성 단계 상태와 서버 조회 데이터가 섞이면 캐시와 UI 임시 상태가 충돌했다.',
        solutions: [
          '일정 생성 단계와 선택값은 `useScheduleStore`로, 일정/관광지/숙소 조회 데이터는 TanStack Query로 분리했다.',
          '단계 이동 조건은 `validateNextStepEnabled` 순수 함수와 Jest 테스트로 검증했다.',
        ],
      },
      {
        problem: '지도 탐색도 사용자가 고른 지역 밖까지 열리면 탐색 비용이 커졌다.',
        solutions: [
          '지도는 선택 지역 좌표로 boundary를 제한하고 marker 조회에 `enabled`, `staleTime`을 적용했다.',
        ],
      },
    ],
    techDecision: [
      '`React Native + Expo`를 사용해 모바일 제스처, 지도, 라우팅을 같은 런타임에서 빠르게 구성했다.',
      '`PanResponder`를 선택한 이유는 제스처 이벤트와 위치 계산을 직접 제어해야 했기 때문이다.',
      '`Zustand`는 일정 생성 단계와 드래그 상태 같은 클라이언트 상태를 분리하기 위해 사용했다.',
      '`TanStack Query`는 관광지/숙소/일정 조회 캐시와 요청 조건 제어를 담당하게 했다.',
    ],
    performance: [
      '동일 Drag & Drop 시나리오 기준 total commit duration을 `211.5ms -> 72.9ms`로 줄였다.',
      '평균 commit duration은 `17.6ms -> 6.6ms`로 줄였다.',
      '지도 기반 탐색 조건은 선택 지역 boundary와 query `enabled` 조건으로 제어했다.',
    ],
    result:
      '사용자는 생성된 일정을 다시 입력하지 않고 손으로 바로 옮겨 편집할 수 있고, 지도 탐색도 현재 지역 범위 안에서 끊기지 않는다. 채용 관점에서는 인터랙션 구현 후 끝내지 않고 프로파일링 데이터로 병목을 줄였다는 점이 핵심이다.',
  },
  'runners-high': {
    overview: {
      line: '실시간 위치 공유와 러닝 기록을 모바일에서 안정적으로 유지한 위치 기반 러닝 앱',
      value: '불안정한 GPS와 네트워크 환경에서도 기록 흐름이 깨지지 않게 만든 것',
    },
    pairs: [
      {
        problem: '위치, 러닝 모드, 코스, 인증 상태가 동시에 바뀌는 구조라 상태 책임이 섞이면 UI 분기가 빠르게 복잡해졌다.',
        solutions: [
          '위치, 러닝, 코스, 인증 상태를 Zustand store 단위로 나눠 모드별 UI 책임을 분리했다.',
          'STOMP 클라이언트에는 `heartbeatIncoming`, `heartbeatOutgoing`, `reconnectDelay`를 두고 publish/subscribe 경로를 러닝 모드별로 나눴다.',
        ],
      },
      {
        problem: '실시간 위치 동기화는 네트워크가 흔들릴 때 바로 끊겼고, GPS raw speed를 그대로 쓰면 페이스 계산이 순간 노이즈에 크게 흔들렸다.',
        solutions: [
          '페이스는 GPS raw speed 대신 최근 `10초` 거리 누적값 기반으로 다시 계산해 흔들림을 줄였다.',
          'Axios interceptor와 refresh queue로 만료 토큰 복구를 공통 경로로 묶었다.',
        ],
      },
    ],
    techDecision: [
      '`WebSocket(STOMP)`를 선택한 이유는 실시간 위치 publish/subscribe 경로를 명시적으로 분리하기 쉬웠기 때문이다.',
      '`expo-location`은 foreground/background 위치 추적과 옵션 제어가 필요해서 사용했다.',
      '`Zustand`는 위치, 코스, 인증, 러닝 상태를 store별로 분리하기 위해 사용했다.',
      '`TanStack Query`는 코스와 기록 조회처럼 서버가 원본인 데이터만 담당하게 했다.',
    ],
    performance: [
      '페이스 계산 기준을 GPS raw speed에서 최근 `10초` 거리 기반 계산으로 바꿨다.',
      'WebSocket 연결은 `heartbeat`와 `reconnectDelay` 설정으로 단발성 끊김 이후 자동 복구 경로를 만들었다.',
      '동시 `401` 응답은 refresh queue 하나로 묶어 중복 재인증 요청을 줄였다.',
    ],
    result:
      '사용자는 러닝 중 연결이 흔들려도 세션이 바로 깨지지 않고, 페이스도 순간 GPS 노이즈보다 실제 이동 흐름에 가깝게 본다. 채용 관점에서는 상태 분리, 실시간 통신 복구, 위치 데이터 보정까지 모바일 제약을 코드로 다룬 사례다.',
  },
};

export default function ProjectsPage() {
  const projects = getPortfolioProjects()
    .map((project) => ({
      project,
      caseStudy: CASE_STUDIES[project.slug],
    }))
    .filter((item): item is { project: PortfolioProject; caseStudy: CaseStudySection } => Boolean(item.caseStudy));

  return (
    <section className="w-full px-5 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="grid gap-10 border-b border-outline/70 pb-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <span className="mb-5 block font-label text-sm font-bold uppercase tracking-[0.28em] text-primary">
              Project Detail
            </span>
          </div>
          <p className="max-w-md text-base leading-8 text-text-secondary">
            각 프로젝트는 기능 소개 대신 실제 병목, 해결 방식, 수치 기반 결과 순서로 정리했습니다.
          </p>
        </header>

        <div className="mt-12 grid gap-12">
          {projects.map(({ project, caseStudy }, index) => (
            <ProjectCaseSection key={project.slug} project={project} caseStudy={caseStudy} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCaseSection({
  project,
  caseStudy,
  index,
}: {
  project: PortfolioProject;
  caseStudy: CaseStudySection;
  index: number;
}) {
  const { frontmatter } = project;

  return (
    <article
      id={project.slug}
      className="overflow-hidden rounded-[36px] border border-outline/70 bg-gradient-to-br from-surface-container via-surface-container to-surface-low p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-8 lg:p-10"
    >
      <div className="grid gap-8 border-b border-outline/70 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <span className="font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Project {String(index).padStart(2, '0')}
          </span>
          <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] font-black leading-[0.92] tracking-[-0.05em]">
            {frontmatter.title}
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-text-secondary">{caseStudy.overview.line}</p>
        </div>

        <aside className="rounded-3xl border border-outline/70 bg-surface-low p-5 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
          <Meta label="Period" value={frontmatter.period} />
          <Meta label="Team" value={frontmatter.team} />
          <Meta label="Role" value={frontmatter.role} />
          <div className="mt-5 flex flex-wrap gap-2 border-t border-outline/70 pt-5">
            {frontmatter.stack.slice(0, 6).map((tech) => (
              <span key={tech} className="rounded-full bg-surface-high px-3 py-1.5 text-xs font-semibold text-text-secondary">
                {tech}
              </span>
            ))}
          </div>
          {frontmatter.github ? (
            <Link
              href={frontmatter.github}
              target="_blank"
              className="mt-5 inline-flex rounded-full border border-primary/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-surface"
            >
              GitHub
            </Link>
          ) : null}
        </aside>
      </div>

      <div className="mt-8 grid gap-5">
        <CaseBlock label="Overview" accent="text-primary">
          <p className="text-base leading-8 text-text-secondary">{caseStudy.overview.line}</p>
          <p className="mt-3 text-base font-semibold leading-8 text-white">핵심 가치: {caseStudy.overview.value}</p>
        </CaseBlock>

        {caseStudy.pairs.map((pair, pairIndex) => (
          <CaseBlock key={`${project.slug}-${pairIndex}`} label={`Problem ${String(pairIndex + 1).padStart(2, '0')}`}>
            {pair.image ? (
              <figure className="mx-auto mb-5 overflow-hidden rounded-3xl border border-outline/70 bg-surface-low p-5">
                <img
                  src={pair.image}
                  alt={`${frontmatter.title} example`}
                  className="mx-auto block max-h-[760px] w-full max-w-[980px] object-contain"
                />
              </figure>
            ) : null}
            <p className="text-base leading-8 text-text-secondary">{pair.problem}</p>
            <div className="mt-5 rounded-2xl border border-outline/70 bg-surface-low p-4">
              <span className="mb-3 block font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">Solution</span>
              <ul className="grid gap-3">
                {pair.solutions.map((solution, solutionIndex) => (
                  <li key={`${solution}-${solutionIndex}`} className="flex gap-3 text-base leading-7 text-text-secondary">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
            {pair.resultBlocks && pair.resultBlocks.length > 0 ? (
              <div className="mt-4 grid gap-4">
                {pair.resultBlocks.map((block) => (
                  <details
                    key={block.title}
                    className="group overflow-hidden rounded-2xl border border-outline/70 bg-background/50 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left">
                      <div className="min-w-0">
                        <span className="block font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          {block.title}
                        </span>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          클릭하면 결과와 이미지를 펼쳐 볼 수 있습니다.
                        </p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-outline/70 bg-surface-low text-lg font-bold text-text-secondary transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </summary>

                    <div className="border-t border-outline/70 px-4 py-4">
                      <div className="grid gap-4">
                        <p className="text-sm leading-7 text-text-secondary">{block.body[0]}</p>

                        <div className="grid gap-3">
                          {block.images?.length ? (
                            block.images.map((image) => (
                              <figure
                                key={image.src}
                                className="w-full overflow-hidden rounded-2xl border border-outline/70 bg-surface-low p-2"
                              >
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="block h-auto w-full max-w-none rounded-xl object-contain"
                                  style={{ maxHeight: '460px' }}
                                />
                              </figure>
                            ))
                          ) : (
                            <div className="min-h-[180px] rounded-2xl border border-dashed border-outline/70 bg-surface-low/70 p-4 text-sm text-text-secondary">
                              이미지를 넣을 수 있는 자리입니다.
                            </div>
                          )}
                        </div>

                        {block.body.length > 1 ? (
                          <div className="grid gap-3">
                            {block.body.slice(1).map((line) => (
                              <p key={line} className="text-sm leading-7 text-text-secondary">
                                {line}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ) : null}
          </CaseBlock>
        ))}

        <CaseBlock label="Tech Decision">
          <ul className="grid gap-3">
            {caseStudy.techDecision.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-text-secondary">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseBlock>

        <CaseBlock label="Performance">
          <div className="grid gap-3 md:grid-cols-2">
            {caseStudy.performance.map((item) => (
              <div key={item} className="rounded-2xl border border-outline/60 bg-surface-low px-4 py-4 text-sm leading-7 text-text-secondary">
                {item}
              </div>
            ))}
          </div>
        </CaseBlock>

        <CaseBlock label="Result">
          <p className="text-base leading-8 text-text-secondary">{caseStudy.result}</p>
        </CaseBlock>
      </div>
    </article>
  );
}

function CaseBlock({
  label,
  children,
  accent,
}: React.PropsWithChildren<{
  label: string;
  accent?: string;
}>) {
  return (
    <section className="rounded-3xl border border-outline/70 bg-background/55 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.14)] md:p-6">
      <div className="mb-4 h-1 w-16 rounded-full bg-primary/80" />
      <span className={`font-label text-xs font-bold uppercase tracking-[0.22em] ${accent ?? 'text-primary'}`}>{label}</span>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="mt-3 first:mt-0">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-text-secondary">{label}</div>
      <div className="mt-1 text-sm font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}
