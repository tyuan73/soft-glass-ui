import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../../styles/prism-soft.css';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';
import Prism from 'prismjs';

// Import required syntax highlighters
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup'; // HTML / XML / SVG

export interface SoftMarkdownViewerProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  language?: string;
  codeString: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  py: 'python',
  python: 'python',
  java: 'java',
  sql: 'sql',
  sh: 'bash',
  bash: 'bash',
  shell: 'bash',
  zsh: 'bash',
  html: 'markup',
  xml: 'markup',
  markup: 'markup',
  css: 'css',
  scss: 'css',
  json: 'json',
};

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  python: 'Python',
  java: 'Java',
  sql: 'SQL',
  bash: 'Shell / Bash',
  markup: 'HTML',
  css: 'CSS',
  json: 'JSON',
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language = '', codeString }) => {
  const [copied, setCopied] = useState(false);

  const normalizedLang = language.toLowerCase().trim();
  const prismLang = LANGUAGE_MAP[normalizedLang] || normalizedLang;
  const displayName =
    LANGUAGE_DISPLAY_NAMES[prismLang] || (language ? language.toUpperCase() : 'CODE');

  // Syntax highlight with Prism
  const highlightedCode = useMemo(() => {
    const grammar = Prism.languages[prismLang];
    if (grammar) {
      try {
        return Prism.highlight(codeString, grammar, prismLang);
      } catch {
        return null;
      }
    }
    return null;
  }, [codeString, prismLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-2xl soft-surface soft-pressed-xs p-4 overflow-hidden border border-white/20">
      {/* Code Block Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/20 text-xs font-bold text-[var(--soft-text-muted)]">
        <span className="flex items-center gap-1.5 font-mono text-[var(--soft-primary)]">
          {prismLang === 'bash' ? (
            <Terminal className="w-3.5 h-3.5" />
          ) : (
            <Code2 className="w-3.5 h-3.5" />
          )}
          {displayName}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg soft-surface soft-raised-xs text-xs text-[var(--soft-text-muted)] hover:text-[var(--soft-text)] hover:soft-raised-sm active:soft-pressed-xs cursor-pointer outline-none transition-all duration-150"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre
        className={`text-xs font-mono overflow-x-auto leading-relaxed m-0 p-0 bg-transparent language-${prismLang}`}
      >
        {highlightedCode ? (
          <code
            className={`language-${prismLang}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <code className={`language-${prismLang}`}>{codeString}</code>
        )}
      </pre>
    </div>
  );
};

export const SoftMarkdownViewer: React.FC<SoftMarkdownViewerProps> = ({
  content,
  className = '',
}) => {
  return (
    <div
      className={`w-full soft-surface soft-raised-md rounded-3xl p-6 sm:p-8 select-text ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--soft-text)] mt-6 mb-3 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--soft-text)] mt-5 mb-2.5 tracking-tight border-b border-white/20 pb-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-[var(--soft-text)] mt-4 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--soft-primary)] mt-3 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-2 text-sm leading-relaxed text-[var(--soft-text)]">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-4 py-2 border-l-4 border-[var(--soft-primary)] rounded-r-2xl soft-surface soft-pressed-xs text-sm italic text-[var(--soft-text-muted)]">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => <ul className="my-2 pl-2 space-y-1 list-none">{children}</ul>,
          ol: ({ children }) => (
            <ol className="my-2 pl-4 space-y-1 list-decimal text-sm text-[var(--soft-text)] marker:text-[var(--soft-primary)] marker:font-bold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-sm text-[var(--soft-text)] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--soft-primary)] mt-2 shrink-0 shadow-[0_0_4px_var(--soft-primary)]" />
              <div className="flex-1 min-w-0">{children}</div>
            </li>
          ),
          hr: () => (
            <hr className="my-6 border-0 h-0.5 soft-pressed-xs bg-[var(--soft-text-subtle)]/20" />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--soft-primary)] underline font-semibold hover:brightness-110"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-2xl soft-surface soft-pressed-xs p-2.5">
              <table className="w-full text-left border-collapse text-xs">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-white/20">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-2.5 font-bold uppercase tracking-wider text-[var(--soft-primary)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-2.5 text-[var(--soft-text)] font-medium">{children}</td>
          ),
          code: ({ className: codeClassName, children, ...rest }) => {
            const match = /language-(\w+)/.exec(codeClassName || '');
            const codeContent = String(children).replace(/\n$/, '');

            if (match) {
              return <CodeBlock language={match[1]} codeString={codeContent} />;
            }

            // Check if multiline code
            if (codeContent.includes('\n')) {
              return <CodeBlock codeString={codeContent} />;
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 mx-0.5 rounded-lg soft-surface soft-pressed-xs text-xs font-mono text-[var(--soft-primary)] font-semibold"
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            // Let the code component render the full block container
            return <>{children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default SoftMarkdownViewer;
