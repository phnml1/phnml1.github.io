import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
interface FeaturedPostsProps {
  post: {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tag: string[];
    image: string;
  };
}
const FeaturedPosts: React.FC<FeaturedPostsProps> = (props) => {
  const date = format(new Date(props.post.date),'yyyy년 MM월 dd일')
  return (
    <div className="cursor-pointer w-full h-80 px-8 relative overflow-hidden rounded-lg flex flex-col items-center transition-all hover:scale-105">
      <Link className="w-full h-full rounded-lg overflow-hidden" href={`/${props.post.slug}`}>
        <div className="relative w-full h-2/3 ">
          <Image
            src={`/${props.post.slug}/${props.post.image}`}
            alt="Featured post"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full h-1/3 bg-gray-300 flex flex-col items-center justify-center text-center gap-1 dark:bg-neutral-800">
          <div className="font-bold text-lg">{props.post.title}</div>
          <div className="text-sm">{date}</div>
        </div>
      </Link>
    </div>
  );
};
export default FeaturedPosts;
