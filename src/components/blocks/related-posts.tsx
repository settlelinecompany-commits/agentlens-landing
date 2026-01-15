'use client';

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/content';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
  className?: string;
}

export function RelatedPosts({ posts, currentSlug, className }: RelatedPostsProps) {
  const filteredPosts = posts.filter(post => post.slug !== currentSlug).slice(0, 3);

  if (filteredPosts.length === 0) return null;

  return (
    <section className={cn('py-12 bg-gray-50', className)}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Related Articles
          </h2>
          <p className="text-gray-600">
            Continue learning with these related topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
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

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {post.description}
                </p>

                <div className="flex items-center gap-2 mt-4 text-cyan-500 group-hover:text-cyan-600 transition-colors">
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

export default RelatedPosts;
