"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useInView,
  useSpring,
  AnimatePresence,
  type Variants,
  type MotionValue,
} from "framer-motion";
import {
  Users,
  Layers,
  FileText,
  Shield,
  Wrench,
  ClipboardList,
  Check,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { DashboardScreen } from "./prototype/screens/dashboard";
import { AssemblyScreen } from "./prototype/screens/assembly";

/* ─────────────────────────────────────────────────────────────────────────────
   Portfolio palette
───────────────────────────────────────────────────────────────────────────── */
export const C = {
  ink: "#0e0e0e",
  muted: "#6b6b6b",
  subtle: "#a8a8a8",
  surface: "#f9f8f6",
  s2: "#f1eeea",
  s3: "#e8e3dc",
  accent: "#c8a96e",
  accentLight: "#f0e6d3",
  white: "#ffffff",
  appRed: "#CC2929",
} as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Shared browser‑frame wrapper
───────────────────────────────────────────────────────────────────────────── */
interface AppFrameProps {
  children: React.ReactNode;
  url?: string;
  dark?: boolean;
}

export function AppFrame({ children, url = "hexsolve.internal/", dark = false }: AppFrameProps) {
  const bg = dark ? "#1c1c1e" : C.s3;
  const barBg = dark ? "#2c2c2e" : C.s2;
  const textCol = dark ? C.subtle : C.muted;

  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: bg,
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: 36,
          background: barBg,
          display: "flex",
          alignItems: "center",
          paddingLeft: 14,
          paddingRight: 14,
          gap: 8,
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57", "#FFBD2E", "#28CA41"].map((col) => (
            <div key={col} style={{ width: 12, height: 12, borderRadius: "50%", background: col }} />
          ))}
        </div>
        {/* URL pill */}
        <div
          style={{
            flex: 1,
            marginLeft: 8,
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
            borderRadius: 6,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 10, color: textCol, letterSpacing: "0.01em" }}>{url}</span>
        </div>
      </div>
      {/* Screen content */}
      <div style={{ width: "100%", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A1 · Hero
───────────────────────────────────────────────────────────────────────────── */
interface HeroProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function SectionA_Hero({ mouseX, mouseY }: HeroProps) {
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const floatVariants: Variants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const floatVariantsSlow: Variants = {
    float: {
      y: [0, -7, 0],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
    },
  };

  const textReveal: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
    }),
  };

  return (
    <section
      style={{ background: C.ink, minHeight: "100vh", position: "relative", overflow: "hidden" }}
      className="flex flex-col"
    >
      {/* Subtle background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div className="flex flex-1 items-center px-12 py-24 max-w-7xl mx-auto w-full gap-16">
        {/* ── Left: text ── */}
        <div className="flex flex-col flex-1 max-w-lg">
          <motion.div
            custom={0}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.accent,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Case Study — HexSolve
          </motion.div>

          <motion.h1
            custom={1}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: "clamp(2.6rem, 4vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: C.white,
              marginBottom: 28,
            }}
          >
            Designing Precision
            <br />
            Manufacturing
            <br />
            <span style={{ color: C.accent }}>Workflows</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textReveal}
            initial="hidden"
            animate="visible"
            style={{ fontSize: 18, lineHeight: 1.65, color: C.subtle, maxWidth: 400 }}
          >
            HexSolve is an enterprise platform for custom rotary engine manufacturers — turning complex per-order instruction documents into a structured, collaborative digital workflow.
          </motion.p>
        </div>

        {/* ── Right: layered screen composition ── */}
        <div style={{ flex: 1, position: "relative", minHeight: 520 }}>
          {/* Back layer — Dashboard (scaled + rotated) */}
          <motion.div
            variants={floatVariantsSlow}
            animate="float"
            style={{
              position: "absolute",
              top: 40,
              right: -20,
              width: "88%",
              opacity: 0.38,
              transform: "scale(0.88) rotate(2.5deg)",
              transformOrigin: "top right",
              x: springX,
              y: springY,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <AppFrame url="hexsolve.internal/dashboard" dark>
              <div style={{ transform: "scale(0.68)", transformOrigin: "top left", width: "147%", height: 340, overflow: "hidden" }}>
                <DashboardScreen onNavigate={() => {}} />
              </div>
            </AppFrame>
          </motion.div>

          {/* Front layer — Assembly */}
          <motion.div
            variants={floatVariants}
            animate="float"
            style={{
              position: "absolute",
              top: 80,
              left: 0,
              width: "82%",
              zIndex: 2,
              x: springX,
              y: springY,
              pointerEvents: "none",
            }}
          >
            <AppFrame url="hexsolve.internal/assembly/ENG-2025-041" dark>
              <div style={{ transform: "scale(0.72)", transformOrigin: "top left", width: "139%", height: 320, overflow: "hidden" }}>
                <AssemblyScreen onNavigate={() => {}} />
              </div>
            </AppFrame>
          </motion.div>

          {/* Floating badge 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 16,
              left: "8%",
              zIndex: 10,
              background: C.accent,
              color: C.ink,
              borderRadius: 24,
              padding: "7px 16px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.02em",
              boxShadow: "0 8px 24px rgba(200,169,110,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            Step 4 of 8 · Signed Off ✓
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 40,
              right: "4%",
              zIndex: 10,
              background: "rgba(255,255,255,0.95)",
              color: C.ink,
              borderRadius: 12,
              padding: "8px 16px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
              whiteSpace: "nowrap",
            }}
          >
            ENG-2025-041 · Active
          </motion.div>
        </div>
      </div>

      {/* ── Metadata strip ── */}
      <div
        style={{
          borderTop: `1px solid rgba(255,255,255,0.06)`,
          background: "rgba(255,255,255,0.03)",
          padding: "20px 48px",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8 items-center">
          {[
            ["Role", "UX Designer"],
            ["Industry", "Industrial Manufacturing"],
            ["Platform", "Enterprise Web"],
            ["Scope", "End-to-End"],
            ["Users", "4 Distinct Roles"],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.subtle }}>
                {label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.white }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A2 · Context / Background
───────────────────────────────────────────────────────────────────────────── */
export function SectionA_Context({ isInView }: { isInView: boolean }) {
  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 + i * 0.12, ease: "easeOut" },
    }),
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const roles = [
    { label: "Author", position: { top: "8%", left: "4%" }, icon: FileText },
    { label: "Reviewer", position: { top: "8%", right: "4%" }, icon: Shield },
    { label: "Engineer", position: { bottom: "8%", left: "4%" }, icon: Wrench },
    { label: "QA", position: { bottom: "8%", right: "4%" }, icon: ClipboardList },
  ];

  return (
    <section style={{ background: C.surface, padding: "120px 48px" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: C.accent,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Background
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: C.ink,
              marginBottom: 28,
              lineHeight: 1.1,
            }}
          >
            Every engine built once, for one order
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, marginBottom: 20 }}>
            Every engine is built once, against a single customer order. Unlike assembly lines,
            custom rotary engine manufacturing is driven by unique per-order instruction documents
            that become the single source of truth.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, marginBottom: 20 }}>
            Four distinct roles — Author, Reviewer, Engineer, and QA — all depend on the same
            document at different stages of production.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted }}>
            Before HexSolve, this lived in disconnected spreadsheets and printed sheets with no
            version control, no traceability, and no shared ownership.
          </p>
        </motion.div>

        {/* Right: ecosystem diagram */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          style={{ position: "relative", height: 380 }}
        >
          {/* SVG dashed lines */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            viewBox="0 0 400 380"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill={C.s3} />
              </marker>
            </defs>
            {/* Lines from corners to center */}
            {[
              { x1: 75, y1: 60, x2: 185, y2: 175 },
              { x1: 325, y1: 60, x2: 215, y2: 175 },
              { x1: 75, y1: 320, x2: 185, y2: 205 },
              { x1: 325, y1: 320, x2: 215, y2: 205 },
            ].map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={C.s3}
                strokeWidth="1.5"
                strokeDasharray="5,4"
                markerEnd="url(#arrowEnd)"
              />
            ))}
          </svg>

          {/* Center node */}
          <motion.div
            custom={0}
            variants={nodeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: C.ink,
              color: C.white,
              borderRadius: 14,
              padding: "14px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 2,
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              minWidth: 140,
            }}
          >
            <FileText size={20} color={C.accent} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.02em", textAlign: "center" }}>
              Instruction Document
            </span>
          </motion.div>

          {/* Corner nodes */}
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.label}
                custom={i + 1}
                variants={nodeVariants}
                initial="hidden"
                animate={isInView ? ["visible", "pulse"] : "hidden"}
                style={{
                  position: "absolute",
                  ...role.position,
                  background: C.white,
                  border: `1.5px solid ${C.s3}`,
                  borderRadius: 12,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  zIndex: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  minWidth: 88,
                }}
              >
                <motion.div variants={pulseVariants} animate="pulse">
                  <Icon size={18} color={C.accent} />
                </motion.div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {role.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A3 · Existing Workflow
───────────────────────────────────────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  { icon: Users, label: "Customer Order", role: "Client", accent: false },
  { icon: Layers, label: "Create Project", role: "PM", accent: false },
  { icon: FileText, label: "Author Instructions", role: "Author", accent: true },
  { icon: Shield, label: "Review & Approve", role: "Reviewer", accent: true },
  { icon: Wrench, label: "Assemble Engine", role: "Engineer", accent: false },
  { icon: ClipboardList, label: "QA Validation", role: "QA", accent: false },
  { icon: Check, label: "Project Close", role: "PM", accent: false },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function SectionA_Workflow({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.s2, padding: "120px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 60 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: 12 }}>
            Current State
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: C.ink }}>
            The manufacturing workflow
          </h2>
        </motion.div>

        {/* Scrollable card row */}
        <div style={{ overflowX: "auto", paddingBottom: 12 }}>
          <div style={{ display: "flex", gap: 0, alignItems: "center", minWidth: "max-content" }}>
            {WORKFLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.label}>
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      background: step.accent ? C.accent : C.s2,
                      border: `1.5px solid ${step.accent ? "transparent" : C.s3}`,
                      borderRadius: 16,
                      padding: "24px 20px",
                      width: 130,
                      gap: 12,
                      position: "relative",
                      boxShadow: step.accent ? "0 8px 24px rgba(200,169,110,0.25)" : "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: step.accent ? "rgba(255,255,255,0.28)" : C.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      <Icon size={20} color={step.accent ? C.ink : C.accent} />
                    </div>

                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: step.accent ? C.ink : C.ink,
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.label}
                    </span>

                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: step.accent ? "rgba(14,14,14,0.55)" : C.subtle,
                      }}
                    >
                      {step.role}
                    </span>
                  </motion.div>

                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div style={{ padding: "0 6px", color: C.subtle, flexShrink: 0 }}>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A4 · Document Structure
