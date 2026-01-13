'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  MessageSquare,
  Zap
} from 'lucide-react';

interface ToolCall {
  name: string;
  input: Record<string, unknown>;
  output: unknown;
  duration: number;
  status: 'success' | 'error' | 'warning';
}

interface TraceStep {
  id: string;
  type: 'llm' | 'tool' | 'decision' | 'retrieval';
  name: string;
  status: 'success' | 'error' | 'warning' | 'running';
  startTime: number;
  duration: number;
  tokens?: {
    input: number;
    output: number;
    cost: number;
  };
  toolCalls?: ToolCall[];
  metadata?: Record<string, unknown>;
}

const mockTraceData: TraceStep[] = [
  {
    id: '1',
    type: 'llm',
    name: 'Initial Planning',
    status: 'success',
    startTime: 0,
    duration: 1200,
    tokens: { input: 450, output: 180, cost: 0.0092 },
    metadata: {
      model: 'claude-sonnet-4-5',
      reasoning: 'User requested data analysis task'
    }
  },
  {
    id: '2',
    type: 'retrieval',
    name: 'Vector Search',
    status: 'success',
    startTime: 1200,
    duration: 340,
    metadata: {
      query: 'sales data Q4 2024',
      resultsFound: 12,
      relevanceScore: 0.87
    }
  },
  {
    id: '3',
    type: 'tool',
    name: 'Database Query',
    status: 'success',
    startTime: 1540,
    duration: 890,
    toolCalls: [
      {
        name: 'execute_sql',
        input: { query: 'SELECT * FROM sales WHERE quarter = "Q4"' },
        output: { rows: 1523, columns: 8 },
        duration: 890,
        status: 'success'
      }
    ]
  },
  {
    id: '4',
    type: 'llm',
    name: 'Analysis Generation',
    status: 'success',
    startTime: 2430,
    duration: 2100,
    tokens: { input: 2340, output: 520, cost: 0.0341 },
    metadata: {
      model: 'claude-sonnet-4-5',
      contextSize: 2340
    }
  },
  {
    id: '5',
    type: 'tool',
    name: 'Chart Generation',
    status: 'warning',
    startTime: 4530,
    duration: 450,
    toolCalls: [
      {
        name: 'create_visualization',
        input: { type: 'bar', data: '...' },
        output: { url: 'https://...' },
        duration: 450,
        status: 'warning'
      }
    ],
    metadata: {
      warning: 'Fallback renderer used'
    }
  },
  {
    id: '6',
    type: 'decision',
    name: 'Quality Check',
    status: 'success',
    startTime: 4980,
    duration: 180,
    metadata: {
      confidence: 0.94,
      checksPerformed: 5
    }
  }
];

const stepIcons = {
  llm: MessageSquare,
  tool: Zap,
  decision: Cpu,
  retrieval: Database
};

const statusIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  running: Clock
};

const statusColors = {
  success: 'text-green-600 bg-green-100 border-green-200',
  error: 'text-red-600 bg-red-100 border-red-200',
  warning: 'text-yellow-600 bg-yellow-100 border-yellow-200',
  running: 'text-cyan-600 bg-cyan-100 border-cyan-200'
};

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function formatTokens(tokens: { input: number; output: number; cost: number }): string {
  return `${tokens.input + tokens.output} tokens ($${tokens.cost.toFixed(4)})`;
}

interface TraceStepCardProps {
  step: TraceStep;
  index: number;
  totalSteps: number;
}

function TraceStepCard({ step, index, totalSteps }: TraceStepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const StatusIcon = statusIcons[step.status];
  const StepIcon = stepIcons[step.type];

  const maxDuration = mockTraceData.reduce((max, s) => Math.max(max, s.startTime + s.duration), 0);
  const widthPercent = (step.duration / maxDuration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < totalSteps - 1 && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 -z-10" />
      )}

      <div
        className={cn(
          "group relative p-4 rounded-xl border-2 transition-all duration-200",
          "bg-white shadow-sm",
          isExpanded ? "border-cyan-300 shadow-md" : "border-gray-200 hover:border-gray-300"
        )}
      >
        {/* Main Step Row */}
        <div
          className="flex items-start gap-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Status Icon */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2",
            statusColors[step.status]
          )}>
            <StatusIcon className="w-5 h-5" />
          </div>

          {/* Step Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <StepIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <h4 className="font-medium text-gray-900 truncate">{step.name}</h4>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2 py-0.5 text-xs font-mono bg-gray-100 text-gray-600 rounded border border-gray-200">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatDuration(step.duration)}
              </span>

              {step.tokens && (
                <span className="px-2 py-0.5 text-xs font-mono bg-cyan-50 text-cyan-600 rounded border border-cyan-200">
                  {formatTokens(step.tokens)}
                </span>
              )}

              <span className="px-2 py-0.5 text-xs capitalize bg-gray-50 text-gray-500 rounded border border-gray-200">
                {step.type}
              </span>
            </div>

            {/* Timeline Bar */}
            <div className="hidden md:block mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${widthPercent}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  step.status === 'success' && "bg-green-400",
                  step.status === 'warning' && "bg-yellow-400",
                  step.status === 'error' && "bg-red-400",
                  step.status === 'running' && "bg-cyan-400"
                )}
              />
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-16 mt-4 space-y-3 text-sm">
                {/* Tool Calls */}
                {step.toolCalls && step.toolCalls.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase">
                      Tool Calls
                    </h5>
                    {step.toolCalls.map((tool, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-cyan-600">{tool.name}</span>
                          <span className="text-xs text-gray-500">
                            {formatDuration(tool.duration)}
                          </span>
                        </div>
                        <pre className="text-xs text-gray-600 overflow-x-auto">
                          {JSON.stringify(tool.input, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {/* Metadata */}
                {step.metadata && Object.keys(step.metadata).length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase">
                      Metadata
                    </h5>
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      {Object.entries(step.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1">
                          <span className="text-xs text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-xs font-mono text-gray-700">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function TraceViz() {
  const totalDuration = mockTraceData.reduce((sum, step) => sum + step.duration, 0);
  const totalTokens = mockTraceData.reduce(
    (sum, step) => sum + (step.tokens ? step.tokens.input + step.tokens.output : 0),
    0
  );
  const totalCost = mockTraceData.reduce(
    (sum, step) => sum + (step.tokens?.cost || 0),
    0
  );

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Agent Execution Trace
          </h2>
          <p className="text-gray-600">
            Complete visibility into every step, decision, and tool call
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="p-6 mb-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Total Time
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatDuration(totalDuration)}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Steps
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {mockTraceData.length}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Tokens
                </div>
                <div className="text-2xl font-bold text-cyan-500">
                  {totalTokens.toLocaleString()}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Cost
                </div>
                <div className="text-2xl font-bold text-green-500">
                  ${totalCost.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trace Steps */}
        <div className="space-y-4">
          {mockTraceData.map((step, index) => (
            <TraceStepCard
              key={step.id}
              step={step}
              index={index}
              totalSteps={mockTraceData.length}
            />
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-center text-gray-500"
        >
          Click any step to view detailed execution information
        </motion.p>
      </div>
    </section>
  );
}

export default TraceViz;
