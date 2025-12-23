'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="markdown-preview max-w-none p-4 border border-gray-300 rounded-md bg-white min-h-[500px] overflow-y-auto">
      <ReactMarkdown
        components={{
          // Custom styling for markdown elements
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 text-sky-900" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mb-3 text-sky-800 mt-6" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-2 text-sky-700 mt-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-gray-700 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="max-w-full h-auto rounded-lg my-4 shadow-md"
              alt={props.alt || ''}
              {...props}
            />
          ),
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600"
                  {...props}
                />
              );
            }
            return (
              <code
                className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"
                {...props}
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-sky-500 pl-4 italic my-4 text-gray-600"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-300" {...props} />
          ),
        }}
      >
        {content || '*Start typing to see preview...*'}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;

