import Link from 'next/link';

const MyProFile: React.FC = () => {
  return (
    <section className="rounded-xl bg-surface-container p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div aria-hidden="true" className="grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full border border-primary/40 bg-surface-low font-headline text-2xl font-black text-primary">
          LJ
        </div>
        <div>
          <div className="font-headline text-xl font-black tracking-[-0.04em]">이주영</div>
          <p className="mt-2 max-w-xl text-sm leading-7 text-text-secondary">
            React와 TypeScript로 구현한 서버 상태, 실시간 동기화, 렌더링 성능 개선 과정을 측정값과 코드 기준으로 기록합니다.
          </p>
          <div className="mt-4 flex gap-4 font-label text-xs uppercase tracking-[0.18em] text-primary">
            <Link href="https://github.com/phnml1" target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href="mailto:juyung0903@gmail.com">Email</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProFile;
