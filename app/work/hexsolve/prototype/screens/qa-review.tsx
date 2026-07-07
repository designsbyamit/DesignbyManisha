"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Check,
  AlertTriangle,
  Download,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { T } from "../tokens";
import { Btn, Checkbox, Avatar, ProgressBar } from "../components";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

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
      <div style={{ height: 56, background: T.surface, borderBottom: `1px solid ${T.surface3}`, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.03em", cursor: "pointer" }} onClick={() => onNavigate("work-orders")}>
          <span style={{ color: T.red }}>Hex</span><span style={{ color: T.ink }}>Solve</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.sidebar, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>M</div>
          <span style={{ fontSize: 12, color: T.ink50 }}>Manisha R.</span>
        </div>
      </div>
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

/* ── Types ── */
type ChangeType = "modified" | "new" | "unchanged";

interface InstructionItem {
  id: string;
  number: string;
  title: string;
  changeType: ChangeType;
  text: string;
  checklistComplete: boolean;
  dataValues: { label: string; value: string }[];
  approved: boolean;
  flagged: boolean;
  flagComment: string;
}

const INITIAL_INSTRUCTIONS: InstructionItem[] = [
  {
    id: "i1",
    number: "2.1.1",
    title: "Mount rotor housing to assembly fixture",
    changeType: "unchanged",
    text: "Secure rotor housing (P/N 008201) to the rotary engine assembly stand using four M10 bolts. Torque to 45 Nm in a cross pattern.",
    checklistComplete: true,
    dataValues: [{ label: "Torque (Nm)", value: "45.2" }],
    approved: false,
    flagged: false,
    flagComment: "",
  },
  {
    id: "i2",
    number: "2.1.2",
    title: "Clean stationary gear bore",
    changeType: "unchanged",
    text: "Using acetone and lint-free cloth, clean the stationary gear bore to remove all machining oil and particulates. Inspect for surface defects.",
    checklistComplete: true,
    dataValues: [],
    approved: false,
    flagged: false,
    flagComment: "",
  },
  {
    id: "i3",
    number: "2.1.3",
    title: "Apply thread sealant to gear studs",
    changeType: "unchanged",
    text: "Apply Loctite 262 (red) to the four gear mounting studs. Allow 10 minutes cure time before continuing.",
    checklistComplete: true,
    dataValues: [{ label: "Cure time (min)", value: "12" }],
    approved: false,
    flagged: false,
    flagComment: "",
  },
  {
    id: "i4",
    number: "2.1.4",
    title: "Install stationary gear assembly",
    changeType: "modified",
    text: "Lower stationary gear (P/N 008514) into bore, aligning timing mark with housing reference line. Revised: verify alignment using dial indicator before proceeding.",
    checklistComplete: true,
    dataValues: [{ label: "Alignment offset (mm)", value: "0.01" }],
    approved: false,
    flagged: false,
    flagComment: "",
  },
  {
    id: "i5",
    number: "2.1.5",
    title: "Apply Loctite 641 to bearing journal",
    changeType: "modified",
    text: "Apply a 2mm bead of Loctite 641 retaining compound around the full circumference of the bearing journal. Revised torque spec: 85 Nm (was 80 Nm).",
    checklistComplete: false,
    dataValues: [{ label: "Bead width (mm)", value: "2.1" }],
    approved: false,
    flagged: false,
    flagComment: "",
  },
  {
    id: "i6",
    number: "2.1.6",
    title: "Verify gear timing alignment (new step)",
    changeType: "new",
    text: "New step added per ECR-441: Using a calibrated dial indicator, verify gear timing alignment is within ±0.02mm of the housing datum point. Record result.",
    checklistComplete: false,
    dataValues: [],
    approved: false,
    flagged: false,
    flagComment: "",
  },
];

/* ── Change badge ── */
function ChangeBadge({ type }: { type: ChangeType }) {
  const cfg = {
    modified:  { bg: T.amberBg, text: "#92400E", label: "Modified" },
    new:       { bg: T.blueBg,  text: "#1D4ED8", label: "New" },
    unchanged: { bg: T.surface2, text: T.ink50,  label: "Unchanged" },
  }[type];
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        background: cfg.bg,
        color: cfg.text,
        padding: "2px 8px",
        borderRadius: 99,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
      }}
    >
      {cfg.label}
    </span>
  );
}

const APPROVAL_ITEMS = [
  "All mandatory fields completed",
  "Torque values within spec",
  "Sign-off signatures verified",
  "Reference images confirmed",
];

const INITIAL_APPROVAL_CHECKS = [true, true, false, false];

const TEAM_SIGNOFFS = [
  { name: "Martin K.", role: "Document Author", signed: true },
  { name: "Chen W.",   role: "QA Engineer",     signed: false },
  { name: "Soo-Jin P.", role: "Lead Engineer",  signed: false },
];

