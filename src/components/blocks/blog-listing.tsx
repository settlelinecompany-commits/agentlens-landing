'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/content';

interface BlogListingProps {
  posts: BlogPost[];
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

export function BlogListing({
  posts,
  className = '',
  showHeader = true,
  headerTitle = 'Insights & Resources',
  headerDescription = 'Expert guidance on shipping AI-built apps to production'
}: BlogListingProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full mb-6">
              <span className="text-sm font-medium text-cyan-600">Blog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {headerTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {headerDescription}
            </p>
          </div>
        )}

        {/* 3-Column Grid - 1 col mobile, 2 col md, 3 col lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Image/Visual Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-400/10 flex items-center justify-center">
                {post.cover ? (
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-cyan-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {post.description}
                </p>

                {/* Read More CTA */}
                <div className="flex items-center gap-2 text-cyan-500 group-hover:text-cyan-600 transition-colors mt-auto">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogListing;
