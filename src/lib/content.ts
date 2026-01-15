import { parseFrontmatter } from './frontmatter';

// Simple reading time calculator (browser-compatible)
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorRole?: string;
  reviewedBy?: string;
  date: string;
  updated?: string;
  readTime: string;
  tags: string[];
  cover?: string;
  category: string;
  featured: boolean;
  draft: boolean;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  content: string;
}

// Cache for blog posts
let blogPostsCache: BlogPost[] | null = null;

// Import markdown files as raw text using Vite's import.meta.glob
// AgentLens uses /content/blog/ at project root level
const blogModules = import.meta.glob('/content/blog/*.md', {
  eager: true,
  as: 'raw'
});

export function getBlogPosts(): BlogPost[] {
  // Return cached posts if available
  if (blogPostsCache) {
    return blogPostsCache;
  }

  const posts: BlogPost[] = [];

  try {
    Object.entries(blogModules).forEach(([path, content]: [string, any]) => {
      // Skip template files
      if (path.includes('template')) return;

      try {
        const fileContent = typeof content === 'string' ? content : content.default || '';

        if (!fileContent) {
          console.warn(`Empty content for blog file: ${path}`);
          return;
        }

        const { data, content: markdownContent } = parseFrontmatter(fileContent);

        // Extract slug from filename
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        const post: BlogPost = {
          slug,
          ...data,
          // Ensure tags is always an array
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
          readTime: calculateReadingTime(markdownContent),
          content: markdownContent,
        } as BlogPost;

        // Only include non-draft posts
        if (!post.draft) {
          posts.push(post);
        }
      } catch (error) {
        console.error(`Error reading blog file ${path}:`, error);
      }
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }

  // Sort by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  // Cache the posts
  blogPostsCache = sortedPosts;
  return sortedPosts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  const featuredPosts = posts.filter(post => post.featured);

  // If we have enough featured posts, return them
  if (featuredPosts.length >= limit) {
    return featuredPosts.slice(0, limit);
  }

  // Otherwise, fill with latest posts
  const remainingSlots = limit - featuredPosts.length;
  const latestPosts = posts.filter(post => !post.featured).slice(0, remainingSlots);

  return [...featuredPosts, ...latestPosts];
}
