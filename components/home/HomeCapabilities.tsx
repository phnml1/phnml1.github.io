import Reveal from '@/components/motion/Reveal';
const capabilities = [
  {
    category: 'Rendering',
    title: '렌더링 범위 측정·축소',
    keywords: ['React Profiler', 'Placeholder', 'React.memo'],
  },
  {
    category: 'Offline',
    title: '오프라인 명령 보존·재전송',
    keywords: ['IndexedDB', 'Outbox', 'Version check'],
  },
  {
    category: 'Workflow',
    title: '업무 데이터 흐름·검수 UI',
    keywords: ['Upload', 'Transform', 'Review'],
  },
  {
    category: 'Realtime',
    title: '실시간 연결·구독 복구',
    keywords: ['Socket.IO', 'STOMP', 'Reconnect'],
  },
];

export default function HomeCapabilities() {
  return (
    <section
      className="w-full bg-surface-low px-5 py-24 md:px-12"
      aria-labelledby="capabilities-title"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        <Reveal>
          <span className="mb-4 block font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">
            Technical Capabilities
          </span>
          <h2
            id="capabilities-title"
            className="font-headline text-4xl font-black tracking-[-0.05em] md:text-5xl"
          >
            기술 키워드
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {capabilities.map((item, index) => (
            <Reveal key={item.category} delay={index * 0.05} className="h-full">
              <article className="flex h-full min-w-0 flex-col rounded-lg border border-outline/70 bg-surface-container p-6 transition-colors hover:border-primary/50 hover:bg-surface-high">
                <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  {item.category}
                </div>
                <h3 className="mt-3 break-words text-2xl font-black tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} 관련 기술`}>
                  {item.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className="rounded-full bg-surface-high px-3 py-1.5 font-label text-xs font-semibold text-text-secondary"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
