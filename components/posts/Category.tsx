import Image from 'next/image';
import Link from 'next/link';
interface CategoryProps {
  text: string;
  image: string;
}

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Link href={`/posts/${props.text}`} className="w-3/5 h-full flex flex-col items-center cursor-pointer">
        <div className="w-4/5 h-4/5 relaitve flex justify-center items-center">
          {/* <Image src={props.image} width={60} height={60} alt="eeee" objectFit="contain" /> */}
        </div>
        <div className="text-center h-1/5">{props.text}</div>
      </Link>
    </div>
  );
};
export default Category;
