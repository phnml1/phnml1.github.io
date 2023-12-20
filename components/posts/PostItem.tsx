import Link from "next/link";
import Tag from "./Tag";

interface PostsContentsProps {
  content: {
    title: string;
    date: string;
    summary: string;
    tag: string[];
    slug: string
  };
}
const PostItem: React.FC<PostsContentsProps> = (props) => {
  return (
    <Link href={`/${props.content.slug}`} className="w-full h-48 cursor-pointer">
      <div className="w-full ml-2 ">
        <div className="text-2xl font-bold">{props.content.title}</div>
        <div className="mt-8">{props.content.summary}</div>
        <div className="mt-8 flex justify-between">
        <div className="flex gap-4">
        {props.content.tag.map ((a,i) => (
          <Tag key = {i} name = {a}/>
        ))}
        </div>
        <div className="mr-12">
          {props.content.date}
        </div>
        </div>
      </div>
    </Link>
  );
};
export default PostItem;
