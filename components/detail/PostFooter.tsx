import MyProFile from "../MyProFile";
import DetailNav from "./DetailNav";
import Giscus from "./Giscus";

interface PostFooterProps {
  prevData: {title:string, summary:string, slug:string} | number;
  nextData: {title:string, summary:string, slug:string} | number;
}
const PostFooter:React.FC <PostFooterProps> = (props) => {
  return (<footer className="mt-20 w-full">
    <MyProFile />
    <DetailNav prevData = {props.prevData} nextData={props.nextData}/>
    <Giscus />
  </footer>);
}
export default PostFooter;
