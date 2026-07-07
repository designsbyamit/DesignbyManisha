"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Check,
  FileText,
  Package,
  Eye,
  Settings,
} from "lucide-react";
import { T } from "../tokens";
import { StatusBadge, ProgressBar, Card, Avatar } from "../components";

/* ─── Inline AppShell placeholder (until ../app-shell is written) ─── */
function AppShell({
  children,
  crumbs,
  action,
  onNavigate,
  bg,
}: {
  children: React.ReactNode;
  crumbs: { label: string; screen?: string }[];
  action?: React.ReactNode;
  onNavigate: (s: string) => void;
  currentScreen: string;
  bg?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        fontFamily: T.fontSans,
        background: bg || T.bg,
      }}
    >
      {/* Header */}
      <div
        style={{
          height: 56,
          background: T.surface,
          borderBottom: `1px solid ${T.surface3}`,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: "-0.03em",
            cursor: "pointer",
          }}
          onClick={() => onNavigate("work-orders")}
        >
          <span style={{ color: T.red }}>Hex</span>
          <span style={{ color: T.ink }}>Solve</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: T.sidebar,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ fontSize: 12, color: T.ink50 }}>Manisha R.</span>
        </div>
      </div>
      {/* Breadcrumb bar */}
      <div
        style={{
          height: 48,
          background: T.surface2,
          borderBottom: `1px solid ${T.surface3}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {crumbs.map((c, i) => (
            <span
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {i > 0 && (
                <span style={{ color: T.ink30, fontSize: 12 }}>›</span>
              )}
              <span
                onClick={() => c.screen && onNavigate(c.screen)}
                style={{
                  fontSize: 13,
                  fontWeight: i === crumbs.length - 1 ? 600 : 400,
                  color: i === crumbs.length - 1 ? T.ink : T.ink50,
                  cursor: c.screen ? "pointer" : "default",
                }}
              >
                {c.label}
              </span>
            </span>
          ))}
        </div>
        {action && <div>{action}</div>}
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
    </div>
  );
}

/* ─── Types ─── */
interface SubAssembly {
  id: string;
  name: string;
  instructionCount: number;
  completed: number;
  status: "in-progress" | "not-started" | "complete";
}

interface Assembly {
  id: string;
  name: string;
  subAssemblies: SubAssembly[];
}

interface TeamMember {
  name: string;
  role: string;
}

interface ActivityItem {
  icon: React.ReactNode;
  text: string;
  time: string;
  color: string;
}

/* ─── Data ─── */
const ASSEMBLIES: Assembly[] = [
  {
    id: "a1",
    name: "Core Assembly",
    subAssemblies: [
      { id: "1.1", name: "Stationary Gear Installation", instructionCount: 8,  completed: 2, status: "in-progress" },
      { id: "1.2", name: "Apex Seal Assembly",           instructionCount: 6,  completed: 0, status: "not-started" },
      { id: "1.3", name: "Eccentric Shaft",              instructionCount: 9,  completed: 0, status: "not-started" },
    ],
  },
  {
    id: "a2",
    name: "Balancing",
    subAssemblies: [
      { id: "2.1", name: "Dynamic Balance Check",  instructionCount: 12, completed: 0, status: "not-started" },
      { id: "2.2", name: "Weight Correction",      instructionCount: 7,  completed: 0, status: "not-started" },
    ],
  },
  {
    id: "a3",
    name: "Correction Process",
    subAssemblies: [
      { id: "3.1", name: "Surface Inspection",  instructionCount: 5,  completed: 0, status: "not-started" },
      { id: "3.2", name: "Final QA Sign-off",   instructionCount: 7,  completed: 0, status: "not-started" },
    ],
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Bran O.",   role: "Operator" },
  { name: "Martin K.", role: "Author" },
  { name: "Steven P.", role: "Reviewer" },
  { name: "Priya M.",  role: "QA Manager" },
];

/* ─── Variants ─── */
const containerVariants: Variants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.07, ease: "easeOut" } },
};
const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ─── Sub-assembly Row ─── */
function SubAssemblyRow({ sa }: { sa: SubAssembly }) {
  const pct = Math.round((sa.completed / sa.instructionCount) * 100);
  const dotColor =
    sa.status === "complete"
      ? T.green
      : sa.status === "in-progress"
      ? T.amber
      : T.ink30;

  return (
    <div
      className="flex items-center gap-3 py-2.5 px-4"
      style={{
        borderBottom: `1px solid rgba(0,0,0,0.05)`,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = T.surface2)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Status dot */}
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
        }}
      />
      {/* Name */}
      <span
        className="flex-1 text-sm font-medium"
        style={{ color: T.ink70, minWidth: 0 }}
      >
        {sa.id}&nbsp;&nbsp;{sa.name}
      </span>
      {/* Instruction count chip */}
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: T.surface2, color: T.ink50, border: `1px solid ${T.surface3}` }}
      >
        {sa.instructionCount} instr.
      </span>
      {/* Progress bar */}
      <div style={{ width: 80, flexShrink: 0 }}>
        <ProgressBar value={pct} height={5} color={pct > 0 ? T.red : T.ink10} />
      </div>
      {/* Label */}
      <span className="text-xs flex-shrink-0" style={{ color: T.ink50, minWidth: 32, textAlign: "right" }}>
        {sa.completed}/{sa.instructionCount}
      </span>
    </div>
  );
}

/* ─── Main screen ─── */
export function ProjectDetailScreen({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [expandedAssemblies, setExpandedAssemblies] = useState<Set<string>>(
    new Set(["a1"])
  );

  const toggleAssembly = (id: string) => {
    setExpandedAssemblies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Total instruction counts
  const totalInstructions = ASSEMBLIES.flatMap((a) => a.subAssemblies).reduce(
    (sum, sa) => sum + sa.instructionCount,
    0
  );
  const totalCompleted = ASSEMBLIES.flatMap((a) => a.subAssemblies).reduce(
    (sum, sa) => sum + sa.completed,
    0
  );

  const activityFeed: ActivityItem[] = [
    {
      icon: <Check size={12} />,
      text: "Core Assembly approved by Steven P.",
      time: "3 days ago",
      color: T.green,
    },
    {
      icon: <Edit size={12} />,
      text: "Instruction 2.1.4 modified by Martin K.",
      time: "5 days ago",
      color: T.blue,
    },
    {
      icon: <FileText size={12} />,
      text: "Project created from WO-2025-041",
      time: "2 weeks ago",
      color: T.ink50,
    },
    {
      icon: <Eye size={12} />,
      text: "Steven P. started review of Core Assembly",
      time: "1 week ago",
      color: T.amber,
    },
    {
      icon: <Settings size={12} />,
      text: "Priya M. joined as QA Manager",
      time: "2 weeks ago",
      color: T.purple,
    },
  ];

  return (
    <AppShell
      crumbs={[
        { label: "Work Orders", screen: "work-orders" },
        { label: "Projects", screen: "projects" },
        { label: "ENG-2025-041" },
      ]}
      action={
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 100,
              border: `1px solid rgba(0,0,0,0.1)`,
              background: "transparent",
              fontSize: 13,
              fontWeight: 600,
              color: T.ink70,
              fontFamily: T.fontSans,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Edit size={13} /> Edit Project
          </button>
          <button
            onClick={() => onNavigate("assembly")}
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 100,
              border: "none",
              background: T.red,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              fontFamily: T.fontSans,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 14px rgba(204,41,41,0.28)",
            }}
          >
            Open in Assembly
          </button>
        </div>
      }
      onNavigate={onNavigate}
      currentScreen="project-detail"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ padding: "28px 40px", display: "flex", flexDirection: "column", gap: 20 }}
      >
        {/* ── Two-column layout ── */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* ══ LEFT COLUMN (65%) ══ */}
          <div
            style={{
              flex: "0 0 65%",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
            }}
          >
            {/* Project header card */}
            <motion.div variants={itemVariants}>
              <div
                style={{
                  background: T.surface,
                  border: `1px solid rgba(0,0,0,0.06)`,
                  borderRadius: 16,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                  padding: "20px 24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Hex icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: T.redLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                      <polygon
                        points="11,2 19,6.5 19,15.5 11,20 3,15.5 3,6.5"
                        stroke={T.red}
                        strokeWidth="1.5"
                        fill="rgba(204,41,41,0.08)"
                      />
                      <circle cx="11" cy="11" r="2.5" fill={T.red} />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      {/* Project ID badge */}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          background: T.surface2,
                          color: T.ink50,
                          border: `1px solid ${T.surface3}`,
                          padding: "2px 8px",
                          borderRadius: 6,
                          fontFamily: "monospace",
                        }}
                      >
                        ENG-2025-041
                      </span>
                      <StatusBadge status="active" />
                    </div>
                    <h1
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: T.ink,
                        letterSpacing: "-0.02em",
                        fontFamily: T.fontSans,
                        margin: 0,
                        marginBottom: 12,
                      }}
                    >
                      001942 AIE Rotary 225cs Engine
                    </h1>
                    {/* Meta chips */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[
                        { label: "WO",       value: "WO-2025-041" },
                        { label: "Customer", value: "Autoworks GmbH" },
                        { label: "Engine",   value: "AIE 225cs" },
                        { label: "SI",       value: "1862" },
                      ].map((chip) => (
                        <div
                          key={chip.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            background: T.surface2,
                            border: `1px solid ${T.surface3}`,
                            borderRadius: 6,
                          }}
                        >
                          <span style={{ fontSize: 11, color: T.ink50 }}>{chip.label}:</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: T.ink70 }}>{chip.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instruction Document card */}
            <motion.div variants={itemVariants}>
              <div
                style={{
                  background: T.surface,
                  border: `1px solid rgba(0,0,0,0.06)`,
                  borderRadius: 16,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                {/* Document header */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderBottom: `1px solid ${T.surface3}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: T.redLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FileText size={15} color={T.red} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                          Core Assembly Instructions
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: T.ink50,
                            background: T.surface2,
                            border: `1px solid ${T.surface3}`,
                            padding: "1px 7px",
                            borderRadius: 20,
                          }}
                        >
                          v3
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#065F46",
                            background: T.greenBg,
                            padding: "2px 8px",
                            borderRadius: 20,
                          }}
                        >
                          Approved
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: T.ink50 }}>
                        {totalInstructions} total instructions across {ASSEMBLIES.length} assemblies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inline document outline */}
                <div style={{ padding: "8px 0" }}>
                  {ASSEMBLIES.map((assembly, aIdx) => {
                    const isExpanded = expandedAssemblies.has(assembly.id);
                    const assemblyTotal = assembly.subAssemblies.reduce((s, sa) => s + sa.instructionCount, 0);
                    const assemblyDone = assembly.subAssemblies.reduce((s, sa) => s + sa.completed, 0);

                    return (
                      <div key={assembly.id}>
                        {/* Assembly header row */}
                        <button
                          onClick={() => toggleAssembly(assembly.id)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 24px",
                            background: isExpanded ? T.surface2 : "transparent",
                            border: "none",
                            borderTop: aIdx > 0 ? `1px solid ${T.surface3}` : "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ color: T.ink30, display: "flex", alignItems: "center" }}>
                            {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: T.ink,
                              flex: 1,
                              fontFamily: T.fontSans,
                            }}
                          >
                            Assembly {aIdx + 1}: {assembly.name}
                          </span>
                          <span style={{ fontSize: 11, color: T.ink50 }}>
                            {assemblyDone}/{assemblyTotal}
                          </span>
                          <div style={{ width: 60 }}>
                            <ProgressBar
                              value={assemblyTotal > 0 ? Math.round((assemblyDone / assemblyTotal) * 100) : 0}
                              height={4}
                              color={assemblyDone > 0 ? T.red : T.ink10}
                            />
                          </div>
                        </button>

                        {/* Sub-assemblies — animated expand */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              {assembly.subAssemblies.map((sa) => (
                                <SubAssemblyRow key={sa.id} sa={sa} />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* CTA footer */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: `1px solid rgba(0,0,0,0.06)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: T.surface2,
                  }}
                >
                  <button
                    onClick={() => onNavigate("assembly")}
                    style={{
                      height: 42,
                      padding: "0 22px",
                      borderRadius: 100,
                      border: "none",
                      background: T.red,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: T.fontSans,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(204,41,41,0.28)",
                    }}
                  >
                    Open Assembly Workspace →
                  </button>
                  <button
                    onClick={() => onNavigate("instruction-doc")}
                    style={{
                      height: 42,
                      padding: "0 22px",
                      borderRadius: 100,
                      border: `1px solid rgba(0,0,0,0.1)`,
                      background: "transparent",
                      fontSize: 13,
                      fontWeight: 600,
                      color: T.ink70,
                      fontFamily: T.fontSans,
                      cursor: "pointer",
                    }}
                  >
                    Edit / Compose →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN (35%) ══ */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minWidth: 0,
            }}
          >
            {/* Project Info card */}
            <motion.div variants={itemVariants}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: T.blueBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileText size={13} color={T.blue} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Project Info</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Customer",    value: "Autoworks GmbH" },
                    { label: "Engine Model", value: "AIE Rotary 225cs" },
                    { label: "Serial No.",  value: "1862" },
                    { label: "Work Order",  value: "WO-2025-041" },
                    { label: "Due Date",    value: "30 January 2025" },
                    { label: "Created",     value: "12 October 2024" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}
                    >
                      <span style={{ fontSize: 12, color: T.ink50 }}>{item.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: T.ink70 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Team card */}
            <motion.div variants={itemVariants}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: T.purpleBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Package size={13} color={T.purple} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Team</span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: T.surface2,
                      color: T.ink50,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {TEAM_MEMBERS.length} members
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {TEAM_MEMBERS.map((m) => (
                    <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={m.name} size={30} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: T.ink, margin: 0, lineHeight: 1.3 }}>
                          {m.name}
                        </p>
                        <p style={{ fontSize: 11, color: T.ink50, margin: 0 }}>{m.role}</p>
                      </div>
                      <ChevronRight size={13} color={T.ink30} />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Activity Feed card */}
            <motion.div variants={itemVariants}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: T.greenBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Eye size={13} color={T.green} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Activity</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {activityFeed.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderBottom:
                          i < activityFeed.length - 1
                            ? `1px solid ${T.surface3}`
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: item.color + "18",
                          color: item.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, color: T.ink70, margin: 0, lineHeight: 1.5 }}>
                          {item.text}
                        </p>
                        <p style={{ fontSize: 11, color: T.ink30, margin: 0, marginTop: 2 }}>
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Progress card */}
            <motion.div variants={itemVariants}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Assembly Progress</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: T.red, letterSpacing: "-0.03em" }}>
                    {Math.round((totalCompleted / totalInstructions) * 100)}%
                  </span>
                </div>
                <ProgressBar
                  value={Math.round((totalCompleted / totalInstructions) * 100)}
                  height={8}
                  color={T.red}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: T.ink50 }}>
                    {totalCompleted} / {totalInstructions} instructions
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.amber }}>In Progress</span>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${T.surface3}`,
                    paddingTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {ASSEMBLIES.map((a) => {
                    const tot = a.subAssemblies.reduce((s, sa) => s + sa.instructionCount, 0);
                    const done = a.subAssemblies.reduce((s, sa) => s + sa.completed, 0);
                    return (
                      <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 12, color: T.ink50, width: 90, flexShrink: 0 }}>{a.name}</span>
                        <div style={{ flex: 1 }}>
                          <ProgressBar
                            value={Math.round((done / tot) * 100)}
                            height={4}
                            color={done > 0 ? T.red : T.ink10}
                          />
                        </div>
                        <span style={{ fontSize: 11, color: T.ink50, flexShrink: 0, minWidth: 32, textAlign: "right" }}>
                          {done}/{tot}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}
