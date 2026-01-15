'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1];

interface HeroProps {
  className?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

function Hero({ className, onPrimaryClick, onSecondaryClick }: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        'bg-white pt-16',
        className
      )}
    >
      {/* Background gradient effects - Light theme with subtle cyan/blue */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            You vibe-coded it. We ship it.{' '}
            <span className="text-cyan-500">24 hours.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
          >
            Claude, Cursor, or Replit built your app in minutes. We make it production-ready in 24 hours. Outcome-based pricing means you only pay when it ships.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
          >
            {/* Primary CTA - Solid cyan */}
            <button
              onClick={onPrimaryClick}
              className={cn(
                'inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all',
                'bg-cyan-500 text-white hover:bg-cyan-600',
                'hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]',
                'w-full sm:w-auto'
              )}
            >
              Ship Your App Tomorrow
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* Secondary CTA - Border style */}
            <a
              href="#how-it-works"
              onClick={onSecondaryClick}
              className={cn(
                'inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all',
                'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
                'w-full sm:w-auto'
              )}
            >
              See How It Works
            </a>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            className="text-sm text-gray-500 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            500+ AI-built apps shipped | 24-hour average turnaround | Pay only when it ships
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export { Hero };
export default Hero;
