'use client';

import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Shield,
  Server,
  TestTube,
  FileCheck,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

const phaseVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

interface TimelinePhase {
  id: string;
  hours: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelinePhases: TimelinePhase[] = [
  {
    id: '1',
    hours: '0-2',
    title: 'Assessment',
    description:
      'You share your repo. We audit for deployment blockers, security gaps, and production requirements. You get a detailed scope and fixed quote.',
    icon: <ClipboardCheck className="w-6 h-6" />,
  },
  {
    id: '2',
    hours: '2-8',
    title: 'Hardening',
    description:
      'We add what AI left out: error handling, input validation, environment configuration, security patches, and production logging.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: '3',
    hours: '8-16',
    title: 'Infrastructure',
    description:
      'We set up your production environment: hosting, database, CDN, SSL, monitoring, and CI/CD. Everything configured correctly the first time.',
    icon: <Server className="w-6 h-6" />,
  },
  {
    id: '4',
    hours: '16-22',
    title: 'Testing & Deploy',
    description:
      'We test edge cases, verify integrations, run security checks, and deploy. Your app goes live with proper monitoring and alerting.',
    icon: <TestTube className="w-6 h-6" />,
  },
  {
    id: '5',
    hours: '22-24',
    title: 'Handoff',
    description:
      'You get full documentation, access credentials, monitoring dashboards, and a 30-minute walkthrough. You\'re in control.',
    icon: <FileCheck className="w-6 h-6" />,
  },
];

interface TimelinePhaseCardProps {
  phase: TimelinePhase;
  index: number;
  isLast: boolean;
}

function TimelinePhaseCard({ phase, index, isLast }: TimelinePhaseCardProps) {
  return (
    <motion.div
      variants={phaseVariants}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        {/* Hour marker */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.4, type: 'spring' }}
          className="relative z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30"
        >
          {phase.icon}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
            style={{ transformOrigin: 'top' }}
            className="w-0.5 flex-1 min-h-[80px] bg-gradient-to-b from-cyan-400 to-cyan-200"
          />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.1, duration: 0.5 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative">
            {/* Hour badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                Hour {phase.hours}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              {phase.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {phase.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface DashboardPreviewProps {
  className?: string;
  onCtaClick?: () => void;
}

export function DashboardPreview({ className, onCtaClick }: DashboardPreviewProps) {
  return (
    <section
      id="how-it-works"
      className={cn(
        'relative py-24 px-4 sm:px-6 lg:px-8',
        'bg-gradient-to-b from-gray-50 via-white to-gray-50',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The 24-Hour Sprint
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;ve shipped 500+ vibe-coded apps. We&apos;ve turned the chaos into a system.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          {timelinePhases.map((phase, index) => (
            <TimelinePhaseCard
              key={phase.id}
              phase={phase}
              index={index}
              isLast={index === timelinePhases.length - 1}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={onCtaClick}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all',
              'bg-cyan-500 text-white hover:bg-cyan-600',
              'hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]'
            )}
          >
            Start Your Sprint
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Most projects launch in under 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardPreview;
