"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { InstructionDocScreen } from "./prototype/screens/instruction-doc";
import { QAReviewScreen } from "./prototype/screens/qa-review";
import { ChecklistDetailScreen } from "./ui-screens";

/* ─────────────────────────────────────────────────────────────
   Portfolio Design Tokens
───────────────────────────────────────────────────────────────*/
const C = {
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

/* ─────────────────────────────────────────────────────────────
   AppFrame — mini browser chrome wrapper (shared utility)
───────────────────────────────────────────────────────────────*/
export function AppFrame({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${C.s3}`,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        background: C.white,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 38,
          background: C.s2,
          borderBottom: `1px solid ${C.s3}`,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <div
              key={c}
              style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
            />
          ))}
        </div>
        {url && (
          <div
            style={{
              flex: 1,
              maxWidth: 360,
              margin: "0 auto",
              background: C.white,
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 11,
              color: C.subtle,
              textAlign: "center",
              border: `1px solid ${C.s3}`,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </div>
        )}
      </div>
      <div style={{ height: 480, overflow: "hidden", position: "relative" }}>
        <div
          style={{
            transform: "scale(0.62)",
            transformOrigin: "top left",
            width: `${100 / 0.62}%`,
            height: `${100 / 0.62}%`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION B1 — Process (Radial diagram)
───────────────────────────────────────────────────────────────*/
const STEPS = [
  "Workshops",
  "Research",
  "Synthesis",
  "Reframe",
  "Info Arch",
  "Interaction",
  "Wireframes",
  "Validation",
  "Sys Design",
  "Visual",
  "Prototype",
  "Iterate",
];

function nodePos(i: number, radius = 190, cx = 250, cy = 250) {
  const angle = ((i / 12) * 360 - 90) * (Math.PI / 180);
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

// Feedback arc: from node A to node B as a smooth arc
function feedbackArc(
  fromIdx: number,
  toIdx: number,
  r = 230,
  cx = 250,
  cy = 250
): string {
  const from = nodePos(fromIdx, r, cx, cy);
  const to = nodePos(toIdx, r, cx, cy);
  // Large arc sweep
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
  return `M ${from.x} ${from.y} A ${dr} ${dr} 0 0 0 ${to.x} ${to.y}`;
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" },
  }),
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    transition: { duration: 1.8, ease: "easeInOut", repeat: Infinity },
  },
};

export function SectionB_Process({
  isInView,
  activeStep,
}: {
  isInView: boolean;
  activeStep: number;
}) {
  return (
    <section
      style={{
        background: C.surface,
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 16,
            }}
          >
            Process
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 20,
            }}
          >
            Non-linear. Iterative.
            <br />
            Frequently doubling back.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.muted,
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            HexSolve demanded repeated cycles between research, architecture,
            and prototyping as we uncovered new constraints with each round of
            stakeholder review. Each arrow back was a signal to refine, not to
            restart.
          </p>

          {/* Active step card */}
          <div
            style={{
              background: C.white,
              border: `1px solid ${C.s3}`,
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.subtle,
                marginBottom: 12,
              }}
            >
              Current phase
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {STEPS.map((step, i) => {
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                return (
                  <span
                    key={step}
                    style={{
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      padding: "5px 12px",
                      borderRadius: 99,
                      background: isActive
                        ? C.accent
                        : isDone
                        ? C.ink
                        : C.s2,
                      color: isActive
                        ? C.ink
                        : isDone
                        ? C.white
                        : C.subtle,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {step}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: radial SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ minHeight: 460, display: "flex", alignItems: "center" }}
        >
          <svg
            viewBox="0 0 500 500"
            width="100%"
            style={{ overflow: "visible" }}
            aria-label="Design process radial diagram"
          >
            <defs>
              <marker
                id="arrow-accent"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L6,3 z" fill={C.accent} />
              </marker>
            </defs>

            {/* Dashed ring connecting all nodes */}
            <circle
              cx={250}
              cy={250}
              r={190}
              fill="none"
              stroke={C.s3}
              strokeWidth={1}
              strokeDasharray="4 6"
            />

            {/* Feedback loop arc: Validation (idx 7) → Research (idx 1) */}
            <motion.path
              d={feedbackArc(7, 1)}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.5}
              strokeDasharray="5 5"
              markerEnd="url(#arrow-accent)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
            />

            {/* Feedback loop arc: Prototype (idx 10) → Wireframes (idx 6) */}
            <motion.path
              d={feedbackArc(10, 6, 215)}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.2}
              strokeDasharray="4 5"
              markerEnd="url(#arrow-accent)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.0, delay: 1.0, ease: "easeInOut" }}
            />

            {/* Center circle */}
            <circle cx={250} cy={250} r={52} fill={C.ink} />
            <text
              x={250}
              y={246}
              textAnchor="middle"
              fill={C.accent}
              fontSize={10}
              fontWeight={700}
              letterSpacing={0.5}
            >
              Design
            </text>
            <text
              x={250}
              y={260}
              textAnchor="middle"
              fill={C.accent}
              fontSize={10}
              fontWeight={700}
              letterSpacing={0.5}
            >
              Process
            </text>

            {/* Step nodes */}
            {STEPS.map((step, i) => {
              const pos = nodePos(i);
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              const isPending = i > activeStep;

              const nodeFill = isActive ? C.accent : isDone ? C.ink : C.surface;
              const textColor = isActive ? C.ink : isDone ? C.white : C.muted;
              const strokeColor = isPending ? C.s3 : "none";

              // Split label into up to 2 lines
              const words = step.split(" ");
              const line1 = words.length > 1 ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : step;
              const line2 = words.length > 1 ? words.slice(Math.ceil(words.length / 2)).join(" ") : null;

              return (
                <motion.g
                  key={step}
                  custom={i}
                  variants={nodeVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Glow ring for active node */}
                  {isActive && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={34}
                      fill="none"
                      stroke={C.accent}
                      strokeWidth={2}
                      opacity={0.5}
                      variants={pulseVariants}
                      animate="animate"
                    />
                  )}

                  {/* Node circle — active node gets scale pulse */}
                  {isActive ? (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={26}
                      fill={nodeFill}
                      stroke={strokeColor}
                      strokeWidth={1.5}
                      variants={pulseVariants}
                      animate="animate"
                    />
                  ) : (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={26}
                      fill={nodeFill}
                      stroke={strokeColor}
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Done check mark */}
                  {isDone && (
                    <text
                      x={pos.x}
                      y={pos.y + 4}
                      textAnchor="middle"
                      fill={C.accent}
                      fontSize={12}
                      fontWeight={700}
                    >
                      ✓
                    </text>
                  )}

                  {/* Step label */}
                  {!isDone && (
                    <text textAnchor="middle" fill={textColor} fontSize={8.5} fontWeight={600}>
                      {line2 ? (
                        <>
                          <tspan x={pos.x} y={pos.y - 3}>{line1}</tspan>
                          <tspan x={pos.x} dy={11}>{line2}</tspan>
                        </>
                      ) : (
                        <tspan x={pos.x} y={pos.y + 3}>{line1}</tspan>
                      )}
                    </text>
                  )}

                  {/* Step number dot */}
                  <text
                    x={pos.x + 18}
                    y={pos.y - 18}
                    textAnchor="middle"
                    fill={isActive ? C.ink : C.subtle}
                    fontSize={7}
                    fontWeight={700}
                  >
                    {i + 1}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION B2 — Information Architecture
───────────────────────────────────────────────────────────────*/
const IA_ROLES = [
  {
    label: "Author",
    bg: C.accentLight,
    color: "#8B5E2A",
    nodes: [
      "Login",
      "Dashboard",
      "Projects",
      "Instruction Doc",
      "Edit Section",
      "Edit Instruction",
      "Submit for Review",
    ],
  },
  {
    label: "Reviewer",
    bg: "#FEF3C7",
    color: "#92400E",
    nodes: [
      "Login",
      "Dashboard",
      "Review Queue",
      "Instruction Doc",
      "View Changes",
      "Add Comments",
      "Approve / Reject",
    ],
  },
  {
    label: "Engineer",
    bg: "#F0FDF4",
    color: "#065F46",
    nodes: [
      "Login",
      "Dashboard",
      "Assigned Projects",
      "Instruction Doc",
      "Assembly View",
      "Checklist",
      "Sign Off & Proceed",
    ],
  },
  {
    label: "QA Engineer",
    bg: "#EFF6FF",
    color: "#1E40AF",
    nodes: [
      "Login",
      "Dashboard",
      "QA Queue",
      "Instruction Doc",
      "Validation View",
      "Checklist Audit",
      "Pass / Fail",
    ],
  },
];

const colVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export function SectionB_IA({ isInView }: { isInView: boolean }) {
  return (
    <section
      style={{
        background: C.ink,
        padding: "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 56, maxWidth: 680 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 16,
            }}
          >
            Information Architecture
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 700,
              color: C.white,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Four roles. One shared hierarchy.
            <br />
            Different access patterns.
          </h2>
        </motion.div>

        {/* 4 role columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {IA_ROLES.map((role, colIdx) => (
            <motion.div
              key={role.label}
              custom={colIdx}
              variants={colVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: 20,
              }}
            >
              {/* Role chip */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: role.bg,
                  color: role.color,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: 99,
                  marginBottom: 24,
                  letterSpacing: "0.04em",
                }}
              >
                {role.label}
              </div>

              {/* Tree */}
              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 12,
                    bottom: 12,
                    width: 1,
                    background: "rgba(255,255,255,0.12)",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {role.nodes.map((node, nodeIdx) => {
                    const isFirst = nodeIdx === 0;
                    const isLast = nodeIdx === role.nodes.length - 1;

                    const nodeBg = isFirst
                      ? C.ink
                      : isLast
                      ? role.bg
                      : "rgba(255,255,255,0.07)";
                    const nodeText = isFirst
                      ? C.white
                      : isLast
                      ? role.color
                      : "rgba(255,255,255,0.7)";
                    const borderColor = isFirst
                      ? "rgba(255,255,255,0.2)"
                      : isLast
                      ? role.bg
                      : "rgba(255,255,255,0.1)";

                    return (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: colIdx * 0.1 + nodeIdx * 0.06,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {/* Connector dot */}
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: isFirst
                              ? C.white
                              : isLast
                              ? role.bg
                              : "rgba(255,255,255,0.3)",
                            flexShrink: 0,
                            zIndex: 1,
                            marginLeft: 7,
                            border: `1px solid ${borderColor}`,
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            background: nodeBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: 7,
                            padding: "7px 10px",
                            fontSize: 11,
                            fontWeight: isFirst || isLast ? 700 : 500,
                            color: nodeText,
                            letterSpacing: isFirst ? "0.02em" : 0,
                          }}
                        >
                          {node}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION B3 — Interaction Design
───────────────────────────────────────────────────────────────*/
const DECISIONS = [
  {
    num: "01",
    headline: "Persistent hierarchy — never lose your place",
    body: "A collapsible sidebar tree keeps the full document structure always visible, regardless of which instruction is active. Users never navigate away mid-authoring.",
    why: "Reduced cognitive load across 87+ instruction documents.",
    screen: "instruction-doc",
    url: "hexsolve.app/docs/ENG-2025-041/2.1",
  },
  {
    num: "02",
    headline: "Role-specific surfaces, shared information model",
    body: "Authors, reviewers, and engineers see the same data through different interaction lenses. Each role's interface strips noise without duplicating the underlying model.",
    why: "Eliminated interface noise without duplicating the data model.",
    screen: "qa-review",
    url: "hexsolve.app/review/ENG-2025-041",
  },
  {
    num: "03",
    headline: "Contextual detail embedded at the point of action",
    body: "Tools, parts, images, and checklists live inline in each instruction card. Engineers access everything they need without switching tabs or applications.",
    why: "Eliminated context-switching during precision assembly work.",
    screen: "checklist",
    url: "hexsolve.app/assembly/2.1.4/checklist",
  },
] as const;

const noop = (_: string) => {};

export function SectionB_Interaction({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.surface, padding: "100px 0" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 72 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 16,
            }}
          >
            Interaction Design
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: 600,
            }}
          >
            Three decisions that shaped the experience.
          </h2>
        </motion.div>

        {/* Decisions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {DECISIONS.map((d, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={d.num}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                }}
              >
                {/* Text block */}
                <div style={{ order: isEven ? 1 : 2 }}>
                  {/* Big faded number */}
                  <p
                    style={{
                      fontSize: 80,
                      fontWeight: 800,
                      color: C.s3,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      marginBottom: -8,
                      userSelect: "none",
                    }}
                  >
                    {d.num}
                  </p>
                  <h3
                    style={{
                      fontSize: "clamp(20px, 2.2vw, 28px)",
                      fontWeight: 700,
                      color: C.ink,
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                      marginBottom: 16,
                    }}
                  >
                    {d.headline}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: C.muted,
                      lineHeight: 1.8,
                      marginBottom: 24,
                    }}
                  >
                    {d.body}
                  </p>
                  {/* Why it mattered callout */}
                  <div
                    style={{
                      background: C.accentLight,
                      borderLeft: `3px solid ${C.accent}`,
                      borderRadius: "0 10px 10px 0",
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: C.accent, flexShrink: 0, marginTop: 1 }}
                    />
                    <p style={{ fontSize: 13, color: "#7a5c2e", fontWeight: 600, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>Why this mattered: </span>
                      {d.why}
                    </p>
                  </div>
                </div>

                {/* Screen */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  <AppFrame url={d.url}>
                    {d.screen === "instruction-doc" && (
                      <InstructionDocScreen onNavigate={noop} />
                    )}
                    {d.screen === "qa-review" && (
                      <QAReviewScreen onNavigate={noop} />
                    )}
                    {d.screen === "checklist" && (
                      <ChecklistDetailScreen />
                    )}
                  </AppFrame>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION B4 — Wireframes
───────────────────────────────────────────────────────────────*/
// Shared wireframe primitives
function WfBlock({
  w = "100%",
  h = 12,
  r = 4,
  shade = C.s3,
  mb = 6,
}: {
  w?: string | number;
  h?: number;
  r?: number;
  shade?: string;
  mb?: number;
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: shade,
        borderRadius: r,
        marginBottom: mb,
        flexShrink: 0,
      }}
    />
  );
}

function WfText({ w = "70%", shade = C.s3 }: { w?: string | number; shade?: string }) {
  return <WfBlock w={w} h={8} r={3} shade={shade} mb={4} />;
}

// 1. Login
function WfLogin() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.s2, padding: 12, alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "72%", background: C.white, border: `1px solid ${C.s3}`, borderRadius: 8, padding: 16 }}>
        <div style={{ width: 36, height: 36, background: C.s3, borderRadius: 8, margin: "0 auto 12px" }} />
        <WfText w="60%" />
        <WfBlock h={28} r={5} shade={C.s2} mb={8} />
        <WfBlock h={28} r={5} shade={C.s2} mb={12} />
        <WfBlock h={30} r={5} shade={C.s3} />
      </div>
    </div>
  );
}

// 2. Dashboard
function WfDashboard() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2, gap: 0 }}>
      <div style={{ width: 40, background: C.s3, flexShrink: 0, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 6 }}>
        {[...Array(5)].map((_, i) => <div key={i} style={{ width: 28, height: 8, background: i === 0 ? "#9ca3af" : C.white, borderRadius: 3 }} />)}
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <WfBlock h={14} w="50%" r={3} shade={C.s3} mb={10} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 10 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.s3}`, borderRadius: 5, padding: 7 }}>
              <WfBlock h={10} shade={C.s3} mb={4} />
              <WfBlock h={16} w="60%" shade="#c0c7d0" mb={0} />
            </div>
          ))}
        </div>
        <div style={{ background: C.white, border: `1px solid ${C.s3}`, borderRadius: 5, padding: 8 }}>
          {[...Array(4)].map((_, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
            {[...Array(4)].map((_, j) => <WfBlock key={j} h={9} shade={j === 0 ? C.s3 : C.s2} mb={0} />)}
          </div>)}
        </div>
      </div>
    </div>
  );
}

