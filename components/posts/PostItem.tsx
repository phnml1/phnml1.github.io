import Link from "next/link";
import Tag from "./Tag";
import { format } from "date-fns";
import { Post } from "@/.contentlayer/generated";

interface PostsContentsProps {
  content: Post
}
const PostItem: React.FC<PostsContentsProps> = (props) => {
  const date = format(new Date(props.content.date),'yyyy년 MM월 dd일')
  return (
    <Link href={`/${props.content.slug}`} className="w-full h-auto cursor-pointer transition-all hover:drop-shadow-tag-hover">
      <div className="w-full ml-2 transition-all hover:drop-shadow-tag-hover">
        <div className="text-xl font-bold md:text-3xl">{props.content.title}</div>
        <div className="mt-8 text-sm md:text-base">{props.content.summary}</div>
        <div className="mt-8 flex justify-between flex-wrap gap-4 flex-col sm:flex-row">
        <div className="flex gap-4">
        {props.content.tags.map ((a,i) => (
          <Tag key = {i} name = {a}/>
        ))}
        </div>
        <div className="pl-2 mr-12 text-sm sm:text-base">
          {date}
        </div>
        </div>
      </div>
    </Link>
  );
};
export default PostItem;
