// app/work/cognicure/prototype/components/Card.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, SHADOW, MOTION } from "../tokens";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onPress?: () => void;
  padding?: number;
}

export function Card({ children, style, onPress, padding = 16 }: CardProps) {
  const base: React.CSSProperties = {
    background: C.surface,
    borderRadius: RADIUS.lg,
    boxShadow: SHADOW.card,
    padding,
    ...style,
  };

  if (onPress) {
    return (
      <motion.div
        onClick={onPress}
        whileTap={{ scale: 0.98 }}
        transition={MOTION.spring}
        style={{ ...base, cursor: "pointer" }}
      >
        {children}
      </motion.div>
    );
  }

  return <div style={base}>{children}</div>;
}
