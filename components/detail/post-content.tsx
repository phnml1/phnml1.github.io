import ReactMarkdown from "react-markdown";
import Image from "next/image";
interface PostContentProps {
  content : string;
  slug: string
}
const PostContent: React.FC <PostContentProps> = (props) => {
  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        console.log(props.slug);
        console.log(image.properties.src);
        return (
          <div className='w-full max-w-xl my-8'>
            <Image
              src={`/${props.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p className='my-8'>{paragraph.children}</p>;
    },
    // code(code){
    //   const {className, children} = code;
    //   const language = className.split('-')[1];
    //   return <SyntaxHighlighter style={atomDark} language={language} children={children} />
    // }
  };
  return (<div className="w-full leading-relaxed"><ReactMarkdown components={customRenderers}>{props.content}</ReactMarkdown></div>)
}
export default PostContent; 