// 3. Project List
function WfProjectList() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2 }}>
      <div style={{ width: 40, background: C.s3, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <WfBlock h={22} w="55%" r={4} shade={C.white} mb={0} />
          <WfBlock h={22} w="20%" r={4} shade={C.s3} mb={0} />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: C.white, border: `1px solid ${C.s3}`, borderRadius: 5, padding: "6px 8px", marginBottom: 5 }}>
            <WfBlock h={9} w="35%" shade={C.s3} mb={0} />
            <WfBlock h={9} w="20%" shade={C.s2} mb={0} />
            <WfBlock h={14} w="16%" r={99} shade={C.s3} mb={0} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Project Detail
function WfProjectDetail() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2 }}>
      <div style={{ width: 40, background: C.s3, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: 10 }}>
        <WfBlock h={40} r={6} shade={C.white} mb={8} />
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 8 }}>
          <div style={{ background: C.white, border: `1px solid ${C.s3}`, borderRadius: 6, padding: 8 }}>
            {[...Array(5)].map((_, i) => <WfBlock key={i} h={22} shade={C.s2} mb={5} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...Array(3)].map((_, i) => <div key={i} style={{ background: C.white, border: `1px solid ${C.s3}`, borderRadius: 6, padding: 8 }}><WfBlock h={10} shade={C.s3} mb={4} /><WfBlock h={8} w="80%" shade={C.s2} mb={0} /></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Instruction Document
function WfInstructionDoc() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2 }}>
      {/* Tree panel */}
      <div style={{ width: 42, background: C.white, borderRight: `1px solid ${C.s3}`, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 5 }}>
        {[...Array(6)].map((_, i) => <WfBlock key={i} h={i % 2 === 0 ? 8 : 7} w={i % 2 === 0 ? "90%" : "80%"} shade={i === 2 ? C.s3 : C.s2} mb={0} />)}
      </div>
      {/* Center */}
      <div style={{ flex: 1, padding: 8 }}>
        <WfBlock h={24} r={4} shade={C.white} mb={6} />
        {[...Array(4)].map((_, i) => <div key={i} style={{ background: i === 1 ? C.white : C.white, border: `1px solid ${i === 1 ? "#c0c7d0" : C.s3}`, borderLeft: i === 1 ? "2px solid #9ca3af" : "none", borderRadius: 5, padding: 7, marginBottom: 5 }}><WfBlock h={8} w="70%" shade={C.s3} mb={3} /><WfBlock h={7} w="90%" shade={C.s2} mb={0} /></div>)}
      </div>
      {/* Right */}
      <div style={{ width: 38, background: C.white, borderLeft: `1px solid ${C.s3}`, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 5 }}>
        {[...Array(5)].map((_, i) => <WfBlock key={i} h={7} shade={C.s2} mb={0} />)}
      </div>
    </div>
  );
}

