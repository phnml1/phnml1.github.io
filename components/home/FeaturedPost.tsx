import Image from 'next/image';

const FeaturedPosts: React.FC = () => {
  return (
    <div className="cursor-pointer rounded-lg w-full h-80 relative overflow-hidden flex flex-col items-center transition-all hover:scale-105">
      <div className='relative w-full h-2/3'>
        <Image
  src="/darkmode2.jpg"
  alt="Featured post"
  layout='fill'
  objectFit="cover"
/>
</div>
<div className='w-full h-1/3 bg-gray-300 flex flex-col items-center justify-center text-center gap-1'>
  <div className='font-bold text-lg'>
    다익스트라 알고리즘에 대하여
    </div>
    <div className='text-sm'>
      2023.02.10
    </div>
</div>
    </div>
  );
};
export default FeaturedPosts;
