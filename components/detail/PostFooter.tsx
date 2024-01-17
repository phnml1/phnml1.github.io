import MyProFile from "../MyProFile";
import DetailNav from "./DetailNav";

interface PostFooterProps {
  prevData: {title:string, summary:string, slug:string} | number;
  nextData: {title:string, summary:string, slug:string} | number;
}
const PostFooter:React.FC <PostFooterProps> = (props) => {
  return (<div className="w-full mt-12">
    <MyProFile />
    
    <DetailNav prevData = {props.prevData} nextData={props.nextData}/>
  </div>);
}
export default PostFooter;