// 6. Instruction Editor
function WfInstructionEditor() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2 }}>
      <div style={{ width: 42, background: C.white, borderRight: `1px solid ${C.s3}`, padding: "8px 6px" }}>
        {[...Array(5)].map((_, i) => <WfBlock key={i} h={8} shade={C.s2} mb={5} />)}
      </div>
      <div style={{ flex: 1, padding: 8 }}>
        <WfBlock h={56} r={4} shade={C.s3} mb={7} />
        {[...Array(3)].map((_, i) => <WfBlock key={i} h={22} shade={C.white} mb={4} />)}
        <WfBlock h={26} r={5} shade={C.s3} mb={0} />
      </div>
      <div style={{ width: 38, background: C.white, borderLeft: `1px solid ${C.s3}`, padding: "8px 6px" }}>
        <WfBlock h={10} shade={C.s3} mb={6} />
        {[...Array(4)].map((_, i) => <WfBlock key={i} h={18} shade={C.s2} mb={5} />)}
      </div>
    </div>
  );
}

// 7. Assembly Workspace
function WfAssembly() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2 }}>
      <div style={{ width: 36, background: C.white, borderRight: `1px solid ${C.s3}`, padding: "8px 5px" }}>
        {[...Array(6)].map((_, i) => <div key={i} style={{ width: 26, height: 26, background: i === 2 ? C.s3 : C.s2, borderRadius: 5, marginBottom: 5 }} />)}
      </div>
      <div style={{ flex: 1, padding: 8 }}>
        <WfBlock h={10} w="60%" shade={C.s3} mb={6} />
        <WfBlock h={64} r={5} shade={C.white} mb={6} />
        <WfBlock h={8} w="85%" shade={C.s2} mb={4} />
        <WfBlock h={8} w="75%" shade={C.s2} mb={8} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {[...Array(4)].map((_, i) => <WfBlock key={i} h={24} shade={C.white} mb={0} />)}
        </div>
      </div>
      <div style={{ width: 38, background: C.white, borderLeft: `1px solid ${C.s3}`, padding: "8px 6px" }}>
        <WfBlock h={8} shade={C.s3} mb={6} />
        {[...Array(4)].map((_, i) => <div key={i} style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 5 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: C.s3, flexShrink: 0 }} /><WfBlock h={7} shade={C.s2} mb={0} /></div>)}
      </div>
    </div>
  );
}

