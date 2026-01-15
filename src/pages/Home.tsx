import Navbar from '../components/blocks/navbar';
import Hero from '../components/blocks/hero';
import ProblemSection from '../components/blocks/problem-section';
import DashboardPreview from '../components/blocks/dashboard-preview';
import Features from '../components/blocks/features';
import Pricing from '../components/blocks/pricing';
import FAQ from '../components/blocks/faq';
import FinalCTA from '../components/blocks/final-cta';
import Footer from '../components/blocks/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <DashboardPreview />
        <Features />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
