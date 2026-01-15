import Navbar from '../components/blocks/navbar';
import Hero from '../components/blocks/hero';
import TrustBar from '../components/blocks/trust-bar';
import ProblemSection from '../components/blocks/problem-section';
import TransformationCards from '../components/blocks/transformation-cards';
import DashboardPreview from '../components/blocks/dashboard-preview';
import Features from '../components/blocks/features';
import Pricing from '../components/blocks/pricing';
import FAQ from '../components/blocks/faq';
import FinalCTA from '../components/blocks/final-cta';
import BlogSection from '../components/blocks/blog-section';
import Footer from '../components/blocks/footer';
import { getFeaturedBlogPosts } from '../lib/content';

export default function Home() {
  // Get 3 featured blog posts for the homepage
  let featuredPosts: ReturnType<typeof getFeaturedBlogPosts> = [];
  try {
    featuredPosts = getFeaturedBlogPosts(3);
  } catch (error) {
    console.error('Error loading featured blog posts:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSection />
        <TransformationCards />
        <DashboardPreview />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <BlogSection posts={featuredPosts} />
      </main>
      <Footer />
    </div>
  );
}
