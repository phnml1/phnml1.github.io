import Link from 'next/link';
import Reveal from '@/components/motion/Reveal';

const experience = [
  {
    title: 'NP WMS Picking',
    href: '/projects/np-wms-picking',
    detail: 'PDA 화면 · 스캐너 입력 · 오프라인 작업 보존',
  },
  { title: 'NP-OIS', href: '/projects/np-ois', detail: '주문 업로드 · 변환 상태 · 검수 화면' },
  {
    title: 'Cell Label Kiosk',
    href: '/projects/np-cell-label-kiosk',
    detail: '주문 QR 라벨 발행 · 출력 결과 확인',
  },
];

export default function HomeIntro() {
  return (
    <section className="w-full border-b border-outline/70 px-5 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal amount={0.05}>
          <h1 className="max-w-5xl break-keep font-headline text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            이주영 · Frontend Developer
          </h1>
          <p className="mt-5 max-w-3xl break-keep text-lg leading-8 text-text-secondary md:text-xl">
            React·TypeScript로 업무 화면과 실시간 협업 UI를 만들고, 렌더링 병목을 측정해 개선합니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-surface transition-colors hover:bg-white"
            >
              프로젝트
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-primary/60 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-surface"
            >
              이력서 PDF
            </a>
            <a
              href="https://github.com/phnml1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-outline px-5 py-3 text-sm font-bold text-white transition-colors hover:border-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:juyung0903@naver.com"
              className="break-all rounded-lg border border-outline px-5 py-3 text-sm font-bold text-white transition-colors hover:border-primary"
            >
              juyung0903@naver.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08} amount={0.05}>
          <div className="mt-16 grid gap-6 border-t border-outline/70 pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Company experience · 2026.05 - 2026.09
              </p>
              <h2 className="mt-3 text-xl font-bold text-white">MJ Corporation · 계약직</h2>
              <p className="mt-2 max-w-lg text-sm leading-7 text-text-secondary">
                주문 변환 웹과 PDA 피킹 화면을 개발했습니다. 스캐너 입력이 흔들리거나 네트워크가
                끊겨도 작업 기록이 유지되도록 화면과 서버 상태를 맞췄습니다.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {experience.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border-l-2 border-primary/50 pl-5 transition-colors hover:border-primary"
                >
                  <h3 className="font-bold text-white group-hover:text-primary">
                    {item.title} <span aria-hidden="true">↗</span>
                  </h3>
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
