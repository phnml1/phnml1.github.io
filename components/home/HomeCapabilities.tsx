import Reveal from '@/components/motion/Reveal';

const capabilities = [
  {
    category: 'Frontend',
    items: 'TanStack Query · Zustand',
    note: 'React·Next.js·React Native 화면에서 서버 데이터 조회, 편집 상태, 모바일 UI 흐름을 구현했습니다.',
  },
  {
    category: 'Realtime & Integration',
    items: 'Socket.io · STOMP · Outbox',
    note: 'PR 댓글·알림, 위치 공유, 장기 작업 polling처럼 이벤트 기반 화면 갱신과 API 연동을 다뤘습니다.',
  },
  {
    category: 'Device & Local Data',
    items: 'WebView · Scanner · IME',
    note: 'Android WebView, 물리 스캐너 입력, IndexedDB 로컬 저장소를 PDA 작업 화면과 연결했습니다.',
  },
  {
    category: 'Quality & Performance',
    items: 'React Profiler · Lighthouse',
    note: 'Jest·Playwright·GitHub Actions와 성능 측정 도구로 주요 기능과 렌더링 병목을 확인했습니다.',
  },
];

export default function HomeCapabilities() {
  return (
    <section
      className="w-full bg-surface-low px-5 py-24 md:px-12"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
            Technical Capabilities
          </span>
          <h2
            id="capabilities-title"
            className="font-headline text-4xl font-black tracking-[-0.05em] md:text-5xl"
          >
            기술 스택
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
            이력서의 Skills 항목에 맞춰 프론트엔드, 상태·데이터, 실시간 연동, 품질 검증 경험을
            정리했습니다.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-9">
          {capabilities.map((item, index) => (
            <Reveal key={item.category} delay={index * 0.05} className="h-full">
              <article className="group h-full min-w-0 rounded-xl border border-outline/70 bg-surface-container p-6 transition-colors hover:border-primary/50 hover:bg-surface-high">
                <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  {item.category}
                </div>
                <h3 className="mt-3 break-words text-2xl font-black tracking-[-0.04em] text-white">
                  {item.items}
                </h3>
                <div className="my-5 h-px bg-outline/60" />
                <p className="text-sm leading-7 text-text-secondary">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
