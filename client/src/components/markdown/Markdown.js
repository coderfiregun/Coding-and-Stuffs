import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {oneDark, solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism/";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'

const Markdown = ({ markdown }) => {
  return (
    <ReactMarkdown
      children={markdown}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={ match[1] ==='java' ? oneDark : solarizedlight }
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Markdown;
