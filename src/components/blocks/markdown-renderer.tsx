'use client';

import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const formatContent = (text: string) => {
    // Process blockquotes first (before paragraph wrapping)
    // Handle multi-line blockquotes by grouping consecutive lines
    let processedText = text;

    // Process expert tips/callouts first
    processedText = processedText.replace(
      /^> \*\*(.*?)\*\*: (.*$)/gim,
      '<div class="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-lg my-6"><div class="flex items-start gap-3"><div class="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg></div><div><div class="text-sm font-semibold text-cyan-700 mb-1">Pro Tip</div><p class="text-gray-700">$2</p></div></div></div>'
    );

    // Handle regular blockquotes - group consecutive lines
    const lines = processedText.split('\n');
    const result: string[] = [];
    let inBlockquote = false;
    let blockquoteContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isBlockquote = line.trim().startsWith('>') && !line.includes('Pro Tip');

      if (isBlockquote) {
        const content = line.replace(/^>\s*/, '').trim();
        if (content) {
          blockquoteContent.push(content);
          inBlockquote = true;
        } else {
          // Empty blockquote line - skip it
          continue;
        }
      } else {
        if (inBlockquote) {
          // Close blockquote with cyan left border
          if (blockquoteContent.length > 0) {
            result.push(`<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r">${blockquoteContent.join(' ')}</blockquote>`);
            blockquoteContent = [];
          }
          inBlockquote = false;
        }
        result.push(line);
      }
    }

    // Close any remaining blockquote
    if (inBlockquote && blockquoteContent.length > 0) {
      result.push(`<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r">${blockquoteContent.join(' ')}</blockquote>`);
    }

    processedText = result.join('\n');

    return processedText
      // Headers with IDs for TOC linking
      .replace(/^# (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<h1 id="${id}" class="text-4xl font-bold text-gray-900 mb-6 mt-8">${title}</h1>`;
      })
      .replace(/^## (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<h2 id="${id}" class="text-3xl font-bold text-gray-900 mb-4 mt-8">${title}</h2>`;
      })
      .replace(/^### (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<h3 id="${id}" class="text-2xl font-semibold text-gray-900 mb-3 mt-6">${title}</h3>`;
      })
      .replace(/^#### (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<h4 id="${id}" class="text-xl font-semibold text-gray-900 mb-2 mt-4">${title}</h4>`;
      })

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')

      // Inline code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 text-cyan-700 rounded text-sm font-mono">$1</code>')

      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cyan-600 hover:text-cyan-700 underline underline-offset-2">$1</a>')

      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700">$1</li>')
      .replace(/(<li[^>]*>.*?<\/li>)/g, '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">$1</ul>')

      // Numbered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700">$1</li>')

      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">')
      .replace(/^(?!<[h|d|u|l|b|c|a])/gm, '<p class="mb-4 leading-relaxed text-gray-700">')
      .replace(/(?<!>)$/gm, '</p>')

      // Clean up empty paragraphs
      .replace(/<p class="mb-4 leading-relaxed text-gray-700"><\/p>/g, '')
      .replace(/<p class="mb-4 leading-relaxed text-gray-700">\s*<\/p>/g, '')
      // Clean up blockquotes wrapped in paragraphs
      .replace(/<p class="mb-4 leading-relaxed text-gray-700">(<blockquote[^>]*>.*?<\/blockquote>)<\/p>/g, '$1')
      // Clean up divs wrapped in paragraphs
      .replace(/<p class="mb-4 leading-relaxed text-gray-700">(<div[^>]*>.*?<\/div>)<\/p>/gs, '$1');
  };

  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </div>
  );
}

export default MarkdownRenderer;
