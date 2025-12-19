import React from 'react';

// NOTE: In a real Next.js app, we would use 'react-markdown' and 'rehype-highlight'.
// Since we are in a pure frontend environment without a bundler for dependencies,
// we will build a simplified renderer for the specific features we need (Headings, Code, Quotes, Paragraphs).

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split content by double newline to identify blocks
  const blocks = content.split(/\n\n+/);

  const renderBlock = (block: string, index: number) => {
    // 1. Code Blocks (```language ... ```)
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const language = lines[0].replace('```', '').trim();
      const code = lines.slice(1, -1).join('\n');
      return (
        <div key={index} className="my-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-sm">
          {language && (
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"/>
              <span className="w-2 h-2 rounded-full bg-yellow-500"/>
              <span className="w-2 h-2 rounded-full bg-green-500"/>
              <span className="ml-2">{language}</span>
            </div>
          )}
          <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-slate-200">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // 2. Headings (#, ##, ###)
    if (block.startsWith('# ')) {
      return <h1 key={index} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-sans tracking-tight">{block.replace('# ', '')}</h1>;
    }
    if (block.startsWith('## ')) {
      return <h2 key={index} className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-5 font-sans tracking-tight">{block.replace('## ', '')}</h2>;
    }
    if (block.startsWith('### ')) {
      return <h3 key={index} className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-sans">{block.replace('### ', '')}</h3>;
    }

    // 3. Blockquotes (>)
    if (block.startsWith('> ')) {
      return (
        <blockquote key={index} className="border-l-4 border-brand-500 pl-6 my-8 italic text-xl text-slate-700 dark:text-slate-300 font-serif">
          {block.replace('> ', '')}
        </blockquote>
      );
    }

    // 4. Unordered Lists (*)
    if (block.startsWith('* ')) {
      const items = block.split('\n').map(line => line.replace('* ', ''));
      return (
        <ul key={index} className="list-disc list-outside ml-6 space-y-2 my-6 text-slate-800 dark:text-slate-300 font-serif text-lg leading-relaxed marker:text-brand-500">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    }

    // 5. Standard Paragraph
    return (
      <p key={index} className="mb-6 text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-300 font-serif antialiased">
        {block.split('\n').map((line, i) => (
           // Basic inline bold parsing
           <React.Fragment key={i}>
             {line.split(/(\*\*.*?\*\*|`.*?`)/g).map((part, j) => {
               if (part.startsWith('**') && part.endsWith('**')) {
                 return <strong key={j} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
               }
               if (part.startsWith('`') && part.endsWith('`')) {
                 return <code key={j} className="bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded text-base font-mono">{part.slice(1, -1)}</code>;
               }
               return part;
             })}
             {i < block.split('\n').length - 1 && <br />}
           </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {blocks.map(renderBlock)}
    </article>
  );
};

export default MarkdownRenderer;