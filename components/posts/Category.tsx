import Link from 'next/link';

interface CategoryProps {
  text: string;
}

const Category: React.FC<CategoryProps> = ({ text }) => {
  return (
    <Link
      href={`/posts/${text}`}
      className="rounded-full bg-primary px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.18em] text-[#001a42]"
    >
      {text}
    </Link>
  );
};

export default Category;
