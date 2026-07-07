"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Lock,
  Check,
  Image,
  X,
  FileText,
  Wrench,
  Package,
  AlertTriangle,
  Eye,
  Settings,
} from "lucide-react";
import { T } from "../tokens";
import { ProgressBar } from "../components";

/* ─────────────────────────────────────────────────────────────────────────────
   Inline AppShell placeholder (until ../app-shell exists)
───────────────────────────────────────────────────────────────────────────── */
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
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
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
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ color: T.ink30, fontSize: 12 }}>›</span>}
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
      <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface SubAssemblyNode {
  id: string;
  name: string;
  instructionCount: number;
  completed: number;
  locked?: boolean;
}

interface AssemblyNode {
  id: string;
  name: string;
  subAssemblies: SubAssemblyNode[];
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */
const TREE: AssemblyNode[] = [
  {
    id: "a1",
    name: "Core Assembly",
    subAssemblies: [
      { id: "1.1", name: "Stationary Gear Installation", instructionCount: 8, completed: 2 },
      { id: "1.2", name: "Apex Seal Assembly",           instructionCount: 6, completed: 0 },
      { id: "1.3", name: "Eccentric Shaft",              instructionCount: 9, completed: 0, locked: true },
    ],
  },
  {
    id: "a2",
    name: "Balancing",
    subAssemblies: [
      { id: "2.1", name: "Dynamic Balance Check", instructionCount: 12, completed: 0 },
      { id: "2.2", name: "Weight Correction",     instructionCount: 7,  completed: 0 },
    ],
  },
  {
    id: "a3",
    name: "Correction Process",
    subAssemblies: [
      { id: "3.1", name: "Surface Inspection", instructionCount: 5, completed: 0 },
      { id: "3.2", name: "Final QA Sign-off",  instructionCount: 7, completed: 0 },
    ],
  },
];

const INSTRUCTIONS: { id: number; title: string; status: "complete" | "draft" }[] = [
  { id: 1, title: "Inspect gear housing for surface damage",                   status: "complete" },
  { id: 2, title: "Apply Loctite 641 to gear bore (inner surface)",            status: "complete" },
  { id: 3, title: "Press stationary gear onto housing using assembly press",    status: "draft" },
  { id: 4, title: "Torque front bearing housing bolts to 18 Nm",               status: "draft" },
  { id: 5, title: "Verify gear alignment within 0.02mm tolerance",             status: "draft" },
  { id: 6, title: "Install O-ring seals on all ports",                         status: "draft" },
  { id: 7, title: "Apply thread sealant to coolant ports",                     status: "draft" },
  { id: 8, title: "Final inspection and sign-off",                             status: "draft" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Segmented view toggle — pill control
───────────────────────────────────────────────────────────────────────────── */
function ViewToggle({
  activeView,
  onToggle,
}: {
  activeView: "compose" | "assembly";
  onToggle: (v: "compose" | "assembly") => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: T.surface2,
        borderRadius: 100,
        padding: 3,
        gap: 2,
        border: `1px solid rgba(0,0,0,0.06)`,
      }}
    >
      {(["compose", "assembly"] as const).map((v) => {
        const active = activeView === v;
        return (
          <button
            key={v}
            onClick={() => onToggle(v)}
            style={{
              borderRadius: 100,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: T.fontSans,
              border: "none",
              cursor: "pointer",
              transition: "all 0.18s ease",
              background: active ? T.surface : "transparent",
              color: active ? T.red : T.ink50,
              boxShadow: active ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              letterSpacing: "-0.01em",
            }}
          >
            {v === "compose" ? "Compose" : "Assembly View"}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Compose — Left tree panel
───────────────────────────────────────────────────────────────────────────── */
function ComposeTree({
  activeSubId,
  onSelect,
}: {
  activeSubId: string;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["a1"]));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        height: "100%",
        overflow: "auto",
        background: T.surface,
        borderRight: `1px solid rgba(0,0,0,0.06)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "14px 16px 10px",
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: T.redLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FileText size={12} color={T.red} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, letterSpacing: "-0.01em" }}>
            Core Assembly Instructions
          </span>
        </div>
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflow: "auto", padding: "8px 8px" }}>
        {TREE.map((assembly) => {
          const isExpanded = expanded.has(assembly.id);
          return (
            <div key={assembly.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => toggle(assembly.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 8px",
                  borderRadius: 10,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 1,
                }}
              >
                <span style={{ color: T.ink30, display: "flex", alignItems: "center", flexShrink: 0 }}>
                  {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, flex: 1, letterSpacing: "-0.01em" }}>
                  {assembly.name}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ overflow: "hidden", paddingLeft: 10 }}
                  >
                    {assembly.subAssemblies.map((sa) => {
                      const isActive = sa.id === activeSubId;
                      const pct = Math.round((sa.completed / sa.instructionCount) * 100);
                      return (
                        <button
                          key={sa.id}
                          onClick={() => !sa.locked && onSelect(sa.id)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            padding: "6px 8px",
                            borderRadius: 10,
                            border: "none",
                            background: isActive ? T.redLight : "transparent",
                            cursor: sa.locked ? "not-allowed" : "pointer",
                            textAlign: "left",
                            marginBottom: 1,
                            opacity: sa.locked ? 0.55 : 1,
                            transition: "background 0.15s",
                          }}
                        >
                          {sa.locked ? (
                            <Lock size={11} color={T.ink30} style={{ flexShrink: 0 }} />
                          ) : (
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: isActive ? T.red : pct > 0 ? T.amber : T.ink10,
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? T.red : T.ink70,
                              flex: 1,
                              lineHeight: 1.35,
                            }}
                          >
                            {sa.id} {sa.name}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Add sub-assembly */}
      <div style={{ padding: "10px 16px", borderTop: `1px solid rgba(0,0,0,0.06)`, flexShrink: 0 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: T.ink30,
            fontFamily: T.fontSans,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          <Plus size={12} />
          Add Sub-assembly
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Compose — checklist editor item
───────────────────────────────────────────────────────────────────────────── */
function ChecklistEditorItem({
  text,
  onDelete,
}: {
  text: string;
  onDelete: () => void;
}) {
  const [val, setVal] = useState(text);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        borderRadius: 10,
        border: `1px solid rgba(0,0,0,0.06)`,
        background: T.surface,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          border: `1.5px solid ${T.surface3}`,
          flexShrink: 0,
        }}
      />
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        style={{
          flex: 1,
          fontSize: 13,
          color: T.ink70,
          fontFamily: T.fontSans,
          border: "none",
          outline: "none",
          background: "transparent",
        }}
      />
      <button
        onClick={onDelete}
        style={{
          display: "flex",
          alignItems: "center",
          color: T.ink30,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 2,
          flexShrink: 0,
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Compose — center editor
───────────────────────────────────────────────────────────────────────────── */
function ComposeEditor({ activeSubId }: { activeSubId: string }) {
  const [expandedInstruction, setExpandedInstruction] = useState<number | null>(4);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: "c1", text: "Verify gear bore is clean and free of debris", checked: false },
    { id: "c2", text: "Check O-ring condition — replace if compressed",  checked: false },
    { id: "c3", text: "Confirm Loctite 641 is within expiry date",       checked: false },
  ]);
  const [descValue, setDescValue] = useState(
    "Using the assembly press, align the stationary gear concentrically with the housing bore. Apply steady, even pressure. Do NOT use a hammer or impact tool. Press until the gear seats flush with the housing face within ±0.02mm."
  );
  const [titleValue, setTitleValue] = useState(
    "Press stationary gear onto housing using assembly press"
  );

  const deleteChecklist = (id: string) => {
    setChecklistItems((prev) => prev.filter((c) => c.id !== id));
  };

  const activeSubName =
    TREE.flatMap((a) => a.subAssemblies).find((sa) => sa.id === activeSubId)?.name ?? "";
  const parentAssembly =
    TREE.find((a) => a.subAssemblies.some((sa) => sa.id === activeSubId))?.name ?? "";

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        overflow: "auto",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sub-assembly breadcrumb */}
      <div
        style={{
          padding: "12px 24px",
          background: T.surface,
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, color: T.ink50 }}>{parentAssembly}</span>
        <ChevronRight size={12} color={T.ink30} />
        <span style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>
          {activeSubId} {activeSubName}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 600,
            color: T.ink50,
            background: T.surface2,
            padding: "2px 8px",
            borderRadius: 20,
          }}
        >
          8 instructions
        </span>
      </div>

      {/* Instruction list */}
      <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
        {INSTRUCTIONS.map((instr) => {
          const isExpanded = expandedInstruction === instr.id;
          const statusColor = instr.status === "complete" ? T.green : T.amber;
          const statusBg   = instr.status === "complete" ? T.greenBg : T.amberBg;
          const statusLabel = instr.status === "complete" ? "Complete" : "Draft";

          return (
            <div
              key={instr.id}
              style={{
                background: T.surface,
                borderRadius: 12,
                border: `1px solid ${isExpanded ? "rgba(204,41,41,0.2)" : "rgba(0,0,0,0.06)"}`,
                boxShadow: isExpanded
                  ? "0 4px 20px rgba(0,0,0,0.08)"
                  : "0 1px 3px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
            >
              {/* Row header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 16px",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedInstruction(isExpanded ? null : instr.id)}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: isExpanded ? T.red : T.surface2,
                    color: isExpanded ? "#fff" : T.ink50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                >
                  {instr.id}
                </span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>
                  {instr.title}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: statusColor,
                    background: statusBg,
                    padding: "2px 8px",
                    borderRadius: 20,
                    flexShrink: 0,
                  }}
                >
                  {statusLabel}
                </span>
                <Edit size={13} color={T.ink30} style={{ flexShrink: 0 }} />
              </div>

              {/* Expanded editor */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        padding: "14px 16px 16px",
                        borderTop: `1px solid rgba(0,0,0,0.06)`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      {/* Title input */}
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
                          Instruction Title
                        </label>
                        <input
                          value={titleValue}
                          onChange={(e) => setTitleValue(e.target.value)}
                          style={{
                            width: "100%",
                            fontSize: 13,
                            fontWeight: 500,
                            color: T.ink,
                            fontFamily: T.fontSans,
                            background: T.bg,
                            border: `1.5px solid rgba(0,0,0,0.08)`,
                            borderRadius: 12,
                            padding: "9px 12px",
                            outline: "none",
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      {/* Description textarea */}
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
                          Process Description
                        </label>
                        <textarea
                          value={descValue}
                          onChange={(e) => setDescValue(e.target.value)}
                          rows={4}
                          style={{
                            width: "100%",
                            fontSize: 13,
                            color: T.ink70,
                            fontFamily: T.fontSans,
                            background: T.bg,
                            border: `1.5px solid rgba(0,0,0,0.08)`,
                            borderRadius: 12,
                            padding: "9px 12px",
                            outline: "none",
                            resize: "vertical",
                            lineHeight: 1.6,
                            boxSizing: "border-box" as const,
                          }}
                        />
                      </div>

                      {/* Image upload */}
                      <div>
                        <label style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
                          Reference Image
                        </label>
                        <div
                          style={{
                            border: `2px dashed rgba(0,0,0,0.1)`,
                            borderRadius: 12,
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            cursor: "pointer",
                            background: T.bg,
                          }}
                        >
                          <Image size={20} color={T.ink30} />
                          <span style={{ fontSize: 12, color: T.ink50, fontFamily: T.fontSans }}>
                            Drop an image or click to upload
                          </span>
                          <span style={{ fontSize: 11, color: T.ink30 }}>PNG, JPG up to 10MB</span>
                        </div>
                      </div>

                      {/* Pre-step checklist */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                          <label style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
                            Pre-step Checklist
                          </label>
                          <button
                            onClick={() =>
                              setChecklistItems((p) => [
                                ...p,
                                { id: Date.now().toString(), text: "", checked: false },
                              ])
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              color: T.red,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: T.fontSans,
                            }}
                          >
                            <Plus size={11} /> Add item
                          </button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {checklistItems.map((c) => (
                            <ChecklistEditorItem
                              key={c.id}
                              text={c.text}
                              onDelete={() => deleteChecklist(c.id)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                        <button
                          style={{
                            height: 40,
                            padding: "0 20px",
                            borderRadius: 100,
                            border: `1.5px solid rgba(0,0,0,0.1)`,
                            background: "transparent",
                            fontSize: 13,
                            fontWeight: 600,
                            color: T.ink70,
                            fontFamily: T.fontSans,
                            cursor: "pointer",
                          }}
                        >
                          Save Draft
                        </button>
                        <button
                          style={{
                            height: 40,
                            padding: "0 20px",
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
                          Publish Instruction
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Add instruction */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 12,
            border: `2px dashed rgba(0,0,0,0.08)`,
            background: "transparent",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: T.ink30,
            fontFamily: T.fontSans,
            width: "100%",
          }}
        >
          <Plus size={14} />
          Add Instruction
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Compose — right panel (Parts & Tools)
───────────────────────────────────────────────────────────────────────────── */
function ComposeRightPanel() {
  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        height: "100%",
        overflow: "auto",
        background: T.surface,
        borderLeft: `1px solid rgba(0,0,0,0.06)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Parts */}
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <Package size={14} color={T.blue} />
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Parts</span>
        </div>
        <div
          style={{
            background: T.bg,
            border: `1px solid rgba(0,0,0,0.06)`,
            borderRadius: 12,
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: T.surface2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke={T.ink50} strokeWidth="1.5" />
              <path
                d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke={T.ink50}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.ink, margin: 0 }}>Stationary Gear</p>
            <p style={{ fontSize: 11, color: T.ink50, margin: 0 }}>Part No. 008514 · Rev. 1</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <button style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${T.surface3}`, background: T.surface, cursor: "pointer", fontSize: 14, fontWeight: 700, color: T.ink70, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.ink, minWidth: 14, textAlign: "center" }}>1</span>
            <button style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid ${T.surface3}`, background: T.surface, cursor: "pointer", fontSize: 14, fontWeight: 700, color: T.ink70, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: T.red, background: "none", border: "none", cursor: "pointer", fontFamily: T.fontSans, padding: "2px 0" }}>
          <Plus size={12} /> Add Part
        </button>
      </div>

      <div style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />

      {/* Tools */}
      <div style={{ padding: "14px 16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <Wrench size={14} color={T.amber} />
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Tools</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["Torque Wrench", "Loctite 641", "Assembly Press"].map((tool) => (
            <div
              key={tool}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px",
                background: T.bg,
                borderRadius: 10,
                border: `1px solid rgba(0,0,0,0.06)`,
              }}
            >
              <Wrench size={12} color={T.ink30} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.ink70 }}>{tool}</span>
            </div>
          ))}
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: T.red, background: "none", border: "none", cursor: "pointer", fontFamily: T.fontSans, padding: "8px 0 2px" }}>
          <Plus size={12} /> Add Tool
        </button>
      </div>

      <div style={{ height: 1, background: "rgba(0,0,0,0.06)" }} />

      {/* Safety Notes */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
          <AlertTriangle size={14} color={T.amber} />
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Safety Notes</span>
        </div>
        <div
          style={{
            background: T.amberBg,
            border: `1px solid rgba(217,119,6,0.2)`,
            borderRadius: 12,
            padding: "10px 12px",
            display: "flex",
            gap: 8,
          }}
        >
          <AlertTriangle size={14} color={T.amber} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#92400E", margin: 0, lineHeight: 1.5 }}>
            Wear nitrile gloves when handling Loctite 641. Ensure proper ventilation. Eye protection required during press operations.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Assembly View — animated checkbox
───────────────────────────────────────────────────────────────────────────── */
function AnimatedCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <div
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 12,
        background: checked ? T.greenBg : T.surface,
        border: `1px solid ${checked ? "rgba(5,150,105,0.2)" : "rgba(0,0,0,0.06)"}`,
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 7,
          border: `2px solid ${checked ? T.green : T.surface3}`,
          background: checked ? T.green : T.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.18s",
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Check size={11} color="#fff" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: checked ? "#065F46" : T.ink70,
          textDecoration: checked ? "line-through" : "none",
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Assembly View — left nav tree
───────────────────────────────────────────────────────────────────────────── */
function AssemblyViewNav({
  activeSubId,
  activeInstrIdx,
  onSelect,
}: {
  activeSubId: string;
  activeInstrIdx: number;
  onSelect: (subId: string, instrIdx: number) => void;
}) {
  const [expandedAssemblies, setExpandedAssemblies] = useState<Set<string>>(
    new Set(["a1"])
  );

  const toggle = (id: string) => {
    setExpandedAssemblies((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      style={{
        width: 240,
        flexShrink: 0,
        height: "100%",
        overflow: "auto",
        background: T.surface,
        borderRight: `1px solid rgba(0,0,0,0.06)`,
      }}
    >
      {/* Header */}
      <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: T.redLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={13} color={T.red} />
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: T.ink, margin: 0 }}>Core Assembly</p>
            <p style={{ fontSize: 11, color: T.ink50, margin: 0 }}>Instructions</p>
          </div>
        </div>
      </div>

      {/* Tree */}
      <div style={{ padding: "8px 8px" }}>
        {TREE.map((assembly) => {
          const isExpanded = expandedAssemblies.has(assembly.id);
          return (
            <div key={assembly.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => toggle(assembly.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 8px",
                  borderRadius: 10,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ color: T.ink30 }}>
                  {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, flex: 1 }}>
                  {assembly.name}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{ overflow: "hidden", paddingLeft: 10 }}
                  >
                    {assembly.subAssemblies.map((sa) => {
                      const isActiveSub = sa.id === activeSubId;
                      return (
                        <div key={sa.id}>
                          <button
                            onClick={() => onSelect(sa.id, 0)}
                            style={{
                              width: "100%",
                              padding: "6px 8px",
                              borderRadius: 10,
                              border: "none",
                              background: isActiveSub ? T.redLight : "transparent",
                              cursor: "pointer",
                              textAlign: "left",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              marginBottom: 1,
                            }}
                          >
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: isActiveSub ? T.red : T.ink10,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: isActiveSub ? 600 : 400,
                                color: isActiveSub ? T.red : T.ink70,
                              }}
                            >
                              {sa.id} {sa.name}
                            </span>
                          </button>

                          {/* Instruction step list under active sub */}
                          {isActiveSub && (
                            <div style={{ paddingLeft: 12, marginBottom: 4 }}>
                              {INSTRUCTIONS.map((instr, idx) => {
                                const isActiveInstr = idx === activeInstrIdx;
                                return (
                                  <button
                                    key={instr.id}
                                    onClick={() => onSelect(sa.id, idx)}
                                    style={{
                                      width: "100%",
                                      padding: "5px 8px",
                                      borderRadius: 8,
                                      border: "none",
                                      background: isActiveInstr ? T.red : "transparent",
                                      cursor: "pointer",
                                      textAlign: "left",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 7,
                                      marginBottom: 1,
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        background: isActiveInstr ? "rgba(255,255,255,0.25)" : T.surface2,
                                        color: isActiveInstr ? "#fff" : T.ink50,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 10,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                      }}
                                    >
                                      {instr.id}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: 11,
                                        color: isActiveInstr ? "#fff" : T.ink70,
                                        lineHeight: 1.3,
                                        flex: 1,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {instr.title}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Assembly View — right content panel
───────────────────────────────────────────────────────────────────────────── */
function AssemblyViewContent({
  activeSubId,
  activeInstrIdx,
  onNavigate,
  onPrev,
  onNext,
}: {
  activeSubId: string;
  activeInstrIdx: number;
  onNavigate: (s: string) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const instr = INSTRUCTIONS[activeInstrIdx];
  const totalInstr = INSTRUCTIONS.length;
  const subName =
    TREE.flatMap((a) => a.subAssemblies).find((sa) => sa.id === activeSubId)?.name ?? "";

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklistLabels = [
    "Verify gear bore is clean and free of debris",
    "Check O-ring condition — replace if compressed",
    "Confirm Loctite 641 is within expiry date",
    "Wear nitrile gloves and eye protection",
  ];

  const toggleCheck = (i: number) => {
    setCheckedItems((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const allChecked = checklistLabels.every((_, i) => checkedItems[i]);

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        overflow: "auto",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 32px", width: "100%" }}>
        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: T.ink50,
              background: T.surface2,
              padding: "4px 12px",
              borderRadius: 20,
              border: `1px solid rgba(0,0,0,0.06)`,
            }}
          >
            Step {activeInstrIdx + 1} of {totalInstr} — Sub-assembly {activeSubId}
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 100 }}>
              <ProgressBar
                value={Math.round(((activeInstrIdx + 1) / totalInstr) * 100)}
                height={5}
                color={T.red}
              />
            </div>
            <span style={{ fontSize: 11, color: T.ink50, flexShrink: 0, minWidth: 36 }}>
              {activeInstrIdx + 1}/{totalInstr}
            </span>
          </div>
        </div>

        {/* Instruction title */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: T.ink,
            letterSpacing: "-0.02em",
            fontFamily: T.fontSans,
            marginBottom: 20,
            lineHeight: 1.3,
          }}
        >
          {instr.title}
        </h2>

        {/* Reference image */}
        <div
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            background: "#1A1D23",
            marginBottom: 20,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" opacity={0.2}>
            <circle cx="70" cy="70" r="60" stroke="#fff" strokeWidth="2" />
            <circle cx="70" cy="70" r="40" stroke="#fff" strokeWidth="1.5" />
            <circle cx="70" cy="70" r="10" stroke="#fff" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
            <line x1="70" y1="10" x2="70" y2="30" stroke="#fff" strokeWidth="1.5" />
            <line x1="70" y1="110" x2="70" y2="130" stroke="#fff" strokeWidth="1.5" />
            <line x1="10" y1="70" x2="30" y2="70" stroke="#fff" strokeWidth="1.5" />
            <line x1="110" y1="70" x2="130" y2="70" stroke="#fff" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 70 + 60 * Math.cos(rad);
              const y = 70 + 60 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="5" fill="rgba(255,255,255,0.4)" />;
            })}
          </svg>
          <span
            style={{
              position: "absolute",
              bottom: 12,
              left: 16,
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              fontFamily: T.fontSans,
            }}
          >
            Fig. {activeInstrIdx + 1} — {subName}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: T.ink70,
            lineHeight: 1.7,
            marginBottom: 20,
            fontFamily: T.fontSans,
          }}
        >
          Using the assembly press, align the stationary gear concentrically with the housing bore.
          Apply steady, even pressure. Do NOT use a hammer or impact tool. Press until the gear seats
          flush with the housing face within ±0.02mm.
        </p>

        {/* Parts chips */}
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
            Parts
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Stationary Gear · 008514", "O-Ring Set · 00231", "Loctite 641"].map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: T.blue,
                  background: T.blueBg,
                  padding: "4px 10px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Package size={10} />
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Tools chips */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 6 }}>
            Tools
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Torque Wrench", "Assembly Press"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: T.amber,
                  background: T.amberBg,
                  padding: "4px 10px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Wrench size={10} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Pre-step checklist */}
        <div style={{ marginBottom: 28 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.ink50, letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: 10 }}>
            Pre-step Checklist
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {checklistLabels.map((label, i) => (
              <AnimatedCheckbox
                key={i}
                checked={!!checkedItems[i]}
                onChange={() => toggleCheck(i)}
                label={label}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onPrev}
            disabled={activeInstrIdx === 0}
            style={{
              height: 48,
              padding: "0 24px",
              borderRadius: 100,
              border: `1.5px solid rgba(0,0,0,0.1)`,
              background: "transparent",
              fontSize: 14,
              fontWeight: 600,
              color: T.ink50,
              fontFamily: T.fontSans,
              cursor: activeInstrIdx === 0 ? "not-allowed" : "pointer",
              opacity: activeInstrIdx === 0 ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>
          <button
            onClick={
              activeInstrIdx === totalInstr - 1
                ? () => onNavigate("assembly")
                : onNext
            }
            disabled={!allChecked}
            style={{
              height: 48,
              padding: "0 32px",
              borderRadius: 100,
              border: "none",
              background: allChecked ? T.red : T.surface3,
              fontSize: 14,
              fontWeight: 700,
              color: allChecked ? "#fff" : T.ink30,
              fontFamily: T.fontSans,
              cursor: allChecked ? "pointer" : "not-allowed",
              boxShadow: allChecked ? "0 4px 14px rgba(204,41,41,0.28)" : "none",
              transition: "all 0.2s",
            }}
          >
            {activeInstrIdx === totalInstr - 1
              ? "Open Assembly Workspace →"
              : "Save & Proceed →"}
          </button>
        </div>

        {!allChecked && (
          <p style={{ fontSize: 12, color: T.ink30, marginTop: 8, fontFamily: T.fontSans }}>
            Complete all checklist items to proceed
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */
export function InstructionDocScreen({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [activeView, setActiveView] = useState<"compose" | "assembly">("compose");
  const [activeSubId, setActiveSubId] = useState("1.1");
  const [activeInstrIdx, setActiveInstrIdx] = useState(0);

  return (
    <AppShell
      crumbs={[
        { label: "Work Orders", screen: "work-orders" },
        { label: "ENG-2025-041", screen: "project-detail" },
        { label: "Core Assembly Instructions" },
      ]}
      action={<ViewToggle activeView={activeView} onToggle={setActiveView} />}
      onNavigate={onNavigate}
      currentScreen="instruction-doc"
    >
      <AnimatePresence mode="wait">
        {activeView === "compose" ? (
          <motion.div
            key="compose"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ display: "flex", height: "100%", overflow: "hidden" }}
          >
            <ComposeTree
              activeSubId={activeSubId}
              onSelect={(id) => setActiveSubId(id)}
            />
            <ComposeEditor activeSubId={activeSubId} />
            <ComposeRightPanel />
          </motion.div>
        ) : (
          <motion.div
            key="assembly"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ display: "flex", height: "100%", overflow: "hidden" }}
          >
            <AssemblyViewNav
              activeSubId={activeSubId}
              activeInstrIdx={activeInstrIdx}
              onSelect={(subId, instrIdx) => {
                setActiveSubId(subId);
                setActiveInstrIdx(instrIdx);
              }}
            />
            <AssemblyViewContent
              activeSubId={activeSubId}
              activeInstrIdx={activeInstrIdx}
              onNavigate={onNavigate}
              onPrev={() => setActiveInstrIdx((i) => Math.max(0, i - 1))}
              onNext={() =>
                setActiveInstrIdx((i) =>
                  Math.min(INSTRUCTIONS.length - 1, i + 1)
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