export function QAReviewScreen({ onNavigate }: ScreenProps) {
  const [instructions, setInstructions] = useState<InstructionItem[]>(INITIAL_INSTRUCTIONS);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [approvalChecks, setApprovalChecks] = useState(INITIAL_APPROVAL_CHECKS);
  const [overallComment, setOverallComment] = useState("");
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleApproveInstruction(id: string) {
    setInstructions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, approved: true, flagged: false } : i))
    );
  }

  function handleFlagInstruction(id: string) {
    setInstructions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, flagged: !i.flagged, approved: false } : i))
    );
    if (!expandedIds.has(id)) toggleExpand(id);
  }

  function handleFlagCommentChange(id: string, val: string) {
    setInstructions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, flagComment: val } : i))
    );
  }

  function handleApprovalCheck(i: number) {
    setApprovalChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function handleApproveDocument() {
    setApproveLoading(true);
    setTimeout(() => {
      setApproveSuccess(true);
      setTimeout(() => onNavigate("work-orders"), 1200);
    }, 800);
  }

  const approvedCount = instructions.filter((i) => i.approved).length;
  const flaggedCount = instructions.filter((i) => i.flagged).length;
  const approvalProgress = Math.round((approvalChecks.filter(Boolean).length / APPROVAL_ITEMS.length) * 100);

  const crumbs = [
    { label: "Work Orders", screen: "work-orders" },
    { label: "ENG-2025-041", screen: "instruction-doc" },
    { label: "QA Review" },
  ];

  return (
    <AppShell crumbs={crumbs} onNavigate={onNavigate} currentScreen="qa-review">
      {/* ─── MAIN CONTENT ─── */}
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
        {/* LEFT — review content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {/* Doc header */}
          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.surface3}`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <h1 style={{ fontSize: 18, fontWeight: 700, color: T.ink, letterSpacing: "-0.02em" }}>
                    Core Assembly Instructions
                  </h1>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: T.ink50,
                      background: T.surface2,
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    Version 3
                  </span>
                </div>
                <p style={{ fontSize: 12, color: T.ink50 }}>
                  Submitted by: <strong style={{ color: T.ink70 }}>Martin K.</strong> on 22 Jan 2025 · 14:32
                </p>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: T.amberBg,
                  color: "#92400E",
                  padding: "4px 12px",
                  borderRadius: 99,
                }}
              >
                Pending QA Review
              </span>
            </div>

            {/* Change summary strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: T.amberBg,
                border: "1px solid #FCD34D",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <AlertTriangle size={14} style={{ color: T.amber, flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: "#92400E" }}>
                <strong>4 items changed since last version</strong> — review required before approval.
                2 modified steps, 1 new step added per ECR-441.
              </p>
            </div>
          </div>

          {/* Instructions list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {instructions.map((inst) => {
              const isExpanded = expandedIds.has(inst.id);
              const isFlagged = inst.flagged;
              const isApproved = inst.approved;
              return (
                <div
                  key={inst.id}
                  style={{
                    background: T.surface,
                    border: `1px solid ${isFlagged ? T.amber : isApproved ? T.green : T.surface3}`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 12, cursor: "pointer" }}
                    onClick={() => toggleExpand(inst.id)}
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ display: "flex", flexShrink: 0 }}
                    >
                      <ChevronRight size={14} style={{ color: T.ink30 }} />
                    </motion.span>

                    <span style={{ fontSize: 11, fontWeight: 700, color: T.ink30, flexShrink: 0 }}>
                      {inst.number}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: T.ink, flex: 1 }}>
                      {inst.title}
                    </span>
                    <ChangeBadge type={inst.changeType} />

                    {isApproved && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: T.green }}>
                        <Check size={13} />
                        Approved
                      </div>
                    )}
                    {isFlagged && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: T.amber }}>
                        <AlertTriangle size={13} />
                        Flagged
                      </div>
                    )}

                    {!isApproved && !isFlagged && (
                      <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleApproveInstruction(inst.id)}
                          style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, border: `1px solid ${T.green}`, color: T.green, background: "transparent", cursor: "pointer" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleFlagInstruction(inst.id)}
                          style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, border: `1px solid ${T.amber}`, color: T.amber, background: "transparent", cursor: "pointer" }}
                        >
                          Flag Issue
                        </button>
                      </div>
                    )}
                    {(isApproved || isFlagged) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInstructions((prev) =>
                            prev.map((i) => i.id === inst.id ? { ...i, approved: false, flagged: false } : i)
                          );
                        }}
                        style={{ fontSize: 10, color: T.ink30, background: "none", border: "none", cursor: "pointer" }}
                      >
                        Undo
                      </button>
                    )}
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "12px 16px 16px", borderTop: `1px solid ${T.surface3}` }}>
                          <p style={{ fontSize: 13, color: T.ink70, lineHeight: 1.6, marginBottom: 12 }}>
                            {inst.text}
                          </p>

                          {inst.dataValues.length > 0 && (
                            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                              {inst.dataValues.map(({ label, value }) => (
                                <div
                                  key={label}
                                  style={{ background: T.surface2, border: `1px solid ${T.surface3}`, borderRadius: 6, padding: "6px 12px" }}
                                >
                                  <p style={{ fontSize: 10, color: T.ink30, marginBottom: 2 }}>{label}</p>
                                  <p style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{value}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                            {inst.checklistComplete ? (
                              <>
                                <CheckCircle2 size={13} style={{ color: T.green }} />
                                <span style={{ color: T.green, fontWeight: 600 }}>All checklist items completed</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle size={13} style={{ color: T.amber }} />
                                <span style={{ color: T.amber, fontWeight: 600 }}>Checklist incomplete</span>
                              </>
                            )}
                          </div>

                          {isFlagged && (
                            <div style={{ marginTop: 12 }}>
                              <textarea
                                value={inst.flagComment}
                                onChange={(e) => handleFlagCommentChange(inst.id, e.target.value)}
                                placeholder="Describe the issue..."
                                rows={2}
                                style={{
                                  width: "100%",
                                  fontSize: 12,
                                  padding: "8px 10px",
                                  border: `1.5px solid ${T.amber}`,
                                  borderRadius: 6,
                                  color: T.ink70,
                                  resize: "vertical" as const,
                                  outline: "none",
                                  fontFamily: T.fontSans,
                                  background: T.surface,
                                  boxSizing: "border-box" as const,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Spacer for sticky bar */}
          <div style={{ height: 80 }} />
        </div>

        {/* RIGHT — approval panel */}
        <div
          style={{
            width: 320,
            flexShrink: 0,
            background: T.surface,
            borderLeft: `1px solid ${T.surface3}`,
            overflowY: "auto",
          }}
        >
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Approval checklist */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: T.ink30 }}>
                  Approval Checklist
                </p>
                <span style={{ fontSize: 11, fontWeight: 700, color: approvalProgress === 100 ? T.green : T.amber }}>
                  {approvalProgress}%
                </span>
              </div>
              <ProgressBar value={approvalProgress} color={approvalProgress === 100 ? T.green : T.amber} height={4} />
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                {APPROVAL_ITEMS.map((item, i) => (
                  <Checkbox key={item} checked={approvalChecks[i]} onChange={() => handleApprovalCheck(i)} label={item} />
                ))}
              </div>
            </div>

            {/* Team sign-offs */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: T.ink30, marginBottom: 12 }}>
                Team Sign-offs
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TEAM_SIGNOFFS.map(({ name, role, signed }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={name} size={30} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: T.ink70, lineHeight: 1.2 }}>{name}</p>
                      <p style={{ fontSize: 10, color: T.ink30 }}>{role}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: signed ? T.green : T.ink30 }}>
                      {signed ? <Check size={12} /> : <Clock size={12} />}
                      {signed ? "Signed" : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document stats */}
            <div style={{ background: T.surface2, border: `1px solid ${T.surface3}`, borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: T.ink30, marginBottom: 10 }}>
                Document Stats
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {([
                  ["Total Instructions", "87"],
                  ["Completion", "100%"],
                  ["Approved (this review)", `${approvedCount}`],
                  ["Flagged", `${flaggedCount}`],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: T.ink50 }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Btn label="Compare with Previous Version" variant="secondary" size="sm" full />
              <Btn label="Download Report" variant="secondary" size="sm" full icon={<Download size={13} />} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── STICKY BOTTOM BAR ─── */}
      <div
        style={{
          height: 68,
          background: T.surface,
          borderTop: `1px solid ${T.surface3}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Comment input */}
        <div style={{ flex: 1, position: "relative" }}>
          <MessageSquare
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.ink30 }}
          />
          <input
            value={overallComment}
            onChange={(e) => setOverallComment(e.target.value)}
            placeholder="Add overall comment..."
            style={{
              width: "100%",
              fontSize: 13,
              padding: "9px 12px 9px 34px",
              background: T.surface2,
              border: `1.5px solid ${T.surface3}`,
              borderRadius: 8,
              color: T.ink,
              outline: "none",
              fontFamily: T.fontSans,
              boxSizing: "border-box" as const,
            }}
          />
        </div>

        <Btn label="Request Revision" variant="ghost" />

        <AnimatePresence mode="wait">
          {approveSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: T.greenBg,
                color: T.green,
                fontSize: 13,
                fontWeight: 700,
                padding: "8px 20px",
                borderRadius: 8,
              }}
            >
              <Check size={16} />
              Document Approved!
            </motion.div>
          ) : (
            <motion.div key="btn" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Btn
                label={approveLoading ? "Approving..." : "Approve Document"}
                onClick={handleApproveDocument}
                disabled={approveLoading}
                size="lg"
                icon={
                  approveLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6, ease: "linear", repeat: Infinity }}
                    >
                      <Clock size={14} />
                    </motion.div>
                  ) : (
                    <CheckCircle2 size={15} />
                  )
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
