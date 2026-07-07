"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./prototype/tokens";

/* ─────────────────────────────────────────────────────────────────────────────
   HexSolve Hero Demo — auto-animated flow at 730×624
   Flow: Login → My Projects → Project Detail → Assembly → Checklist → Save & Proceed
   Loops continuously.
───────────────────────────────────────────────────────────────────────────── */

/* Scale factor: 730×624 target, screens designed at 1440×900 */
const SCALE = 730 / 1440;
const W = 730;
const H = 624;

/* ── Mini design tokens ── */
const RED = T.red;
const INK = T.ink;
const SURFACE = T.surface;
const SURFACE2 = T.surface2;
const SURFACE3 = T.surface3;
const MUTED = T.ink50;
const GREEN = T.green;
const SIDEBAR = T.sidebar;
const FONT = T.fontSans;

/* ── Fake cursor ── */
function Cursor({ x, y, clicking, pointer }: { x: number; y: number; clicking: boolean; pointer?: boolean }) {
  return (
    <motion.div
      animate={{ x, y, scale: clicking ? 0.75 : 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: pointer ? RED : "rgba(255,255,255,0.9)",
        boxShadow: pointer
          ? `0 0 0 5px rgba(204,41,41,0.22)`
          : `0 0 0 4px rgba(255,255,255,0.18)`,
        pointerEvents: "none",
        zIndex: 1000,
        transform: "translate(-7px, -7px)",
      }}
    >
      {clicking && (
        <motion.div
          key={`${x}-${y}-click`}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: pointer ? "rgba(204,41,41,0.5)" : "rgba(255,255,255,0.4)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ── Typing indicator ── */
function TypedText({ text, speed = 60 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, ++i)); }
      else clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span>{displayed}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCREENS (simplified but realistic — no live prototype, pure render)
───────────────────────────────────────────────────────────────────────────── */

/* Shared header */
function AppHeader({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <div style={{
      height: 48, background: SURFACE, borderBottom: `1px solid ${SURFACE3}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
    }}>
      <span
        onClick={onLogoClick}
        style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.03em", cursor: "pointer", fontFamily: FONT }}
      >
        <span style={{ color: RED }}>Hex</span><span style={{ color: INK }}>Solve</span>
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: SIDEBAR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 700 }}>M</div>
        <span style={{ fontSize: 11, color: MUTED, fontFamily: FONT }}>Manisha R.</span>
      </div>
    </div>
  );
}

/* Breadcrumb bar */
function BreadcrumbBar({ crumbs, action }: { crumbs: string[]; action?: React.ReactNode }) {
  return (
    <div style={{
      height: 40, background: SURFACE2, borderBottom: `1px solid ${SURFACE3}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: FONT }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: MUTED, fontSize: 10 }}>›</span>}
            <span style={{
              fontSize: 11, fontWeight: i === crumbs.length - 1 ? 600 : 400,
              color: i === crumbs.length - 1 ? INK : MUTED,
            }}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      {action}
    </div>
  );
}

/* ── Screen 1: Login ── */
function LoginScr({ emailTyped, passTyped, btnActive }: {
  emailTyped: string; passTyped: string; btnActive: boolean;
}) {
  return (
    <div style={{ display: "flex", height: "100%", fontFamily: FONT }}>
      {/* Left dark panel */}
      <div style={{
        width: "45%", background: "#0F172A", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <span style={{ fontWeight: 800, fontSize: 13, letterSpacing: "-0.03em" }}>
            <span style={{ color: RED }}>HEX</span><span style={{ color: "white" }}>SOLVE</span>
          </span>
          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 2, letterSpacing: "0.1em" }}>ENGINEERING INTELLIGENCE PLATFORM</p>
        </div>
        {/* Hex decoration */}
        <svg style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.15 }} width="120" height="120" viewBox="0 0 120 120">
          <polygon points="60,5 110,32.5 110,87.5 60,115 10,87.5 10,32.5" fill="none" stroke={RED} strokeWidth="2"/>
          <polygon points="60,20 95,40 95,80 60,100 25,80 25,40" fill="none" stroke={RED} strokeWidth="1.5"/>
          <circle cx="60" cy="60" r="15" fill="none" stroke={RED} strokeWidth="1.5"/>
        </svg>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: 6 }}>
            Precision at Every<br/><span style={{ color: RED }}>Assembly Step</span>
          </p>
          <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
            Manage engine manufacturing workflows, instruction documents, and quality assurance in one unified platform.
          </p>
        </div>
      </div>

      {/* Right auth panel */}
      <div style={{ flex: 1, background: "white", display: "flex", flexDirection: "column", justifyContent: "center", padding: "28px" }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: RED, textTransform: "uppercase", marginBottom: 6 }}>WELCOME BACK</p>
        <p style={{ fontSize: 16, fontWeight: 800, color: INK, letterSpacing: "-0.03em", marginBottom: 4 }}>Sign in to HexSolve</p>
        <p style={{ fontSize: 10, color: MUTED, marginBottom: 20 }}>Enter your credentials to continue</p>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: INK, marginBottom: 5 }}>Email address</p>
          <div style={{
            border: `1.5px solid ${emailTyped.length > 0 ? "#3B82F6" : SURFACE3}`, borderRadius: 8,
            padding: "8px 10px", fontSize: 11, color: INK, background: SURFACE,
            boxShadow: emailTyped.length > 0 ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
            minHeight: 32, display: "flex", alignItems: "center",
          }}>
            {emailTyped || <span style={{ color: MUTED }}>name@aie.com</span>}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: INK, marginBottom: 5 }}>Password</p>
          <div style={{
            border: `1.5px solid ${passTyped.length > 0 ? "#3B82F6" : SURFACE3}`, borderRadius: 8,
            padding: "8px 10px", fontSize: 11, color: INK, background: SURFACE,
            boxShadow: passTyped.length > 0 ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
            minHeight: 32, display: "flex", alignItems: "center",
          }}>
            {passTyped ? "•".repeat(passTyped.length) : <span style={{ color: MUTED }}>Enter your password</span>}
          </div>
        </div>

        <motion.div
          animate={{ scale: btnActive ? [1, 0.97, 1] : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            height: 38, borderRadius: 100, background: btnActive ? "#b52020" : RED,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "white", cursor: "pointer",
          }}
        >
          {btnActive ? "Signing in…" : "Sign In"}
        </motion.div>

        <p style={{ fontSize: 9, color: MUTED, textAlign: "center", marginTop: 14 }}>
          Need help signing in? <span style={{ color: RED }}>Contact IT Support</span>
        </p>
        <div style={{ borderTop: `1px solid ${SURFACE3}`, marginTop: 20, paddingTop: 14, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 8, color: MUTED, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
            Secure connection established
          </span>
          <span style={{ fontSize: 8, color: MUTED }}>v2.4.1</span>
        </div>
      </div>
    </div>
  );
}

