import ReadingProgressBar from '../detail/ReadingProgressBar';
import PostHeader from '../detail/PostHeader';
import PostContent from '../detail/PostContent';
import PostFooter from '../detail/PostFooter';

export default function PostDetailLayout(props) {
  return (
    <>
      <ReadingProgressBar />
      <article className="w-full px-5 pb-20 pt-28 md:px-12 md:pt-36">
        <div className="mx-auto w-full max-w-[1440px]">
          <PostHeader
            title={props.post.title}
            category={props.category}
            date={props.post.date}
            tags={props.post.tags}
            readingTime={props.post.readingMinutes}
            project={props.post.project}
          />
          <PostContent title={props.post.title} content={props.post.content} slug={props.post.slug} />
          <PostFooter prevData={props.prevData} nextData={props.nextData} />
        </div>
      </article>
    </>
  );
}
