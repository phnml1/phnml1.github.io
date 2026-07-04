import Link from 'next/link';
import { categoryHref, tagHref } from '@/utils/Route-Util';

interface CategoryMenusProps {
  categorys: string[];
  currentCategory: string;
  theme: string;
}

const CategoryMenus: React.FC<CategoryMenusProps> = ({ categorys, currentCategory, theme }) => {
  const categoryLink = (category: string): string => {
    return theme === 'tag' ? tagHref(category) : categoryHref(category);
  };

  const allHref = theme === 'tag' ? '/posts/tag/all' : '/posts/all';
  const title = theme === 'tag' ? 'Tags' : 'Categories';

  return (
    <section className="w-full px-5 pt-12 md:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <h2 className="mb-5 font-label text-xs font-bold uppercase tracking-[0.24em] text-primary">{title}</h2>
        <div className="flex flex-wrap gap-3">
          <CategoryLink href={allHref} active={currentCategory === 'all'}>
            All
          </CategoryLink>
          {categorys?.map((category) => (
            <CategoryLink key={category} href={categoryLink(category)} active={category === currentCategory}>
              {category}
            </CategoryLink>
          ))}
        </div>
      </div>
    </section>
  );
};

function CategoryLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
        active
          ? 'bg-primary text-[#001a42]'
          : 'bg-surface-container text-text-secondary hover:bg-surface-high hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}

export default CategoryMenus;
