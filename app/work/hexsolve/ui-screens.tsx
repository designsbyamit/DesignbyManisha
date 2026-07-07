"use client";

import React from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   HexSolve UI Screen Mockups — Red-branded design matching real app
   Three-panel layout: dark charcoal sidebar | white content | right panel
   Pure React + Tailwind — no framer-motion.
   All components accept className prop for external sizing.
───────────────────────────────────────────────────────────────────────────── */

const APP = {
  red: "#CC2929",
  redHover: "#b52020",
  charcoal: "#3d3d3d",
  charcoalLight: "#4a4a4a",
  charcoalActive: "#525252",
  pageBg: "#f0f0f0",
  white: "#ffffff",
  border: "#e5e5e5",
  muted: "#6b7280",
  subtle: "#9ca3af",
  ink: "#111111",
  greenBg: "#dcfce7",
  green: "#15803d",
  grayBg: "#f3f4f6",
  grayText: "#6b7280",
  amberBg: "#fef3c7",
  amber: "#92400e",
};

/* ── Primitives ── */

function RedBtn({ label, small }: { label: string; small?: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded font-semibold cursor-pointer select-none`}
      style={{
        background: APP.red,
        color: APP.white,
        fontSize: small ? "11px" : "13px",
        padding: small ? "5px 12px" : "8px 18px",
      }}
    >
      {label}
    </div>
  );
}

function GhostBtn({ label, small }: { label: string; small?: boolean }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded cursor-pointer select-none"
      style={{
        background: APP.white,
        color: APP.ink,
        border: `1px solid ${APP.border}`,
        fontSize: small ? "11px" : "13px",
        padding: small ? "5px 12px" : "8px 18px",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  );
}

function ActiveBadge() {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
      style={{ background: APP.red, color: APP.white }}
    >
      ACTIVE
    </span>
  );
}

function DisabledBadge() {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
      style={{ background: APP.grayBg, color: APP.grayText, border: `1px solid ${APP.border}` }}
    >
      DISABLED
    </span>
  );
}

function StatusBadge({ status }: { status: "active" | "review" | "approved" | "draft" | "disabled" }) {
  const map = {
    active: { bg: APP.red, text: APP.white, label: "ACTIVE" },
    review: { bg: APP.amberBg, text: APP.amber, label: "IN REVIEW" },
    approved: { bg: APP.greenBg, text: APP.green, label: "APPROVED" },
    draft: { bg: APP.grayBg, text: APP.grayText, label: "DRAFT" },
    disabled: { bg: APP.grayBg, text: APP.grayText, label: "DISABLED" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}

/** Shared top nav bar */
function TopNav({ breadcrumb }: { breadcrumb?: string }) {
  return (
    <div
      className="flex items-center justify-between px-5"
      style={{
        height: "48px",
        background: APP.white,
        borderBottom: `1px solid ${APP.border}`,
        flexShrink: 0,
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold tracking-wide" style={{ color: APP.red }}>
          HEXSOLVE
        </span>
        {breadcrumb && (
          <span className="text-xs" style={{ color: APP.muted }}>
            {breadcrumb}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {/* bell */}
        <div className="relative">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={APP.muted} strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: APP.red }} />
        </div>
        {/* avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: APP.charcoal, color: APP.white }}
        >
          M
        </div>
      </div>
    </div>
  );
}

/** Dark charcoal sidebar */
function Sidebar({ active }: { active: string }) {
  const items = [
    { icon: "⊞", label: "Dashboard" },
    { icon: "⚠", label: "Quality Alerts" },
    { icon: "☰", label: "Quality Instructions" },
    { icon: "⟳", label: "Rework data" },
    { icon: "⊡", label: "Rework" },
    { icon: "☰", label: "Instructions" },
  ];
  return (
    <div
      className="flex flex-col"
      style={{
        width: "180px",
        background: APP.charcoal,
        flexShrink: 0,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div className="flex-1 py-3 space-y-0.5">
        {items.map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-4 py-2.5 text-xs cursor-pointer"
            style={{
              background: label === active ? APP.charcoalActive : "transparent",
              color: label === active ? APP.white : "rgba(255,255,255,0.65)",
              fontWeight: label === active ? 600 : 400,
            }}
          >
            <span className="text-base leading-none opacity-80">{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sub-assembly tree panel (left side of instruction screens) */
function SubAssemblyTree({ active = 4 }: { active?: number }) {
  return (
    <div
      className="flex flex-col text-xs"
      style={{
        width: "160px",
        background: APP.white,
        borderRight: `1px solid ${APP.border}`,
        flexShrink: 0,
        height: "100%",
        overflow: "hidden",
        padding: "12px 0",
      }}
    >
      {/* core assembly header */}
      <div className="flex items-center justify-between px-3 pb-2" style={{ borderBottom: `1px solid ${APP.border}` }}>
        <span className="font-semibold text-xs" style={{ color: APP.ink }}>Core assembly</span>
        <span style={{ color: APP.muted, fontSize: "10px" }}>▾</span>
      </div>

      <div className="py-2 px-3 space-y-1">
        <div className="font-semibold text-xs mb-1" style={{ color: APP.ink }}>Sub assembly 1</div>
        <div className="ml-2">
          <div className="text-[10px] font-medium mb-1" style={{ color: APP.muted }}>Sub assembly 1.1</div>
          <div className="ml-2 space-y-0.5">
            {/* intro + BOM */}
            {["Intro", "BOM"].map((l) => (
              <div key={l} className="flex items-center gap-1.5 py-0.5">
                <span style={{ color: APP.red, fontSize: "9px" }}>⊞</span>
                <span style={{ color: APP.muted }}>{l}</span>
              </div>
            ))}
            {/* numbered steps */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="flex items-center gap-1.5 py-0.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                  style={{
                    background: n === active ? APP.charcoalActive : n < active ? APP.charcoal : APP.grayBg,
                    color: n <= active ? APP.white : APP.muted,
                  }}
                >
                  {n}
                </div>
                <span
                  style={{
                    color: n === active ? APP.ink : APP.muted,
                    fontWeight: n === active ? 600 : 400,
                  }}
                >
                  Step {n}
                </span>
                {n === 3 && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={APP.muted} strokeWidth="2" style={{ marginLeft: "auto" }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 mt-1" style={{ color: APP.red }}>
              <span>+</span>
              <span className="text-[10px]">Create New</span>
            </div>
          </div>
          <div className="text-[10px] font-medium mt-2" style={{ color: APP.muted }}>Sub assembly 1.2</div>
        </div>

        <div className="font-semibold text-xs mt-2" style={{ color: APP.ink }}>Sub assembly 2</div>
        <div className="font-semibold text-xs" style={{ color: APP.ink }}>Sub assembly 3</div>
        <div className="flex items-center gap-1 mt-1" style={{ color: APP.red }}>
          <span>+</span><span className="text-[10px]">Create New</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-xs" style={{ color: APP.ink }}>Balancing</span>
          <span style={{ color: APP.muted, fontSize: "10px" }}>›</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-xs" style={{ color: APP.ink }}>Correction Process</span>
          <span style={{ color: APP.muted, fontSize: "10px" }}>›</span>
        </div>
      </div>

      {/* progress bar at bottom */}
      <div className="mt-auto px-3 pb-2">
        <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: APP.border }}>
          <div className="h-full rounded-full" style={{ width: "11%", background: APP.red }} />
        </div>
        <p className="text-[9px] mt-1" style={{ color: APP.red }}>10 / 87 instruction Completed</p>
      </div>
    </div>
  );
}

/** Right panel: Parts + Tools */
function RightPanel() {
  return (
    <div
      className="flex flex-col"
      style={{
        width: "200px",
        background: APP.white,
        borderLeft: `1px solid ${APP.border}`,
        flexShrink: 0,
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: APP.ink }}>Parts</p>
      <p className="text-[10px] mb-1" style={{ color: APP.muted }}>Enter the part number or</p>
      <p className="text-[10px] mb-3" style={{ color: APP.red }}>+ Browse from part repository</p>
      {/* part card */}
      <div
        className="rounded-lg p-2 relative"
        style={{ border: `1px solid ${APP.border}`, background: APP.white }}
      >
        <div className="absolute top-1.5 right-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={APP.muted} strokeWidth="2">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </div>
        {/* part image placeholder — ring bearing shape */}
        <div
          className="w-full rounded flex items-center justify-center mb-2"
          style={{ height: "70px", background: APP.grayBg }}
        >
          <svg viewBox="0 0 60 60" width="52" height="52">
            <circle cx="30" cy="30" r="26" fill="none" stroke="#999" strokeWidth="8" />
            <circle cx="30" cy="30" r="14" fill="none" stroke="#bbb" strokeWidth="4" />
            <circle cx="30" cy="30" r="8" fill="#ddd" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold" style={{ color: APP.ink }}>Stationary Gear</p>
        <p className="text-[10px]" style={{ color: APP.muted }}>Part No. : 008514</p>
        <p className="text-[10px]" style={{ color: APP.muted }}>Revision: 1</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px]" style={{ color: APP.muted }}>Qty: </span>
          <div
            className="flex items-center gap-1 px-2 rounded text-[10px]"
            style={{ border: `1px solid ${APP.border}`, color: APP.ink }}
          >
            1 <span style={{ color: APP.muted }}>▾</span>
          </div>
        </div>
      </div>

      <p className="text-xs font-bold mt-4 mb-1" style={{ color: APP.ink }}>Tools</p>
      <p className="text-[10px] mb-1" style={{ color: APP.muted }}>Enter the tool name or</p>
      <p className="text-[10px]" style={{ color: APP.red }}>+ Browse from tool repository</p>
    </div>
  );
}

/** Step progress indicator */
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{
              background: i + 1 === current ? APP.charcoal : APP.border,
              color: i + 1 === current ? APP.white : APP.muted,
            }}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="flex-1"
              style={{ height: "1px", width: "12px", background: APP.border, minWidth: "8px" }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCREEN COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

export function LoginScreen({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: APP.pageBg, minHeight: "240px" }}
    >
      <div
        className="w-72 rounded-xl p-8 shadow-sm"
        style={{ background: APP.white, border: `1px solid ${APP.border}` }}
      >
        <p className="text-xl font-bold mb-0.5" style={{ color: APP.red }}>HEXSOLVE</p>
        <p className="text-[10px] mb-6" style={{ color: APP.muted }}>Rotary Engine Manufacturing Platform</p>
        <div className="space-y-3 mb-4">
          {["Email address", "Password"].map((p) => (
            <div key={p}>
              <p className="text-[10px] font-medium mb-1" style={{ color: APP.ink }}>{p}</p>
              <div
                className="w-full rounded px-3"
                style={{ height: "32px", border: `1px solid ${APP.border}`, background: APP.white }}
              />
            </div>
          ))}
        </div>
        <RedBtn label="Sign In" />
      </div>
    </div>
  );
}

export function DashboardScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active="Dashboard" />
        <div className="flex-1 p-4 overflow-hidden">
          <p className="text-sm font-bold mb-4" style={{ color: APP.ink }}>Dashboard</p>
          {/* stat cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Active Projects", value: "4" },
              { label: "Pending Review", value: "2" },
              { label: "Completed This Month", value: "7" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg p-3"
                style={{ background: APP.white, border: `1px solid ${APP.border}` }}
              >
                <p className="text-2xl font-bold" style={{ color: APP.ink }}>{value}</p>
                <p className="text-[10px] mt-0.5" style={{ color: APP.muted }}>{label}</p>
              </div>
            ))}
          </div>
          {/* recent projects */}
          <div className="rounded-lg overflow-hidden" style={{ background: APP.white, border: `1px solid ${APP.border}` }}>
            <div className="px-3 py-2 border-b" style={{ borderColor: APP.border }}>
              <p className="text-xs font-semibold" style={{ color: APP.ink }}>Recent Projects</p>
            </div>
            {[
              { code: "ENG-2024-041", name: "AIE Rotary 225cs Engine", status: "active" as const, date: "2 hours ago" },
              { code: "ENG-2024-038", name: "Wankel 13B Assembly", status: "review" as const, date: "Yesterday" },
              { code: "ENG-2024-035", name: "20B Three-Rotor Build", status: "approved" as const, date: "3 days ago" },
            ].map(({ code, name, status, date }) => (
              <div key={code} className="flex items-center justify-between px-3 py-2.5 border-b last:border-b-0" style={{ borderColor: APP.border }}>
                <div>
                  <p className="text-xs font-medium" style={{ color: APP.ink }}>{code}</p>
                  <p className="text-[10px]" style={{ color: APP.muted }}>{name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={status} />
                  <p className="text-[10px]" style={{ color: APP.subtle }}>{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectListScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active="Dashboard" />
        <div className="flex-1 p-4 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold" style={{ color: APP.ink }}>Manufacturing Projects</p>
            <div className="flex items-center gap-2">
              <div
                className="h-7 px-3 rounded flex items-center text-[11px]"
                style={{ border: `1px solid ${APP.border}`, background: APP.white, color: APP.muted }}
              >
                🔍 Search
              </div>
              <RedBtn label="+ New Project" small />
            </div>
          </div>
          {/* filter chips */}
          <div className="flex gap-2 mb-3">
            {["All", "Active", "Under Review", "Completed"].map((f, i) => (
              <div
                key={f}
                className="px-3 py-1 rounded-full text-[10px] font-medium cursor-pointer"
                style={{
                  background: i === 0 ? APP.ink : APP.white,
                  color: i === 0 ? APP.white : APP.muted,
                  border: `1px solid ${i === 0 ? APP.ink : APP.border}`,
                }}
              >
                {f}
              </div>
            ))}
          </div>
          {/* project cards */}
          <div className="space-y-2.5">
            {[
              { code: "ENG-2024-041", customer: "Autoworks GmbH", model: "AIE Rotary 225cs", status: "active" as const, progress: 11 },
              { code: "ENG-2024-038", customer: "Mazda Specialist UK", model: "Wankel 13B", status: "review" as const, progress: 64 },
              { code: "ENG-2024-035", customer: "Rotary Revival Co.", model: "20B Three-Rotor", status: "approved" as const, progress: 100 },
            ].map(({ code, customer, model, status, progress }) => (
              <div
                key={code}
                className="rounded-lg p-3"
                style={{ background: APP.white, border: `1px solid ${APP.border}` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-bold" style={{ color: APP.ink }}>{code}</p>
                    <p className="text-[10px]" style={{ color: APP.muted }}>{customer} · {model}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: APP.grayBg }}>
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, background: progress === 100 ? "#22c55e" : APP.red }} />
                </div>
                <p className="text-[9px] mt-1" style={{ color: APP.muted }}>{progress}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="← Back to Dashboard  /  001942 AIE rotary 225cs engine" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active="Dashboard" />
        <div className="flex-1 p-4 overflow-hidden">
          {/* project header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold" style={{ color: APP.ink }}>001942 AIE rotary 225cs engine</p>
                <StatusBadge status="active" />
              </div>
              <p className="text-[10px] mt-0.5" style={{ color: APP.muted }}>SI.No.: 1862</p>
            </div>
            <div className="flex gap-2">
              <GhostBtn label="Preview" small />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { title: "Project Info", rows: [["Customer", "Autoworks GmbH"], ["Engine Model", "AIE Rotary 225cs"], ["Deadline", "30 Jan 2025"]] },
              { title: "Team", rows: [["Author", "Martin K."], ["Reviewer", "Steven P."], ["Engineer", "Bran O."]] },
            ].map(({ title, rows }) => (
              <div key={title} className="rounded-lg p-3" style={{ background: APP.white, border: `1px solid ${APP.border}` }}>
                <p className="text-xs font-bold mb-2" style={{ color: APP.ink }}>{title}</p>
                {rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[10px] py-1 border-b last:border-b-0" style={{ borderColor: APP.border }}>
                    <span style={{ color: APP.muted }}>{k}</span>
                    <span style={{ color: APP.ink, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* instruction documents */}
          <div className="rounded-lg overflow-hidden" style={{ background: APP.white, border: `1px solid ${APP.border}` }}>
            <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: APP.border }}>
              <p className="text-xs font-semibold" style={{ color: APP.ink }}>Instruction Documents</p>
              <RedBtn label="+ New Document" small />
            </div>
            {[
              { name: "Core Assembly Instructions", status: "approved" as const },
              { name: "Balancing Procedure", status: "review" as const },
              { name: "Correction Process Guide", status: "draft" as const },
            ].map(({ name, status }) => (
              <div key={name} className="flex items-center justify-between px-3 py-2.5 border-b last:border-b-0" style={{ borderColor: APP.border }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-[10px]" style={{ background: APP.grayBg }}>☰</div>
                  <p className="text-xs" style={{ color: APP.ink }}>{name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={status} />
                  <GhostBtn label="View Document" small />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstructionDocumentScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="001942 AIE rotary 225cs engine" />
      <div className="flex flex-1 overflow-hidden">
        <SubAssemblyTree active={2} />
        {/* main panel */}
        <div className="flex-1 p-4 overflow-hidden" style={{ background: APP.white }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: APP.ink }}>Core Assembly Instructions</p>
            <div className="flex gap-2">
              <GhostBtn label="Preview" small />
              <StatusBadge status="approved" />
            </div>
          </div>
          {/* instruction list */}
          <div className="space-y-1.5">
            {[
              { n: "1.1", title: "Prepare work area and PPE", done: true },
              { n: "1.2", title: "Inspect rotor housing for damage", done: true },
              { n: "1.3", title: "Install stationary gear — apply Loctite 641", done: false, active: true },
              { n: "1.4", title: "Press apex seals into rotor grooves", done: false },
              { n: "1.5", title: "Lubricate rotor bearing surfaces", done: false },
              { n: "1.6", title: "Assemble eccentric shaft assembly", done: false },
            ].map(({ n, title, done, active }) => (
              <div
                key={n}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                style={{
                  background: active ? "#fff8f8" : APP.white,
                  border: `1px solid ${active ? APP.red : APP.border}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: done ? "#22c55e" : active ? APP.red : APP.grayBg }}
                >
                  {done && <span style={{ color: APP.white, fontSize: "8px" }}>✓</span>}
                </div>
                <span className="text-[10px] font-medium" style={{ color: APP.muted }}>{n}</span>
                <span className="text-xs flex-1" style={{ color: active ? APP.red : APP.ink, fontWeight: active ? 600 : 400 }}>{title}</span>
                {active && <StatusBadge status="active" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InstructionEditorScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="001942 AIE rotary 225cs engine  /  Preview" />
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <SubAssemblyTree active={4} />
        {/* center content */}
        <div className="flex-1 overflow-y-auto p-4" style={{ background: APP.white }}>
          {/* top bar */}
          <div className="flex items-center justify-between mb-4">
            <StepProgress current={2} total={4} />
            <div className="flex gap-2">
              <GhostBtn label="Save Draft" small />
              <RedBtn label="Submit for Review" small />
            </div>
          </div>

          {/* process image */}
          <p className="text-xs font-bold mb-2" style={{ color: APP.ink }}>Process Image</p>
          <div
            className="w-full rounded-lg flex items-center justify-center mb-4"
            style={{ height: "110px", border: `1.5px dashed ${APP.border}`, background: APP.pageBg }}
          >
            <div className="text-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1" style={{ border: `1.5px dashed ${APP.muted}` }}>
                <span style={{ color: APP.muted, fontSize: "16px" }}>+</span>
              </div>
              <p className="text-[10px]" style={{ color: APP.muted }}>Add image or video</p>
            </div>
          </div>

          {/* process description */}
          <p className="text-xs font-bold mb-2" style={{ color: APP.ink }}>Process Description</p>
          <div
            className="w-full rounded-lg px-3 py-2 mb-4 text-[10px]"
            style={{ border: `1px solid ${APP.border}`, minHeight: "60px", color: APP.muted }}
          >
            Whilst the Stationary gear is heating up apply Loctite 641 to the dowel and insert chamfered end first with the flat area facing outwards from the centre.
          </div>

          {/* form elements */}
          <p className="text-xs font-bold mb-2" style={{ color: APP.ink }}>Form elements to capture data</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["Enter the Torque Value", "Pressed depth of the bearing"].map((label) => (
              <div key={label} className="rounded-lg p-2.5" style={{ border: `1px solid ${APP.border}` }}>
                <p className="text-[10px] font-medium mb-1.5" style={{ color: APP.muted }}>{label}</p>
                <div
                  className="w-full rounded px-2"
                  style={{ height: "26px", border: `1px solid ${APP.border}`, background: APP.white }}
                />
              </div>
            ))}
          </div>

          {/* sign off */}
          <p className="text-xs font-bold mb-2" style={{ color: APP.ink }}>Sign off</p>
          <div className="rounded-lg p-3 mb-4" style={{ border: `1px solid ${APP.border}` }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-4 rounded-full flex items-end justify-end pr-0.5" style={{ background: APP.red }}>
                <div className="w-3 h-3 rounded-full" style={{ background: APP.white }} />
              </div>
              <span className="text-[10px]" style={{ color: APP.ink }}>Individual sign off</span>
            </div>
          </div>

          {/* save */}
          <div className="flex justify-end gap-2">
            <GhostBtn label="Back" />
            <RedBtn label="Save and Proceed" />
          </div>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

export function AssemblyWorkspaceScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="001942 AIE rotary 225cs engine" />
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <SubAssemblyTree active={4} />
        {/* main */}
        <div className="flex-1 p-4 overflow-hidden" style={{ background: APP.white }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold" style={{ color: APP.ink }}>Process Description</p>
            <StepProgress current={2} total={4} />
          </div>

          {/* process image */}
          <div
            className="w-full rounded-xl mb-3 overflow-hidden"
            style={{ height: "140px", background: APP.pageBg, border: `1px solid ${APP.border}` }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {/* simulated machinery image */}
              <svg viewBox="0 0 200 120" width="200" height="120" style={{ opacity: 0.4 }}>
                <rect x="20" y="20" width="160" height="80" rx="8" fill="#999" />
                <rect x="40" y="35" width="60" height="50" rx="4" fill="#777" />
                <rect x="110" y="45" width="50" height="30" rx="3" fill="#888" />
                <circle cx="60" cy="75" r="12" fill="#555" />
                <rect x="25" y="85" width="20" height="8" rx="2" fill="#e83a00" />
              </svg>
            </div>
          </div>

          {/* description */}
          <p className="text-[10px] leading-relaxed mb-3" style={{ color: APP.ink }}>
            1. Whilst the Stationary gear is heating up apply Loctite 641 to the dowel and insert chamfered end first with the flat area facing outwards from the centre.
          </p>

          {/* form data */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["Enter the Torque Value", "Pressed depth of the bearing"].map((l) => (
              <div key={l}>
                <p className="text-[9px] mb-1" style={{ color: APP.muted }}>{l}</p>
                <div className="w-full rounded px-2" style={{ height: "26px", border: `1px solid ${APP.border}` }} />
              </div>
            ))}
          </div>

          {/* sign off */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded border" style={{ borderColor: APP.border }} />
            <span className="text-[10px]" style={{ color: APP.ink }}>Sign off Required</span>
          </div>

          <div className="flex gap-2">
            <GhostBtn label="Back" />
            <RedBtn label="Save and Proceed" />
          </div>
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

export function ReviewPanelScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="001942 AIE rotary 225cs engine — Review" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active="Quality Instructions" />
        <div className="flex-1 p-4 overflow-hidden" style={{ background: APP.white }}>
          {/* header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-bold" style={{ color: APP.ink }}>Core Assembly Instructions</p>
              <p className="text-[10px]" style={{ color: APP.muted }}>SI.No.: 1862  ·  Rev. 3</p>
            </div>
            <StatusBadge status="review" />
          </div>

          {/* change summary */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3 text-[10px]"
            style={{ background: "#fffbeb", border: `1px solid #fde68a` }}
          >
            <span style={{ color: APP.amber }}>⚠</span>
            <span style={{ color: APP.amber }}>3 changes since last review</span>
          </div>

          {/* instruction list */}
          <div className="space-y-1 mb-4">
            {[
              { n: "1.3", title: "Install stationary gear", tag: "Modified" },
              { n: "1.4", title: "Press apex seals", tag: "New" },
              { n: "1.5", title: "Lubricate surfaces", tag: "Unchanged" },
            ].map(({ n, title, tag }) => (
              <div
                key={n}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                style={{ border: `1px solid ${APP.border}` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium" style={{ color: APP.muted }}>{n}</span>
                  <span className="text-xs" style={{ color: APP.ink }}>{title}</span>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: tag === "Modified" ? APP.amberBg : tag === "New" ? "#dbeafe" : APP.grayBg,
                    color: tag === "Modified" ? APP.amber : tag === "New" ? "#1d4ed8" : APP.grayText,
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <RedBtn label="Approve Document" />
            <GhostBtn label="Request Changes" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QAValidationScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.pageBg }}>
      <TopNav breadcrumb="001942 AIE rotary 225cs engine — QA" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar active="Quality Alerts" />
        <div className="flex-1 p-4 overflow-hidden" style={{ background: APP.white }}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold" style={{ color: APP.ink }}>Quality Assurance</p>
            <StatusBadge status="review" />
          </div>
          <p className="text-[10px] mb-4" style={{ color: APP.muted }}>Document approved: 14 Jan 2025 · 09:41 · Martin K.</p>

          {/* checklist sections */}
          {[
            { title: "Pre-Assembly Checks", items: ["Work area prepared", "PPE confirmed", "Parts verified"] },
            { title: "Assembly Execution", items: ["Torque values recorded", "Sign-off completed"] },
            { title: "Final Inspection", items: ["Dimensional check passed", "No visible defects"] },
          ].map(({ title, items }, si) => (
            <div key={title} className="mb-3">
              <p className="text-[10px] font-bold mb-1.5" style={{ color: APP.ink }}>{title}</p>
              {items.map((item, i) => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: si === 0 || (si === 1 && i === 0) ? APP.red : APP.grayBg,
                      border: si === 0 || (si === 1 && i === 0) ? "none" : `1px solid ${APP.border}`,
                    }}
                  >
                    {(si === 0 || (si === 1 && i === 0)) && <span style={{ color: APP.white, fontSize: "8px" }}>✓</span>}
                  </div>
                  <span className="text-[10px]" style={{ color: APP.ink }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          {/* progress */}
          <div className="mb-4">
            <div className="flex justify-between text-[10px] mb-1">
              <span style={{ color: APP.muted }}>Completion</span>
              <span style={{ color: APP.ink, fontWeight: 600 }}>62%</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", background: APP.grayBg }}>
              <div className="h-full rounded-full" style={{ width: "62%", background: APP.red }} />
            </div>
          </div>

          <div className="flex gap-2">
            <RedBtn label="Pass" />
            <GhostBtn label="Fail — Request Rework" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChecklistDetailScreen({ className = "" }: { className?: string }) {
  return (
    <div
      className={`p-5 overflow-hidden ${className}`}
      style={{ background: APP.white, border: `1px solid ${APP.border}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[10px] font-semibold" style={{ color: APP.red }}>Step 1.3</p>
          <p className="text-sm font-bold leading-tight mt-0.5" style={{ color: APP.ink }}>Install Stationary Gear</p>
        </div>
        <StatusBadge status="active" />
      </div>

      <p className="text-[10px] leading-relaxed mb-4" style={{ color: APP.muted }}>
        Apply Loctite 641 to the dowel and insert chamfered end first with the flat area facing outwards from the centre.
      </p>

      {/* checklist */}
      <p className="text-[10px] font-bold mb-2" style={{ color: APP.ink }}>Validation Checklist</p>
      <div className="space-y-2 mb-4">
        {[
          { item: "Gear seated flush with housing face", done: true },
          { item: "No visible gap between gear and bore", done: true },
          { item: "Orientation marker aligned correctly", done: false },
          { item: "Torque value recorded in form", done: false },
        ].map(({ item, done }) => (
          <div key={item} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{
                background: done ? APP.red : APP.white,
                border: `1.5px solid ${done ? APP.red : APP.border}`,
              }}
            >
              {done && <span style={{ color: APP.white, fontSize: "8px" }}>✓</span>}
            </div>
            <span className="text-[10px]" style={{ color: done ? APP.muted : APP.ink }}>{item}</span>
          </div>
        ))}
      </div>

      {/* chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {["Torque Wrench", "Loctite 641", "Stationary Gear 008514", "Dowel Pin"].map((c) => (
          <span
            key={c}
            className="text-[9px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: APP.grayBg, color: APP.muted }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px]" style={{ color: APP.muted }}>2 of 4 complete</span>
        <div className="w-16 rounded-full overflow-hidden" style={{ height: "3px", background: APP.grayBg }}>
          <div style={{ width: "50%", height: "100%", background: APP.red, borderRadius: "9999px" }} />
        </div>
      </div>
    </div>
  );
}

export function SectionNavigationScreen({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden ${className}`} style={{ background: APP.white }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: APP.border }}>
        <p className="text-xs font-bold" style={{ color: APP.ink }}>Core Assembly Instructions</p>
        <StatusBadge status="approved" />
      </div>
      <div className="flex-1 p-4 space-y-2 overflow-hidden">
        {[
          {
            section: "1. Pre-Assembly",
            subs: [
              { name: "1.1 Work Area Preparation", count: 3, done: true, active: false },
              { name: "1.2 Parts Verification", count: 5, done: true, active: false },
            ],
          },
          {
            section: "2. Core Assembly",
            active: true,
            subs: [
              { name: "2.1 Stationary Gear Install", count: 8, active: true, done: false },
              { name: "2.2 Apex Seal Assembly", count: 6, active: false, done: false },
              { name: "2.3 Eccentric Shaft", count: 9, active: false, done: false },
            ],
          },
          {
            section: "3. Balancing",
            subs: [
              { name: "3.1 Dynamic Balance Check", count: 4, active: false, done: false },
              { name: "3.2 Correction Weights", count: 3, active: false, done: false },
            ],
          },
        ].map(({ section, subs, active }) => (
          <div key={section}>
            <div
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold"
              style={{
                background: active ? "#fff0f0" : APP.pageBg,
                color: active ? APP.red : APP.ink,
                border: `1px solid ${active ? APP.red : APP.border}`,
              }}
            >
              {section}
            </div>
            <div className="ml-4 mt-1 space-y-1">
              {subs.map(({ name, count, done, active: subActive }) => (
                <div
                  key={name}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{
                    background: subActive ? "#fff8f8" : APP.white,
                    border: `1px solid ${subActive ? APP.red : APP.border}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: done ? "#22c55e" : subActive ? APP.red : APP.border }}
                    />
                    <span className="text-[10px]" style={{ color: subActive ? APP.red : APP.ink, fontWeight: subActive ? 600 : 400 }}>{name}</span>
                  </div>
                  <span className="text-[9px]" style={{ color: APP.muted }}>{count} steps</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HandoffScreen({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      style={{ background: APP.white, border: `1px solid ${APP.border}` }}
    >
      {/* success checkmark */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: "#dcfce7" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="text-base font-bold mb-1" style={{ color: APP.ink }}>Assembly Complete</p>
      <p className="text-[10px] mb-5" style={{ color: APP.muted }}>All 87 instructions completed and signed off</p>

      {/* summary cards */}
      <div className="grid grid-cols-3 gap-2 w-full mb-4">
        {[
          { label: "Instructions", value: "87" },
          { label: "Time Taken", value: "6h 42m" },
          { label: "Engineer", value: "Bran O." },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg py-3" style={{ background: APP.pageBg }}>
            <p className="text-sm font-bold" style={{ color: APP.ink }}>{value}</p>
            <p className="text-[9px] mt-0.5" style={{ color: APP.muted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* notes */}
      <div
        className="w-full rounded-lg p-2 mb-4 text-left"
        style={{ border: `1px solid ${APP.border}`, minHeight: "44px" }}
      >
        <p className="text-[10px]" style={{ color: APP.muted }}>Handoff notes: All apex seal clearances within spec. Torque log attached.</p>
      </div>

      <RedBtn label="Submit to QA" />
    </div>
  );
}

/* ── convenience re-export ── */
export const HexSolveScreens = {
  LoginScreen,
  DashboardScreen,
  ProjectListScreen,
  ProjectDetailScreen,
  InstructionDocumentScreen,
  InstructionEditorScreen,
  AssemblyWorkspaceScreen,
  ReviewPanelScreen,
  QAValidationScreen,
  ChecklistDetailScreen,
  SectionNavigationScreen,
  HandoffScreen,
};

export default HexSolveScreens;
