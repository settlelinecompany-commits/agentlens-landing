"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  initialOpacity?: number;
  translateY?: number;
  once?: boolean;
}

export function MotionSection({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  initialOpacity = 0,
  translateY = 30,
  once = true,
}: MotionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: {
      opacity: initialOpacity,
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: initialOpacity,
      y: translateY,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export { type MotionSectionProps };
