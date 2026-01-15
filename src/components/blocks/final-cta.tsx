'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1];

interface FinalCTAProps {
  className?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function FinalCTA({ className, onPrimaryClick, onSecondaryClick }: FinalCTAProps) {
  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 md:py-32 overflow-hidden',
        'bg-gradient-to-b from-white to-cyan-50',
        className
      )}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Header */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Your App Should Be Live By Tomorrow
          </motion.h2>

          {/* Subheader */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            You built it. Let us ship it. 24 hours from now, you could be onboarding users instead of debugging deployments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            {/* Primary CTA */}
            <button
              onClick={onPrimaryClick}
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-xl transition-all',
                'bg-cyan-500 text-white hover:bg-cyan-600',
                'hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]',
                'w-full sm:w-auto min-h-[48px]'
              )}
            >
              Ship Your App Tomorrow
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onSecondaryClick}
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base font-semibold rounded-xl transition-all',
                'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
                'w-full sm:w-auto min-h-[48px]'
              )}
            >
              <Send className="h-5 w-5" />
              Free Shippability Assessment
            </button>
          </motion.div>

          {/* Secondary text */}
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Not ready? Send us your repo for a free shippability assessment.
          </motion.p>

          {/* Trust Line */}
          <motion.div
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 pt-4 text-xs sm:text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="flex items-center gap-1">
              <span className="text-cyan-500 font-semibold">500+</span> apps shipped
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="text-cyan-500 font-semibold">24-hour</span> turnaround
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Pay only when it ships</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
