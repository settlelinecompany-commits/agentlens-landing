'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Copy, RefreshCw, XCircle } from 'lucide-react';

const painPoints = [
  {
    icon: Copy,
    title: 'Copy-paste debugging',
    description: 'Manually copying logs to ChatGPT to understand what your agent did',
  },
  {
    icon: RefreshCw,
    title: 'Manual reconstruction',
    description: 'Piecing together agent decisions from scattered logs and database entries',
  },
  {
    icon: XCircle,
    title: 'Customer apologies',
    description: 'Explaining to customers why the AI did something unexpected - without knowing yourself',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gray-400">"</span>
            I don't know why it did that.
            <span className="text-gray-400">"</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sound familiar? You're not alone. Every AI agent builder faces this moment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  'group relative p-6 rounded-xl',
                  'bg-white border-2 border-gray-200 shadow-sm',
                  'hover:border-red-200 hover:shadow-md',
                  'transition-all duration-300'
                )}
              >
                {/* Red accent indicator */}
                <div className="absolute top-0 left-6 w-8 h-1 bg-red-400 rounded-b-full" />

                <div className="flex flex-col h-full">
                  <div className="mb-4 text-red-400 group-hover:text-red-500 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.description}
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
          <p className="text-gray-500 text-sm">
            There has to be a better way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;
