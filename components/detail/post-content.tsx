import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import slug from 'rehype-slug'
import { PluggableList } from 'unified'
import raw from 'rehype-raw'
import TOC from './Toc';
SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('python', python);

interface PostContentProps {
  content: string;
  slug: string;
  title: string;
}

const PostContent: React.FC<PostContentProps> = (props) => {
  console.log(props.title);
  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className="w-full max-w-xl my-8">
            <Image
              src={`/${props.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1];

      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };
  return (
    <div className = "w-full flex gap-8">
    <div className="prose prose-zinc w-full leading-loose max-w-3xl">
      <ReactMarkdown
        rehypePlugins={[raw, slug] as PluggableList}
        components={customRenderers}
      >
        {props.content}
      </ReactMarkdown>
    </div>
    <TOC title={props.title}/>
    </div>
  );
};
export default PostContent;
