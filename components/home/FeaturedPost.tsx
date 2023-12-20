import Image from 'next/image';
import Link from 'next/link';
interface FeaturedPostsProps {
  post: {
    slug: string,
    title: string,
    date: string,
    summary: string,
    tag: string [],
    image: string,
  };
}
const FeaturedPosts: React.FC<FeaturedPostsProps> = (props) => {
  console.log(props.post.slug);
  return (
    <Link className="cursor-pointer rounded-lg w-full h-80 relative overflow-hidden flex flex-col items-center transition-all hover:scale-105" href={`/${props.post.slug}`}>
      <div className='relative w-full h-2/3'>
        <Image
  src={`/${props.post.slug}/${props.post.image}`}
  alt="Featured post"
  layout='fill'
  objectFit="cover"
/>
</div>
<div className='w-full h-1/3 bg-gray-300 flex flex-col items-center justify-center text-center gap-1'>
  <div className='font-bold text-lg'>
    {props.post.title}
    </div>
    <div className='text-sm'>
      {props.post.date}
    </div>
</div>
    </Link>
  );
};
export default FeaturedPosts;
