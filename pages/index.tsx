import FeaturedPosts from '@/components/home/FeaturedPost';
import Head from 'next/head';
import NavButton from '@/components/NavButton';
import { recentPosts } from '@/utils/Post-Util';
import HomeIntro from '@/components/home/HomeIntro';
import Layout from '@/components/layouts/Layout';
import { Post } from '@/types';
import { GetStaticProps } from 'next';
interface HomeProps {
  posts:Post[];
}
export default function Home(props:HomeProps) {
  return (
    <>
      <main className={`flex min-h-screen flex-col items-center w-full `}>
        <Head>
          <title>phnml1{`'`}s blog</title>
          <meta name="description" content="phnml1" />
        </Head>
        <HomeIntro />
        <div className="w-full md:w-4/5">
          <div className="w-auto ml-8 mt-8 text-xl font-bold">Recent Posts</div>
          <div className="w-full flex flex-col justify-center items-center flex-1 gap-16 mt-8 md:flex-row">
            {props.posts.map((post, i) => (
              <FeaturedPosts key={i} post={post} />
            ))}
          </div>
          <div className="w-full flex mt-16 mb-16 justify-center">
            <NavButton link="/posts/all" content="More Posts" />
          </div>
        </div>
      </main>
    </>
  );
}
export const getStaticProps:GetStaticProps = () => {
  return {
    props: {
      posts: JSON.parse(JSON.stringify(recentPosts)),
    },
  };
}
