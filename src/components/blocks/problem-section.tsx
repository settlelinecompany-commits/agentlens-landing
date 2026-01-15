'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Cloud, Clock, AlertTriangle, Code, Shield, DollarSign } from 'lucide-react';

const painPoints = [
  {
    icon: Cloud,
    title: 'The Deployment Abyss',
    quote: "It works on my machine. Then I deploy it and... nothing.",
    description:
      "Your app runs perfectly in local dev. But production? CORS errors, environment variables, SSL certificates, database connections... deployment has 47 ways to fail and AI didn't warn you about any of them.",
  },
  {
    icon: Clock,
    title: 'The Time Trap',
    quote: "Claude Code built it in 20 minutes. I've spent 3 weeks trying to ship it.",
    description:
      "The AI made building feel easy. But shipping? You're drowning in DevOps tutorials, Stack Overflow tabs, and Discord threads. The gap between 'it works' and 'it's live' is eating your runway.",
  },
  {
    icon: AlertTriangle,
    title: 'The Quality Cliff',
    quote: 'No error handling. First edge case = crash.',
    description:
      'AI-generated code handles the happy path beautifully. Then a user does something unexpected and the whole thing falls over. No error handling. No input validation. No graceful degradation.',
  },
  {
    icon: Code,
    title: 'The Maintenance Nightmare',
    quote: 'AI duplicates code everywhere. Nobody can maintain it.',
    description:
      "Your codebase is a maze of duplicated functions, inconsistent patterns, and 47 npm packages you don't recognize. Every fix breaks two other things. You're afraid to touch it.",
  },
  {
    icon: Shield,
    title: 'The Security Question',
    quote: 'Wait, is my API key just... exposed?',
    description:
      "You built fast. Maybe too fast. Now you're not sure what's secure and what isn't. Auth is 'good enough.' Data handling is 'probably fine.' You're one security audit away from panic.",
  },
  {
    icon: DollarSign,
    title: 'The Cost Spiral',
    quote: 'Web search API bill hit $3K in two weeks. More than we were spending on GPT-5.',
    description:
      "Your agent makes 30-40 API calls per task. At $6-8 per thousand calls, costs spiral fast. Claude Opus 4.5 costs 3x what you budgeted. You have no idea which part of your code is burning tokens.",
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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Sound Familiar?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You're not alone. Every vibe-coder hits the same wall.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {painPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  'group relative p-4 sm:p-6 rounded-xl',
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
                  <p className="text-red-600/80 text-sm font-medium italic mb-3">
                    "{point.quote}"
                  </p>
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
          <p className="text-gray-500 text-sm italic">
            There has to be a better way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;
