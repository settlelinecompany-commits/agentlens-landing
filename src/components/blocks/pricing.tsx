'use client';

import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const starterFeatures = [
  'Deploy to production (Vercel, Railway, etc.)',
  'Basic error handling',
  'Environment configuration',
  'SSL & domain setup',
  'Deployment documentation',
  '7-day support window',
];

const standardFeatures = [
  'Everything in Starter, plus:',
  'Authentication setup (Clerk, Auth0, Supabase)',
  'Database configuration & migrations',
  'API rate limiting',
  'Monitoring & alerting',
  'Proper logging',
  '14-day support window',
];

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

interface PricingProps {
  onCtaClick?: () => void;
}

export function Pricing({ onCtaClick }: PricingProps) {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Launch Pricing - Limited Time
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pay Only When It Ships
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re new and building our reputation. You get launch pricing, we get case studies. Win-win.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Starter Tier */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-gray-200 shadow-sm hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Starter
              </h3>
              <p className="text-sm text-gray-500">
                Simple apps, landing pages, basic APIs
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                  $497
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-400 line-through">$497</span>
                <span className="text-sm font-medium text-green-600">First project: $348</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {starterFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onCtaClick}
              className="w-full py-3 px-6 rounded-lg font-semibold text-base bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-cyan-400 transition-all duration-200 min-h-[48px]"
            >
              Get Started
            </button>
          </motion.div>

          {/* Standard Tier - Highlighted */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-cyan-400 shadow-xl shadow-cyan-100 hover:shadow-2xl hover:shadow-cyan-200 transition-all duration-300"
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 text-xs font-medium bg-cyan-500 text-white rounded-full">
                Most Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Standard
              </h3>
              <p className="text-sm text-gray-500">
                Full production apps with auth & database
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                  $997
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-400 line-through">$997</span>
                <span className="text-sm font-medium text-green-600">First project: $698</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {standardFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className={cn(
                    "text-sm text-gray-600",
                    index === 0 && "font-medium text-gray-700"
                  )}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onCtaClick}
              className="w-full py-3 px-6 rounded-lg font-semibold text-base bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-200 transition-all duration-200 min-h-[48px] flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Case Study Bonus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-600">
            <span className="font-medium text-green-600">Extra 20% off</span> if you let us feature your project as a case study
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 mb-8"
        >
          <p className="text-center text-sm text-gray-600 mb-4 font-medium">
            How we compare
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs sm:text-sm">
            <div>
              <p className="font-semibold text-cyan-600">AgentLens</p>
              <p className="text-gray-500">$497-997</p>
              <p className="text-gray-400">24-48 hours</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Fiverr Pro</p>
              <p className="text-gray-500">$3,000+</p>
              <p className="text-gray-400">1-2 weeks</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">Dev Agency</p>
              <p className="text-gray-500">$5,000+</p>
              <p className="text-gray-400">2-4 weeks</p>
            </div>
            <div>
              <p className="font-semibold text-gray-400">DIY</p>
              <p className="text-gray-500">"Free"</p>
              <p className="text-gray-400">3-6 weeks</p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200"
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                Zero Risk Guarantee
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                You don&apos;t pay until it ships. If we can&apos;t deploy your app, you owe nothing. You keep all improvements we&apos;ve made. 48-hour satisfaction window after deployment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          Launch pricing available until we hit 10 case studies. After that, prices go to $1,997 / $2,997.
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;
