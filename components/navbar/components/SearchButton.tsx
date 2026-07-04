import Link from 'next/link';

interface SearchButtonProps {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
}

const SearchButton: React.FC<SearchButtonProps> = () => {
  return (
    <Link
      href="/posts/search"
      aria-label="Search posts"
      className="grid h-10 w-10 place-items-center rounded-lg bg-surface-container text-primary transition-colors hover:bg-surface-high"
    >
      <span className="text-lg leading-none">⌕</span>
    </Link>
  );
};

export default SearchButton;
