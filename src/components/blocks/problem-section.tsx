'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Rocket, Zap, Shield, Code, Lock, TrendingDown } from 'lucide-react';

const solutions = [
  {
    icon: Rocket,
    title: 'Seamless Deployment',
    quote: "From localhost to production in 24 hours.",
    description:
      "Our senior engineers handle CORS, environment variables, SSL certificates, and database connections. We've deployed 500+ AI apps—we know exactly where vibe-coded deployments fail and how to fix them.",
  },
  {
    icon: Zap,
    title: 'Ship Fast, Ship Right',
    quote: "Stop debugging. Start launching.",
    description:
      "You focus on your product vision. We handle the DevOps complexity—CI/CD pipelines, staging environments, production infrastructure. What takes weeks alone takes us 24 hours.",
  },
  {
    icon: Shield,
    title: 'Production-Grade Quality',
    quote: 'Error handling that keeps your app running.',
    description:
      'We add comprehensive error boundaries, input validation, graceful degradation, and logging. Your app handles edge cases elegantly instead of crashing unexpectedly.',
  },
  {
    icon: Code,
    title: 'Clean, Maintainable Code',
    quote: 'Architecture you can build on.',
    description:
      "We refactor AI-generated spaghetti into clean, documented code with consistent patterns. Your future self (and your team) will thank you when it's time to add features.",
  },
  {
    icon: Lock,
    title: 'Security Built In',
    quote: 'Sleep well knowing your app is protected.',
    description:
      "We audit your auth flow, secure API keys, sanitize inputs, and implement proper data handling. Pass security reviews with confidence instead of anxiety.",
  },
  {
    icon: TrendingDown,
    title: 'Cost Optimization',
    quote: 'Know exactly where your tokens are going.',
    description:
      "We implement cost tracking, optimize API calls, add caching where it matters, and set up alerts before bills spiral. Turn a $3K surprise into a $300 predictable expense.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function ProblemSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/30 to-white" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            How Our Senior AI Engineers Help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've shipped 500+ vibe-coded apps to production. Here's what we bring to yours.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  'group relative p-4 sm:p-6 rounded-xl',
                  'bg-white border-2 border-gray-200 shadow-sm',
                  'hover:border-cyan-200 hover:shadow-md',
                  'transition-all duration-300'
                )}
              >
                {/* Cyan accent indicator */}
                <div className="absolute top-0 left-6 w-8 h-1 bg-cyan-400 rounded-b-full" />

                <div className="flex flex-col h-full">
                  <div className="mb-4 text-cyan-500 group-hover:text-cyan-600 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-cyan-600/90 text-sm font-medium italic mb-3">
                    "{solution.quote}"
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm font-medium">
            Production-ready in 24 hours. Guaranteed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;