───────────────────────────────────────────────────────────────────────────── */
const DOC_HIERARCHY = [
  {
    level: 0,
    label: "Instruction Document",
    desc: "Complete manufacturing record for one order",
    indent: 0,
    bgColor: "#0e0e0e",
    textColor: "#ffffff",
    descColor: "rgba(255,255,255,0.5)",
  },
  {
    level: 1,
    label: "Section",
    desc: "Major assembly phase (e.g. Core Assembly)",
    indent: 28,
    bgColor: "#1f1f1f",
    textColor: "#ffffff",
    descColor: "rgba(255,255,255,0.45)",
  },
  {
    level: 2,
    label: "Subsection",
    desc: "Component grouping",
    indent: 56,
    bgColor: C.s3,
    textColor: C.ink,
    descColor: C.muted,
  },
  {
    level: 3,
    label: "Instruction",
    desc: "Individual step with full context",
    indent: 84,
    bgColor: C.s2,
    textColor: C.ink,
    descColor: C.muted,
  },
  {
    level: 4,
    label: "Text · Tools · Parts · Image · Checklist",
    desc: "Contextual detail inline",
    indent: 112,
    bgColor: C.accentLight,
    textColor: C.ink,
    descColor: C.muted,
  },
] as const;

const rowSlideIn: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function SectionA_DocStructure({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.surface, padding: "120px 48px" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: 16 }}>
            Information Architecture
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: C.ink, marginBottom: 24, lineHeight: 1.15 }}>
            A five-level hierarchy that mirrors the factory floor
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted, marginBottom: 20 }}>
            The core design challenge was translating the physical assembly process into a digital structure that feels natural to the engineers who live on the factory floor.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.muted }}>
            The hierarchy mirrors how assemblers already think — from the whole engine down to the exact torque value on a single bolt — ensuring the UI never asks users to mentally translate.
          </p>
        </motion.div>

        {/* Right: hierarchy tree */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {DOC_HIERARCHY.map((row, i) => (
            <motion.div
              key={row.label}
              custom={i}
              variants={rowSlideIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                marginLeft: row.indent,
                background: row.bgColor,
                borderRadius: 10,
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: row.textColor }}>{row.label}</span>
              <span style={{ fontSize: 11, color: row.descColor }}>{row.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A5 · Research
───────────────────────────────────────────────────────────────────────────── */
const RESEARCH_BULLETS = [
  { method: "Contextual Inquiry", finding: "Engineers relied on annotations in physical printouts, underlining gaps in digital tooling." },
  { method: "Stakeholder Workshops", finding: "Authors had no structural templates; every new document started from scratch with copy-paste." },
  { method: "Journey Mapping", finding: "Review cycles averaged 3-4 back-and-forth email rounds before a document was approved." },
  { method: "Competitive Analysis", finding: "Existing tools (Word, Excel) lacked the hierarchy and role-gating the process required." },
] as const;

const ARTIFACT_CARDS = [
  {
    title: "Workshop Board",
    label: "Contextual inquiry notes",
    bg: "#1F2937",
    dark: true,
  },
  {
    title: "Stakeholder Map",
    label: "Role relationship diagram",
    bg: "#F5F0E8",
    dark: false,
  },
  {
    title: "Journey Map",
    label: "As-is workflow mapping",
    bg: "#EFF6FF",
    dark: false,
  },
  {
    title: "Affinity Clusters",
    label: "Pain-point synthesis",
    bg: "#FEFCE8",
    dark: false,
  },
  {
    title: "Workflow Analysis",
    label: "Handoff breakdowns",
    bg: C.s2,
    dark: false,
  },
  {
    title: "Requirement Board",
    label: "Prioritised requirements",
    bg: "#ffffff",
    dark: false,
  },
] as const;

function WorkshopBoardArt() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 42} x2="280" y2={i * 42} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      ))}
      {[
        { x: 16, y: 16, w: 64, h: 40, color: "#FEF9C3" },
        { x: 200, y: 20, w: 60, h: 36, color: "#FCE7F3" },
        { x: 30, y: 150, w: 56, h: 44, color: "#DCFCE7" },
        { x: 190, y: 145, w: 70, h: 40, color: "#DBEAFE" },
        { x: 100, y: 80, w: 80, h: 50, color: "#FEF3C7" },
      ].map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx="4" fill={s.color} opacity="0.85" />
      ))}
    </svg>
  );
}

