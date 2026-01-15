'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lock, AlertCircle, Activity, Shield, CheckCircle, FileText } from 'lucide-react';

const features = [
  {
    title: 'Production Authentication',
    description: 'Real auth flows with proper session handling, password reset, OAuth integration, and rate limiting. Not just a password field.',
    icon: Lock,
    color: 'cyan',
  },
  {
    title: 'Error Handling',
    description: "Graceful degradation, user-friendly error messages, automatic retry logic, and proper logging. Your app recovers instead of crashing.",
    icon: AlertCircle,
    color: 'amber',
  },
  {
    title: 'Monitoring & Alerting',
    description: "Know what's happening in production. Performance metrics, error tracking, uptime monitoring, and alerts before users complain.",
    icon: Activity,
    color: 'blue',
  },
  {
    title: 'Security Hardening',
    description: 'Input sanitization, SQL injection prevention, XSS protection, secure headers, and proper secrets management. Sleep at night.',
    icon: Shield,
    color: 'green',
  },
  {
    title: 'Test Coverage',
    description: "Critical path tests that let you change code with confidence. Integration tests for your key flows. No more 'fix one thing, break three.'",
    icon: CheckCircle,
    color: 'purple',
  },
  {
    title: 'Documentation',
    description: 'Architecture overview, deployment guide, environment setup, and maintenance runbook. Future you (or your first hire) will thank you.',
    icon: FileText,
    color: 'rose',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    case 'amber':
      return {
        icon: 'text-amber-500',
        iconBg: 'bg-amber-100',
        border: 'hover:border-amber-300',
        shadow: 'hover:shadow-amber-100',
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
    case 'purple':
      return {
        icon: 'text-purple-500',
        iconBg: 'bg-purple-100',
        border: 'hover:border-purple-300',
        shadow: 'hover:shadow-purple-100',
      };
    case 'rose':
      return {
        icon: 'text-rose-500',
        iconBg: 'bg-rose-100',
        border: 'hover:border-rose-300',
        shadow: 'hover:shadow-rose-100',
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
            We Add What AI Leaves Out
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI is great at features. We're great at everything else.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={cn(
                  'group relative p-6 rounded-2xl',
                  'bg-white border-2 border-gray-200 shadow-sm',
                  colors.border,
                  'hover:shadow-lg',
                  'transition-all duration-300'
                )}
              >
                {/* Icon with background */}
                <div className="relative mb-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    colors.iconBg,
                    'border border-white shadow-sm'
                  )}>
                    <IconComponent className={cn('w-6 h-6', colors.icon)} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
