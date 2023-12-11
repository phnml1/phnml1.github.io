import Image from 'next/image';
import FeaturedPosts from '@/components/home/FeaturedPost';
import Head from 'next/head';
import NavButton from '@/components/NavButton';

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center w-full `}>
      <Head>
        <title>홈페이지</title>
        <meta name = "description" content = "phnml1" />
      </Head>
      <div className="relative mt-4 w-full h-96 z-20 flex justify-center">
        <div className="absolute inset-0 z-20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <Image
          alt="daymode"
          src="/daymode.jpg"
          quality={100}
          fill
          objectFit="cover"
          className="w-full h-full"
        />
        <div className='w-full h-full md:w-4/5 z-20 relative text-white'>
          <div className='absolute left-3 bottom-12'>
          <div className='text-lg md:text-xl'>안녕하세요. 제 블로그에 와주셔서 감사합니다.</div>
          <div className='text-md md:text-lg mt-4'>저는 프론트엔드 개발과 알고리즘을 공부하고, 공부한 지식들을 이곳에 기록하고 있습니다.<br/>부족하지만 좋게 봐주시면 감사드리겠습니다.</div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-4/5'>
       <div className='w-auto ml-4 mt-8 text-xl font-bold'>Featured Posts</div>
       <div className="w-full flex flex-col justify-center items-center flex-1 gap-6 mt-8 md:flex-row">
        <FeaturedPosts />
        <FeaturedPosts />
        <FeaturedPosts />
        </div>
        <div className='w-full flex mt-16 mb-16 ml-4'>
          <NavButton link="/posts" content="All Posts"/>
        </div>
      </div>
    </main>
  );
}
