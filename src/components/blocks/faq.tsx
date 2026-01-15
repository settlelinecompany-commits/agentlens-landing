'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What if my app is too complex for 24 hours?',
    answer: `We'll tell you upfront. During the initial assessment, we scope the work and give you an honest timeline. Some apps need 48-72 hours. Complex enterprise projects need a different engagement model. We'll never promise 24 hours if we can't deliver.`,
  },
  {
    question: 'What AI tools do you work with?',
    answer: `All of them. Claude Code, Cursor, Copilot, Replit, v0, Bolt, Lovable... if AI generated the code, we can ship it. Our process is tool-agnostic.`,
  },
  {
    question: 'Do I keep the code?',
    answer: `100%. You own everything. The original code, our improvements, the infrastructure configs, all documentation. Full IP transfer, no strings attached.`,
  },
  {
    question: 'What if something breaks after launch?',
    answer: `Every sprint includes a 30-day support window. If something we deployed breaks, we fix it at no extra cost. After 30 days, you can extend support or handle maintenance yourself with our documentation.`,
  },
  {
    question: 'Can you add new features too?',
    answer: `Our sprint focuses on shipping what you've built. But many clients come back for feature sprints after launch. We can scope ongoing development separately.`,
  },
  {
    question: "What's your tech stack?",
    answer: `We're stack-flexible. Most vibe-coded apps are JavaScript/TypeScript (Next.js, React, Node), Python (FastAPI, Django), or serverless. We deploy to Vercel, AWS, Railway, Render... whatever fits your app and budget.`,
  },
  {
    question: "How do I know you won't steal my idea?",
    answer: `We sign NDAs for every engagement. We have no interest in your business model, only in shipping your code. We've shipped 500+ apps across every industry. Your idea is safe.`,
  },
  {
    question: 'What do you need from me?',
    answer: `Access to your repo (GitHub/GitLab), a 15-minute kickoff call, and availability for async questions during the sprint. That's it. Most founders spend less than an hour total.`,
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
          'w-full py-4 sm:py-6 flex items-center justify-between text-left min-h-[48px]',
          'group transition-colors duration-200'
        )}
        aria-expanded={isOpen}
      >
        <span className={cn(
          'text-base sm:text-lg font-medium transition-colors duration-200 pr-2',
          isOpen ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
        )}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex-shrink-0 ml-2 sm:ml-4 w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center',
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
            <p className="pb-4 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed pr-2 sm:pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQProps {
  onCtaClick?: () => void;
}

export function FAQ({ onCtaClick }: FAQProps) {
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
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the 24-Hour Sprint
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200 border-t border-gray-200 bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
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
          className="mt-10 sm:mt-12 text-center"
        >
          <p className="text-gray-500 mb-4">
            Still have questions?
          </p>
          <button
            onClick={onCtaClick}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-3 sm:px-4 sm:py-2 rounded-lg',
              'text-sm font-medium text-cyan-600',
              'border-2 border-cyan-200 hover:bg-cyan-50',
              'transition-colors duration-200',
              'min-h-[44px]'
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Get in touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
