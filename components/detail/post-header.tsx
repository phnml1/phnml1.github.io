import Category from '../posts/Category';
import Tag from '../posts/Tag';
interface PostHeaderProps {
  title: string;
  category: string;
  date: string;
  tag: string[];
}
const PostHeader:React.FC <PostHeaderProps> = (props) => {
  const date = props.date.split('-');
  return (
    
      <div className="w-full flex flex-col items-center">
        <div className="w-40 h-30 mb-4">
          <Category text={props.category} image={`/category/${props.category}.png`} />
        </div>
        <div className="flex gap-4 mt-4">
          {props.tag.map((a) => (
            <Tag key={a} name={a} />
          ))}
        </div>
        <div className="font-bold text-5xl mt-4 text-center">{props.title}</div>
        <div className="text-md mt-6">{`${date[0]}년 ${date[1]}월 ${date[2]}일`}</div>
        <hr className='border-1 w-full border-neutral-300 transition-all mt-6'/>
      </div>
    
  )
}
export default PostHeader;