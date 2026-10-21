import Reveal from '@/components/motion/Reveal';
import Link from 'next/link';

const capabilities = [
  {
    category: '코드 리뷰 협업',
    items: 'AI 리뷰와 공동 검토',
    note: 'CodeMate에서 GitHub PR의 변경 코드를 AI로 분석하고, Socket.IO 공동 리뷰방에서 파일·코드 위치와 대화를 공유하도록 구현했습니다.',
    href: '/projects/codemate',
    project: 'CodeMate',
    media: {
      src: '/projects/codemate/codemate-ai-review.gif',
      alt: 'CodeMate에서 GitHub PR의 변경 코드를 AI로 리뷰한 결과를 확인하는 화면',
    },
  },
  {
    category: '측정과 검증',
    items: '일정 편집 렌더링',
    note: 'Fly:On의 같은 Drag & Drop 시나리오에서 React Profiler로 commit duration을 비교하고 렌더 범위를 조정했습니다.',
    href: '/projects/fly-on',
    project: 'Fly:On',
    media: {
      src: '/projects/fly-on/dragdrop.gif',
      alt: 'Fly:On 모바일 일정 카드를 드래그해 순서를 바꾸는 화면',
    },
  },
  {
    category: '업무 화면',
    items: '주문 변환과 검수',
    note: '주문 엑셀 파일을 변환하는 동안 진행 상황을 보여주고, 처리가 끝나면 결과를 확인·수정할 수 있도록 화면을 연결했습니다.',
    href: '/projects/np-ois',
    project: 'NP-OIS',
    media: null,
  },
  {
    category: '현장 장비',
    items: '바코드 스캔과 작업 보존',
    note: '창고 작업자의 바코드 입력이 중복되거나 빠지지 않게 처리했습니다. 네트워크가 끊기면 전송 대기 중인 작업을 기기에 보관하고, 다시 연결되면 순서대로 보냅니다.',
    href: '/projects/np-wms-picking',
    project: 'NP WMS Picking',
    media: null,
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
            구현 경험
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-9">
          {capabilities.map((item, index) => (
            <Reveal key={item.category} delay={index * 0.05} className="h-full">
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-outline/70 bg-surface-container transition-colors hover:border-primary/50 hover:bg-surface-high">
                {item.media && (
                  <div className="flex aspect-video w-full items-center justify-center overflow-hidden border-b border-outline/70 bg-surface-low">
                    <img
                      src={item.media.src}
                      alt={item.media.alt}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-label text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    {item.category}
                  </div>
                  <h3 className="mt-3 break-words text-2xl font-black tracking-[-0.04em] text-white">
                    {item.items}
                  </h3>
                  <div className="my-5 h-px bg-outline/60" />
                  <p className="text-sm leading-7 text-text-secondary">{item.note}</p>
                  <Link href={item.href} className="mt-auto inline-flex pt-5 text-sm font-semibold text-primary hover:underline">
                    {item.project} 상세 보기 <span aria-hidden="true" className="ml-1">↗</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
