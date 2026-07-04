import Link from 'next/link';
import { postHref } from '@/utils/Route-Util';

interface DetailNavProps {
  prevData: { title: string; summary: string; slug: string } | number;
  nextData: { title: string; summary: string; slug: string } | number;
}

const DetailNav: React.FC<DetailNavProps> = ({ prevData, nextData }) => {
  return (
    <section className="my-20 grid gap-6 lg:grid-cols-2">
      {typeof prevData === 'object' && <NavCard label="Previous" item={prevData} />}
      {typeof nextData === 'object' && <NavCard label="Next" item={nextData} alignRight />}
    </section>
  );
};

function NavCard({
  label,
  item,
  alignRight = false,
}: {
  label: string;
  item: { title: string; summary: string; slug: string };
  alignRight?: boolean;
}) {
  return (
    <Link
      href={postHref(item.slug)}
      className={`rounded-xl bg-surface-container p-7 transition-all hover:scale-[1.015] hover:bg-surface-high ${
        alignRight ? 'lg:text-right' : ''
      }`}
    >
      <div className="mb-4 font-label text-xs uppercase tracking-[0.2em] text-primary">{label}</div>
      <div className="text-xl font-black leading-tight tracking-[-0.03em]">{item.title}</div>
      <p className="mt-4 line-clamp-2 text-sm leading-7 text-text-secondary">{item.summary}</p>
    </Link>
  );
}

export default DetailNav;
