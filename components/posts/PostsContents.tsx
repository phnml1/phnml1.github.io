import { Post } from "@/.contentlayer/generated";
import PostItem from "./PostItem";
interface PostsContentsProps {
  contents: Post[];
}
const PostsContents: React.FC<PostsContentsProps> = (props) => {
  return(
    <div className = 'w-full h-fit px-3 mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12'>
      {props.contents.map((a,i) => (
        <PostItem key = {i} content={a}/>)
      )}
    </div>
  )
}
export default PostsContents;