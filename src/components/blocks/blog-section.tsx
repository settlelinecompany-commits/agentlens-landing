'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/content';

interface BlogSectionProps {
  posts: BlogPost[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function BlogSection({ posts, className }: BlogSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={cn('relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50', className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cyan-200 rounded-full mb-6">
            <span className="text-sm font-medium text-cyan-600">From the Blog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Insights & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert guidance on shipping AI-built apps to production
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
              >
                {/* Image/Visual Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-400/10 flex items-center justify-center overflow-hidden">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
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
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
              'text-sm font-semibold text-cyan-600',
              'border-2 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300',
              'transition-all duration-200'
            )}
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogSection;
