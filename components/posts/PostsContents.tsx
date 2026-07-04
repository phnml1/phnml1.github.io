import { Post } from '@/types';
import PostItem from './PostItem';

interface PostsContentsProps {
  contents: Post[];
}

const PostsContents: React.FC<PostsContentsProps> = ({ contents }) => {
  return (
    <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
      {contents.map((post, index) => (
        <PostItem key={post.slug} content={post} offset={index % 2 === 1} />
      ))}
    </div>
  );
};

export default PostsContents;
