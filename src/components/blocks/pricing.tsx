'use client';

import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';

const features = [
  'Full production deployment',
  'Authentication & security',
  'Error handling & monitoring',
  'Test coverage for critical paths',
  'Documentation & handoff',
  '30-day support window',
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

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.3,
    },
  }),
};

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Outcome-Based Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You pay when it ships. Not before.
          </p>
        </motion.div>

        {/* Single Pricing Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl bg-white border-2 border-cyan-400 shadow-xl shadow-cyan-100 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-200"
        >
          {/* Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1 text-xs font-medium bg-cyan-500 text-white rounded-full">
              Fixed Price
            </span>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              24-Hour Sprint
            </h3>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                $2,400
              </span>
            </div>
            <p className="text-gray-500 mt-2">
              flat rate*
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 sm:pt-8">
            <p className="text-sm font-medium text-gray-700 mb-4 text-center">
              Everything you need to ship:
            </p>
            <ul className="space-y-2 sm:space-y-3 max-w-md mx-auto">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-6 sm:mt-8">
            <button className="w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-base bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-200 transition-all duration-200 min-h-[48px]">
              Get Your Quote
            </button>
          </div>
        </motion.div>

        {/* Price Anchor */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-sm text-gray-600 mt-8 max-w-xl mx-auto"
        >
          That&apos;s $300/hour of senior engineering time. Most agencies charge $200/hour with no outcome guarantee.
        </motion.p>

        {/* Guarantee Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 sm:mt-10 p-4 sm:p-6 md:p-8 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 border border-cyan-200"
        >
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                The AgentLens Guarantee
              </h4>
              <p className="text-sm sm:text-base text-gray-600">
                If we can&apos;t ship your app in 24 hours, you don&apos;t pay. No questions, no negotiations. You keep all the code and improvements we&apos;ve made.
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
          *For standard complexity apps. Complex apps (multiple integrations, real-time features, or heavy data processing) scoped individually.
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;
