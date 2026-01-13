'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, Lightbulb, DollarSign, Check, X, Clock, Zap } from 'lucide-react';

const features = [
  {
    title: 'See What Actually Happened',
    description: 'Complete trace visualization shows every step your agent took, every tool call, every decision point.',
    icon: Eye,
    color: 'cyan',
    mockup: (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1 h-2 bg-green-200 rounded" style={{ width: '60%' }} />
            <span className="text-xs text-gray-500 font-mono">45ms</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-600" />
            </div>
            <div className="flex-1 h-2 bg-green-200 rounded" style={{ width: '80%' }} />
            <span className="text-xs text-gray-500 font-mono">120ms</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-3 h-3 text-red-600" />
            </div>
            <div className="flex-1 h-2 bg-red-200 rounded" style={{ width: '40%' }} />
            <span className="text-xs text-red-500 font-mono">Error</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Know Why It Decided That',
    description: 'See the reasoning chain, context window, and decision factors that led to each action.',
    icon: Lightbulb,
    color: 'blue',
    mockup: (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">1.</span>
            <span className="text-gray-600">Checked user_tier = "premium"</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">2.</span>
            <span className="text-gray-600">Found 0 matching products</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold">3.</span>
            <span className="text-red-600">No fallback → Error thrown</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Know What It Cost',
    description: 'Token-level economics for every trace. Identify expensive patterns and optimize spend.',
    icon: DollarSign,
    color: 'green',
    mockup: (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">2,847</div>
            <div className="text-xs text-gray-500">tokens</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">$0.024</div>
            <div className="text-xs text-gray-500">cost</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">Input: 847</span>
          <span className="text-gray-500">Output: 2,000</span>
        </div>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function getColorClasses(color: string) {
  switch (color) {
    case 'cyan':
      return {
        icon: 'text-cyan-500',
        iconBg: 'bg-cyan-100',
        border: 'hover:border-cyan-300',
        shadow: 'hover:shadow-cyan-100',
      };
    case 'blue':
      return {
        icon: 'text-blue-500',
        iconBg: 'bg-blue-100',
        border: 'hover:border-blue-300',
        shadow: 'hover:shadow-blue-100',
      };
    case 'green':
      return {
        icon: 'text-green-500',
        iconBg: 'bg-green-100',
        border: 'hover:border-green-300',
        shadow: 'hover:shadow-green-100',
      };
    default:
      return {
        icon: 'text-cyan-500',
        iconBg: 'bg-cyan-100',
        border: 'hover:border-cyan-300',
        shadow: 'hover:shadow-cyan-100',
      };
  }
}

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Finally, visibility into your AI agents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Debug faster. Spend smarter. Ship with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className={cn(
                  'group relative p-6 sm:p-8 rounded-2xl',
                  'bg-white border-2 border-gray-200 shadow-md',
                  colors.border,
                  'hover:shadow-lg',
                  'transition-all duration-300'
                )}
              >
                {/* Icon with background */}
                <div className="relative mb-6">
                  <div className={cn(
                    'w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center',
                    colors.iconBg,
                    'border-2 border-white shadow-sm'
                  )}>
                    <IconComponent className={cn('w-8 h-8', colors.icon)} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Visual mockup */}
                {feature.mockup}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