// 8. QA Review
function WfQAReview() {
  return (
    <div style={{ display: "flex", height: "100%", background: C.s2, flexDirection: "column" }}>
      <WfBlock h={24} r={0} shade={C.white} mb={0} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: 8 }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: C.white, border: `1px solid ${C.s3}`, borderRadius: 5, padding: "5px 8px", marginBottom: 5 }}>
              <WfBlock h={8} w="50%" shade={C.s3} mb={0} />
              <WfBlock h={14} w="18%" r={99} shade={i === 1 || i === 3 ? "#dde3ea" : C.s2} mb={0} />
              <WfBlock h={18} w="16%" r={4} shade={C.s2} mb={0} />
            </div>
          ))}
        </div>
        <div style={{ width: 52, background: C.white, borderLeft: `1px solid ${C.s3}`, padding: "8px 6px" }}>
          {[...Array(4)].map((_, i) => <div key={i} style={{ display: "flex", gap: 4, marginBottom: 6 }}><div style={{ width: 8, height: 8, borderRadius: 2, border: `1px solid ${C.s3}`, flexShrink: 0, marginTop: 1 }} /><WfBlock h={7} shade={C.s2} mb={0} /></div>)}
        </div>
      </div>
      <WfBlock h={28} r={0} shade={C.white} mb={0} />
    </div>
  );
}

