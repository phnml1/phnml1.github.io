import Link from 'next/link';
interface CategoryProps {
  text: string;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
      <Link href={`/posts/${props.text}`} className="w-auto px-4 border-indigo-600 text-indigo-600 dark:border-indigo-200 dark:text-indigo-200 border-2 border-solid rounded-lg py-1 h-8 flex justify-center items-center cursor-pointer">
{props.text}
      </Link>
  );
};
export default Category;
