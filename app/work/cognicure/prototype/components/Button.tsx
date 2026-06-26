// app/work/cognicure/prototype/components/Button.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, SHADOW, TYPE, MOTION } from "../tokens";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "fab";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({ label, onPress, variant = "primary", disabled = false, fullWidth = false, icon }: ButtonProps) {
  if (variant === "fab") {
    return (
      <motion.button
        onClick={onPress}
        whileTap={{ scale: 0.92 }}
        transition={MOTION.spring}
        style={{
          width: 56, height: 56, borderRadius: RADIUS.full,
          background: C.teal, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: SHADOW.fab, color: "#fff",
        }}
      >
        {icon ?? <span style={{ fontSize: 28, lineHeight: 1, fontWeight: 300 }}>+</span>}
      </motion.button>
    );
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: C.teal, color: "#fff", border: "none",
      boxShadow: "0 4px 14px rgba(61,155,143,0.35)",
    },
    secondary: {
      background: "transparent", color: C.teal,
      border: `1.5px solid ${C.teal}`,
    },
    ghost: {
      background: "transparent", color: C.muted,
      border: "none",
    },
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onPress}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={MOTION.spring}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "16px 28px",
        borderRadius: RADIUS.xxl,
        fontSize: TYPE.body,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontFamily: "inherit",
        ...styles[variant],
      }}
    >
      {icon}{label}
    </motion.button>
  );
}
