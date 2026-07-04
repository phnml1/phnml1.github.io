const BlogIntroduce = () => {
  return (
    <header className="w-full px-5 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <span className="mb-5 block font-label text-sm font-bold uppercase tracking-[0.28em] text-primary">
            Tech Journal
          </span>
          <h1 className="font-headline text-[clamp(3.5rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.06em]">
            The archive.
          </h1>
        </div>
        <p className="max-w-lg text-base leading-8 text-text-secondary">
          React, Next.js, React Native를 다루며 마주친 성능, 구조, 구현 문제를 해결 과정 중심으로 기록합니다.
        </p>
      </div>
    </header>
  );
};

export default BlogIntroduce;