function StakeholderMapArt() {
  const cx = 140, cy = 105;
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      {[80, 60, 40, 20].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#C8A96E" strokeWidth="1" strokeOpacity={0.3 + i * 0.15} />
      ))}
      {[
        { label: "Author", x: 55, y: 42 },
        { label: "Reviewer", x: 185, y: 42 },
        { label: "Engineer", x: 55, y: 170 },
        { label: "QA", x: 200, y: 170 },
      ].map((n) => (
        <text key={n.label} x={n.x} y={n.y} textAnchor="middle" fontSize="11" fill="#92400E" fontWeight="600">{n.label}</text>
      ))}
      <circle cx={cx} cy={cy} r="14" fill="#C8A96E" />
    </svg>
  );
}

function JourneyMapArt() {
  const phases = ["Discover", "Plan", "Create", "Review", "Deploy"];
  const pains = [1, 3];
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      <line x1="20" y1="105" x2="260" y2="105" stroke="#93C5FD" strokeWidth="1.5" />
      {phases.map((p, i) => {
        const x = 20 + i * 60;
        const isPain = pains.includes(i);
        return (
          <g key={p}>
            <circle cx={x} cy="105" r="7" fill={isPain ? "#EF4444" : "#3B82F6"} />
            <text x={x} y="130" textAnchor="middle" fontSize="9" fill="#1D4ED8" fontWeight="600">{p}</text>
            {isPain && <text x={x} y="92" textAnchor="middle" fontSize="9" fill="#EF4444">!</text>}
          </g>
        );
      })}
    </svg>
  );
}

