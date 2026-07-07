"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
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
  AlertTriangle,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { PortfolioNav } from "@/components/PortfolioNav";
import { HeroDemo } from "./hero-demo";

import Image from "next/image";
import { LoginScreen } from "./prototype/screens/login";
import { DashboardScreen } from "./prototype/screens/dashboard";
import { ProjectsScreen } from "./prototype/screens/projects";
import { ProjectDetailScreen } from "./prototype/screens/project-detail";
import { InstructionDocScreen } from "./prototype/screens/instruction-doc";
import { AssemblyScreen } from "./prototype/screens/assembly";
import { QAReviewScreen } from "./prototype/screens/qa-review";

/* ─────────────────────────────────────────────────────────────────────────────
   Palette
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
   Shared Variants
───────────────────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────────────────────────────────────
   AppFrame
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
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
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
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{url}</span>
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SectionLabel
───────────────────────────────────────────────────────────────────────────── */
function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: dark ? P.accent : P.appRed,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   noop navigate for prototype screens
───────────────────────────────────────────────────────────────────────────── */
function noop(_screen: string) {}

/* ─────────────────────────────────────────────────────────────────────────────
   Prototype Steps
───────────────────────────────────────────────────────────────────────────── */
const PROTO_STEPS = [
  { id: 0, label: "Login",           url: "hexsolve.app/login",                  description: "Enterprise authentication with secure connection" },
  { id: 1, label: "Dashboard",       url: "hexsolve.app/dashboard",              description: "Project overview with real-time status indicators" },
  { id: 2, label: "Projects",        url: "hexsolve.app/projects",               description: "Full project management with search, filter and bulk actions" },
  { id: 3, label: "Project Detail",  url: "hexsolve.app/project/ENG-2025-038",   description: "Project context, team, documents and activity" },
  { id: 4, label: "Instruction Doc", url: "hexsolve.app/project/docs/AOI-225-R", description: "Three-panel navigation: section tree · instruction list · document info" },
  { id: 5, label: "Assembly",        url: "hexsolve.app/assembly/step/4",        description: "Immersive step-by-step assembly with inline context" },
  { id: 6, label: "QA Review",       url: "hexsolve.app/qa/review",              description: "Instruction verification, approval and team sign-offs" },
];

