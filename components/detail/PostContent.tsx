import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { useMDXComponent } from 'next-contentlayer/hooks'
import TOC from './Toc';
import Link from 'next/link';
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
      const language = code.children.props.className.split('-')[1]
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {code.children.props.children}
        </SyntaxHighlighter>
      );
    },
    img: (img) => {
      return (<Image src={`${props.slug}/${img.src}`} alt={img.src} width={600} height={300}></Image>)
    },
  };
  const MDXComtent = useMDXComponent(props.content)
  return (
    <div className = "w-full gap-8 lg:flex">
    <div className="prose prose-zinc w-full leading-loose max-w-3xl dark:prose-invert">
      <MDXComtent components={customRenderers} />
    </div>
    <TOC title={props.title}/>
    </div>
  );
};
export default PostContent;
