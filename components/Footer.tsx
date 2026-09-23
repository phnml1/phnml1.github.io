import Link from 'next/link';

const Footer: React.FC = () => {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="w-full bg-surface-low px-5 py-16 md:px-12">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 font-headline text-xl font-black tracking-[-0.04em] text-white">
            이주영 · Frontend Developer
          </div>
          <p className="max-w-md text-sm leading-7 text-text-secondary">
            Next.js·React·TypeScript 기반 웹 애플리케이션과 모바일 프로젝트 경험을 정리한 포트폴리오입니다.
          </p>
          <p className="mt-8 font-label text-xs uppercase tracking-[0.22em] text-text-secondary">
            © {year} Jooyoung. Built with Next.js.
          </p>
        </div>
        <div>
          <h4 className="mb-5 font-label text-xs uppercase tracking-[0.24em] text-primary">Navigate</h4>
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <Link className="hover:text-white" href="/projects">Projects</Link>
            <Link className="hover:text-white" href="/posts/all">Blog</Link>
            <Link className="hover:text-white" href="/posts/search">Search</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-5 font-label text-xs uppercase tracking-[0.24em] text-primary">Connect</h4>
          <div className="flex flex-col gap-3 text-sm text-text-secondary">
            <Link className="hover:text-white" href="https://github.com/phnml1" target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link className="hover:text-white" href="mailto:juyung0903@naver.com">Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
