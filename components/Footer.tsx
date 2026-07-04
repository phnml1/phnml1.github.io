import Link from 'next/link';

const Footer: React.FC = () => {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="w-full bg-surface-low px-5 py-16 md:px-12">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 font-headline text-xl font-black tracking-[-0.04em] text-white">
            phnml1
          </div>
          <p className="max-w-md text-sm leading-7 text-text-secondary">
            성능 병목을 측정하고, 복잡한 상태 흐름을 정리하며, 오래 유지되는 프론트엔드 구조를 기록합니다.
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
            <Link className="hover:text-white" href="https://github.com/phnml1" target="_blank">GitHub</Link>
            <Link className="hover:text-white" href="mailto:juyung0903@gmail.com">Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