function ScreenRenderer({ stepId }: { stepId: number }) {
  switch (stepId) {
    case 0:  return <LoginScreen onNavigate={noop} />;
    case 1:  return <DashboardScreen onNavigate={noop} />;
    case 2:  return <ProjectsScreen onNavigate={noop} />;
    case 3:  return <ProjectDetailScreen onNavigate={noop} />;
    case 4:  return <InstructionDocScreen onNavigate={noop} />;
    case 5:  return <AssemblyScreen onNavigate={noop} />;
    case 6:  return <QAReviewScreen onNavigate={noop} />;
    default: return <DashboardScreen onNavigate={noop} />;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function HexSolvePage() {
  /* ── Scroll-based nav ── */
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(249,248,246,0)", "rgba(249,248,246,0.97)"]); // kept for potential future use
  // navShadow removed — now handled by PortfolioNav

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set((e.clientX - cx) / cx);
    mouseY.set((e.clientY - cy) / cy);
  }

  /* ── Scroll to top on mount ── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ── Process auto-cycle ── */
  const [activeProcess, setActiveProcess] = useState(0);
  const totalProcess = 12;
  useEffect(() => {
    const id = setInterval(() => {
      setActiveProcess((p) => (p + 1) % totalProcess);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  /* ── Prototype player ── */
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % PROTO_STEPS.length);
    }, 2500);
    return () => clearInterval(id);
  }, [playing]);

  /* ── Next card hover ── */
  const [nextHovered, setNextHovered] = useState(false);

  /* ── Section refs + inView ── */
  const heroRef     = useRef<HTMLDivElement>(null);
  const contextRef  = useRef<HTMLDivElement>(null);
  const wfRef       = useRef<HTMLDivElement>(null);
  const dsRef       = useRef<HTMLDivElement>(null);
  const resRef      = useRef<HTMLDivElement>(null);
  const insRef      = useRef<HTMLDivElement>(null);
  const probRef     = useRef<HTMLDivElement>(null);
  const procRef     = useRef<HTMLDivElement>(null);
  const iaRef       = useRef<HTMLDivElement>(null);
  const ixRef       = useRef<HTMLDivElement>(null);
  const wireRef     = useRef<HTMLDivElement>(null);
  const valRef      = useRef<HTMLDivElement>(null);
  const tokRef      = useRef<HTMLDivElement>(null);
  const protoRef    = useRef<HTMLDivElement>(null);
  const impactRef   = useRef<HTMLDivElement>(null);
  const refRef      = useRef<HTMLDivElement>(null);
  const nextRef     = useRef<HTMLDivElement>(null);

  const heroInView    = useInView(heroRef,    { once: true, amount: 0.1 });
  const contextInView = useInView(contextRef, { once: true, amount: 0.1 });
  const wfInView      = useInView(wfRef,      { once: true, amount: 0.1 });
  const dsInView      = useInView(dsRef,      { once: true, amount: 0.1 });
  const resInView     = useInView(resRef,     { once: true, amount: 0.1 });
  const insInView     = useInView(insRef,     { once: true, amount: 0.1 });
  const probInView    = useInView(probRef,    { once: true, amount: 0.1 });
  const procInView    = useInView(procRef,    { once: true, amount: 0.1 });
  const iaInView      = useInView(iaRef,      { once: true, amount: 0.1 });
  const ixInView      = useInView(ixRef,      { once: true, amount: 0.1 });
  const wireInView    = useInView(wireRef,    { once: true, amount: 0.1 });
  const valInView     = useInView(valRef,     { once: true, amount: 0.1 });
  const tokInView     = useInView(tokRef,     { once: true, amount: 0.1 });
  const protoInView   = useInView(protoRef,   { once: true, amount: 0.1 });
  const impactInView  = useInView(impactRef,  { once: true, amount: 0.1 });
  const refInView     = useInView(refRef,     { once: true, amount: 0.1 });
  const nextInView    = useInView(nextRef,    { once: true, amount: 0.1 });

  return (
    <div style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", background: P.surface, minHeight: "100vh" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <PortfolioNav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          background: P.ink, position: "relative", overflow: "hidden",
        }}
      >
        {/* Subtle red radial glow behind the screen mockup */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 55% 70% at 75% 50%, rgba(204,41,41,0.07) 0%, transparent 65%)",
        }} />

        {/* Split layout: headline left, demo right */}
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: 60, alignItems: "center",
          minHeight: "100vh", position: "relative", zIndex: 1,
          padding: "0 64px",
        }}>
          {/* LEFT — headline */}
          <motion.div
            variants={stagger} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: P.accent, marginBottom: 28,
            }}>Case Study — HexSolve</motion.p>

            <motion.h1 variants={fadeUp} style={{
              fontSize: "clamp(36px, 4vw, 72px)", fontWeight: 900,
              lineHeight: 1.0, color: P.white,
              marginBottom: 28,
            }}>
              Engineering a single source of truth for precision assembly
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.45)",
              maxWidth: 460,
            }}>
              How I designed an enterprise instruction management platform that unified
              four distinct engineering roles under one coherent system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 12 }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 36, background: "rgba(255,255,255,0.18)" }}
              />
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll to explore</p>
            </motion.div>
          </motion.div>

          {/* RIGHT — animated demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{
              x: useTransform(springX, [-1, 1], [-6, 6]),
              y: useTransform(springY, [-1, 1], [-4, 4]),
            }}
          >
            <HeroDemo />
          </motion.div>
        </div>

        {/* ── Metadata strip ── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          position: "relative", zIndex: 2,
        }}>
          <div style={{
            maxWidth: 1440, margin: "0 auto", padding: "20px 64px",
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32,
          }}>
            {[
              { label: "Role", value: "UX Designer" },
              { label: "Industry", value: "Industrial Manufacturing" },
              { label: "Platform", value: "Enterprise Web App" },
              { label: "Scope", value: "End-to-End Design" },
              { label: "Users", value: "4 Distinct Roles" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEXT ──────────────────────────────────────────────────────── */}
      <section ref={contextRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={contextInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          >
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Context</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 20, lineHeight: 1.15 }}>
                Four roles. One messy workflow.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.75, color: P.muted, marginBottom: 16 }}>
                HexSolve serves a rotary engine manufacturing business. Each engine overhaul involves Authors who write instruction documents, Engineers who execute them, Managers who track projects, and QA who verify every step.
              </motion.p>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.75, color: P.muted }}>
                Before HexSolve, these roles operated in silos — documents lived in email attachments, version control was manual, and QA sign-offs happened on printed sheets.
              </motion.p>
            </div>

            <motion.div variants={scaleIn}
              style={{ position: "relative", height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ position: "relative", width: 280, height: 280 }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                  width: 80, height: 80, borderRadius: "50%",
                  background: P.appRed, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 12px rgba(204,41,41,0.1)", zIndex: 2,
                }}>
                  <span style={{ color: P.white, fontWeight: 800, fontSize: 9, letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.2 }}>Hex<br/>Solve</span>
                </div>
                {[
                  { label: "Author",   angle: -90, color: "#2563EB" },
                  { label: "Engineer", angle:   0, color: "#059669" },
                  { label: "Manager",  angle:  90, color: "#D97706" },
                  { label: "QA",       angle: 180, color: "#7C3AED" },
                ].map(({ label, angle, color }) => {
                  const r = 112;
                  const rad = (angle * Math.PI) / 180;
                  const x = 140 + r * Math.cos(rad);
                  const y = 140 + r * Math.sin(rad);
                  return (
                    <div key={label} style={{
                      position: "absolute", left: x - 32, top: y - 24,
                      width: 64, height: 48, background: P.white,
                      border: `1px solid ${color}30`, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 4px 12px ${color}18`,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EXISTING WORKFLOW ────────────────────────────────────────────── */}
      <section ref={wfRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={wfInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Existing Workflow</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>The before state</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={wfInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}
          >
            {[
              { step: "01", label: "Author writes doc",   tool: "Microsoft Word", pain: "No version control" },
              { step: "02", label: "Email to manager",    tool: "Outlook",        pain: "Lost in threads" },
              { step: "03", label: "Print & distribute",  tool: "PDF printer",    pain: "Out of date copies" },
              { step: "04", label: "Engineer assembles",  tool: "Paper sheet",    pain: "Can't flag issues" },
              { step: "05", label: "QA signs paper",      tool: "Physical form",  pain: "No audit trail" },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} style={{ position: "relative" }}>
                {i < 4 && <div style={{ position: "absolute", top: 28, right: -1, zIndex: 1, width: 24, height: 1, background: P.s3 }} />}
                <div style={{ background: P.white, border: `1px solid ${P.s3}`, borderRadius: 12, padding: "24px 20px", marginRight: i < 4 ? 1 : 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: P.subtle, letterSpacing: "0.1em", display: "block", marginBottom: 10 }}>{item.step}</span>
                  <p style={{ fontSize: 13, fontWeight: 600, color: P.ink, marginBottom: 6 }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: P.subtle, marginBottom: 12 }}>{item.tool}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(204,41,41,0.07)", borderRadius: 6, padding: "4px 8px" }}>
                    <AlertTriangle size={10} style={{ color: P.appRed }} />
                    <span style={{ fontSize: 10, color: P.appRed, fontWeight: 600 }}>{item.pain}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DOCUMENT STRUCTURE ───────────────────────────────────────────── */}
      <section ref={dsRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={dsInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}
          >
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Document Structure</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 20, lineHeight: 1.15 }}>
                Understanding the content hierarchy
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.75, color: P.muted }}>
                Before designing any interface, I needed to understand the full taxonomy of an assembly instruction document — how sections nested, how steps referenced tools and parts, and how approvals cascaded.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} style={{ padding: "24px" }}>
              {[
                { level: 0, label: "Assembly Instruction Document", color: P.appRed },
                { level: 1, label: "Section 1: Disassembly",        color: "#2563EB" },
                { level: 2, label: "Step 1.1: Remove intake",       color: P.muted },
                { level: 2, label: "Step 1.2: Drain coolant",       color: P.muted },
                { level: 1, label: "Section 2: Inspection",         color: "#2563EB" },
                { level: 2, label: "Step 2.1: Visual check",        color: P.muted },
                { level: 1, label: "Section 3: Reassembly",         color: "#2563EB" },
                { level: 2, label: "Step 3.1: Install seals",       color: P.muted },
              ].map((node, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: node.level * 24, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: P.ink, fontWeight: node.level === 0 ? 700 : node.level === 1 ? 600 : 400 }}>{node.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────────── */}
      <section ref={resRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={resInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Research</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>How I understood the problem</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={resInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              { type: "Contextual Inquiry",    n: "5 sessions", desc: "Shadowed assembly engineers on the floor during active jobs to understand real-time needs." },
              { type: "Stakeholder Interviews", n: "8 people",   desc: "Spoke with authors, QA leads, and shop managers to map decision points and pain moments." },
              { type: "Artifact Analysis",      n: "12 documents", desc: "Analysed existing instruction documents to understand structure, length, and versioning patterns." },
            ].map((item) => (
              <motion.div key={item.type} variants={fadeUp} style={{ background: P.white, border: `1px solid ${P.s3}`, borderRadius: 16, padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: P.appRed }}>{item.type}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: P.appRed, background: "rgba(204,41,41,0.08)", borderRadius: 100, padding: "3px 8px" }}>{item.n}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: P.muted }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── KEY INSIGHTS ─────────────────────────────────────────────────── */}
      <section ref={insRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={insInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Key Insights</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>What the research revealed</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={insInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}
          >
            {[
              { n: "01", insight: "Engineers wasted 20+ minutes verifying document currency before each job." },
              { n: "02", insight: "Authors had no visibility into which version engineers were actually using." },
              { n: "03", insight: "Managers tracked status manually in spreadsheets alongside the actual system." },
              { n: "04", insight: "QA reviewers re-read full documents because change diffs were unavailable." },
              { n: "05", insight: "Every role had a different mental model for what 'approved' meant." },
            ].map((item) => (
              <motion.div key={item.n} variants={fadeUp} style={{ background: P.s2, border: `1px solid ${P.s3}`, borderRadius: 14, padding: "24px 20px" }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: P.s3, letterSpacing: "-0.05em", display: "block", marginBottom: 12 }}>{item.n}</span>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: P.ink, fontWeight: 500 }}>{item.insight}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ────────────────────────────────────────────── */}
      <section ref={probRef} style={{ background: P.ink, padding: "100px 0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <motion.div variants={stagger} initial="hidden" animate={probInView ? "visible" : "hidden"}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: P.accent, marginBottom: 32 }}>
              Problem Statement
            </motion.p>
            <motion.blockquote variants={fadeUp} style={{
              fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 1.3, color: P.white, margin: 0, marginBottom: 40,
            }}>
              "How might we give every role in the assembly process a shared, always-current view of instruction documents — eliminating the ambiguity that causes rework, delays, and compliance risk?"
            </motion.blockquote>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {["Document currency", "Role-specific views", "Audit trail", "Version confidence"].map((tag) => (
                <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.07)", borderRadius: 100, padding: "6px 14px" }}>{tag}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section ref={procRef} style={{ background: P.surface, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={procInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Process</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 8 }}>
              Design process overview
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, color: P.muted }}>
              Dec 2021 — Mar 2022 &nbsp;·&nbsp; 16 weeks end-to-end
            </motion.p>
          </motion.div>

          {/* Gantt chart */}
          <motion.div variants={fadeUp} initial="hidden" animate={procInView ? "visible" : "hidden"}>
            {/* Month header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 0,
              marginBottom: 4,
            }}>
              <div />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", paddingLeft: 2 }}>
                {["Dec 2021", "Jan 2022", "Feb 2022", "Mar 2022"].map((month, mi) => (
                  <div
                    key={month}
                    style={{
                      gridColumn: `${mi * 4 + 1} / span 4`,
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
                      textTransform: "uppercase", color: P.muted,
                      paddingBottom: 10, borderBottom: `1px solid ${P.s3}`,
                    }}
                  >{month}</div>
                ))}
              </div>
            </div>

            {/* Week tick marks */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 0, marginBottom: 2 }}>
              <div />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)" }}>
                {Array.from({ length: 16 }).map((_, wi) => (
                  <div key={wi} style={{
                    fontSize: 9, color: P.subtle, textAlign: "center",
                    paddingBottom: 6,
                  }}>W{wi + 1}</div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {[
              { phase: "Discovery & Research",    start: 0,  span: 3,  color: "#2563EB", category: "Research" },
              { phase: "Stakeholder Workshops",   start: 0,  span: 2,  color: "#2563EB", category: "Research" },
              { phase: "Requirements Synthesis",  start: 2,  span: 2,  color: "#7C3AED", category: "Strategy" },
              { phase: "Problem Framing",         start: 3,  span: 2,  color: "#7C3AED", category: "Strategy" },
              { phase: "Information Architecture",start: 4,  span: 2,  color: P.accent,  category: "Design" },
              { phase: "Interaction Design",      start: 5,  span: 3,  color: P.accent,  category: "Design" },
              { phase: "Wireframes",              start: 6,  span: 3,  color: P.accent,  category: "Design" },
              { phase: "Stakeholder Validation",  start: 8,  span: 2,  color: "#D97706", category: "Validate" },
              { phase: "Design System",           start: 9,  span: 3,  color: P.appRed,  category: "Build" },
              { phase: "Visual Design",           start: 10, span: 3,  color: P.appRed,  category: "Build" },
              { phase: "Prototype",               start: 12, span: 2,  color: P.appRed,  category: "Build" },
              { phase: "Iteration & Sign-off",    start: 13, span: 3,  color: "#059669", category: "Deliver" },
            ].map((row, ri) => (
              <motion.div
                key={row.phase}
                initial={{ opacity: 0, x: -16 }}
                animate={procInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: ri * 0.05, duration: 0.45, ease: "easeOut" }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: 0,
                  marginBottom: 4,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = P.s2)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* Phase label */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  paddingRight: 16, paddingTop: 6, paddingBottom: 6,
                }}>
                  <div style={{
                    width: 3, height: 28, borderRadius: 2, background: row.color, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: P.muted, lineHeight: 1.3 }}>{row.phase}</span>
                </div>

                {/* Bar track */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(16, 1fr)",
                  alignItems: "center", paddingTop: 6, paddingBottom: 6,
                  borderBottom: `1px solid ${P.s2}`,
                }}>
                  {/* Empty cells before bar */}
                  {row.start > 0 && (
                    <div style={{ gridColumn: `1 / span ${row.start}` }} />
                  )}
                  {/* Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={procInView ? { scaleX: 1 } : {}}
                    transition={{ delay: ri * 0.05 + 0.15, duration: 0.5, ease: "easeOut" }}
                    style={{
                      gridColumn: `${row.start + 1} / span ${row.span}`,
                      height: 28, borderRadius: 6,
                      background: row.color,
                      opacity: 0.85,
                      display: "flex", alignItems: "center", paddingLeft: 10,
                      transformOrigin: "left center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Subtle shimmer stripe */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 60%)",
                      borderRadius: 6,
                    }} />
                    {row.span >= 2 && (
                      <span style={{
                        fontSize: 10, fontWeight: 600, color: "white",
                        letterSpacing: "0.02em", position: "relative", zIndex: 1,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{row.category}</span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div style={{
              marginTop: 28, display: "flex", gap: 24, flexWrap: "wrap", paddingTop: 20,
              borderTop: `1px solid ${P.s3}`,
            }}>
              {[
                { label: "Research",  color: "#2563EB" },
                { label: "Strategy",  color: "#7C3AED" },
                { label: "Design",    color: P.accent },
                { label: "Validate",  color: "#D97706" },
                { label: "Build",     color: P.appRed },
                { label: "Deliver",   color: "#059669" },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: P.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INFORMATION ARCHITECTURE ─────────────────────────────────────── */}
      <section ref={iaRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={iaInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Information Architecture</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>Four role trees, one data model</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={iaInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}
          >
            {[
              { role: "Author",      color: "#2563EB", nodes: ["Dashboard", "Document Editor", "Section Manager", "Step Editor", "Version History", "Submit for Review"] },
              { role: "Manager",     color: "#D97706", nodes: ["Project Dashboard", "Project List", "Project Detail", "Team Overview", "Approval Queue", "Reports"] },
              { role: "Engineer",    color: "#059669", nodes: ["My Jobs", "Assembly Workspace", "Step View", "Instruction Panel", "Flag Issue", "Mark Complete"] },
              { role: "QA Reviewer", color: "#7C3AED", nodes: ["QA Queue", "Review Interface", "Change Diff View", "Annotation Tool", "Approval Sign-off", "Audit Log"] },
            ].map((col) => (
              <motion.div key={col.role} variants={fadeUp}>
                <div style={{ background: col.color, borderRadius: "12px 12px 0 0", padding: "14px 18px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{col.role}</span>
                </div>
                <div style={{ border: `1px solid ${P.s3}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                  {col.nodes.map((node, i) => (
                    <div key={node} style={{ padding: "10px 18px", borderBottom: i < col.nodes.length - 1 ? `1px solid ${P.s2}` : "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: `${col.color}50`, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: P.ink }}>{node}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INTERACTION DESIGN ───────────────────────────────────────────── */}
      <section ref={ixRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={ixInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Interaction Design</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>Three decisions that shaped the product</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={ixInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: 64 }}
          >
            {[
              {
                n: "01",
                decision: "Three-panel instruction viewer",
                rationale: "Engineers needed section overview, instruction list, and document metadata simultaneously — not in sequential tabs.",
                screen: 4, url: "hexsolve.app/project/docs/AOI-225-R",
              },
              {
                n: "02",
                decision: "Immersive full-screen assembly workspace",
                rationale: "On the factory floor, split attention is dangerous. The assembly workspace hides navigation chrome and centres the current instruction step.",
                screen: 5, url: "hexsolve.app/assembly/step/4",
              },
              {
                n: "03",
                decision: "Change-diff in QA review",
                rationale: "QA reviewers were reading entire documents on every revision. Highlighting only what changed reduced review time and focused attention where it matters.",
                screen: 6, url: "hexsolve.app/qa/review",
              },
            ].map((item, i) => (
              <motion.div key={item.n} variants={fadeUp} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                gap: 48, alignItems: "center",
              }}>
                {i % 2 === 0 ? (
                  <>
                    <div>
                      <span style={{ fontSize: 48, fontWeight: 900, color: P.s3, letterSpacing: "-0.05em", display: "block", marginBottom: 16, lineHeight: 1 }}>{item.n}</span>
                      <h3 style={{ fontSize: 22, color: P.ink, marginBottom: 14, }}>{item.decision}</h3>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: P.muted }}>{item.rationale}</p>
                    </div>
                    <AppFrame url={item.url}>
                      <div style={{ height: 340, overflow: "hidden", position: "relative" }}>
                        <div style={{ transform: "scale(0.7)", transformOrigin: "top left", width: "142.86%", height: "142.86%", overflow: "hidden" }}>
                          <ScreenRenderer stepId={item.screen} />
                        </div>
                      </div>
                    </AppFrame>
                  </>
                ) : (
                  <>
                    <AppFrame url={item.url}>
                      <div style={{ height: 340, overflow: "hidden", position: "relative" }}>
                        <div style={{ transform: "scale(0.7)", transformOrigin: "top left", width: "142.86%", height: "142.86%", overflow: "hidden" }}>
                          <ScreenRenderer stepId={item.screen} />
                        </div>
                      </div>
                    </AppFrame>
                    <div>
                      <span style={{ fontSize: 48, fontWeight: 900, color: P.s3, letterSpacing: "-0.05em", display: "block", marginBottom: 16, lineHeight: 1 }}>{item.n}</span>
                      <h3 style={{ fontSize: 22, color: P.ink, marginBottom: 14, }}>{item.decision}</h3>
                      <p style={{ fontSize: 15, lineHeight: 1.7, color: P.muted }}>{item.rationale}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WIREFRAMES ───────────────────────────────────────────────────── */}
      <section ref={wireRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={wireInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Wireframes</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>From whiteboard to structure</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 16, color: P.muted, maxWidth: 640, lineHeight: 1.7, marginTop: 16 }}>
              Every screen started as a wireframe — low fidelity, fast to change, focused on flow over form.
              These six screens represent the six distinct roles in the platform, each with a different mental model and workflow priority.
            </motion.p>
          </motion.div>

          {/* Wireframe grid — actual Figma wireframes */}
          <motion.div variants={stagger} initial="hidden" animate={wireInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              { src: "/hexsolve/wireframes/wf-login.png",           label: "Login & Auth",        desc: "Dual-panel: brand story left, credential entry right" },
              { src: "/hexsolve/wireframes/wf-dashboard.png",       label: "Dashboard",           desc: "At-a-glance project health, assignments, recent activity" },
              { src: "/hexsolve/wireframes/wf-projects.png",        label: "Project List",        desc: "Filterable table with status, priority and quick actions" },
              { src: "/hexsolve/wireframes/wf-project-detail.png",  label: "Project Detail",      desc: "Context hub — documents, team, timeline in one view" },
              { src: "/hexsolve/wireframes/wf-instruction-doc.png", label: "Instruction Document",desc: "Three-panel: tree · steps · metadata for zero-context-switch reading" },
              { src: "/hexsolve/wireframes/wf-assembly.png",        label: "Assembly Workspace",  desc: "Step-by-step assembly with inline media and QA checkpoints" },
            ].map(({ src, label, desc }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${P.s3}`, background: P.s2 }}
              >
                <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block" }}
                  />
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: P.ink, margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontSize: 12, color: P.muted, margin: 0, lineHeight: 1.5 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALIDATION ───────────────────────────────────────────────────── */}
      <section ref={valRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={valInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Validation</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>Testing three approaches</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={valInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }}
          >
            {[
              { variant: "A", label: "Sidebar navigation",       result: "Engineers kept losing context switching tabs",                    selected: false },
              { variant: "B", label: "Three-panel fixed layout",  result: "Faster orientation. Engineers reported feeling 'in control'",     selected: true  },
              { variant: "C", label: "Progressive disclosure",    result: "Too many clicks for simple lookups during assembly",             selected: false },
            ].map((v) => (
              <motion.div key={v.variant} variants={fadeUp} style={{
                background: v.selected ? P.ink : P.white,
                border: `1px solid ${v.selected ? "transparent" : P.s3}`,
                borderRadius: 16, padding: 28, position: "relative",
              }}>
                {v.selected && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: P.appRed, borderRadius: 100, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "white" }}>Selected</div>
                )}
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: v.selected ? "rgba(255,255,255,0.1)" : P.s2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: v.selected ? P.white : P.ink }}>{v.variant}</span>
                </div>
                <h3 style={{ fontSize: 15, color: v.selected ? P.white : P.ink, marginBottom: 10 }}>{v.label}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: v.selected ? "rgba(255,255,255,0.55)" : P.muted }}>{v.result}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={valInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
          >
            {[
              { quote: "I can see exactly which section I'm in without clicking back. That's how it should work.", role: "Assembly Engineer" },
              { quote: "The diff highlight in QA review is brilliant — I only need to focus on what changed.", role: "QA Lead" },
            ].map((q) => (
              <motion.div key={q.role} variants={fadeUp} style={{ background: P.white, border: `1px solid ${P.s3}`, borderRadius: 16, padding: 28 }}>
                <div style={{ width: 24, height: 2, background: P.accent, marginBottom: 18 }} />
                <p style={{ fontSize: 15, lineHeight: 1.7, color: P.ink, fontStyle: "italic", marginBottom: 16 }}>"{q.quote}"</p>
                <span style={{ fontSize: 11, fontWeight: 600, color: P.subtle, textTransform: "uppercase", letterSpacing: "0.1em" }}>— {q.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VISUAL LANGUAGE ──────────────────────────────────────────────── */}
      <section ref={tokRef} style={{ background: P.ink, padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 72 }}
          >
            <div>
              <motion.div variants={fadeUp}><SectionLabel dark>Visual Language</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 40, lineHeight: 1.1, color: P.white }}>
                Building once,<br />scaling everywhere
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.48)", alignSelf: "flex-end" }}>
              The design system was not about aesthetics — it was about reducing ambiguity. Every component answered a specific question about how information should be presented.
            </motion.p>
          </motion.div>

          {/* Row 1 */}
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 16 }}
          >
            {[
              { type: "color", name: "Ink",         hex: "#0e0e0e", swatch: "#0e0e0e", border: false },
              { type: "color", name: "App Red",     hex: "#CC2929", swatch: "#CC2929", border: false },
              { type: "color", name: "Accent Gold", hex: "#c8a96e", swatch: "#c8a96e", border: false },
              { type: "color", name: "Surface",     hex: "#f9f8f6", swatch: "#f9f8f6", border: true  },
              { type: "type",  name: "Display / 48px", size: 48 },
              { type: "type",  name: "Body / 14px",    size: 24 },
            ].map((item) => (
              <motion.div key={item.name} variants={fadeUp} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12, minHeight: 140,
              }}>
                {item.type === "color" ? (
                  <>
                    <div style={{ width: "100%", height: 64, borderRadius: 8, background: item.swatch, border: item.border ? "1px solid rgba(255,255,255,0.2)" : "none", flexShrink: 0 }} />
                    <div style={{ marginTop: "auto" }}>
                      <p style={{ color: P.white, fontSize: 13, fontWeight: 600 }}>{item.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{item.hex}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: P.white, fontSize: item.size, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>Aa</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{item.name}</p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}
          >
            {[
              { type: "btn-primary",  name: "Primary Button" },
              { type: "btn-ghost",    name: "Ghost Button" },
              { type: "badge-active", name: "Status: Active" },
              { type: "badge-approved", name: "Status: Approved" },
              { type: "icons",        name: "Icon Set" },
              { type: "progress",     name: "Progress" },
            ].map((item) => (
              <motion.div key={item.name} variants={fadeUp} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12, minHeight: 140,
              }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.type === "btn-primary" && (
                    <div style={{ background: P.appRed, color: P.white, fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "8px 12px", whiteSpace: "nowrap" }}>Save and Proceed</div>
                  )}
                  {item.type === "btn-ghost" && (
                    <div style={{ color: P.white, fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "8px 12px", border: "1px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>Cancel</div>
                  )}
                  {item.type === "badge-active" && (
                    <div style={{ background: P.appRed, color: P.white, fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "5px 12px" }}>Active</div>
                  )}
                  {item.type === "badge-approved" && (
                    <div style={{ background: "#059669", color: P.white, fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "5px 12px" }}>Approved</div>
                  )}
                  {item.type === "icons" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {[FileText, Wrench, Shield, Package, ClipboardList, Users].map((Icon, i) => (
                        <Icon key={i} size={16} style={{ color: "rgba(255,255,255,0.35)" }} />
                      ))}
                    </div>
                  )}
                  {item.type === "progress" && (
                    <div style={{ width: "100%", padding: "0 4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Progress</span>
                        <span style={{ fontSize: 10, color: P.accent, fontWeight: 600 }}>64%</span>
                      </div>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ width: "64%", height: "100%", background: P.accent, borderRadius: 100 }} />
                      </div>
                    </div>
                  )}
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{item.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL EXPERIENCE (Prototype Player) ──────────────────────────── */}
      <section ref={protoRef} style={{ background: P.surface, padding: "120px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={protoInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Final Experience</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink, marginBottom: 12 }}>
              The full assembly flow — end to end.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 16, lineHeight: 1.7, color: P.muted, maxWidth: 600 }}>
              Follow an assembly engineer from login to QA sign-off. Every screen comes directly from the live HexSolve prototype.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={protoInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start" }}
          >
            {/* Sidebar */}
            <div style={{ background: P.white, border: `1px solid ${P.s3}`, borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "16px 0 8px", borderBottom: `1px solid ${P.s3}` }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: P.subtle, padding: "0 16px", marginBottom: 8 }}>Screens</p>
                {PROTO_STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 14px", border: "none", cursor: "pointer",
                      background: activeStep === step.id ? P.appRed : "transparent",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: activeStep === step.id ? "rgba(255,255,255,0.25)" : P.s2,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: 9, fontWeight: 700,
                      color: activeStep === step.id ? P.white : P.muted,
                    }}>{step.id + 1}</span>
                    <span style={{
                      fontSize: 12, fontWeight: activeStep === step.id ? 600 : 400,
                      color: activeStep === step.id ? P.white : P.ink,
                      textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{step.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ padding: 12 }}>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "9px 0", background: playing ? P.ink : P.appRed, color: P.white,
                    border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
                    transition: "background 0.15s ease",
                  }}
                >
                  {playing ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Auto-play</>}
                </button>
              </div>
            </div>

            {/* Screen area */}
            <div>
              <AppFrame url={PROTO_STEPS[activeStep].url}>
                <div style={{ height: 560, overflow: "hidden", position: "relative" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
                    >
                      <div style={{ transform: "scale(0.75)", transformOrigin: "top left", width: "133.33%", height: "133.33%", overflow: "hidden" }}>
                        <ScreenRenderer stepId={activeStep} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </AppFrame>

              {/* Dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
                {PROTO_STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    style={{
                      width: activeStep === step.id ? 24 : 8, height: 8, borderRadius: 100,
                      background: activeStep === step.id ? P.appRed : P.s3,
                      border: "none", cursor: "pointer", transition: "all 0.2s ease", padding: 0,
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
                    <span style={{ fontWeight: 600, color: P.ink }}>{PROTO_STEPS[activeStep].label}</span>
                    {" "}—{" "}
                    {PROTO_STEPS[activeStep].description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BUSINESS IMPACT ──────────────────────────────────────────────── */}
      <section ref={impactRef} style={{ background: P.white, padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={impactInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Business Impact</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink }}>What changed for the business</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={impactInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 64 }}
          >
            {[
              { n: "01", headline: "Single source of truth", body: "Replacing fragmented documentation across all teams, folders and email threads." },
              { n: "02", headline: "4 roles served",         body: "Through purpose-built interfaces sharing one consistent data model." },
              { n: "03", headline: "Clear audit trail",      body: "For every revision enabling confident QA and compliance sign-off." },
              { n: "04", headline: "Faster cycles",          body: "Through structured authoring reducing rework from instruction ambiguity." },
            ].map((card) => (
              <motion.div key={card.n} variants={fadeUp} style={{ background: P.white, border: `1px solid ${P.s3}`, borderRadius: 16, padding: 32 }}>
                <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: P.appRed, background: "rgba(204,41,41,0.08)", borderRadius: 100, padding: "4px 10px", marginBottom: 20 }}>{card.n}</span>
                <h3 style={{ fontSize: 18, color: P.ink, marginBottom: 12, }}>{card.headline}</h3>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.65 }}>{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={impactInView ? "visible" : "hidden"}
            style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "40px 0" }}
          >
            <div style={{ width: 32, height: 2, background: P.accent, margin: "0 auto 28px" }} />
            <p style={{ fontSize: 18, lineHeight: 1.75, color: P.muted, fontStyle: "italic" }}>
              "The most meaningful outcome wasn't a metric. Assembly engineers reported that they felt more confident starting a job because they could verify at a glance that the document they were working from was the current approved version. In precision manufacturing, that confidence matters more than any quantitative measure."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── REFLECTION ───────────────────────────────────────────────────── */}
      <section ref={refRef} style={{ background: P.s2, padding: "120px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={refInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Reflection</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink }}>What I took away</motion.h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" animate={refInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}
          >
            {[
              { num: "01", text: "Enterprise UX is about clarity under complexity." },
              { num: "02", text: "Good information architecture builds operational confidence." },
              { num: "03", text: "Systems thinking scales better than isolated feature design." },
              { num: "04", text: "Small interaction decisions have large consequences on the floor." },
            ].map((s) => (
              <motion.div key={s.num} variants={slideLeft} style={{
                display: "flex", alignItems: "baseline", gap: 28,
                paddingBottom: 32, borderBottom: `1px solid ${P.s3}`,
              }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: P.s3, lineHeight: 1, flexShrink: 0, letterSpacing: "-0.04em", userSelect: "none" }}>{s.num}</span>
                <p style={{ fontSize: 20, fontWeight: 600, color: P.ink, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEXT PROJECT ─────────────────────────────────────────────────── */}
      <section ref={nextRef} style={{ background: P.ink, padding: "100px 0 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.p variants={fadeUp} initial="hidden" animate={nextInView ? "visible" : "hidden"}
            style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 40 }}
          >Next Case Study</motion.p>

          <Link href="/work/holmesworld-cs" style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={nextInView ? "visible" : "hidden"}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            style={{
              background: "#1a1a1a",
              borderRadius: 28,
              border: `1px solid ${nextHovered ? "rgba(200,169,110,0.3)" : "rgba(255,255,255,0.06)"}`,
              padding: "56px 64px",
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: 64,
              alignItems: "center",
              cursor: "pointer",
              transition: "border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
              transform: nextHovered ? "translateY(-4px)" : "translateY(0)",
              boxShadow: nextHovered ? "0 40px 80px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: P.accent, marginBottom: 16 }}>Construction · E-commerce</p>
              <h3 style={{ fontSize: 32, color: P.white, lineHeight: 1.2, marginBottom: 28 }}>
                Turning a construction material<br />marketplace into a trusted<br />buying experience
              </h3>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: P.accent, fontSize: 14, fontWeight: 600 }}>
                View case study
                <ChevronRight size={14} />
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, height: 240,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: "rgba(196,97,58,0.15)", border: "1px solid rgba(196,97,58,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 24 }}>🏗</span>
              </div>
            </div>
          </motion.div>
          </Link>

          <motion.div variants={fadeUp} initial="hidden" animate={nextInView ? "visible" : "hidden"}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              ← Back to all work
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2024 Manisha. All rights reserved.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
