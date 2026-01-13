"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, Children, isValidElement } from "react";

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerSpeed?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

export function FadeInStagger({
  children,
  className = "",
  delay = 0,
  staggerSpeed = 0.08,
  direction = "up",
  distance = 16,
  once = true,
}: FadeInStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const getOffset = () => {
    switch (direction) {
      case "up": return { x: 0, y: distance };
      case "down": return { x: 0, y: -distance };
      case "left": return { x: distance, y: 0 };
      case "right": return { x: -distance, y: 0 };
      default: return { x: 0, y: distance };
    }
  };

  const offset = getOffset();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerSpeed,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
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
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return (
            <motion.div variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}
