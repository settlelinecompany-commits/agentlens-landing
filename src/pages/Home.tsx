'use client';

import { useState } from 'react';
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
import ContactFormModal from '../components/blocks/contact-form-modal';
import { getFeaturedBlogPosts } from '../lib/content';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get 3 featured blog posts for the homepage
  let featuredPosts: ReturnType<typeof getFeaturedBlogPosts> = [];
  try {
    featuredPosts = getFeaturedBlogPosts(3);
  } catch (error) {
    console.error('Error loading featured blog posts:', error);
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero onPrimaryClick={openModal} />
        <TrustBar />
        <TransformationCards />
        <ProblemSection />
        <DashboardPreview onCtaClick={openModal} />
        <Features />
        <Pricing onCtaClick={openModal} />
        <FAQ />
        <FinalCTA onPrimaryClick={openModal} onSecondaryClick={openModal} />
        <BlogSection posts={featuredPosts} />
      </main>
      <Footer />
      <ContactFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
