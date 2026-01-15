'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  XCircle,
  Lock,
  Key,
  Bug,
  Server,
  CheckCircle,
  Shield,
  Activity,
  GitBranch,
  FileCheck,
  Zap,
  ArrowRight,
  Clock,
  Rocket,
} from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

interface IssueItem {
  icon: React.ReactNode;
  label: string;
  status: 'error' | 'warning';
}

interface FixItem {
  icon: React.ReactNode;
  label: string;
  status: 'complete' | 'added';
}

const beforeIssues: IssueItem[] = [
  { icon: <Lock className="w-4 h-4" />, label: 'Auth: Password only', status: 'warning' },
  { icon: <XCircle className="w-4 h-4" />, label: 'Error handling: None', status: 'error' },
  { icon: <Key className="w-4 h-4" />, label: 'Secrets: Hardcoded', status: 'error' },
  { icon: <Bug className="w-4 h-4" />, label: 'Tests: 0% coverage', status: 'error' },
  { icon: <Server className="w-4 h-4" />, label: 'Deployment: Manual', status: 'warning' },
];

const afterFixes: FixItem[] = [
  { icon: <Shield className="w-4 h-4" />, label: 'OAuth + 2FA + Rate limiting', status: 'complete' },
  { icon: <AlertTriangle className="w-4 h-4" />, label: 'Graceful error recovery', status: 'complete' },
  { icon: <Lock className="w-4 h-4" />, label: 'Secrets in vault', status: 'complete' },
  { icon: <Activity className="w-4 h-4" />, label: 'Monitoring + Alerts', status: 'added' },
  { icon: <GitBranch className="w-4 h-4" />, label: 'CI/CD pipeline', status: 'added' },
  { icon: <FileCheck className="w-4 h-4" />, label: 'Critical path tests', status: 'added' },
];

function BeforeCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-1 min-w-[280px]"
    >
      <div className={cn(
        'relative h-full p-5 sm:p-6 rounded-2xl',
        'bg-white border-2 border-red-200',
        'shadow-sm'
      )}>
        {/* Red accent bar */}
        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-b-full" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 mt-2">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Vibe-Coded App</h3>
            <p className="text-xs text-gray-500">Your AI-generated MVP</p>
          </div>
        </div>

        {/* Fake code preview bar */}
        <div className="mb-4 p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500 ml-2 font-mono">app.js</span>
          </div>
          <div className="space-y-1 font-mono text-[10px]">
            <div className="text-gray-500">// TODO: add proper auth</div>
            <div className="text-red-400">const API_KEY = "sk-live-..."</div>
            <div className="text-gray-500">// hope this works lol</div>
          </div>
        </div>

        {/* Issues list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {beforeIssues.map((issue, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                issue.status === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-100'
                  : 'bg-amber-50 text-amber-700 border border-amber-100'
              )}
            >
              <span className={issue.status === 'error' ? 'text-red-500' : 'text-amber-500'}>
                {issue.icon}
              </span>
              <span className="font-medium">{issue.label}</span>
              <XCircle className={cn(
                'w-4 h-4 ml-auto',
                issue.status === 'error' ? 'text-red-400' : 'text-amber-400'
              )} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom metric */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Status</span>
            <span className="text-sm font-semibold text-red-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Works on localhost
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TransformationArrow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
      className="flex items-center justify-center py-4 lg:py-0 lg:px-4"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-1 text-cyan-600 font-semibold text-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>24 hrs</span>
        </div>
        <ArrowRight className="w-5 h-5 text-cyan-500 hidden lg:block rotate-0" />
        <ArrowRight className="w-5 h-5 text-cyan-500 lg:hidden rotate-90" />
      </div>
    </motion.div>
  );
}

function AfterCard() {
  return (
    <motion.div
      variants={cardVariants}
      className="relative flex-1 min-w-[280px]"
    >
      <div className={cn(
        'relative h-full p-5 sm:p-6 rounded-2xl',
        'bg-white border-2 border-green-200',
        'shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300'
      )}>
        {/* Green accent bar */}
        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-b-full" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 mt-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Production-Ready</h3>
            <p className="text-xs text-gray-500">After AgentLens Sprint</p>
          </div>
        </div>

        {/* Fake terminal output */}
        <div className="mb-4 p-3 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500 ml-2 font-mono">deploy.sh</span>
          </div>
          <div className="space-y-1 font-mono text-[10px]">
            <div className="text-green-400">$ npm run deploy</div>
            <div className="text-cyan-400">Building... Done</div>
            <div className="text-green-400">Deployed to production</div>
          </div>
        </div>

        {/* Fixes list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2"
        >
          {afterFixes.map((fix, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                'bg-green-50 text-green-700 border border-green-100'
              )}
            >
              <span className="text-green-500">{fix.icon}</span>
              <span className="font-medium">{fix.label}</span>
              <CheckCircle className="w-4 h-4 ml-auto text-green-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom metric */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Status</span>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Live in production
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TransformationCards() {
  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/80 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-green-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The Transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From "it works on my machine" to "it's live and monitored" in 24 hours.
          </p>
        </motion.div>

        {/* Cards container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-0"
        >
          <BeforeCard />
          <TransformationArrow />
          <AfterCard />
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">500+</div>
            <div className="text-xs sm:text-sm text-gray-500">Apps shipped</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600">24h</div>
            <div className="text-xs sm:text-sm text-gray-500">Avg. turnaround</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">98%</div>
            <div className="text-xs sm:text-sm text-gray-500">First-time success</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TransformationCards;
