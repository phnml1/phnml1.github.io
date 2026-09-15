import Reveal from '@/components/motion/Reveal';

const capabilities = [
  {
    category: 'State Architecture',
    items: 'TanStack Query · Zustand',
    note: '서버 상태, 편집 상태, 연결 상태의 수명과 책임을 분리하고 이벤트 이후의 동기화 규칙을 설계합니다.',
  },
  {
    category: 'Realtime & Recovery',
    items: 'Socket.io · STOMP · Outbox',
    note: '재연결, polling fallback, 순차 replay와 conflict처럼 정상 경로 밖의 상태를 UI에 드러냅니다.',
  },
  {
    category: 'Physical Input',
    items: 'WebView · Scanner · IME',
    note: '물리 키, 한글 입력기, 포커스, CustomEvent를 하나의 검증 가능한 입력 흐름으로 정규화합니다.',
  },
  {
    category: 'Measured Performance',
    items: 'React Profiler · Lighthouse',
    note: '렌더링과 초기 로딩 병목을 같은 시나리오에서 계측하고, 측정 조건과 인과의 한계를 함께 기록합니다.',
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
            경계를 이해하는 프론트엔드.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
            React와 TypeScript를 중심에 두고, 필요한 만큼 API·DB·native 경계까지 내려가 문제를
            확인합니다.
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
