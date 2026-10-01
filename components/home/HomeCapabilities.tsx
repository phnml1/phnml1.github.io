import Reveal from '@/components/motion/Reveal';
import Link from 'next/link';

const capabilities = [
  {
    category: '업무 화면',
    items: '주문 변환과 검수',
    note: 'NP-OIS에서 변환이 진행되는 동안만 상태를 조회하고, 완료 뒤 검수 화면이 새 결과를 읽도록 연결했습니다.',
    href: '/projects/np-ois',
    project: 'NP-OIS',
  },
  {
    category: '실시간 상태',
    items: '댓글 이벤트와 Query 캐시',
    note: 'CodeMate에서 Socket payload는 캐시에 반영하고 댓글 변경 mutation 뒤에는 관련 Query를 다시 조회합니다.',
    href: '/projects/codemate',
    project: 'CodeMate',
  },
  {
    category: '현장 장비',
    items: '스캐너 입력과 오프라인 명령',
    note: 'NP WMS Picking에서 물리 키·IME·paste 입력을 한 흐름으로 처리하고, 미전송 작업은 IndexedDB에 보존했습니다.',
    href: '/projects/np-wms-picking',
    project: 'NP WMS Picking',
  },
  {
    category: '측정과 검증',
    items: '일정 편집 렌더링',
    note: 'Fly:On의 같은 Drag & Drop 시나리오에서 React Profiler로 commit duration을 비교하고 렌더 범위를 조정했습니다.',
    href: '/projects/fly-on',
    project: 'Fly:On',
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
            기술이 쓰인 자리
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
            어떤 기술을 썼는지보다 어느 화면에서 왜 필요했는지에 맞춰 정리했습니다.
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
                <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline">
                  {item.project} 상세 보기 <span aria-hidden="true" className="ml-1">↗</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
