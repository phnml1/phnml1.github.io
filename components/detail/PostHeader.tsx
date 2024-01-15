import { format } from 'date-fns';
import Category from '../posts/Category';
import Tag from '../posts/Tag';
import Line from '../Line';
interface PostHeaderProps {
  title: string;
  category: string;
  date: string;
  tags: string[];
}
const PostHeader:React.FC <PostHeaderProps> = (props) => {
  const date = format(new Date(props.date),'yyyy년 MM월 dd일');
  return (
    
      <div className="w-full flex flex-col items-center">
        <div className="w-40 h-30 mb-4">
          <Category text={props.category} image={`/category/${props.category}.png`} />
        </div>
        <div className="flex gap-4 mt-4">
          {props.tags.map((a) => (
            <Tag key={a} name={a} />
          ))}
        </div>
        <div className="font-bold text-3xl md:text-5xl mt-4 text-center leading-snug md:leading-snug">{props.title}</div>
        <div className="text-md mt-6">{date}</div>
        <Line mt='6' />
      </div>
    
  )
}
export default PostHeader;