// 9. Checklist Detail
function WfChecklist() {
  return (
    <div style={{ padding: 10, background: C.s2, height: "100%" }}>
      <div style={{ background: C.white, border: `1px solid ${C.s3}`, borderRadius: 8, padding: 12, height: "100%", boxSizing: "border-box" }}>
        <WfBlock h={12} w="70%" shade={C.s3} mb={4} />
        <WfBlock h={8} w="50%" shade={C.s2} mb={12} />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: i < 3 ? C.s3 : C.s2, border: `1px solid ${C.s3}`, flexShrink: 0 }} />
            <WfBlock h={8} w={i < 3 ? "65%" : "50%"} shade={i < 3 ? C.s3 : C.s2} mb={0} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
          {[...Array(3)].map((_, i) => <WfBlock key={i} h={18} w={50} r={99} shade={C.s2} mb={0} />)}
        </div>
      </div>
    </div>
  );
}

const WF_TILES = [
  { label: "Login", Component: WfLogin },
  { label: "Dashboard", Component: WfDashboard },
  { label: "Project List", Component: WfProjectList },
  { label: "Project Detail", Component: WfProjectDetail },
  { label: "Instruction Document", Component: WfInstructionDoc },
  { label: "Instruction Editor", Component: WfInstructionEditor },
  { label: "Assembly Workspace", Component: WfAssembly },
  { label: "QA Review", Component: WfQAReview },
  { label: "Checklist Detail", Component: WfChecklist },
];

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

