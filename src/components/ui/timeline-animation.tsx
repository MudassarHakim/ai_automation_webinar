"use client";
import { motion, useInView, Variants } from "framer-motion";
import React from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants: Variants;
  as?: any;
  className?: string;
}

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  customVariants,
  as = "div",
  className,
}: TimelineContentProps) => {
  const Component = (motion as any)[as] || motion.div;
  const isInView = useInView(timelineRef, { once: false, amount: 0.1 });

  return (
    <Component
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      className={className}
    >
      {children}
    </Component>
  );
};
