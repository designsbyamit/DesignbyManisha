"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronsLeft,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Wrench,
} from "lucide-react";
import { T } from "../tokens";
import { Checkbox, Input } from "../components";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

/* ── Types ── */
type StepStatus = "complete" | "active" | "pending";

interface Step {
  id: number;
  title: string;
  status: StepStatus;
}

const INITIAL_STEPS: Step[] = [
  { id: 1, title: "Fixture & Alignment",        status: "complete" },
  { id: 2, title: "Bore Cleaning",               status: "complete" },
  { id: 3, title: "Thread Sealant Application", status: "complete" },
  { id: 4, title: "Install Stationary Gear",    status: "active"   },
  { id: 5, title: "Apply Loctite 641",          status: "pending"  },
  { id: 6, title: "Press Main Bearing",         status: "pending"  },
  { id: 7, title: "Torque Gear Nuts",           status: "pending"  },
  { id: 8, title: "Verify Timing Alignment",    status: "pending"  },
];

/* ── Inline AppShell ── */
function AppShell({ children, crumbs, action, onNavigate, currentScreen, bg }: {
  children: React.ReactNode;
  crumbs: { label: string; screen?: string }[];
  action?: React.ReactNode;
  onNavigate: (s: string) => void;
  currentScreen: string;
  bg?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", fontFamily: T.fontSans, background: bg || T.bg }}>
      {/* Brand header */}
      <div style={{ height: 56, background: T.surface, borderBottom: `1px solid ${T.surface3}`, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", cursor: "pointer" }} onClick={() => onNavigate("work-orders")}>
          <span style={{ color: T.red }}>Hex</span><span style={{ color: T.ink }}>Solve</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.sidebar, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>M</div>
          <span style={{ fontSize: 12, color: T.ink50 }}>Manisha R.</span>
        </div>
      </div>
      {/* Breadcrumb bar */}
      <div style={{ height: 48, background: T.surface2, borderBottom: `1px solid ${T.surface3}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ color: T.ink30, fontSize: 12 }}>›</span>}
              <span
                onClick={() => c.screen && onNavigate(c.screen)}
                style={{ fontSize: 13, fontWeight: i === crumbs.length - 1 ? 600 : 400, color: i === crumbs.length - 1 ? T.ink : T.ink50, cursor: c.screen ? "pointer" : "default" }}
              >
                {c.label}
              </span>
            </span>
          ))}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
    </div>
  );
}

/* ── Polished mechanical diagram ── */
function MechanicalDiagram() {
  const cx = 250;
  const cy = 120;
  const outerR = 78;
  const toothLen = 14;
  const innerR = 50;
  const hubR = 14;
  const teethCount = 24;

  return (
    <div
      style={{
        width: "100%",
        height: 240,
        background: "linear-gradient(160deg, #0D1117 0%, #1A1F2E 100%)",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 500 240" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="asm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CC2929" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#CC2929" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="asm-ring" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A3450" stopOpacity="1" />
            <stop offset="100%" stopColor="#151A28" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`vg${i}`} x1={i * 56} y1="0" x2={i * 56} y2="240" stroke="#1E2840" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`hg${i}`} x1="0" y1={i * 30} x2="500" y2={i * 30} stroke="#1E2840" strokeWidth="1" />
        ))}

        {/* Glow halo */}
        <ellipse cx={cx} cy={cy} rx={outerR + 40} ry={outerR + 30} fill="url(#asm-glow)" />

        {/* Gear body ring fill */}
        <circle cx={cx} cy={cy} r={outerR + 2} fill="url(#asm-ring)" />

        {/* Outer ring stroke */}
        <circle cx={cx} cy={cy} r={outerR} stroke="#3B4A6A" strokeWidth="10" fill="none" />

        {/* Gear teeth */}
        {Array.from({ length: teethCount }).map((_, i) => {
          const rad = (i * (360 / teethCount) * Math.PI) / 180;
          return (
            <line
              key={`tooth${i}`}
              x1={Math.round((cx + Math.cos(rad) * outerR) * 100) / 100}
              y1={Math.round((cy + Math.sin(rad) * outerR) * 100) / 100}
              x2={Math.round((cx + Math.cos(rad) * (outerR + toothLen)) * 100) / 100}
              y2={Math.round((cy + Math.sin(rad) * (outerR + toothLen)) * 100) / 100}
              stroke="#4B5E84"
              strokeWidth="5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={innerR} stroke="#2E3D5C" strokeWidth="2.5" fill="none" />

        {/* Hub circle */}
        <circle cx={cx} cy={cy} r={hubR} stroke="#CC2929" strokeWidth="2" fill="none" strokeOpacity="0.9" />

        {/* Crosshair */}
        <line x1={cx - hubR - 8} y1={cy} x2={cx + hubR + 8} y2={cy} stroke="#CC2929" strokeWidth="1" strokeOpacity="0.55" />
        <line x1={cx} y1={cy - hubR - 8} x2={cx} y2={cy + hubR + 8} stroke="#CC2929" strokeWidth="1" strokeOpacity="0.55" />

        {/* Bolt holes */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <circle
              key={`bolt${angle}`}
              cx={Math.round((cx + Math.cos(rad) * 62) * 100) / 100}
              cy={Math.round((cy + Math.sin(rad) * 62) * 100) / 100}
              r="5.5"
              fill="#131824"
              stroke="#3B4A6A"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Reference label A */}
        <line
          x1={Math.round((cx + Math.cos(-0.55) * (outerR + toothLen + 4)) * 100) / 100}
          y1={Math.round((cy + Math.sin(-0.55) * (outerR + toothLen + 4)) * 100) / 100}
          x2="388" y2="34"
          stroke="#4B5A7A" strokeWidth="1" strokeDasharray="3,3"
        />
        <circle cx="388" cy="34" r="10" fill="none" stroke="#4B5A7A" strokeWidth="1" />
        <text x="388" y="38.5" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="var(--font-jakarta), Plus Jakarta Sans, sans-serif" fontWeight="700">A</text>

        {/* Reference label B */}
        <line
          x1={Math.round((cx - innerR - 2) * 100) / 100}
          y1={cy}
          x2="118" y2="75"
          stroke="#4B5A7A" strokeWidth="1" strokeDasharray="3,3"
        />
        <circle cx="118" cy="75" r="10" fill="none" stroke="#4B5A7A" strokeWidth="1" />
        <text x="118" y="79.5" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="var(--font-jakarta), Plus Jakarta Sans, sans-serif" fontWeight="700">B</text>

        {/* Reference label C */}
        <line
          x1={cx}
          y1={Math.round((cy + outerR + toothLen + 2) * 100) / 100}
          x2="315" y2="210"
          stroke="#4B5A7A" strokeWidth="1" strokeDasharray="3,3"
        />
        <circle cx="315" cy="210" r="10" fill="none" stroke="#4B5A7A" strokeWidth="1" />
        <text x="315" y="214.5" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="var(--font-jakarta), Plus Jakarta Sans, sans-serif" fontWeight="700">C</text>

        {/* Part label */}
        <text x="22" y="232" fill="#3B4A6A" fontSize="9" fontFamily="var(--font-jakarta), Plus Jakarta Sans, sans-serif" letterSpacing="0.06em">
          STATIONARY GEAR — P/N 008514 — REF VIEW 2.1.4A
        </text>
      </svg>

      {/* REF badge */}
      <div style={{ position: "absolute", top: 12, left: 14, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", color: "#6B7280", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.06em" }}>
        REF DIAGRAM
      </div>

      {/* Torque callout pill — absolutely positioned on diagram */}
      <div style={{ position: "absolute", bottom: 18, right: 18, background: T.red, color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.04em", boxShadow: "0 2px 12px rgba(204,41,41,0.5)" }}>
        TORQUE: 85 Nm
      </div>
    </div>
  );
}

/* ── Small gear SVG ── */
function GearPartSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="14" stroke={T.ink30} strokeWidth="2.5" fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={Math.round((20 + Math.cos(rad) * 14) * 100) / 100}
            y1={Math.round((20 + Math.sin(rad) * 14) * 100) / 100}
            x2={Math.round((20 + Math.cos(rad) * 19) * 100) / 100}
            y2={Math.round((20 + Math.sin(rad) * 19) * 100) / 100}
            stroke={T.ink30}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="20" cy="20" r="5" stroke={T.red} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ── Tool icon ── */
function ToolIcon() {
  return (
    <div style={{ width: 30, height: 30, background: T.surface2, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Wrench size={14} color={T.ink50} />
    </div>
  );
}

/* ── Checklist row with card treatment ── */
function ChecklistRow({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: T.surface,
        border: `1px solid ${checked ? T.green : T.surface3}`,
        borderRadius: 12,
        padding: "10px 14px",
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: hovered ? "0 2px 8px rgba(0,0,0,0.07)" : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
      onClick={onChange}
    >
      <motion.div
        animate={checked ? { scale: [1.2, 1], backgroundColor: T.green } : { scale: 1, backgroundColor: T.surface2 }}
        transition={{ duration: 0.2 }}
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: checked ? T.green : T.surface2,
          border: `1.5px solid ${checked ? T.green : T.ink10}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Check size={11} color="#fff" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <span style={{ fontSize: 13, color: checked ? T.ink50 : T.ink70, textDecoration: checked ? "line-through" : "none", lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}

/* ── Primary CTA button ── */
function PrimaryBtn({
  label,
  onClick,
  color = T.red,
  shadow = "none",
  disabled,
  icon,
  wide = false,
}: {
  label: React.ReactNode;
  onClick?: () => void;
  color?: string;
  shadow?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: wide ? "100%" : "auto",
        minWidth: 160,
        height: 44,
        borderRadius: 100,
        background: disabled ? T.surface3 : color,
        color: disabled ? T.ink30 : "#fff",
        fontSize: 14,
        fontWeight: 700,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "none",
        fontFamily: T.fontSans,
        letterSpacing: "-0.01em",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "opacity 0.15s, transform 0.1s",
      }}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {label}
    </button>
  );
}

/* ── Ghost button ── */
function GhostBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        height: 44,
        borderRadius: 100,
        background: "transparent",
        color: T.ink50,
        fontSize: 13,
        fontWeight: 600,
        border: `1.5px solid ${T.surface3}`,
        cursor: "pointer",
        fontFamily: T.fontSans,
        padding: "0 24px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

/* ── Main screen ── */
export function AssemblyScreen({ onNavigate }: ScreenProps) {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [activeStep, setActiveStep] = useState(4);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [torqueValue, setTorqueValue] = useState("");
  const [pressedDepth, setPressedDepth] = useState("");
  const [signOff, setSignOff] = useState(false);
  const [checklist, setChecklist] = useState([false, false, false]);
  const [markCompleteAnim, setMarkCompleteAnim] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [rightTab, setRightTab] = useState<"parts" | "tools">("parts");

  const completedCount = steps.filter((s) => s.status === "complete").length;
  const allChecklistDone = checklist.every(Boolean);
  const isTorqueEntered = torqueValue !== "" && !isNaN(Number(torqueValue)) && Number(torqueValue) > 0;
  const isDepthEntered = pressedDepth !== "" && !isNaN(Number(pressedDepth)) && Number(pressedDepth) > 0;
  const stepFullyComplete = allChecklistDone && isTorqueEntered && isDepthEntered;

  const currentStep = steps.find((s) => s.id === activeStep);

  function handleStepClick(stepId: number) {
    const step = steps.find((s) => s.id === stepId);
    if (step && step.status === "complete") setActiveStep(stepId);
  }

  function resetStepState() {
    setTorqueValue("");
    setPressedDepth("");
    setSignOff(false);
    setChecklist([false, false, false]);
  }

  function handleSaveAndProceed() {
    const nextId = activeStep + 1;
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === activeStep) return { ...s, status: "complete" };
        if (s.id === nextId) return { ...s, status: "active" };
        return s;
      })
    );
    if (nextId > 8) {
      setAllDone(true);
    } else {
      setActiveStep(nextId);
      resetStepState();
    }
  }

  function handleMarkComplete() {
    if (allDone) return;
    setMarkCompleteAnim(true);
    setTimeout(() => {
      const nextId = activeStep + 1;
      setSteps((prev) =>
        prev.map((s) => {
          if (s.id === activeStep) return { ...s, status: "complete" };
          if (s.id === nextId) return { ...s, status: "active" };
          return s;
        })
      );
      if (nextId > 8) {
        setAllDone(true);
      } else {
        setActiveStep(nextId);
        resetStepState();
      }
      setMarkCompleteAnim(false);
    }, 600);
  }

  function handleChecklistToggle(i: number) {
    setChecklist((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const shellAction = (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.ink70 }}>
        {activeStep} <span style={{ color: T.ink30 }}>/ 8</span>
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: T.ink30 }}>
        <Clock size={11} />
        <span>Saved 2m ago</span>
      </div>
    </div>
  );

  const crumbs = [
    { label: "Work Orders", screen: "work-orders" },
    { label: "ENG-2025-041", screen: "instruction-doc" },
    { label: "Core Assembly", screen: "instruction-doc" },
    { label: "Sub-assembly 1.1", screen: "instruction-doc" },
    { label: `Step ${activeStep}` },
  ];

  return (
    <AppShell crumbs={crumbs} action={shellAction} onNavigate={onNavigate} currentScreen="assembly">
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>

        {/* ── LEFT: Step navigator ── */}
        <motion.div
          animate={{ width: navCollapsed ? 44 : 200 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: T.surface,
            borderRight: `1px solid ${T.surface3}`,
            boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Nav header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 8px", borderBottom: `1px solid ${T.surface3}` }}>
            {!navCollapsed && (
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: T.ink30, paddingLeft: 6 }}>
                Sub-assembly 1.1
              </span>
            )}
            <button
              onClick={() => setNavCollapsed((p) => !p)}
              style={{ padding: 4, cursor: "pointer", background: "none", border: "none", marginLeft: "auto" }}
            >
              <ChevronsLeft
                size={13}
                style={{ color: T.ink30, transform: navCollapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
          </div>

          {/* Step list */}
          <div style={{ flex: 1, overflowY: "auto", paddingTop: 6, paddingBottom: 6 }}>
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              const isClickable = step.status === "complete";
              return (
                <button
                  key={step.id}
                  onClick={() => isClickable && handleStepClick(step.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: navCollapsed ? "8px 10px" : "7px 10px",
                    background: isActive ? T.redLight : "transparent",
                    cursor: isClickable ? "pointer" : "default",
                    justifyContent: navCollapsed ? "center" : "flex-start",
                    border: "none",
                    borderLeft: isActive && !navCollapsed ? `3px solid ${T.red}` : "3px solid transparent",
                  }}
                >
                  <motion.div
                    animate={
                      markCompleteAnim && isActive
                        ? { scale: [1, 1.35, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: step.status === "complete" ? T.green : isActive ? T.red : "transparent",
                      border: `1.5px solid ${step.status === "complete" ? T.green : isActive ? T.red : T.ink10}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {step.status === "complete" ? (
                      <Check size={11} color="#fff" strokeWidth={2.5} />
                    ) : (
                      <span style={{ fontSize: 9, fontWeight: 700, color: isActive ? "#fff" : T.ink30 }}>
                        {step.id}
                      </span>
                    )}
                  </motion.div>

                  {!navCollapsed && (
                    <span
                      style={{
                        fontSize: 11,
                        textAlign: "left" as const,
                        lineHeight: 1.3,
                        color: isActive ? T.red : step.status === "complete" ? T.ink50 : T.ink30,
                        fontWeight: isActive ? 700 : 400,
                      }}
                    >
                      {step.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress footer */}
          {!navCollapsed && (
            <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.surface3}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.ink30, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Section Progress</span>
              </div>
              <div style={{ height: 4, background: T.surface3, borderRadius: 2, marginBottom: 6 }}>
                <div style={{ height: "100%", width: `${(completedCount / 8) * 100}%`, background: T.green, borderRadius: 2, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 11, color: T.ink50 }}>{completedCount} of 8 complete</span>
            </div>
          )}
        </motion.div>

        {/* ── CENTER: Instruction content ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: T.bg }}>
          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 28px 24px" }}>

            {/* Step badge + title */}
            <div style={{ position: "relative", marginBottom: 24 }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 64,
                  height: 64,
                  background: T.red,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(204,41,41,0.3)",
                }}
              >
                <span style={{ color: "#fff", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
                  {String(activeStep).padStart(2, "0")}
                </span>
              </div>
              <div style={{ paddingLeft: 80, paddingTop: 4 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: T.ink, letterSpacing: "-0.025em", marginBottom: 4, lineHeight: 1.2 }}>
                  {currentStep?.title ?? "Install Stationary Gear"}
                </h1>
                <p style={{ fontSize: 13, color: T.ink50 }}>Sub-assembly 1.1 — Core Assembly</p>
              </div>
            </div>

            {/* Reference diagram */}
            <div style={{ marginBottom: 8 }}>
              <MechanicalDiagram />
            </div>
            <p style={{ fontSize: 12, color: T.ink50, marginBottom: 8, fontStyle: "italic" }}>
              Fig. 2.1.4A — Stationary gear installation reference
            </p>

            {/* Amber warning */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                background: T.amberBg,
                border: "1px solid #FCD34D",
                borderRadius: 12,
                padding: "11px 15px",
                marginBottom: 20,
              }}
            >
              <AlertTriangle size={13} style={{ color: T.amber, flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>
                Do not apply additional Loctite at this stage — compound was pre-applied in Step 2.1.3.
              </p>
            </div>

            {/* Instruction text */}
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.surface3}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                boxShadow: T.shadowSm,
              }}
            >
              <p style={{ fontSize: 14, lineHeight: 1.8, color: T.ink70 }}>
                Lower stationary gear (P/N 008514, Rev. 1) into the rotor housing bore, carefully aligning
                the stamped timing mark on the gear face with the V-notch reference line on the housing.
                Ensure the gear seats flush with no angular offset. Do not rotate the gear once the Loctite
                compound makes contact with the bore surface. Apply torque evenly in a star pattern.
              </p>
            </div>

            {/* Pre-step checklist */}
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.surface3}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                boxShadow: T.shadowSm,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                  color: T.ink30,
                  marginBottom: 14,
                }}
              >
                Pre-Step Checklist
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Gear bore cleaned and inspected",
                  "Timing marks identified and marked",
                  "Personal protective equipment worn",
                ].map((item, i) => (
                  <ChecklistRow
                    key={item}
                    checked={checklist[i]}
                    label={item}
                    onChange={() => handleChecklistToggle(i)}
                  />
                ))}
              </div>
            </div>

            {/* Data capture */}
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.surface3}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
                boxShadow: T.shadowSm,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                  color: T.ink30,
                  marginBottom: 16,
                }}
              >
                Data Capture
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <Input
                    label="Torque Value (Nm)"
                    placeholder="e.g. 85"
                    value={torqueValue}
                    onChange={setTorqueValue}
                    type="number"
                    helper="Spec: 82–88 Nm"
                  />
                  <AnimatePresence>
                    {isTorqueEntered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: "hidden", marginTop: 4 }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle2 size={11} style={{ color: T.green }} />
                          <span style={{ fontSize: 11, color: T.green }}>Value within spec</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <Input
                    label="Pressed Depth (mm)"
                    placeholder="e.g. 2.4"
                    value={pressedDepth}
                    onChange={setPressedDepth}
                    type="number"
                    helper="Target: 2.2–2.6 mm"
                  />
                  <AnimatePresence>
                    {isDepthEntered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: "hidden", marginTop: 4 }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle2 size={11} style={{ color: T.green }} />
                          <span style={{ fontSize: 11, color: T.green }}>Value within spec</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Sign-off */}
            <div
              style={{
                background: T.surface,
                border: `1px solid ${T.surface3}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 28,
                boxShadow: T.shadowSm,
              }}
            >
              <Checkbox
                checked={signOff}
                onChange={setSignOff}
                label="I confirm this step has been completed in accordance with ENG-2025-041 requirements."
              />
            </div>

          </div>
          </div>{/* end scrollable content */}

          {/* ── Sticky CTA bar ── */}
          <div style={{
            flexShrink: 0,
            background: T.surface,
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding: "12px 28px",
          }}>
            <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
              {allDone ? (
                <PrimaryBtn
                  label="Submit to QA →"
                  onClick={() => onNavigate("qa-review")}
                  color={T.red}
                  shadow="none"
                />
              ) : stepFullyComplete ? (
                <>
                  <GhostBtn label="Save & Proceed →" onClick={handleSaveAndProceed} />
                  <motion.div
                    animate={markCompleteAnim ? { scale: [1, 0.97, 1.01, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <PrimaryBtn
                      label={markCompleteAnim ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.6, ease: "linear", repeat: Infinity }} style={{ display: "flex" }}>
                            <Clock size={16} />
                          </motion.span>
                          Completing…
                        </span>
                      ) : "Mark Complete ✓"}
                      onClick={handleMarkComplete}
                      disabled={markCompleteAnim}
                      color={T.green}
                      shadow="none"
                      wide={false}
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  <GhostBtn label="Mark Complete" onClick={handleMarkComplete} />
                  <PrimaryBtn
                    label="Save & Proceed →"
                    onClick={handleSaveAndProceed}
                    color={T.red}
                    shadow="none"
                    wide={false}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Context panels ── */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            background: T.surface,
            borderLeft: "1px solid rgba(0,0,0,0.06)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Pill tab switcher */}
          <div style={{ padding: "12px 14px", borderBottom: `1px solid ${T.surface3}` }}>
            <div
              style={{
                display: "flex",
                background: T.surface2,
                borderRadius: 100,
                padding: 3,
              }}
            >
              {(["parts", "tools"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRightTab(tab)}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    color: rightTab === tab ? T.ink : T.ink50,
                    background: rightTab === tab ? T.surface : "transparent",
                    border: "none",
                    borderRadius: 100,
                    cursor: "pointer",
                    fontFamily: T.fontSans,
                    boxShadow: rightTab === tab ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ padding: 16, flex: 1 }}>
            <AnimatePresence mode="wait">
              {rightTab === "parts" ? (
                <motion.div
                  key="parts"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div
                    style={{
                      background: T.surface2,
                      border: `1px solid ${T.surface3}`,
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <GearPartSVG />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Stationary Gear</p>
                        <p style={{ fontSize: 11, color: T.ink50 }}>Part No.: 008514</p>
                        <p style={{ fontSize: 11, color: T.ink50 }}>Revision: 1</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: T.ink50 }}>Qty required</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>1</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: T.ink50 }}>Status</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          background: T.greenBg,
                          color: "#065F46",
                          padding: "2px 10px",
                          borderRadius: 99,
                        }}
                      >
                        Issued
                      </span>
                    </div>
                  </div>
                  <button
                    style={{ fontSize: 12, fontWeight: 600, color: T.red, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    + Browse repository
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "Torque Wrench (18–90 Nm)",
                      "Loctite 641 Retaining Compound",
                      "Assembly Press — 5 tonne",
                    ].map((tool) => (
                      <div key={tool} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ToolIcon />
                        <span style={{ fontSize: 12, color: T.ink70, lineHeight: 1.4 }}>{tool}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Safety notes */}
          <div style={{ padding: "0 16px 16px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: T.ink30, marginBottom: 8 }}>
              Safety Notes
            </p>
            <div
              style={{
                background: T.amberBg,
                border: "1px solid #FCD34D",
                borderRadius: 16,
                padding: 14,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <AlertTriangle size={13} style={{ color: T.amber, flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 11, color: "#92400E", lineHeight: 1.6 }}>
                  Wear nitrile gloves when handling Loctite compound. Ensure adequate ventilation.
                  Compound is an eye and skin irritant.
                </p>
              </div>
            </div>
          </div>

          {/* Project progress */}
          <div style={{ padding: "0 16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: T.ink50 }}>10 / 87 instructions completed</span>
            </div>
            <div style={{ height: 4, background: T.surface3, borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${Math.round((10 / 87) * 100)}%`, background: T.red, borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
