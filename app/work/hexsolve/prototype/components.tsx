"use client";

import React, { useState, useRef } from "react";
import { T, statusMeta, type Status } from "./tokens";
import { ChevronDown, ChevronRight, Search, Bell, User, Settings, LogOut, Check, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED ENTERPRISE COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

/* ── Button ── */
interface BtnProps {
  label: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  full?: boolean;
}

export function Btn({ label, onClick, variant = "primary", size = "md", icon, iconRight, disabled, full }: BtnProps) {
  const [pressed, setPressed] = useState(false);
  const sz = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-2.5 text-sm" }[size];
  const vs = {
    primary:   { bg: T.red, text: "#fff", border: T.red, hover: T.redHover },
    secondary: { bg: "#fff", text: T.ink70, border: T.surface3, hover: T.surface2 },
    ghost:     { bg: "transparent", text: T.ink50, border: "transparent", hover: T.surface2 },
    danger:    { bg: T.redSubtle, text: T.red, border: T.redSubtle, hover: "#FEE2E2" },
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all select-none ${sz} ${full ? "w-full" : ""}`}
      style={{
        background: disabled ? T.surface2 : vs.bg,
        color: disabled ? T.ink30 : vs.text,
        border: `1px solid ${disabled ? T.surface3 : vs.border}`,
        transform: pressed ? "scale(0.98)" : "scale(1)",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: T.fontSans,
        letterSpacing: "-0.01em",
        boxShadow: variant === "primary" && !disabled ? T.shadowSm : "none",
      }}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {label}
      {iconRight && <span style={{ display: "flex" }}>{iconRight}</span>}
    </button>
  );
}

/* ── Badge / Status ── */
export function StatusBadge({ status, size = "md" }: { status: Status; size?: "sm" | "md" }) {
  const m = statusMeta(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 font-semibold rounded-full"
      style={{
        background: m.bg,
        color: m.text,
        fontSize: size === "sm" ? "10px" : "11px",
        padding: size === "sm" ? "2px 8px" : "3px 10px",
        letterSpacing: "0.02em",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.dot }} />
      {m.label}
    </span>
  );
}

/* ── Progress Bar ── */
export function ProgressBar({ value, color = T.red, height = 6, showLabel }: { value: number; color?: string; height?: number; showLabel?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-full overflow-hidden" style={{ height, background: T.surface3 }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
      </div>
      {showLabel && <span className="text-xs font-medium flex-shrink-0" style={{ color: T.ink50, minWidth: "32px" }}>{value}%</span>}
    </div>
  );
}

/* ── Input ── */
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: React.ReactNode;
  error?: string;
  helper?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}

export function Input({ label, placeholder, value, onChange, type = "text", icon, error, helper, autoFocus, onEnter }: InputProps) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold" style={{ color: T.ink70, fontFamily: T.fontSans }}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.ink30 }}>
            {icon}
          </div>
        )}
        <input
          type={type === "password" ? (showPass ? "text" : "password") : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => e.key === "Enter" && onEnter?.()}
          className="w-full text-sm transition-all outline-none"
          style={{
            padding: icon ? "10px 12px 10px 36px" : "10px 12px",
            paddingRight: type === "password" ? "40px" : "12px",
            background: T.surface,
            border: `1.5px solid ${error ? T.red : focused ? T.red : T.surface3}`,
            borderRadius: T.radius,
            color: T.ink,
            fontFamily: T.fontSans,
            fontSize: "14px",
            boxShadow: focused ? `0 0 0 3px ${error ? T.redSubtle : "rgba(204,41,41,0.12)"}` : "none",
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold transition-colors"
            style={{ color: focused ? T.red : T.ink50 }}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error && <p className="text-xs flex items-center gap-1" style={{ color: T.red }}><AlertCircle size={12} />{error}</p>}
      {helper && !error && <p className="text-xs" style={{ color: T.ink50 }}>{helper}</p>}
    </div>
  );
}

/* ── Table ── */
interface TableProps {
  columns: { key: string; label: string; sortable?: boolean; width?: string }[];
  rows: Record<string, React.ReactNode>[];
  onRowClick?: (i: number) => void;
  selectedRows?: number[];
}

export function Table({ columns, rows, onRowClick, selectedRows = [] }: TableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  return (
    <div className="w-full overflow-hidden" style={{ border: `1px solid ${T.surface3}`, borderRadius: T.radiusMd }}>
      <table className="w-full border-collapse text-sm" style={{ fontFamily: T.fontSans }}>
        <thead>
          <tr style={{ background: T.surface2, borderBottom: `1px solid ${T.surface3}` }}>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => { if (col.sortable) { setSortCol(col.key); setSortDir(d => d === "asc" ? "desc" : "asc"); } }}
                className="text-left px-4 py-3 font-semibold"
                style={{
                  color: T.ink50,
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: col.sortable ? "pointer" : "default",
                  width: col.width,
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && (
                    <span style={{ color: sortCol === col.key ? T.red : T.ink10 }}>
                      {sortCol === col.key && sortDir === "desc" ? "↓" : "↑"}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(i)}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className="transition-colors"
              style={{
                background: selectedRows.includes(i) ? T.redLight : hoveredRow === i ? T.surface2 : i % 2 === 0 ? T.surface : "#FAFAFA",
                borderBottom: `1px solid ${T.surface3}`,
                cursor: onRowClick ? "pointer" : "default",
              }}
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3" style={{ color: T.ink70 }}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Breadcrumb ── */
export function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm" style={{ fontFamily: T.fontSans }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={12} style={{ color: T.ink30 }} />}
          <span
            onClick={item.onClick}
            className="transition-colors"
            style={{
              color: i === items.length - 1 ? T.ink70 : T.ink50,
              fontWeight: i === items.length - 1 ? 600 : 400,
              cursor: item.onClick ? "pointer" : "default",
            }}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ── Sidebar Nav ── */
interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "⊞" },
  { key: "projects", label: "Projects", icon: "⊡" },
  { key: "work-orders", label: "Work Orders", icon: "☰" },
];

export function Sidebar({ activeItem, onNavigate, collapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <div
      className="flex flex-col h-full transition-all duration-200 flex-shrink-0"
      style={{
        width: collapsed ? "60px" : "220px",
        background: T.sidebar,
        borderRight: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* logo */}
      <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", height: "56px" }}>
        {!collapsed && (
          <span className="font-black text-base tracking-tight" style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            <span style={{ color: T.red }}>HEX</span>SOLVE
          </span>
        )}
        <button onClick={onToggleCollapse} className="p-1 rounded transition-colors hover:opacity-80" style={{ color: "rgba(255,255,255,0.4)", marginLeft: collapsed ? "auto" : "0", marginRight: collapsed ? "auto" : "0" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="currentColor"/>
            <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
            <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {/* nav items */}
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {NAV_ITEMS.map(({ key, label, icon }) => {
          const isActive = activeItem === key || (key === "projects" && ["project-detail", "instruction-doc", "assembly", "qa"].includes(activeItem));
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className="w-full flex items-center gap-3 rounded-lg transition-all text-sm font-medium"
              style={{
                padding: collapsed ? "10px" : "9px 12px",
                background: isActive ? T.red : "transparent",
                color: isActive ? "#fff" : T.sidebarText,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <span style={{ fontSize: "15px", lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              {!collapsed && <span style={{ fontFamily: T.fontSans }}>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* user */}
      <div className="px-2 pb-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg" style={{ cursor: "pointer" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: T.red, color: "#fff" }}>M</div>
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold leading-tight" style={{ color: "#fff" }}>Manisha R.</p>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>UX Designer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Top Header Bar ── */
export function TopBar({ title, breadcrumbs, actions, onNavigate }: {
  title?: string;
  breadcrumbs?: { label: string; screen?: string }[];
  actions?: React.ReactNode;
  onNavigate?: (screen: string) => void;
}) {
  return (
    <div
      className="flex items-center justify-between px-6 flex-shrink-0"
      style={{
        height: "56px",
        background: T.surface,
        borderBottom: `1px solid ${T.surface3}`,
      }}
    >
      <div className="flex flex-col justify-center gap-0.5">
        {breadcrumbs && (
          <Breadcrumb items={breadcrumbs.map(b => ({ label: b.label, onClick: b.screen ? () => onNavigate?.(b.screen!) : undefined }))} />
        )}
        {title && <h1 className="text-lg font-bold tracking-tight" style={{ color: T.ink, fontFamily: T.fontSans, lineHeight: 1.2 }}>{title}</h1>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <div className="relative ml-1">
          <Bell size={18} style={{ color: T.ink50 }} />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: T.red }} />
        </div>
      </div>
    </div>
  );
}

/* ── Card ── */
export function Card({ children, className = "", padding = "p-5", onClick }: { children: React.ReactNode; className?: string; padding?: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`rounded-xl transition-all ${padding} ${className}`}
      style={{
        background: T.surface,
        border: `1px solid ${T.surface3}`,
        boxShadow: hov && onClick ? T.shadowMd : T.shadowSm,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </div>
  );
}

/* ── Skeleton ── */
export function Skeleton({ w = "100%", h = "16px", radius = "6px" }: { w?: string; h?: string; radius?: string }) {
  return (
    <div
      className="animate-pulse"
      style={{ width: w, height: h, borderRadius: radius, background: `linear-gradient(90deg, ${T.surface2} 25%, ${T.surface3} 50%, ${T.surface2} 75%)`, backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }}
    />
  );
}

/* ── Checkbox ── */
export function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className="w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0"
        style={{
          background: checked ? T.red : T.surface,
          border: `1.5px solid ${checked ? T.red : T.surface3}`,
          boxShadow: checked ? `0 0 0 2px ${T.redSubtle}` : "none",
        }}
      >
        {checked && <Check size={10} color="#fff" strokeWidth={3} />}
      </div>
      {label && <span className="text-sm" style={{ color: T.ink70, fontFamily: T.fontSans }}>{label}</span>}
    </label>
  );
}

/* ── Search Input ── */
export function SearchInput({ value, onChange, placeholder = "Search..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.ink30 }} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="text-sm outline-none transition-all"
        style={{
          paddingLeft: "32px",
          paddingRight: "12px",
          paddingTop: "7px",
          paddingBottom: "7px",
          background: T.surface,
          border: `1.5px solid ${focused ? T.red : T.surface3}`,
          borderRadius: T.radius,
          color: T.ink,
          fontFamily: T.fontSans,
          width: "220px",
          boxShadow: focused ? `0 0 0 3px rgba(204,41,41,0.1)` : "none",
        }}
      />
    </div>
  );
}

/* ── Tooltip ── */
export function Tooltip({ children, tip }: { children: React.ReactNode; tip: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap pointer-events-none z-50"
            style={{ background: T.ink, color: "#fff", boxShadow: T.shadowMd }}
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Section Header ── */
export function SectionHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-base font-bold" style={{ color: T.ink, fontFamily: T.fontSans }}>{title}</h2>
        {description && <p className="text-sm mt-0.5" style={{ color: T.ink50 }}>{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ── Avatar ── */
export function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#CC2929", "#2563EB", "#059669", "#D97706", "#7C3AED"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className="rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{ width: size, height: size, background: color, color: "#fff", fontFamily: T.fontSans, fontSize: size < 28 ? "9px" : "11px" }}
    >
      {initials}
    </div>
  );
}

/* ── Filter Chip ── */
export function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
      style={{
        background: active ? T.red : T.surface,
        color: active ? "#fff" : T.ink50,
        border: `1px solid ${active ? T.red : T.surface3}`,
        fontFamily: T.fontSans,
      }}
    >
      {label}
    </button>
  );
}

/* ── Stat Card ── */
export function StatCard({ label, value, delta, icon, color = T.red }: { label: string; value: string; delta?: string; icon: React.ReactNode; color?: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: T.ink50, letterSpacing: "0.08em" }}>{label}</p>
          <p className="text-3xl font-bold tracking-tight" style={{ color: T.ink, fontFamily: T.fontSans }}>{value}</p>
          {delta && <p className="text-xs mt-1.5" style={{ color: T.ink50 }}>{delta}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "18" }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
    </Card>
  );
}
