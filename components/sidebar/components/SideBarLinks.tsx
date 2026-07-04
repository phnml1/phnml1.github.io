'use client';

import Link from 'next/link';

interface SideBarLinksProps {
  theme: string;
  contents: string[];
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const pageLinks: Record<string, string> = {
  Category: '/posts/all',
  Tag: '/posts/tag/all',
  Main: '/',
  Search: '/posts/search',
  Projects: '/projects',
};

const SideBarLinks: React.FC<SideBarLinksProps> = ({ theme, contents, setSideBar }) => {
  return (
    <div className="w-full">
      <div className="px-4 py-3 font-label text-xs uppercase tracking-[0.22em] text-primary">{theme}</div>
      {contents.map((content) => {
        const href = pageLinks[content] ?? `/posts/${content}`;
        return (
          <Link
            key={content}
            href={href}
            onClick={() => setSideBar(false)}
            className="block rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface-high hover:text-white"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarLinks;
