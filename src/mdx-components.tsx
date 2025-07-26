import { MDXComponents } from 'mdx/types';
import { StackBlitzEmbed } from './components/stack-blitz-embed';

// Heading components
export function Heading1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props} className="text-4xl font-bold mb-4" />;
}

export function Heading2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className="text-2xl font-bold mb-4" />;
}

export function Heading3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className="text-xl font-bold mb-4" />;
}

export function Heading4(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 {...props} className="text-lg font-bold mb-4" />;
}

export function Heading5(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 {...props} className="text-base font-bold mb-4" />;
}

export function Heading6(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h6 {...props} className="text-sm font-bold mb-4" />;
}

// Text components
export function Paragraph(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="mb-4 leading-relaxed" />;
}

export function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
    />
  );
}

export function UnorderedList(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} className="list-disc ml-6 mb-4" />;
}

export function OrderedList(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} className="list-decimal ml-6 mb-4" />;
}

export function ListItem(props: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} className="mb-1" />;
}

export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return <pre {...props} className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto" />;
}

export function Code(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className="bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-gray-100"
    />
  );
}

// Media components
export function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      className="my-4 rounded shadow-md mx-auto"
      alt={props.alt ?? ''}
    />
  );
}

export function Video(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <video
      {...props}
      controls
      className="my-4 rounded shadow-md mx-auto max-w-full"
    >
      Your browser does not support the video tag.
    </video>
  );
}

export function YouTube({ videoId }: { videoId: string }) {
  return (
    <div className="my-4 aspect-video w-full max-w-3xl mx-auto">
      <iframe
        className="w-full h-full rounded"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Link components
export function Anchor(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className="text-blue-600 hover:underline"
      target={props.target ?? '_blank'}
      rel={props.rel ?? 'noopener noreferrer'}
    />
  );
}

// Component map for MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    p: Paragraph,
    blockquote: Blockquote,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    pre: Pre,
    code: Code,
    img: Image,
    video: Video,
    a: Anchor,
    StackBlitzEmbed,
    Video,
    YouTube,
  };
}
