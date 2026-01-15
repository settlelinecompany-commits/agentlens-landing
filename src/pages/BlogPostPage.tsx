'use client';

import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Workflow, ArrowLeft } from 'lucide-react';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { TableOfContents } from '@/components/blocks/table-of-contents';
import { MarkdownRenderer } from '@/components/blocks/markdown-renderer';
import { RelatedPosts } from '@/components/blocks/related-posts';
import Footer from '@/components/blocks/footer';
import { cn } from '@/lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        {/* Simple Nav */}
        <nav className="border-b border-gray-200 bg-white fixed w-full z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Workflow className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold text-gray-900">AgentLens</span>
            </Link>
          </div>
        </nav>

        {/* 404 Content */}
        <main className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allPosts = getBlogPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Workflow className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold text-gray-900">AgentLens</span>
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
          >
            All Posts
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.name} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 truncate max-w-[200px]">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.url} className="hover:text-cyan-600 transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  {Array.isArray(post.tags) && post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Author & Date Info */}
                <div className="text-left mb-6">
                  <p className="text-sm text-gray-600">
                    Written by <span className="text-cyan-600 font-medium">{post.author}</span>
                    {post.reviewedBy && (
                      <span> &middot; Reviewed by <span className="text-cyan-600 font-medium">{post.reviewedBy}</span></span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(post.date)} &middot; {post.readTime}
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Hero Image */}
                {post.cover && (
                  <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-8">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </header>

              {/* Mobile TOC - Shows above content on mobile/tablet */}
              <div className="lg:hidden mb-8">
                <TableOfContents containerId="article-content" />
              </div>

              {/* Article Content */}
              <article className="mb-16">
                <div id="article-content">
                  <MarkdownRenderer content={post.content} />
                </div>
              </article>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* TOC */}
                <TableOfContents containerId="article-content" />

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Ready to Ship with Confidence?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add observability and evaluation to your AI-built app in minutes.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/#pricing"
                      className={cn(
                        'px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors text-center text-sm',
                        'hover:shadow-lg hover:shadow-cyan-500/25'
                      )}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Posts */}
      <RelatedPosts posts={allPosts} currentSlug={post.slug} />

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <Link
          to="/#pricing"
          className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors text-center block"
        >
          Get Started with AgentLens
        </Link>
      </div>

      <Footer />
    </div>
  );
}