function AffinityArt() {
  const notes = [
    { x: 10, y: 10, w: 72, h: 48, color: "#FDE68A" },
    { x: 92, y: 8, w: 68, h: 44, color: "#A7F3D0" },
    { x: 170, y: 12, w: 76, h: 50, color: "#BFDBFE" },
    { x: 14, y: 70, w: 80, h: 52, color: "#FCA5A5" },
    { x: 104, y: 66, w: 64, h: 46, color: "#DDD6FE" },
    { x: 178, y: 72, w: 70, h: 48, color: "#FDE68A" },
    { x: 20, y: 135, w: 66, h: 44, color: "#A7F3D0" },
    { x: 96, y: 138, w: 74, h: 50, color: "#BFDBFE" },
    { x: 180, y: 130, w: 68, h: 46, color: "#FCA5A5" },
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      {notes.map((n, i) => (
        <rect key={i} x={n.x} y={n.y} width={n.w} height={n.h} rx="4" fill={n.color} opacity="0.9" />
      ))}
    </svg>
  );
}

function WorkflowAnalysisArt() {
  const boxes = [
    { x: 10, y: 80, label: "Input" },
    { x: 80, y: 80, label: "Process" },
    { x: 150, y: 80, label: "Review" },
    { x: 220, y: 80, label: "Output" },
  ];
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y={b.y} width={58} height={36} rx="6" fill={C.s3} stroke={C.s3} strokeWidth="1" />
          <text x={b.x + 29} y={b.y + 22} textAnchor="middle" fontSize="10" fill={C.ink} fontWeight="600">{b.label}</text>
          {i < boxes.length - 1 && (
            <line x1={b.x + 58} y1={b.y + 18} x2={b.x + 70} y2={b.y + 18} stroke={C.muted} strokeWidth="1.5" markerEnd="url(#wfArrow)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="wfArrow" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 z" fill={C.muted} />
        </marker>
      </defs>
    </svg>
  );
}

function RequirementBoardArt() {
  const items = ["01 — Role-based access control", "02 — Hierarchical document model", "03 — Inline review & approval", "04 — Engineer instruction view", "05 — QA traceability links"];
  return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position: "absolute", inset: 0 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="210" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 42} x2="280" y2={i * 42} stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
      ))}
      {items.map((item, i) => (
        <g key={i}>
          <rect x="12" y={14 + i * 36} width="256" height="26" rx="5" fill={C.white} stroke={C.s3} strokeWidth="1" />
          <text x="24" y={32 + i * 36} fontSize="9" fill={C.ink} fontWeight="600">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function ArtifactCardContent({ index }: { index: number }) {
  if (index === 0) return <WorkshopBoardArt />;
  if (index === 1) return <StakeholderMapArt />;
  if (index === 2) return <JourneyMapArt />;
  if (index === 3) return <AffinityArt />;
  if (index === 4) return <WorkflowAnalysisArt />;
  return <RequirementBoardArt />;
}

const artifactVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" },
  }),
};

