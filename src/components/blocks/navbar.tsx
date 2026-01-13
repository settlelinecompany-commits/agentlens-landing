'use client';

import { useState, useEffect } from 'react';
import { Workflow, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group z-50">
            <Workflow className="h-6 w-6 text-cyan-500 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-gray-900">AgentLens</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Desktop CTA Button */}
          <a
            href="#get-started"
            className={cn(
              'hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-all',
              'bg-cyan-500 text-white hover:bg-cyan-600',
              'hover:shadow-lg hover:shadow-cyan-500/25'
            )}
          >
            Get Started Free
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-16 bg-white z-40 transition-all duration-300 ease-in-out',
          isMobileMenuOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        )}
      >
        <div className="flex flex-col px-4 py-6 space-y-4">
          <a
            href="#features"
            onClick={handleLinkClick}
            className="text-base font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={handleLinkClick}
            className="text-base font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            onClick={handleLinkClick}
            className="text-base font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#get-started"
            onClick={handleLinkClick}
            className={cn(
              'inline-flex items-center justify-center px-4 py-3 text-base font-semibold rounded-lg transition-all mt-4',
              'bg-cyan-500 text-white hover:bg-cyan-600',
              'hover:shadow-lg hover:shadow-cyan-500/25'
            )}
          >
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
export default Navbar;
