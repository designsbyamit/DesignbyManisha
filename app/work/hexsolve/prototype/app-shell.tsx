"use client";

import React, { useState } from "react";
import { T } from "./tokens";
import { Bell, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   APP SHELL — AppHeader, BreadcrumbBar, AppShell
───────────────────────────────────────────────────────────────────────────── */

/* ── AppHeader ── */
export function AppHeader({
  onNavigate,
  currentScreen,
}: {
  onNavigate: (s: string) => void;
  currentScreen: string;
}) {
  const [bellHov, setBellHov] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "56px",
        background: T.surface,
        borderBottom: `1px solid ${T.surface3}`,
        boxShadow: "0 1px 0 #E5E7EB, 0 4px 12px rgba(0,0,0,0.03)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        fontFamily: T.fontSans,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0px",
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          userSelect: "none",
          cursor: "pointer",
        }}
        onClick={() => onNavigate("work-orders")}
      >
        <span style={{ color: T.red }}>Hex</span>
        <span style={{ color: T.ink }}>Solve</span>
      </div>

      {/* Right cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Bell */}
        <button
          onMouseEnter={() => setBellHov(true)}
          onMouseLeave={() => setBellHov(false)}
          style={{
            position: "relative",
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            color: bellHov ? T.ink70 : T.ink50,
            display: "flex",
            alignItems: "center",
            transition: "color 0.15s",
          }}
        >
          <Bell size={18} />
          {/* Red dot */}
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: T.red,
              border: `1.5px solid ${T.surface}`,
            }}
          />
        </button>

        {/* Vertical divider */}
        <div
          style={{
            width: "1px",
            height: "20px",
            background: T.surface3,
          }}
        />

        {/* User cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: T.sidebar,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              flexShrink: 0,
              fontFamily: T.fontSans,
            }}
          >
            M
          </div>
          {/* Name */}
          <span
            style={{
              fontSize: "12px",
              color: T.ink50,
              fontFamily: T.fontSans,
              fontWeight: 500,
            }}
          >
            Manisha R.
          </span>
        </div>
      </div>
    </header>
  );
}

/* ── BreadcrumbBar ── */
export function BreadcrumbBar({
  crumbs,
  action,
  onNavigate,
}: {
  crumbs: { label: string; screen?: string }[];
  action?: React.ReactNode;
  onNavigate?: (s: string) => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: "56px",
        zIndex: 40,
        height: "52px",
        background: T.bg,
        borderBottom: `1px solid ${T.surface3}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        fontFamily: T.fontSans,
      }}
    >
      {/* Crumb trail */}
      <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <ChevronRight
                  size={14}
                  style={{ color: T.ink30, flexShrink: 0, margin: "0 2px" }}
                />
              )}
              <CrumbItem
                label={crumb.label}
                isLast={isLast}
                onClick={
                  crumb.screen && onNavigate
                    ? () => onNavigate(crumb.screen!)
                    : undefined
                }
              />
            </React.Fragment>
          );
        })}
      </nav>

      {/* Right action slot */}
      {action && <div>{action}</div>}
    </div>
  );
}

function CrumbItem({
  label,
  isLast,
  onClick,
}: {
  label: string;
  isLast: boolean;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);

  if (isLast) {
    return (
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: T.ink,
          fontFamily: T.fontSans,
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "13px",
        fontWeight: 500,
        color: hov && onClick ? T.red : T.ink50,
        background: hov && onClick ? "rgba(204,41,41,0.07)" : "transparent",
        cursor: onClick ? "pointer" : "default",
        fontFamily: T.fontSans,
        transition: "color 0.13s, background 0.13s",
        borderRadius: "99px",
        padding: "3px 8px",
        margin: "0 -2px",
      }}
    >
      {label}
    </span>
  );
}

/* ── AppShell ── */
export function AppShell({
  onNavigate,
  currentScreen,
  crumbs,
  action,
  children,
  bg,
}: {
  onNavigate: (s: string) => void;
  currentScreen: string;
  crumbs: { label: string; screen?: string }[];
  action?: React.ReactNode;
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: T.fontSans,
        background: bg ?? T.bg,
      }}
    >
      {/* Fixed global header */}
      <AppHeader onNavigate={onNavigate} currentScreen={currentScreen} />

      {/* Content area pushed below 56px header */}
      <div
        style={{
          marginTop: "56px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Sticky breadcrumb bar (52px) */}
        <BreadcrumbBar
          crumbs={crumbs}
          action={action}
          onNavigate={onNavigate}
        />

        {/* Scrollable content — total chrome = 56 + 52 = 108px */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: bg ?? T.bg,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
