import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';

const experience = [
  { title: 'NP WMS Picking', href: '/projects/np-wms-picking', detail: 'PDA 화면 · 스캐너 입력 · 오프라인 작업 보존' },
  { title: 'NP-OIS', href: '/projects/np-ois', detail: '주문 업로드 · 변환 상태 · 검수 화면' },
];

export default function HomeIntro() {
  return (
    <section className="w-full border-b border-outline/70 px-5 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal amount={0.05}>
          <span className="font-label text-sm font-bold uppercase tracking-[0.2em] text-primary">이주영 · Frontend Engineer</span>
          <h1 className="mt-6 max-w-5xl break-keep font-headline text-4xl font-black leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            React·TypeScript로 현장의 복잡한 흐름을 화면에 연결합니다.
          </h1>
          <p className="mt-7 max-w-3xl break-keep text-base leading-8 text-text-secondary md:text-lg">
            MJ Corporation(vandro.ai)에서 React 업무 화면과 PDA 피킹 화면을 개발하고 Kotlin·Spring Boot API를 연동했습니다. 개인 프로젝트에서는 Next.js 기반 코드 리뷰 협업 기능을 구현했습니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-surface transition-colors hover:bg-white">프로젝트</Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-primary/60 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-surface">이력서 PDF</a>
            <a href="https://github.com/phnml1" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-outline px-5 py-3 text-sm font-bold text-white transition-colors hover:border-primary">GitHub</a>
            <a href="mailto:juyung0903@naver.com" className="rounded-lg border border-outline px-5 py-3 text-sm font-bold text-white transition-colors hover:border-primary">이메일</a>
          </div>
        </Reveal>
        <Reveal delay={0.08} amount={0.05}>
          <div className="mt-16 grid gap-6 border-t border-outline/70 pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-primary">Company experience · 2026.05 - 2026.08</p>
              <h2 className="mt-3 text-xl font-bold text-white">MJ Corporation · 계약직</h2>
              <p className="mt-2 max-w-lg text-sm leading-7 text-text-secondary">주문 운영 웹과 PDA 현장 작업의 요구사항을 확인해 프론트엔드 화면과 API 흐름에 반영했습니다.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {experience.map((item) => (
                <Link key={item.href} href={item.href} className="group border-l-2 border-primary/50 pl-5 transition-colors hover:border-primary">
                  <h3 className="font-bold text-white group-hover:text-primary">{item.title} <span aria-hidden="true">↗</span></h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
