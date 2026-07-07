"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import {
  FileText,
  Wrench,
  Shield,
  Package,
  ClipboardList,
  Users,
  Play,
  Pause,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import { LoginScreen } from "./prototype/screens/login";
import { DashboardScreen } from "./prototype/screens/dashboard";
import { ProjectsScreen } from "./prototype/screens/projects";
import { ProjectDetailScreen } from "./prototype/screens/project-detail";
import { InstructionDocScreen } from "./prototype/screens/instruction-doc";
import { AssemblyScreen } from "./prototype/screens/assembly";
import { QAReviewScreen } from "./prototype/screens/qa-review";

/* ─────────────────────────────────────────────────────────────────────────────
   Design Palette
───────────────────────────────────────────────────────────────────────────── */
const P = {
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
   AppFrame — browser chrome wrapper
───────────────────────────────────────────────────────────────────────────── */
function AppFrame({
  children,
  url = "hexsolve.app",
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          background: "#2a2a2a",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
          <div
            key={c}
            style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
          />
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: 8,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 4,
            height: 18,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>
            {url}
          </span>
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared animation variants
───────────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION C1 — Visual Language
───────────────────────────────────────────────────────────────────────────── */
export function SectionC_VisualLanguage({ isInView }: { isInView: boolean }) {
  const tokenItems = [
    // Colors
    {
      type: "color",
      name: "Ink",
      hex: "#0e0e0e",
      swatch: "#0e0e0e",
      border: false,
    },
    {
      type: "color",
      name: "App Red",
      hex: "#CC2929",
      swatch: "#CC2929",
      border: false,
    },
    {
      type: "color",
      name: "Accent Gold",
      hex: "#c8a96e",
      swatch: "#c8a96e",
      border: false,
    },
    {
      type: "color",
      name: "Surface",
      hex: "#f9f8f6",
      swatch: "#f9f8f6",
      border: true,
    },
    // Typography
    {
      type: "type",
      name: "Display / 48px",
      preview: "Aa",
      size: 48,
    },
    {
      type: "type",
      name: "Body / 14px",
      preview: "Aa",
      size: 24,
    },
  ] as const;

  const componentItems = [
    { type: "btn-primary", name: "Primary Button" },
    { type: "btn-ghost", name: "Ghost Button" },
    { type: "badge-active", name: "Status: Active" },
    { type: "badge-approved", name: "Status: Approved" },
    { type: "icons", name: "Icon Set" },
    { type: "progress", name: "Progress" },
  ] as const;

  return (
    <section
      style={{
        background: P.ink,
        padding: "120px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 72,
          }}
        >
          <div>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: P.accent,
                marginBottom: 16,
              }}
            >
              Visual Language
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: P.white,
              }}
            >
              Building once,
              <br />
              scaling everywhere
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.48)",
              alignSelf: "flex-end",
            }}
          >
            The design system was not about aesthetics — it was about reducing
            ambiguity. Every component answered a specific question about how
            information should be presented.
          </motion.p>
        </motion.div>

        {/* Token Grid — Row 1: Colors + Typography */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {tokenItems.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 140,
              }}
            >
              {item.type === "color" ? (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: 64,
                      borderRadius: 8,
                      background: item.swatch,
                      border: item.border
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "none",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ marginTop: "auto" }}>
                    <p style={{ color: P.white, fontSize: 13, fontWeight: 600 }}>
                      {item.name}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>
                      {item.hex}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: P.white,
                        fontSize: item.size,
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                      }}
                    >
                      {item.preview}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                    {item.name}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Token Grid — Row 2: Components */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {componentItems.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 140,
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.type === "btn-primary" && (
                  <div
                    style={{
                      background: P.appRed,
                      color: P.white,
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 6,
                      padding: "8px 12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Save and Proceed
                  </div>
                )}
                {item.type === "btn-ghost" && (
                  <div
                    style={{
                      background: "transparent",
                      color: P.white,
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 6,
                      padding: "8px 12px",
                      border: "1px solid rgba(255,255,255,0.25)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cancel
                  </div>
                )}
                {item.type === "badge-active" && (
                  <div
                    style={{
                      background: P.appRed,
                      color: P.white,
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 100,
                      padding: "5px 12px",
                    }}
                  >
                    Active
                  </div>
                )}
                {item.type === "badge-approved" && (
                  <div
                    style={{
                      background: "#059669",
                      color: P.white,
                      fontSize: 10,
                      fontWeight: 600,
                      borderRadius: 100,
                      padding: "5px 12px",
                    }}
                  >
                    Approved
                  </div>
                )}
                {item.type === "icons" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 8,
                    }}
                  >
                    {[FileText, Wrench, Shield, Package, ClipboardList, Users].map(
                      (Icon, i) => (
                        <Icon
                          key={i}
                          size={16}
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        />
                      )
                    )}
                  </div>
                )}
                {item.type === "progress" && (
                  <div style={{ width: "100%", padding: "0 4px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                        Progress
                      </span>
                      <span style={{ fontSize: 10, color: P.accent, fontWeight: 600 }}>
                        64%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "64%",
                          height: "100%",
                          background: P.accent,
                          borderRadius: 100,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
                {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION C2 — Final Experience (Prototype Player)
───────────────────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    id: 0,
    label: "Login",
    url: "hexsolve.app/login",
    description: "Enterprise authentication with secure connection",
  },
  {
    id: 1,
    label: "Dashboard",
    url: "hexsolve.app/dashboard",
    description: "Project overview with real-time status indicators",
  },
  {
    id: 2,
    label: "Projects",
    url: "hexsolve.app/projects",
    description: "Full project management with search, filter and bulk actions",
  },
  {
    id: 3,
    label: "Project Detail",
    url: "hexsolve.app/project/ENG-2025-038",
    description: "Project context, team, documents and activity",
  },
  {
    id: 4,
    label: "Instruction Doc",
    url: "hexsolve.app/project/docs/AOI-225-R",
    description:
      "Three-panel navigation: section tree · instruction list · document info",
  },
  {
    id: 5,
    label: "Assembly",
    url: "hexsolve.app/assembly/step/4",
    description: "Immersive step-by-step assembly with inline context",
  },
  {
    id: 6,
    label: "QA Review",
    url: "hexsolve.app/qa/review",
    description: "Instruction verification, approval and team sign-offs",
  },
];

function noop(_screen: string) {}

function ScreenRenderer({ stepId }: { stepId: number }) {
  switch (stepId) {
    case 0:
      return <LoginScreen onNavigate={noop} />;
    case 1:
      return <DashboardScreen onNavigate={noop} />;
    case 2:
      return <ProjectsScreen onNavigate={noop} />;
    case 3:
      return <ProjectDetailScreen onNavigate={noop} />;
    case 4:
      return <InstructionDocScreen onNavigate={noop} />;
    case 5:
      return <AssemblyScreen onNavigate={noop} />;
    case 6:
      return <QAReviewScreen onNavigate={noop} />;
    default:
      return <DashboardScreen onNavigate={noop} />;
  }
}

export function SectionC_FinalExperience({ isInView }: { isInView: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActiveStep((s) => (s + 1) % STEPS.length);
      }, 2500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  return (
    <section style={{ background: P.surface, padding: "120px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: 64 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: P.appRed,
              marginBottom: 16,
            }}
          >
            Final Experience
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: P.ink,
              marginBottom: 12,
            }}
          >
            The full assembly flow — end to end.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: P.muted,
              maxWidth: 600,
            }}
          >
            Follow an assembly engineer from login to QA sign-off. Every screen
            comes directly from the live HexSolve prototype.
          </motion.p>
        </motion.div>

        {/* Player */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              background: P.white,
              border: `1px solid ${P.s3}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 0 8px",
                borderBottom: `1px solid ${P.s3}`,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: P.subtle,
                  padding: "0 16px",
                  marginBottom: 8,
                }}
              >
                Screens
              </p>
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 14px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeStep === step.id ? P.appRed : "transparent",
                    transition: "background 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background:
                        activeStep === step.id
                          ? "rgba(255,255,255,0.25)"
                          : P.s2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 9,
                      fontWeight: 700,
                      color:
                        activeStep === step.id
                          ? P.white
                          : P.muted,
                    }}
                  >
                    {step.id + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: activeStep === step.id ? 600 : 400,
                      color:
                        activeStep === step.id ? P.white : P.ink,
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {step.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Play/Pause */}
            <div style={{ padding: 12 }}>
              <button
                onClick={() => setPlaying((p) => !p)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "9px 0",
                  background: playing ? P.ink : P.appRed,
                  color: P.white,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 0.15s ease",
                }}
              >
                {playing ? (
                  <>
                    <Pause size={12} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={12} /> Auto-play
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Screen area */}
          <div>
            <AppFrame url={STEPS[activeStep].url}>
              <div
                style={{
                  height: 560,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        transform: "scale(0.75)",
                        transformOrigin: "top left",
                        width: "133.33%",
                        height: "133.33%",
                        overflow: "hidden",
                      }}
                    >
                      <ScreenRenderer stepId={activeStep} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </AppFrame>

            {/* Dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 20,
              }}
            >
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  style={{
                    width: activeStep === step.id ? 24 : 8,
                    height: 8,
                    borderRadius: 100,
                    background: activeStep === step.id ? P.appRed : P.s3,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Description */}
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 14, color: P.muted, lineHeight: 1.5 }}
                >
                  <span style={{ fontWeight: 600, color: P.ink }}>
                    {STEPS[activeStep].label}
                  </span>{" "}
                  — {STEPS[activeStep].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION C3 — Impact
───────────────────────────────────────────────────────────────────────────── */
export function SectionC_Impact({ isInView }: { isInView: boolean }) {
  const cards = [
    {
      icon: "01",
      headline: "Single source of truth",
      body: "Replacing fragmented documentation scattered across teams, folders and email threads.",
    },
    {
      icon: "02",
      headline: "4 roles served",
      body: "Through purpose-built interfaces sharing one consistent data model and real-time state.",
    },
    {
      icon: "03",
      headline: "Clear audit trail",
      body: "For every revision, enabling confident QA sign-off and regulatory compliance.",
    },
    {
      icon: "04",
      headline: "Faster cycles",
      body: "Through structured authoring that reduces rework from instruction ambiguity.",
    },
  ];

  return (
    <section style={{ background: P.white, padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: 64 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: P.appRed,
              marginBottom: 16,
            }}
          >
            Business Impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: P.ink,
            }}
          >
            What changed for the business
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 64,
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.icon}
              variants={fadeUp}
              style={{
                background: P.white,
                border: `1px solid ${P.s3}`,
                borderRadius: 16,
                padding: 32,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: P.appRed,
                  background: "rgba(204,41,41,0.08)",
                  borderRadius: 100,
                  padding: "4px 10px",
                  marginBottom: 20,
                }}
              >
                {card.icon}
              </span>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: P.ink,
                  marginBottom: 12,
                  letterSpacing: "-0.02em",
                }}
              >
                {card.headline}
              </h3>
              <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.65 }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Qualitative statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: P.accent,
              margin: "0 auto 28px",
            }}
          />
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.75,
              color: P.muted,
              fontStyle: "italic",
            }}
          >
            "The most meaningful outcome wasn't a metric. Assembly engineers
            reported that they felt more confident starting a job because they
            could verify at a glance that the document they were working from was
            the current approved version. In precision manufacturing, that
            confidence matters more than any quantitative measure."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION C4 — Reflection
───────────────────────────────────────────────────────────────────────────── */
export function SectionC_Reflection({ isInView }: { isInView: boolean }) {
  const statements = [
    {
      num: "01",
      text: "Enterprise UX is about clarity under complexity.",
    },
    {
      num: "02",
      text: "Good information architecture builds operational confidence.",
    },
    {
      num: "03",
      text: "Systems thinking scales better than isolated feature design.",
    },
    {
      num: "04",
      text: "Small interaction decisions have large consequences on the floor.",
    },
  ];

  return (
    <section style={{ background: P.s2, padding: "120px 0" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginBottom: 64 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: P.appRed,
              marginBottom: 16,
            }}
          >
            Reflection
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: P.ink,
            }}
          >
            What I took away
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          {statements.map((s) => (
            <motion.div
              key={s.num}
              variants={slideLeft}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 28,
                paddingBottom: 32,
                borderBottom: `1px solid ${P.s3}`,
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: P.s3,
                  lineHeight: 1,
                  flexShrink: 0,
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                }}
              >
                {s.num}
              </span>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: P.ink,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION C5 — Next Project
───────────────────────────────────────────────────────────────────────────── */
export function SectionC_Next({ isInView }: { isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ background: P.ink, padding: "100px 0 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* Label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            textAlign: "center",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: 40,
          }}
        >
          Next Case Study
        </motion.p>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "#1a1a1a",
            borderRadius: 28,
            border: `1px solid ${hovered ? "rgba(200,169,110,0.3)" : "rgba(255,255,255,0.06)"}`,
            padding: "56px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 64,
            alignItems: "center",
            cursor: "pointer",
            transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 40px 80px rgba(0,0,0,0.4)"
              : "0 20px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: P.accent,
                marginBottom: 16,
              }}
            >
              Enterprise SaaS · B2B
            </p>
            <h3
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: P.white,
                lineHeight: 1.2,
                marginBottom: 28,
              }}
            >
              Designing for complexity
              <br />
              where every decision
              <br />
              costs money
            </h3>
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: P.accent,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "gap 0.2s ease",
              }}
            >
              View case study
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Placeholder image */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "rgba(200,169,110,0.1)",
                border: "1px solid rgba(200,169,110,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 24 }}>✦</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 80,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255,255,255,0.4)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            ← Back to all work
          </Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            © 2024 Manisha. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
