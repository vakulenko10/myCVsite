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
        rehypePlugins={[]}
        remarkPlugins={[]}
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
          img: (props: any) => {
            const src = props.src;
            const alt = props.alt || '';
            const title = props.title;
            
            if (!src) {
              return null;
            }
            
            // Try to handle GitHub raw URLs - they sometimes need different format
            let imageSrc = src;
            // If it's a GitHub raw URL, try to ensure it's in the correct format
            if (src.includes('raw.githubusercontent.com')) {
              // GitHub raw URLs should work, but might need to be accessed differently
              imageSrc = src;
            }
            
            return (
              <div className="my-4">
                <img
                  src={imageSrc}
                  alt={alt}
                  title={title}
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={{ 
                    display: 'block', 
                    maxWidth: '100%', 
                    height: 'auto',
                    margin: '1rem 0'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    
                    console.error('Image failed to load:', {
                      src: imageSrc,
                      originalSrc: src,
                      error: 'Network, CORS, or invalid URL',
                    });
                    
                    if (parent && !parent.querySelector('.image-error')) {
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'image-error text-red-500 text-sm my-2 p-2 bg-red-50 rounded border border-red-200';
                      errorDiv.innerHTML = `
                        <p class="font-semibold mb-1">⚠️ Failed to load image</p>
                        <p class="text-xs break-all text-gray-700 mb-1">URL: ${src}</p>
                        <p class="text-xs text-gray-600">This is usually a CORS issue. Try using an image hosting service like Cloudinary, Imgur, or your own server.</p>
                      `;
                      parent.insertBefore(errorDiv, target.nextSibling);
                    }
                    // Don't hide the image - show the error instead
                  }}
                  onLoad={() => {
                    console.log('✅ Image loaded successfully:', imageSrc);
                  }}
                />
              </div>
            );
          },
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

