import Image from 'next/image';
import Link from 'next/link';

const stack = [
  { name: 'React', note: '렌더링 비용과 상태 경계를 기준으로 컴포넌트를 설계합니다.' },
  { name: 'Next.js', note: '정적 생성, 이미지 최적화, 라우팅 구조를 서비스 맥락에 맞춥니다.' },
  { name: 'TypeScript', note: '도메인 타입을 명확히 두고 런타임 오류 가능성을 줄입니다.' },
  { name: 'React Native', note: '제스처, 애니메이션, 스토어 분리로 모바일 인터랙션을 다룹니다.' },
];

const outcomes = [
  { value: '2x', label: 'dashboard response improved with parallel data fetching' },
  { value: '40%', label: 'interaction bottleneck reduced by memoized state boundaries' },
  { value: '0→1', label: 'native map and location tracking shipped end to end' },
];

const HomeIntro: React.FC = () => {
  return (
    <>
      <section className="w-full pt-28 md:pt-36">
        <div className="mx-auto grid min-h-[760px] w-full max-w-[1440px] grid-cols-1 items-end gap-12 px-5 pb-20 md:px-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="mb-6 block font-label text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Junior Frontend Developer
            </span>
            <h1 className="font-headline text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
              Performance and structure focused frontend developer.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              기능을 구현하는 데서 멈추지 않고, 느려진 이유를 측정하고 복잡해진 구조를 다시 설명 가능한 형태로 정리합니다.
              React, Next.js, React Native에서 실제 문제를 해결한 기록을 포트폴리오와 글로 남깁니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-lg bg-gradient-to-br from-primary to-accent-strong px-7 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-[#001a42] transition-transform hover:scale-[1.02]"
              >
                View Projects
              </Link>
              <Link
                href="/posts/all"
                className="rounded-lg bg-surface-container px-7 py-3 font-label text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-surface-high"
              >
                Read Blog
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-low">
              <Image
                src="/profile/profile.png"
                alt="phnml1 profile"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-surface/75 p-4 backdrop-blur-xl">
                <div className="font-label text-xs uppercase tracking-[0.24em] text-primary">Available for projects</div>
                <div className="mt-2 text-sm text-text-secondary">Seoul based frontend portfolio and tech journal.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-low px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="font-label text-sm font-bold uppercase tracking-[0.24em] text-primary">The Stack</h2>
            <p className="mt-4 max-w-xs text-sm leading-7 text-text-secondary">
              도구 이름보다 왜 쓰는지, 어디서 병목을 줄였는지를 중심으로 다룹니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
            {stack.map((item) => (
              <div key={item.name} className="group rounded-xl bg-surface-container p-6 transition-colors hover:bg-surface-high">
                <div className="text-3xl font-black tracking-[-0.04em] transition-colors group-hover:text-primary">{item.name}</div>
                <div className="my-5 h-px bg-outline/60" />
                <p className="text-sm leading-6 text-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 md:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item.value} className="rounded-xl bg-surface-container p-8">
              <div className="text-gradient text-6xl font-black tracking-[-0.06em]">{item.value}</div>
              <p className="mt-5 font-label text-xs uppercase leading-6 tracking-[0.18em] text-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeIntro;
