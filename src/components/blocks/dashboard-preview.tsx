'use client';

import { motion } from 'framer-motion';
import {
  Check,
  X,
  Clock,
  Zap,
  AlertCircle,
  ChevronRight,
  Brain,
  Database,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface TraceStep {
  id: string;
  name: string;
  status: 'success' | 'error' | 'pending';
  duration?: string;
  icon: React.ReactNode;
}

interface ContextValue {
  key: string;
  value: string;
  source: string;
}

interface DashboardPreviewProps {
  className?: string;
}

const traceSteps: TraceStep[] = [
  {
    id: '1',
    name: 'Parse intent',
    status: 'success',
    duration: '45ms',
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: '2',
    name: 'Query database',
    status: 'success',
    duration: '120ms',
    icon: <Database className="w-4 h-4" />,
  },
  {
    id: '3',
    name: 'Generate response',
    status: 'error',
    duration: '175ms',
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

const contextValues: ContextValue[] = [
  {
    key: 'user_tier',
    value: 'premium',
    source: 'user_profile',
  },
  {
    key: 'query_type',
    value: 'product_search',
    source: 'intent_parser',
  },
  {
    key: 'result_count',
    value: '0',
    source: 'database',
  },
];

function TraceVisualizationCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:border-cyan-300 transition-all duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">
              Customer Support Agent
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Execution Failed
              </span>
              <span className="text-gray-300">|</span>
              <span className="font-mono text-xs">trace_id: a7f8c2</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="px-2 py-1 text-xs font-mono bg-cyan-50 text-cyan-600 border border-cyan-200 rounded-md">
              2,847 tokens
            </span>
            <span className="px-2 py-1 text-xs font-mono bg-gray-100 text-gray-600 border border-gray-200 rounded-md">
              340ms
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {traceSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              className={cn(
                'group relative flex items-center gap-3 p-3 rounded-lg transition-all',
                'hover:bg-gray-50',
                step.status === 'error' && 'bg-red-50 border border-red-200'
              )}
            >
              {/* Status indicator */}
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full',
                  step.status === 'success' && 'bg-green-100 text-green-600',
                  step.status === 'error' && 'bg-red-100 text-red-600',
                  step.status === 'pending' && 'bg-gray-100 text-gray-400'
                )}
              >
                {step.status === 'success' && <Check className="w-4 h-4" />}
                {step.status === 'error' && <X className="w-4 h-4" />}
                {step.status === 'pending' && <Clock className="w-4 h-4" />}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">{step.icon}</span>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      step.status === 'error' ? 'text-red-700' : 'text-gray-900'
                    )}
                  >
                    {step.name}
                  </span>
                </div>

                {step.status === 'error' && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>Empty result set - no fallback response configured</span>
                  </div>
                )}
              </div>

              {/* Duration badge */}
              {step.duration && (
                <span
                  className={cn(
                    "px-2 py-1 text-xs font-mono rounded border",
                    step.status === 'error'
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  )}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {step.duration}
                </span>
              )}

              <ChevronRight
                className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors"
              />
            </motion.div>
          ))}
        </div>

        {/* Performance summary footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-200 text-xs text-gray-500"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            <span>Total: 340ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono">Input: 847 tok</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono">Output: 2,000 tok</span>
          </div>
          <div className="ml-auto text-red-600 font-medium">
            Cost: $0.024
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DecisionTreeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg hover:border-cyan-300 transition-all duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">
              Decision Context
            </h3>
            <p className="text-sm text-gray-500">
              Why the agent chose this path
            </p>
          </div>

          <span className="px-2 py-1 text-xs font-medium bg-cyan-50 text-cyan-600 border border-cyan-200 rounded-md">
            Step 3
          </span>
        </div>

        {/* Reasoning chain */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2 mb-6"
        >
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-500" />
            Reasoning Chain
          </h4>
          <div className="space-y-2 pl-6 border-l-2 border-cyan-200">
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">
                <span className="text-gray-800 font-medium">1.</span> Detected empty database results
              </p>
              <p className="mb-2">
                <span className="text-gray-800 font-medium">2.</span> Checked for fallback template
              </p>
              <p className="text-red-600 font-medium">
                <span className="text-gray-800">3.</span> No fallback configured → Error
              </p>
            </div>
          </div>
        </motion.div>

        {/* Context values used */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-500" />
            Context Values Used
          </h4>
          <div className="space-y-2">
            {contextValues.map((ctx, index) => (
              <motion.div
                key={ctx.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:border-cyan-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <code className="text-xs font-mono text-cyan-600 px-2 py-0.5 bg-cyan-50 rounded">
                    {ctx.key}
                  </code>
                  <span className="text-sm text-gray-700 font-medium">
                    {ctx.value}
                  </span>
                </div>
                <span className="px-2 py-0.5 text-xs text-gray-500 bg-gray-100 rounded border border-gray-200">
                  {ctx.source}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Confidence score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-4 mt-4 border-t border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Decision Confidence
            </span>
            <span className="text-sm font-mono text-red-600 font-bold">
              0%
            </span>
          </div>
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Low confidence due to missing fallback configuration
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function DashboardPreview({ className }: DashboardPreviewProps) {
  return (
    <section
      className={cn(
        'relative py-24 px-4 sm:px-6 lg:px-8',
        'bg-gradient-to-b from-gray-50 via-white to-gray-50',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See Inside Your Agent's Mind
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visual trace debugging that actually helps you fix issues
          </p>
        </motion.div>

        {/* Dashboard cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid lg:grid-cols-2 gap-6"
        >
          <motion.div variants={cardVariants}>
            <TraceVisualizationCard />
          </motion.div>

          <motion.div variants={cardVariants}>
            <DecisionTreeCard />
          </motion.div>
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            This is just a preview. The real dashboard is{' '}
            <span className="text-cyan-600 font-semibold">way more powerful</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardPreview;
