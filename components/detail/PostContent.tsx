import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import TOC from './Toc';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'unified';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
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
    code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
      if (!inline && className) {
        return <code className={className}>{children}</code>;
      }

      return <code className="notion-inline-code">{children}</code>;
    },
    pre: (code) => {
      if (code.children.props.className) {
        const language = code.children.props.className?.split('-')[1];
        return (
          <div className="case-code my-8 overflow-hidden rounded-xl">
            <SyntaxHighlighter
              style={atomDark}
              PreTag="pre"
              language={language}
              customStyle={{
                padding: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.7',
              }}
              CodeTag={({ children }) => <code className="whitespace-pre-wrap">{children}</code>}
            >
              {code.children.props.children}
            </SyntaxHighlighter>
          </div>
        );
      }
      return null;
    },
      img: (img) => {
        const src = img.src.startsWith('/') ? img.src : `/${props.slug}/${img.src}`;
        const isGif = img.src.endsWith('.gif');
        const width = img.width ? Number(img.width) : isGif ? 1350 : 900;
        const height = img.height ? Number(img.height) : isGif ? 760 : 520;

        return (
          <Image
            src={src}
          alt={img.alt || img.src}
          width={width}
          height={height}
          unoptimized={img.src.endsWith('.svg')}
          className="rounded-xl"
        />
      );
    },
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="portfolio-prose prose prose-invert w-full max-w-none prose-headings:font-black prose-headings:tracking-[-0.035em] prose-p:text-text-secondary prose-li:text-text-secondary prose-img:rounded-xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[raw, slug] as PluggableList}
          components={customRenderers}
        >
          {props.content}
        </ReactMarkdown>
      </div>
      <TOC title={props.title} slug={props.slug} />
    </div>
  );
};

export default PostContent;
