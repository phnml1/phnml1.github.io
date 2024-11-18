import Layout from './Layout';
import { Fragment } from 'react';
import ReadingProgressBar from '../detail/ReadingProgressBar';
import PostHeader from '../detail/PostHeader';
import PostContent from '../detail/PostContent';
import Line from '../Line';
import PostFooter from '../detail/PostFooter';

// interface PostDetailLayoutProps {
//   post: Post;
//   category: string;
//   prevData: Post;
//   nextData: Post;
// }
export default function PostDetailLayout(props) {
  return (
     <>
        <ReadingProgressBar />
        <div className="mt-4 w-full md:w-4/5 px-8 flex flex-col items-center mb-16">
          <PostHeader
            title={props.post.title}
            category={props.category}
            date={props.post.date}
            tags={props.post.tags}
            readingTime={props.post.readingMinutes}
          />
          <PostContent
            title={props.post.title}
            content={props.post.content}
            slug={props.post.slug}
          />
          <Line mt="8" />
          <PostFooter prevData={props.prevData} nextData={props.nextData} />
        </div>
        </>
  );
}
