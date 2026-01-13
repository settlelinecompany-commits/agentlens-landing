'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How is this different from LangSmith?',
    answer: `AgentLens is designed specifically for observability, not evaluation. While LangSmith focuses on prompt testing and evaluation workflows, AgentLens gives you deep visibility into production traces with real-time cost tracking and decision attribution. We integrate with any OpenTelemetry-compatible agent, not just LangChain. Think of it as Datadog for AI agents - focused on understanding what's happening in production.`,
  },
  {
    question: 'What trace formats do you support?',
    answer: `We support OpenTelemetry (OTLP) natively, which means any OTel-instrumented application works out of the box. We also have first-class integrations for LangChain, LlamaIndex, CrewAI, and AutoGen. For custom agents, our SDK supports Python and TypeScript with a simple decorator/wrapper pattern. If you're using something else, reach out - we're adding new integrations regularly.`,
  },
  {
    question: 'Is there a free tier?',
    answer: `Yes! Our free tier includes 50,000 traces per month with 30-day retention and up to 3 team members. This is enough for most development and small production workloads. There's no credit card required to get started, and you can upgrade anytime as your needs grow.`,
  },
  {
    question: 'Can I self-host?',
    answer: `Enterprise customers can deploy AgentLens on-premise or in their own cloud environment. This includes full data sovereignty, custom retention policies, and integration with your existing observability stack. Self-hosted deployments include dedicated support and SLA guarantees. Contact our sales team for details.`,
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
  index
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'border-b border-gray-200',
        'transition-colors duration-200',
        isOpen && 'border-cyan-200'
      )}
    >
      <button
        onClick={onClick}
        className={cn(
          'w-full py-6 flex items-center justify-between text-left',
          'group transition-colors duration-200'
        )}
        aria-expanded={isOpen}
      >
        <span className={cn(
          'text-lg font-medium transition-colors duration-200',
          isOpen ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
        )}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex-shrink-0 ml-4',
            isOpen ? 'text-cyan-500' : 'text-gray-400'
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed pr-4 sm:pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about AgentLens
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200 border-t border-gray-200 bg-white rounded-2xl shadow-sm p-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
              'text-sm font-medium text-cyan-600',
              'border-2 border-cyan-200 hover:bg-cyan-50',
              'transition-colors duration-200'
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
