'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  containerId?: string;
}

export function TableOfContents({ className = '', containerId = 'article-content' }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings only from the specified container
    const container = document.getElementById(containerId);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2'))
      .map((heading) => {
        const text = heading.textContent || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return {
          id,
          title: text,
          level: parseInt(heading.tagName.charAt(1))
        };
      })
      .filter(item => item.id && item.title);

    setToc(headings);

    // Add IDs to headings if they don't have them
    headings.forEach(({ id, title }) => {
      const heading = Array.from(container.querySelectorAll('h2'))
        .find(h => h.textContent === title);
      if (heading && !heading.id) {
        heading.id = id;
      }
    });
  }, [containerId]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className={cn('bg-cyan-50 border border-cyan-200 rounded-2xl p-6', className)}>
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Table of Contents
      </h3>
      <nav>
        {toc.map((item, index) => (
          <div key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-2 text-sm transition-colors duration-200',
                activeId === item.id
                  ? 'font-semibold text-cyan-600'
                  : 'text-gray-600 hover:text-cyan-600'
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {item.title}
            </a>
            {index < toc.length - 1 && (
              <div className="border-b border-cyan-200/50"></div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default TableOfContents;
