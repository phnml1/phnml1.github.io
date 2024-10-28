import { format } from 'date-fns';
import Category from '../posts/Category';
import Tag from '../posts/Tag';
import Line from '../Line';
import Clock from '@/public/posts/clock.svg';
interface PostHeaderProps {
  title: string;
  category: string;
  date: Date;
  tags: string[];
  readingTime: number;
}
const PostHeader: React.FC<PostHeaderProps> = (props) => {
  const date = format(new Date(props.date), 'yyyy년 MM월 dd일');
  return (
    <div className="w-full flex flex-col items-center mt-6">
      <Category text={props.category} />
      <div className="font-bold text-3xl md:text-5xl mt-2 text-center leading-snug md:leading-snug">
        {props.title}
      </div>
      <div className="flex gap-4 mt-4 break-words flex-wrap w-full justify-center">
        {props.tags.map((a) => (
          <Tag key={a} name={a} />
        ))}
      </div>
      <div className="text-md mt-4">{date}</div>
      <div className="flex text-sm mt-2 items-center gap-1 text-neutral-600">
        <Clock width={20} height={20} />
        <span>{props.readingTime}분</span>
      </div>
      <Line mt="6" />
    </div>
  );
};
export default PostHeader;