export function SectionB_Wireframes({ isInView }: { isInView: boolean }) {
  return (
    <section style={{ background: C.white, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C.accent,
                marginBottom: 16,
              }}
            >
              Wireframes
            </p>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 700,
                color: C.ink,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Structure before style.
              <br />
              Every screen, every role.
            </h2>
          </div>

          {/* Progression annotation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: C.muted,
              flexWrap: "wrap",
            }}
          >
            {["Early exploration", "Refined layouts", "Final hierarchy"].map((label, i) => (
              <React.Fragment key={label}>
                <span
                  style={{
                    background: C.s2,
                    border: `1px solid ${C.s3}`,
                    borderRadius: 99,
                    padding: "4px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.muted,
                  }}
                >
                  {label}
                </span>
                {i < 2 && (
                  <ArrowRight
                    size={12}
                    style={{ color: C.s3, flexShrink: 0 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* 3×3 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {WF_TILES.map(({ label, Component }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={tileVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                background: C.white,
                border: `1px solid ${C.s3}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 148, overflow: "hidden", position: "relative" }}>
                <Component />
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  borderTop: `1px solid ${C.s3}`,
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.subtle,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION B5 — Validation
───────────────────────────────────────────────────────────────*/
const CONCEPTS = [
  {
    id: "A",
    label: "Concept A",
    name: "Flat list with global search",
    outcome: "Discarded",
    outcomeColor: "#DC2626",
    detail: "Users lost document context navigating large instruction sets",
    chosen: false,
  },
  {
    id: "B",
    label: "Concept B",
    name: "Tab-based section navigation",
    outcome: "Partially adopted",
    outcomeColor: "#D97706",
    detail: "Tabs carried into mobile view but not desktop",
    chosen: false,
  },
  {
    id: "C",
    label: "Concept C",
    name: "Persistent collapsible sidebar tree",
    outcome: "CHOSEN",
    outcomeColor: C.accent,
    detail: "Maintained context across all 87 instructions; validated across all four roles",
    chosen: true,
  },
] as const;

const QUOTES = [
  {
    initial: "B",
    name: "Bran O.",
    role: "Operator",
    quote: "The document tree needs to show me where I am — not just the list.",
  },
  {
    initial: "M",
    name: "Martin K.",
    role: "Reviewer",
    quote: "I want to see what changed without reading the whole thing again.",
  },
  {
    initial: "S",
    name: "Steven P.",
    role: "Assembly Engineer",
    quote:
      "When I'm on the floor I don't want extra buttons. Just the instruction and the checklist.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export function SectionB_Validation({ isInView }: { isInView: boolean }) {
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);

  return (
    <section style={{ background: C.surface, padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: 60 }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 16,
            }}
          >
            Validation
          </p>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: 600,
            }}
          >
            Three concepts tested.
            <br />
            One clear direction emerged.
          </h2>
        </motion.div>

        {/* Concept cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={c.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredConcept(c.id)}
              onMouseLeave={() => setHoveredConcept(null)}
              style={{
                background: c.chosen ? C.ink : C.white,
                border: `1px solid ${c.chosen ? "transparent" : C.s3}`,
                borderRadius: 14,
                padding: "24px 24px 20px",
                cursor: "default",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                transform:
                  hoveredConcept === c.id ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  hoveredConcept === c.id
                    ? "0 16px 40px rgba(0,0,0,0.12)"
                    : "none",
              }}
            >
              {/* Label + outcome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: c.chosen ? C.accent : C.subtle,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: c.outcomeColor,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: c.chosen ? "rgba(200,169,110,0.15)" : C.s2,
                    padding: "3px 9px",
                    borderRadius: 99,
                  }}
                >
                  {c.outcome}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: c.chosen ? C.white : C.ink,
                  lineHeight: 1.3,
                  marginBottom: 12,
                }}
              >
                {c.name}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  color: c.chosen ? "rgba(255,255,255,0.6)" : C.muted,
                  lineHeight: 1.65,
                }}
              >
                {c.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feedback row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          {[
            { label: "Stakeholder walkthroughs", dark: false },
            { label: "→", dark: false, isArrow: true },
            { label: "Iteration on Concept C", dark: false },
            { label: "→", dark: false, isArrow: true },
            { label: "Final: Persistent sidebar tree", dark: true },
          ].map(({ label, dark, isArrow }, i) =>
            isArrow ? (
              <span key={i} style={{ color: C.subtle, fontSize: 14 }}>
                {label}
              </span>
            ) : (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: dark ? C.ink : C.s2,
                  color: dark ? C.white : C.muted,
                  border: `1px solid ${dark ? "transparent" : C.s3}`,
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            )
          )}
        </motion.div>

        {/* Quote cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {QUOTES.map((q, i) => (
            <motion.div
              key={q.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                background: C.white,
                border: `1px solid ${C.s3}`,
                borderLeft: `3px solid ${C.accent}`,
                borderRadius: "0 12px 12px 0",
                padding: "20px 20px 20px 18px",
              }}
            >
              {/* Avatar + name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: C.accentLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 800,
                    color: C.accent,
                    flexShrink: 0,
                  }}
                >
                  {q.initial}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.ink,
                      lineHeight: 1.2,
                    }}
                  >
                    {q.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: C.subtle,
                      fontWeight: 500,
                    }}
                  >
                    {q.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 14,
                  fontStyle: "italic",
                  color: C.muted,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                &ldquo;{q.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