export function SectionA_Research({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.s2, padding: "120px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: methods + findings */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: 16 }}>
              Discovery Research
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: C.ink, marginBottom: 36, lineHeight: 1.15 }}>
              Getting close to the factory floor
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {RESEARCH_BULLETS.map((b, i) => (
                <motion.div
                  key={b.method}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  style={{ display: "flex", gap: 16 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: C.accent,
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
                      {b.method}
                      {" — "}
                    </span>
                    <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{b.finding}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: artifact grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {ARTIFACT_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={artifactVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.025 }}
                style={{
                  aspectRatio: "4/3",
                  borderRadius: 16,
                  background: card.bg,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  border: `1px solid ${card.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <ArtifactCardContent index={i} />

                {/* Label overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px 14px 12px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#ffffff", letterSpacing: "0.04em" }}>
                    {card.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A6 · Key Insights
───────────────────────────────────────────────────────────────────────────── */
const INSIGHTS = [
  {
    num: "01",
    Icon: AlertTriangle,
    headline: "No shared source of truth",
    body: "Different roles worked from different document versions, creating manufacturing errors.",
  },
  {
    num: "02",
    Icon: FileText,
    headline: "Authoring was error-prone",
    body: "Authors manually copied structures without tooling, making consistency impossible.",
  },
  {
    num: "03",
    Icon: Shield,
    headline: "Reviewers lacked confidence",
    body: "Without change tracking, approving documents felt uncertain.",
  },
  {
    num: "04",
    Icon: Wrench,
    headline: "Engineers needed context at the point of action",
    body: "Tools and parts info had to be on the same screen as the instruction.",
  },
  {
    num: "05",
    Icon: ClipboardList,
    headline: "QA traceability was fragmented",
    body: "No direct link between completed work and approved instruction version.",
  },
] as const;

const insightCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function SectionA_Insights({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.surface, padding: "120px 48px" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 60 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: 12 }}>
            Research Synthesis
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: C.ink }}>
            Five key insights
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {INSIGHTS.map((insight, i) => {
            const Icon = insight.Icon;
            return (
              <motion.div
                key={insight.num}
                custom={i}
                variants={insightCardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  background: C.white,
                  border: `1.5px solid ${C.s3}`,
                  borderRadius: 18,
                  padding: "28px 24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {/* Large number watermark */}
                <span
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 20,
                    fontSize: 36,
                    fontWeight: 800,
                    color: C.s3,
                    lineHeight: 1,
                    userSelect: "none",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {insight.num}
                </span>

                {/* Icon in accentLight circle */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: C.accentLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} color={C.accent} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.ink, lineHeight: 1.3, paddingRight: 40 }}>
                    {insight.headline}
                  </h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{insight.body}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Sixth cell — pull quote */}
          <motion.div
            custom={5}
            variants={insightCardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              background: C.ink,
              borderRadius: 18,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28, color: C.accent, lineHeight: 1, fontFamily: "Georgia, serif" }}>"</span>
            <p style={{ fontSize: 14, color: C.white, lineHeight: 1.7, fontStyle: "italic" }}>
              Every finding pointed to the same root cause: no single system that all four roles trusted.
            </p>
            <span style={{ fontSize: 11, color: C.subtle, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Core research theme
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   A7 · Problem Statement
───────────────────────────────────────────────────────────────────────────── */
export function SectionA_Problem({ isInView }: { isInView: boolean }) {
  const quoteReveal: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      style={{
        background: "#090909",
        padding: "140px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "60%",
          background: `radial-gradient(ellipse, rgba(200,169,110,0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-4xl mx-auto" style={{ position: "relative", textAlign: "center" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.accent,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          Problem Statement
        </motion.p>

        {/* Quote block */}
        <motion.div
          variants={quoteReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ position: "relative" }}
        >
          <blockquote
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              margin: 0,
              textAlign: "center",
            }}
          >
            "Manufacturing teams lacked a single, reliable place to create, review, and execute precision instructions — leaving engineers to work from documents they couldn't fully trust."
          </blockquote>

          {/* Sticky note — top left */}
          <div
            style={{
              position: "absolute",
              top: -18,
              left: -24,
              background: "#FEF08A",
              color: "#713F12",
              borderRadius: 4,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 600,
              transform: "rotate(-4deg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Key challenge ✏
          </div>

          {/* Sticky note — bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: -22,
              right: -20,
              background: "#FBCFE8",
              color: "#831843",
              borderRadius: 4,
              padding: "8px 12px",
              fontSize: 12,
              fontWeight: 600,
              transform: "rotate(3deg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            This changed everything →
          </div>

          {/* Sticky note — middle */}
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: -80,
              background: "#A5F3FC",
              color: "#164E63",
              borderRadius: 4,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 600,
              transform: "rotate(-2deg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              whiteSpace: "nowrap",
            }}
          >
            Critical insight
          </div>
        </motion.div>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          style={{
            fontSize: 16,
            color: C.subtle,
            marginTop: 56,
            lineHeight: 1.7,
          }}
        >
          This framing shaped every design decision — from the document hierarchy to the approval workflow to how instructions are rendered on the shop floor.
        </motion.p>
      </div>
    </section>
  );
}
