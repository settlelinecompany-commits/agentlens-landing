'use client';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Workflow } from 'lucide-react';
import { getBlogPosts } from '@/lib/content';
import { BlogListing } from '@/components/blocks/blog-listing';
import Footer from '@/components/blocks/footer';
import { cn } from '@/lib/utils';

export default function BlogListingPage() {
  const posts = getBlogPosts();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Workflow className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold text-gray-900">AgentLens</span>
          </Link>
          <Link
            to="/#pricing"
            className={cn(
              'hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-all',
              'bg-cyan-500 text-white hover:bg-cyan-600',
              'hover:shadow-lg hover:shadow-cyan-500/25'
            )}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-cyan-50/50 to-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cyan-200 rounded-full mb-6 shadow-sm">
              <span className="text-sm font-medium text-cyan-600">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Insights & Resources
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert guidance on shipping AI-built apps to production with confidence.
              Learn about observability, evaluation, and best practices.
            </p>
          </div>
        </section>

        {/* Blog Listing */}
        {posts.length > 0 ? (
          <BlogListing 
            posts={posts} 
            showHeader={false}
            className="pb-20"
          />
        ) : (
          <section className="py-20">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We're working on great content for you. Check back soon for articles on 
                shipping AI-built apps, observability best practices, and more.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
