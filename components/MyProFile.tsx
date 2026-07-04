import Image from 'next/image';
import Link from 'next/link';

const MyProFile: React.FC = () => {
  return (
    <section className="rounded-xl bg-surface-container p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Image
          src="/profile/profile.png"
          alt="phnml1 profile"
          width={88}
          height={88}
          className="rounded-full grayscale"
        />
        <div>
          <div className="font-headline text-xl font-black tracking-[-0.04em]">phnml1</div>
          <p className="mt-2 max-w-xl text-sm leading-7 text-text-secondary">
            문제를 측정하고 구조로 해결하는 프론트엔드 개발자를 지향합니다. 구현 과정에서 배운 판단 기준을 글로 남깁니다.
          </p>
          <div className="mt-4 flex gap-4 font-label text-xs uppercase tracking-[0.18em] text-primary">
            <Link href="https://github.com/phnml1" target="_blank">GitHub</Link>
            <Link href="mailto:juyung0903@gmail.com">Email</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProFile;
