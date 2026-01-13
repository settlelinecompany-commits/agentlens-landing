'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started and small projects',
    features: [
      '50K traces / month',
      '30-day retention',
      '3 team members',
      'Basic trace visualization',
      'Community support',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing teams shipping production agents',
    features: [
      '500K traces / month',
      '90-day retention',
      '10 team members',
      'Advanced analytics',
      'Cost alerts & budgets',
      'Priority support',
      'SSO (coming soon)',
    ],
    cta: 'Start Free Trial',
    ctaVariant: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced requirements',
    features: [
      'Unlimited traces',
      'Custom retention',
      'Unlimited team members',
      'SLA guarantee',
      'Dedicated support',
      'On-premise option',
      'Custom integrations',
    ],
    cta: 'Contact Us',
    ctaVariant: 'secondary',
    highlighted: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-8 items-start"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={cn(
                'relative p-8 rounded-2xl',
                tier.highlighted
                  ? 'bg-white border-2 border-cyan-400 shadow-xl shadow-cyan-100'
                  : 'bg-white border-2 border-gray-200 shadow-md',
                'transition-all duration-300 hover:shadow-lg'
              )}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-medium bg-cyan-500 text-white rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-500 text-sm">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        'w-5 h-5 mt-0.5 flex-shrink-0',
                        tier.highlighted ? 'text-cyan-500' : 'text-gray-400'
                      )}
                    />
                    <span className="text-sm text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  'w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200',
                  tier.ctaVariant === 'primary'
                    ? 'bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                )}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          All plans include: OpenTelemetry support, LangChain integration, unlimited projects
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;
