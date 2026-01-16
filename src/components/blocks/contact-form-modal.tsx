'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buildTools = [
  { value: 'claude', label: 'Claude Code' },
  { value: 'cursor', label: 'Cursor' },
  { value: 'replit', label: 'Replit Agent' },
  { value: 'copilot', label: 'GitHub Copilot' },
  { value: 'v0', label: 'v0 by Vercel' },
  { value: 'other', label: 'Other' },
];

const blockers = [
  { value: 'deployment', label: 'Deployment issues' },
  { value: 'auth', label: 'Authentication / Security' },
  { value: 'errors', label: 'Error handling' },
  { value: 'database', label: 'Database / Infra' },
  { value: 'scaling', label: 'Performance / Scaling' },
  { value: 'other', label: 'Other / Not sure' },
];

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    tool: '',
    blocker: '',
    email: '',
  });

  const handleToolSelect = (tool: string) => {
    setFormData((prev) => ({ ...prev, tool }));
    setStep(2);
  };

  const handleBlockerSelect = (blocker: string) => {
    setFormData((prev) => ({ ...prev, blocker }));
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get human-readable labels for the selected values
      const toolLabel = buildTools.find(t => t.value === formData.tool)?.label || formData.tool;
      const blockerLabel = blockers.find(b => b.value === formData.blocker)?.label || formData.blocker;

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b88e3f3a-713b-4142-a06d-342e95038913',
          subject: `New AgentLens Lead: ${formData.email}`,
          from_name: 'AgentLens Website',
          email: formData.email,
          tool_used: toolLabel,
          main_blocker: blockerLabel,
          message: `New lead from AgentLens landing page:\n\nEmail: ${formData.email}\nTool Used: ${toolLabel}\nMain Blocker: ${blockerLabel}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        // Reset and close after showing success
        setTimeout(() => {
          setIsSubmitted(false);
          setStep(1);
          setFormData({ tool: '', blocker: '', email: '' });
          onClose();
        }, 2000);
      } else {
        console.error('Form submission failed:', result);
        alert('Something went wrong. Please try again or email us at support@agentlens.app');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again or email us at support@agentlens.app');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ tool: '', blocker: '', email: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 pt-10 sm:p-8 sm:pt-12">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        We'll be in touch!
                      </h3>
                      <p className="text-gray-600">
                        Expect a response within 2 hours during business hours.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Step 1: Tool Selection */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                            What did you build with?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Select the tool you used to build your app
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {buildTools.map((tool) => (
                              <button
                                key={tool.value}
                                onClick={() => handleToolSelect(tool.value)}
                                className={cn(
                                  'p-4 rounded-xl border-2 text-left transition-all',
                                  'hover:border-cyan-400 hover:bg-cyan-50',
                                  formData.tool === tool.value
                                    ? 'border-cyan-500 bg-cyan-50'
                                    : 'border-gray-200'
                                )}
                              >
                                <span className="font-medium text-gray-900">
                                  {tool.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Blocker Selection */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                            What's blocking you?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Select your biggest challenge right now
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {blockers.map((blocker) => (
                              <button
                                key={blocker.value}
                                onClick={() => handleBlockerSelect(blocker.value)}
                                className={cn(
                                  'p-4 rounded-xl border-2 text-left transition-all',
                                  'hover:border-cyan-400 hover:bg-cyan-50',
                                  formData.blocker === blocker.value
                                    ? 'border-cyan-500 bg-cyan-50'
                                    : 'border-gray-200'
                                )}
                              >
                                <span className="font-medium text-gray-900">
                                  {blocker.label}
                                </span>
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => setStep(1)}
                            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                          >
                            Back
                          </button>
                        </motion.div>
                      )}

                      {/* Step 3: Email */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                            Where should we reach you?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            We'll send you a free shippability assessment
                          </p>
                          <form onSubmit={handleSubmit}>
                            <input
                              type="email"
                              required
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-400 focus:outline-none transition-colors text-gray-900 placeholder:text-gray-400"
                            />
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={cn(
                                'w-full mt-4 py-3 px-6 rounded-xl font-semibold text-white transition-all',
                                'bg-cyan-500 hover:bg-cyan-600',
                                'disabled:opacity-50 disabled:cursor-not-allowed',
                                'flex items-center justify-center gap-2'
                              )}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5" />
                                  Get My Free Assessment
                                </>
                              )}
                            </button>
                          </form>
                          <button
                            onClick={() => setStep(2)}
                            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                          >
                            Back
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ContactFormModal;