/* ── Screen 2: My Projects ── */
function ProjectsScr({ highlighted }: { highlighted: number }) {
  const projects = [
    { code: "ENG-2025-041", name: "001942 AIE Rotary 225cs Engine", customer: "Autoworks GmbH", status: "Active", progress: 11, color: "#DBEAFE", statusColor: "#1D4ED8" },
    { code: "ENG-2025-038", name: "00187 Wankel 13B Rebuild", customer: "Mazda Specialist UK", status: "In Review", progress: 64, color: "#FEF3C7", statusColor: "#92400E" },
    { code: "ENG-2025-035", name: "00164 20B Three-Rotor", customer: "Rotary Revival Co.", status: "Approved", progress: 100, color: "#D1FAE5", statusColor: "#065F46" },
    { code: "ENG-2025-031", name: "00143 12A Series II", customer: "Heritage Motors", status: "Draft", progress: 28, color: SURFACE3, statusColor: MUTED },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: SURFACE2 }}>
      <AppHeader />
      <BreadcrumbBar
        crumbs={["Work Orders", "Projects"]}
        action={<div style={{ background: RED, color: "white", borderRadius: 100, padding: "4px 12px", fontSize: 10, fontWeight: 600 }}>+ New Project</div>}
      />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: INK, letterSpacing: "-0.03em", marginBottom: 4, fontFamily: FONT }}>My Projects</p>
        <p style={{ fontSize: 10, color: MUTED, marginBottom: 16, fontFamily: FONT }}>All manufacturing projects across active work orders</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.code}
              animate={{
                boxShadow: highlighted === i
                  ? "0 4px 20px rgba(0,0,0,0.12)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                scale: highlighted === i ? 1.01 : 1,
              }}
              style={{
                background: "white", borderRadius: 16,
                border: `1px solid ${highlighted === i ? RED + "40" : SURFACE3}`,
                padding: 14, fontFamily: FONT, cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 8, background: SURFACE2, borderRadius: 100, padding: "2px 8px", color: MUTED, fontWeight: 600 }}>WO-2025-0{41 - i * 3}</div>
                <div style={{ fontSize: 8, background: p.color, borderRadius: 100, padding: "2px 8px", color: p.statusColor, fontWeight: 700 }}>{p.status}</div>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, color: RED, fontFamily: "monospace", marginBottom: 3 }}>{p.code}</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: INK, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</p>
              <p style={{ fontSize: 10, color: MUTED, marginBottom: 10 }}>{p.customer}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ flex: 1, height: 3, background: SURFACE3, borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${p.progress}%`, background: p.progress === 100 ? GREEN : RED, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 9, color: MUTED }}>{p.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Screen 3: Project Detail ── */
function ProjectDetailScr({ assemblyHovered }: { assemblyHovered: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: SURFACE2 }}>
      <AppHeader />
      <BreadcrumbBar
        crumbs={["Work Orders", "Projects", "ENG-2025-041"]}
        action={
          <motion.div
            animate={{ background: assemblyHovered ? "#b52020" : RED, scale: assemblyHovered ? 1.03 : 1 }}
            style={{ color: "white", borderRadius: 100, padding: "5px 14px", fontSize: 10, fontWeight: 600, cursor: "pointer" }}
          >
            Open in Assembly
          </motion.div>
        }
      />
      <div style={{ flex: 1, padding: "16px 24px", overflowY: "auto", fontFamily: FONT }}>
        {/* Project header */}
        <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: `1px solid ${SURFACE3}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: RED, fontFamily: "monospace" }}>ENG-2025-041</span>
            <span style={{ fontSize: 8, background: "#DBEAFE", color: "#1D4ED8", borderRadius: 100, padding: "2px 8px", fontWeight: 700 }}>Active</span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 800, color: INK, letterSpacing: "-0.02em", marginBottom: 8 }}>001942 AIE Rotary 225cs Engine</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["WO-2025-041", "Customer: Autoworks GmbH", "Engine: AIE 225cs", "SI: 1862"].map(t => (
              <span key={t} style={{ fontSize: 9, background: SURFACE2, borderRadius: 6, padding: "3px 8px", color: MUTED }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Document card */}
        <div style={{ background: "white", borderRadius: 14, border: `1px solid ${SURFACE3}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${SURFACE2}`, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Core Assembly Instructions</span>
            <span style={{ fontSize: 8, background: "#D1FAE5", color: "#065F46", borderRadius: 100, padding: "2px 8px", fontWeight: 700 }}>v3 · Approved</span>
          </div>
          <div style={{ padding: "10px 16px" }}>
            {[
              { name: "1.1 Stationary Gear Installation", count: 8, done: 2 },
              { name: "1.2 Apex Seal Assembly", count: 6, done: 0 },
              { name: "1.3 Eccentric Shaft", count: 9, done: 0, locked: true },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 10px", borderRadius: 10, marginBottom: 4,
                background: i === 0 ? "#FFF8F8" : SURFACE,
                border: `1px solid ${i === 0 ? RED + "30" : SURFACE3}`,
              }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? RED : INK }}>{s.name}</p>
                  <p style={{ fontSize: 9, color: MUTED }}>{s.done}/{s.count} instructions</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 50, height: 3, background: SURFACE3, borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(s.done / s.count) * 100}%`, background: RED, borderRadius: 2 }} />
                  </div>
                  {s.locked && <span style={{ fontSize: 9 }}>🔒</span>}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <motion.div
                animate={{ background: assemblyHovered ? "#b52020" : RED }}
                style={{ flex: 1, height: 34, borderRadius: 100, background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", cursor: "pointer" }}
              >
                Open Assembly Workspace →
              </motion.div>
              <div style={{ height: 34, borderRadius: 100, border: `1.5px solid ${SURFACE3}`, display: "flex", alignItems: "center", padding: "0 14px", fontSize: 11, fontWeight: 600, color: MUTED, cursor: "pointer" }}>
                Edit / Compose →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Screen 4: Assembly Workspace ── */
function AssemblyScr({
  activeStep,
  checkItems,
  torqueValue,
  savePulse,
}: {
  activeStep: number;
  checkItems: boolean[];
  torqueValue: string;
  savePulse: boolean;
}) {
  const steps = [
    "Fixture & Alignment",
    "Bore Cleaning",
    "Thread Sealant",
    "Install Stationary Gear",
    "Apply Loctite 641",
    "Press Main Bearing",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#F8F9FA", fontFamily: FONT }}>
      <AppHeader />
      <BreadcrumbBar crumbs={["Work Orders", "ENG-2025-041", "Core Assembly", "Sub-assembly 1.1", `Step ${activeStep + 1}`]} />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left step nav */}
        <div style={{ width: 160, background: "white", borderRight: `1px solid ${SURFACE3}`, display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{ padding: "10px 12px 6px", borderBottom: `1px solid ${SURFACE3}` }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em" }}>Sub-assembly 1.1</p>
          </div>
          {steps.map((s, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <div
                key={i}
                style={{
                  padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
                  background: active ? "#FFF0F0" : "transparent",
                  borderLeft: active ? `3px solid ${RED}` : "3px solid transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  background: done ? GREEN : active ? RED : SURFACE3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700, color: done || active ? "white" : MUTED,
                }}>
                  {done ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, color: active ? RED : done ? MUTED : INK, lineHeight: 1.3 }}>{s}</span>
              </div>
            );
          })}
          <div style={{ marginTop: "auto", padding: "10px 12px", borderTop: `1px solid ${SURFACE3}` }}>
            <div style={{ height: 3, background: SURFACE3, borderRadius: 2, marginBottom: 4 }}>
              <div style={{ height: "100%", width: `${(activeStep / steps.length) * 100}%`, background: RED, borderRadius: 2, transition: "width 0.5s" }} />
            </div>
            <p style={{ fontSize: 8, color: RED }}>{activeStep} of {steps.length} complete</p>
          </div>
        </div>

        {/* Center content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px 8px" }}>
            {/* Step badge + title */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "white", flexShrink: 0 }}>
                {String(activeStep + 1).padStart(2, "0")}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 800, color: INK, letterSpacing: "-0.02em" }}>Install Stationary Gear</p>
                <p style={{ fontSize: 10, color: MUTED }}>Sub-assembly 1.1 — Core Assembly</p>
              </div>
            </div>

            {/* Reference diagram */}
            <div style={{ borderRadius: 14, overflow: "hidden", background: "#0F1117", marginBottom: 12, height: 130, position: "relative" }}>
              <svg width="100%" height="130" viewBox="0 0 300 130">
                {/* Grid */}
                {[0,1,2,3,4].map(i => <line key={`v${i}`} x1={i*75} y1="0" x2={i*75} y2="130" stroke="#1E2435" strokeWidth="1"/>)}
                {[0,1,2,3].map(i => <line key={`h${i}`} x1="0" y1={i*43} x2="300" y2={i*43} stroke="#1E2435" strokeWidth="1"/>)}
                {/* Gear */}
                <circle cx="150" cy="65" r="44" stroke="#3B4560" strokeWidth="7" fill="none"/>
                {Array.from({length: 16}).map((_,i) => {
                  const rad = (i * 22.5 * Math.PI) / 180;
                  return <line key={i}
                    x1={Math.round((150 + Math.cos(rad)*44)*100)/100}
                    y1={Math.round((65 + Math.sin(rad)*44)*100)/100}
                    x2={Math.round((150 + Math.cos(rad)*54)*100)/100}
                    y2={Math.round((65 + Math.sin(rad)*54)*100)/100}
                    stroke="#4B5A7A" strokeWidth="4" strokeLinecap="round"/>
                })}
                <circle cx="150" cy="65" r="28" stroke="#3B4560" strokeWidth="2" fill="none"/>
                <circle cx="150" cy="65" r="10" stroke="#CC2929" strokeWidth="1.5" fill="none" strokeOpacity="0.8"/>
                <line x1="135" y1="65" x2="165" y2="65" stroke="#CC2929" strokeWidth="1" strokeOpacity="0.5"/>
                <line x1="150" y1="50" x2="150" y2="80" stroke="#CC2929" strokeWidth="1" strokeOpacity="0.5"/>
                {/* Torque badge */}
                <rect x="210" y="40" width="72" height="18" rx="9" fill="#CC2929"/>
                <text x="246" y="53" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">TORQUE: 85 Nm</text>
                {/* Labels */}
                <text x="100" y="25" fill="#9CA3AF" fontSize="8">A</text>
                <text x="185" y="110" fill="#9CA3AF" fontSize="8">B</text>
              </svg>
              <div style={{ position: "absolute", bottom: 5, left: 10, fontSize: 8, color: "rgba(255,255,255,0.3)" }}>Fig. 2.1.4A — Stationary gear installation reference</div>
            </div>

            {/* Instruction */}
            <div style={{ fontSize: 11, color: INK, lineHeight: 1.6, marginBottom: 10, padding: "10px 12px", background: "white", borderRadius: 10, border: `1px solid ${SURFACE3}` }}>
              Lower stationary gear (P/N 008514, Rev. 1) into the rotor housing bore, carefully aligning the stamped timing mark on the gear face with the V-notch reference line on the housing.
            </div>

            {/* Amber warning */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, marginBottom: 14, fontSize: 10, color: "#92400E" }}>
              <span>⚠</span>
              <span>Do not apply additional Loctite at this stage — compound was pre-applied in Step 2.1.3.</span>
            </div>

            {/* Pre-step checklist */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Pre-Step Checklist</p>
              {[
                "Gear bore cleaned and inspected",
                "Timing marks identified and marked",
                "Personal protective equipment worn",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{
                    background: checkItems[i] ? "#F0FDF4" : "white",
                    borderColor: checkItems[i] ? GREEN + "50" : SURFACE3,
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 12px", borderRadius: 10, marginBottom: 6,
                    border: `1px solid ${SURFACE3}`,
                  }}
                >
                  <motion.div
                    animate={{
                      background: checkItems[i] ? GREEN : "white",
                      borderColor: checkItems[i] ? GREEN : SURFACE3,
                      scale: checkItems[i] ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${SURFACE3}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    {checkItems[i] && <span style={{ color: "white", fontSize: 9, fontWeight: 900 }}>✓</span>}
                  </motion.div>
                  <span style={{ fontSize: 10, color: checkItems[i] ? MUTED : INK, textDecoration: checkItems[i] ? "line-through" : "none" }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Torque input */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <p style={{ fontSize: 9, color: MUTED, marginBottom: 4 }}>Torque Value (Nm)</p>
                <div style={{
                  border: `1.5px solid ${torqueValue ? GREEN : SURFACE3}`, borderRadius: 8,
                  padding: "7px 10px", fontSize: 11, color: INK,
                  boxShadow: torqueValue ? "0 0 0 2px rgba(5,150,105,0.1)" : "none",
                  minHeight: 30, display: "flex", alignItems: "center",
                }}>
                  {torqueValue || <span style={{ color: MUTED, fontSize: 10 }}>e.g. 85</span>}
                  {torqueValue && <span style={{ marginLeft: "auto", fontSize: 9, color: GREEN, fontWeight: 700 }}>✓ Within spec</span>}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 9, color: MUTED, marginBottom: 4 }}>Pressed Depth (mm)</p>
                <div style={{ border: `1.5px solid ${SURFACE3}`, borderRadius: 8, padding: "7px 10px", fontSize: 10, color: MUTED, minHeight: 30, display: "flex", alignItems: "center" }}>
                  e.g. 2.4
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA */}
          <div style={{
            flexShrink: 0, background: "white", borderTop: `1px solid ${SURFACE3}`,
            padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10,
          }}>
            <div style={{ height: 36, borderRadius: 100, border: `1.5px solid ${SURFACE3}`, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 11, fontWeight: 600, color: MUTED, flexShrink: 0 }}>
              Mark Complete
            </div>
            <motion.div
              animate={{
                scale: savePulse ? [1, 0.95, 1.02, 1] : 1,
                background: savePulse ? "#b52020" : RED,
              }}
              transition={{ duration: 0.3 }}
              style={{
                height: 36, borderRadius: 100, background: RED, display: "flex", alignItems: "center",
                padding: "0 20px", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0, cursor: "pointer",
              }}
            >
              Save & Proceed →
            </motion.div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 180, background: "white", borderLeft: `1px solid ${SURFACE3}`, display: "flex", flexDirection: "column", padding: "12px", overflowY: "auto" }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", background: SURFACE2, borderRadius: 100, padding: 2, marginBottom: 12 }}>
            {["Parts", "Tools"].map((t, i) => (
              <div key={t} style={{
                flex: 1, height: 24, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 600,
                background: i === 0 ? "white" : "transparent",
                color: i === 0 ? INK : MUTED,
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}>{t}</div>
            ))}
          </div>
          {/* Part card */}
          <div style={{ border: `1px solid ${SURFACE3}`, borderRadius: 12, padding: 10, marginBottom: 10 }}>
            <div style={{ height: 50, background: SURFACE2, borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 40 40" width="38" height="38">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#9CA3AF" strokeWidth="5"/>
                <circle cx="20" cy="20" r="8" fill="none" stroke="#D1D5DB" strokeWidth="2.5"/>
                <circle cx="20" cy="20" r="3" fill="#E5E7EB"/>
              </svg>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, color: INK }}>Stationary Gear</p>
            <p style={{ fontSize: 9, color: MUTED }}>Part No.: 008514</p>
            <p style={{ fontSize: 9, color: MUTED }}>Rev. 1 · Qty: 1</p>
            <span style={{ fontSize: 8, background: "#D1FAE5", color: "#065F46", borderRadius: 100, padding: "2px 8px", fontWeight: 700, display: "inline-block", marginTop: 4 }}>Issued</span>
          </div>
          {/* Safety */}
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: 8 }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>SAFETY NOTES</p>
            <p style={{ fontSize: 9, color: "#92400E", lineHeight: 1.4 }}>Wear nitrile gloves when handling Loctite compound.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN DEMO ORCHESTRATOR
───────────────────────────────────────────────────────────────────────────── */

type DemoScreen = "login" | "projects" | "project-detail" | "assembly";

interface DemoState {
  screen: DemoScreen;
  emailTyped: string;
  passTyped: string;
  btnActive: boolean;
  highlightedCard: number;
  assemblyHovered: boolean;
  assemblyStep: number;
  checkItems: boolean[];
  torqueValue: string;
  savePulse: boolean;
  cursorX: number;
  cursorY: number;
  clicking: boolean;
  cursorPointer: boolean;
}

// Timeline entry: after `delay` ms, apply this partial state
interface Frame {
  delay: number;
  state: Partial<DemoState>;
}

const FRAMES: Frame[] = [
  // ── Login ──
  { delay: 0,    state: { screen: "login", emailTyped: "", passTyped: "", btnActive: false, cursorX: 520, cursorY: 280, cursorPointer: false } },
  { delay: 400,  state: { cursorX: 520, cursorY: 300, cursorPointer: false } },
  { delay: 800,  state: { emailTyped: "a" } },
  { delay: 900,  state: { emailTyped: "ad" } },
  { delay: 1000, state: { emailTyped: "adr" } },
  { delay: 1100, state: { emailTyped: "adri" } },
  { delay: 1200, state: { emailTyped: "adria" } },
  { delay: 1300, state: { emailTyped: "adrian" } },
  { delay: 1400, state: { emailTyped: "adrian@" } },
  { delay: 1500, state: { emailTyped: "adrian@aie" } },
  { delay: 1600, state: { emailTyped: "adrian@aie.com" } },
  { delay: 1900, state: { cursorX: 520, cursorY: 340, passTyped: "", cursorPointer: false } },
  { delay: 2100, state: { passTyped: "p" } },
  { delay: 2200, state: { passTyped: "pa" } },
  { delay: 2300, state: { passTyped: "pas" } },
  { delay: 2400, state: { passTyped: "pass" } },
  { delay: 2500, state: { passTyped: "passw" } },
  { delay: 2600, state: { passTyped: "passwo" } },
  { delay: 2700, state: { passTyped: "passwor" } },
  { delay: 2800, state: { passTyped: "password" } },
  { delay: 3100, state: { cursorX: 520, cursorY: 395, cursorPointer: true } }, // hover Sign In button
  { delay: 3500, state: { btnActive: true, clicking: true } },
  { delay: 3700, state: { clicking: false } },
  // ── Transition to Projects ──
  { delay: 4200, state: { screen: "projects", highlightedCard: -1, cursorX: 200, cursorY: 300, cursorPointer: false } },
  { delay: 4600, state: { cursorX: 165, cursorY: 245, highlightedCard: 0, cursorPointer: true } }, // hover project card
  { delay: 5000, state: { cursorX: 165, cursorY: 245 } },
  { delay: 5400, state: { clicking: true } },
  { delay: 5600, state: { clicking: false } },
  // ── Project Detail ──
  { delay: 6100, state: { screen: "project-detail", cursorX: 360, cursorY: 280, assemblyHovered: false, cursorPointer: false } },
  { delay: 6500, state: { cursorX: 520, cursorY: 72, assemblyHovered: true, cursorPointer: true } }, // hover Open in Assembly
  { delay: 7000, state: { clicking: true } },
  { delay: 7200, state: { clicking: false } },
  // ── Assembly ──
  { delay: 7700, state: { screen: "assembly", assemblyStep: 3, checkItems: [false, false, false], torqueValue: "", savePulse: false, cursorX: 310, cursorY: 320, cursorPointer: false } },
  // Check item 1
  { delay: 8200, state: { cursorX: 205, cursorY: 368, cursorPointer: true } },
  { delay: 8400, state: { clicking: true } },
  { delay: 8600, state: { clicking: false, checkItems: [true, false, false] } },
  // Check item 2
  { delay: 8900, state: { cursorX: 205, cursorY: 396, cursorPointer: true } },
  { delay: 9100, state: { clicking: true } },
  { delay: 9300, state: { clicking: false, checkItems: [true, true, false] } },
  // Check item 3
  { delay: 9600, state: { cursorX: 205, cursorY: 424, cursorPointer: true } },
  { delay: 9800, state: { clicking: true } },
  { delay: 10000, state: { clicking: false, checkItems: [true, true, true] } },
  // Type torque value
  { delay: 10300, state: { cursorX: 215, cursorY: 468, cursorPointer: false } },
  { delay: 10600, state: { clicking: true } },
  { delay: 10800, state: { clicking: false, torqueValue: "85" } },
  // Click Save & Proceed
  { delay: 11400, state: { cursorX: 530, cursorY: 510, cursorPointer: true } }, // hover Save & Proceed
  { delay: 11800, state: { clicking: true, savePulse: true } },
  { delay: 12000, state: { clicking: false } },
  { delay: 12500, state: { savePulse: false, assemblyStep: 4, checkItems: [false, false, false], torqueValue: "" } },
  // Loop reset
  { delay: 13200, state: { screen: "login", emailTyped: "", passTyped: "", btnActive: false, cursorX: 520, cursorY: 280, cursorPointer: false } },
];

const LOOP_DURATION = 13200;

export function HeroDemo() {
  const [state, setState] = useState<DemoState>({
    screen: "login",
    emailTyped: "", passTyped: "", btnActive: false,
    highlightedCard: -1, assemblyHovered: false,
    assemblyStep: 3,
    checkItems: [false, false, false],
    torqueValue: "", savePulse: false,
    cursorX: 520, cursorY: 280, clicking: false, cursorPointer: false,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  const tick = useCallback(() => {
    const elapsed = (Date.now() - startRef.current) % LOOP_DURATION;
    // Find the latest frame whose delay <= elapsed
    let merged: Partial<DemoState> = {};
    for (const frame of FRAMES) {
      if (frame.delay <= elapsed) merged = { ...merged, ...frame.state };
    }
    setState(prev => ({ ...prev, ...merged }));
  }, []);

  useEffect(() => {
    startRef.current = Date.now();
    timerRef.current = setInterval(tick, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [tick]);

  const screenEl = (() => {
    switch (state.screen) {
      case "login":
        return <LoginScr emailTyped={state.emailTyped} passTyped={state.passTyped} btnActive={state.btnActive} />;
      case "projects":
        return <ProjectsScr highlighted={state.highlightedCard} />;
      case "project-detail":
        return <ProjectDetailScr assemblyHovered={state.assemblyHovered} />;
      case "assembly":
        return <AssemblyScr
          activeStep={state.assemblyStep}
          checkItems={state.checkItems}
          torqueValue={state.torqueValue}
          savePulse={state.savePulse}
        />;
    }
  })();

  return (
    <div style={{ position: "relative", width: W, height: H, borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
      {/* Browser chrome */}
      <div style={{ height: 36, background: "#1e1e1e", display: "flex", alignItems: "center", padding: "0 14px", gap: 7, flexShrink: 0 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 20, display: "flex", alignItems: "center", paddingLeft: 10 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={state.screen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: FONT }}
            >
              hexsolve.app/{state.screen === "login" ? "login" : state.screen === "projects" ? "projects" : state.screen === "project-detail" ? "project/ENG-2025-041" : "assembly/step/4"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Screen content — crossfade, no flash */}
      <div style={{ height: H - 36, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={state.screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            {screenEl}
          </motion.div>
        </AnimatePresence>

        {/* Cursor overlay — always on top */}
        <Cursor x={state.cursorX} y={state.cursorY} clicking={state.clicking} pointer={state.cursorPointer} />
      </div>
    </div>
  );
}
