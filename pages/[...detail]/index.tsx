import PostContent from '@/components/detail/post-content';
import PostHeader from '@/components/detail/post-header';
import { getAllPosts, getPostData } from '@/utils/Post-Util';

export function PostDetailPage(props) {
  return (
    <div className="mt-4 w-full md:w-4/5 px-8 flex flex-col items-center">
      <PostHeader title={props.post.title} category={props.category} date={props.post.date} tag={props.post.tag}/>
      <div className='w-full flex mt-8'>
        <PostContent content={props.post.content} slug = {props.post.slug}/>
      </div>
      <a href='#javascript'>javascript</a> 
      <a href='#code'>code</a> 
      <a href='#loren'>loren</a>  
    </div>
  );
}
export function getStaticProps(context) {
  const { params } = context;
  const { detail } = params;
  const detailPath = detail.join('/');
  const postData = getPostData(`${detailPath}.md`);
  return {
    props: {
      post: postData,
      category: detail[1],
    },
  };
}

export function getStaticPaths() {
  const allFiles = getAllPosts();
  const slugs = allFiles.map((file) => file.slug);
  return {
    paths: slugs.map((slug) => {
      const detail = slug.split('/');
      return { params: { detail } };
    }),
    fallback: false,
  };
}
export default PostDetailPage;
