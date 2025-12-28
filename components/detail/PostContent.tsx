import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import TOC from './Toc';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import { PluggableList } from 'unified';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('python', python);

interface PostContentProps {
  content: string;
  slug: string;
  title: string;
}

const PostContent: React.FC<PostContentProps> = (props) => {
  const customRenderers = {
    a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
    pre: (code) => {
      if (code.children.props.className) { 
        const language = code.children.props.className?.split('-')[1];
        return (
          <SyntaxHighlighter 
          style={atomDark}
          PreTag="pre"
          language={language}
          // customStyle={{
          //     whiteSpace: 'pre-wrap',
          //     overflowWrap: 'break-word',
          // }}
          CodeTag={({ children }) => (
            <code className='whitespace-pre-wrap'>
              {children}
            </code>
          )}
          >
            {code.children.props.children}
          </SyntaxHighlighter>
        );
      }
    },
    img: (img) => {
      const width = (img.width)?img.width:'600';
      const height = (img.height)?img.height:'300';

      return (<Image src={`/${props.slug}/${img.src}`} alt={img.src} width={width} height={height}></Image>)
    },
  };
  return (
    <div className='w-full flex mt-8 mb-8'>
    <div className = "w-full gap-8 lg:flex">
    <div className="prose prose-zinc w-full leading-loose max-w-3xl dark:prose-invert">
      <ReactMarkdown rehypePlugins={[raw, slug] as PluggableList} components={customRenderers}>{props.content}</ReactMarkdown>
    </div>
    <TOC title={props.title} slug = {props.slug}/>
    </div>
    </div>
  );
};
export default PostContent;
