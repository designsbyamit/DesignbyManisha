"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Plus,
  Search,
  Filter,
  ArrowRight,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";
import { T } from "../tokens";
import { Btn, StatCard, SearchInput } from "../components";
import { AppShell } from "../app-shell";

/* ─────────────────────────────────────────────────────────────────────────────
   Work Orders Screen
───────────────────────────────────────────────────────────────────────────── */

type WOStatus = "Open" | "In Progress" | "Completed" | "Overdue";

interface WorkOrder {
  id: string;
  customer: string;
  engine: string;
  status: WOStatus;
  project: string | null;
  updated: string;
}

const WORK_ORDERS: WorkOrder[] = [
  {
    id: "WO-2025-041",
    customer: "Autoworks GmbH",
    engine: "AIE Rotary 225cs",
    status: "In Progress",
    project: "ENG-2025-041",
    updated: "2 hours ago",
  },
  {
    id: "WO-2025-038",
    customer: "Mazda Specialist UK",
    engine: "Wankel 13B",
    status: "Open",
    project: "ENG-2025-038",
    updated: "Yesterday",
  },
  {
    id: "WO-2025-035",
    customer: "Rotary Revival Co.",
    engine: "20B Three-Rotor",
    status: "Completed",
    project: "ENG-2025-035",
    updated: "3 days ago",
  },
  {
    id: "WO-2025-031",
    customer: "Heritage Motors",
    engine: "12A Series II",
    status: "Open",
    project: null,
    updated: "1 week ago",
  },
  {
    id: "WO-2025-028",
    customer: "Performance Eng. Ltd",
    engine: "RX-8 Renesis",
    status: "Completed",
    project: "ENG-2025-028",
    updated: "2 weeks ago",
  },
];

const STATUS_META: Record<
  WOStatus,
  { bg: string; text: string; dot: string }
> = {
  Open: { bg: "#DBEAFE", text: "#1D4ED8", dot: "#3B82F6" },
  "In Progress": { bg: T.amberBg, text: "#92400E", dot: T.amber },
  Completed: { bg: T.greenBg, text: "#065F46", dot: T.green },
  Overdue: { bg: T.redSubtle, text: T.red, dot: T.red },
};

function WOStatusBadge({ status }: { status: WOStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: m.bg,
        color: m.text,
        fontSize: "11px",
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: "100px",
        letterSpacing: "0.02em",
        fontFamily: T.fontSans,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: m.dot,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.22, ease: "easeOut" },
  }),
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export function WorkOrdersScreen({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filtered = WORK_ORDERS.filter(
    (wo) =>
      wo.id.toLowerCase().includes(search.toLowerCase()) ||
      wo.customer.toLowerCase().includes(search.toLowerCase()) ||
      wo.engine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell
      onNavigate={onNavigate}
      currentScreen="work-orders"
      crumbs={[{ label: "Work Orders" }]}
      action={
        <Btn
          label="+ New Work Order"
          variant="primary"
          size="sm"
        />
      }
    >
      <div style={{ padding: "36px 40px 56px", fontFamily: T.fontSans }}>
        {/* Page header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: T.ink,
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Work Orders
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: T.ink50,
              margin: "5px 0 0",
              fontWeight: 400,
            }}
          >
            Active manufacturing orders — Dec 2021 to present
          </p>
        </div>

        {/* Summary strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <PolishedStatCard
            label="Open"
            value="4"
            icon={<FolderOpen size={18} />}
            color={T.blue}
          />
          <PolishedStatCard
            label="In Progress"
            value="6"
            icon={<Clock size={18} />}
            color={T.amber}
          />
          <PolishedStatCard
            label="Completed"
            value="12"
            icon={<CheckCircle size={18} />}
            color={T.green}
          />
          <PolishedStatCard
            label="Overdue"
            value="1"
            icon={<AlertTriangle size={18} />}
            color={T.red}
          />
        </div>

        {/* Table card */}
        <div
          style={{
            background: T.surface,
            border: `1px solid ${T.surface3}`,
            borderRadius: "16px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Table toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 24px",
              borderBottom: `1px solid ${T.surface3}`,
            }}
          >
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search work orders…"
            />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FilterButton />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                fontFamily: T.fontSans,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: T.surface2,
                    borderBottom: `1px solid ${T.surface3}`,
                  }}
                >
                  {[
                    "Work Order No.",
                    "Customer",
                    "Engine Model",
                    "Status",
                    "Project",
                    "Last Updated",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: "left",
                        padding: "11px 20px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: T.ink50,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <motion.tbody
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {filtered.map((wo, i) => {
                  const isHov = hoveredRow === wo.id;
                  return (
                    <motion.tr
                      key={wo.id}
                      custom={i}
                      variants={rowVariants}
                      onMouseEnter={() => setHoveredRow(wo.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => onNavigate("my-projects")}
                      style={{
                        background: isHov
                          ? "#F0F7FF"
                          : i % 2 === 0
                          ? T.surface
                          : "#FAFAFA",
                        borderBottom: `1px solid ${T.surface3}`,
                        cursor: "pointer",
                        transition: "background 0.12s",
                      }}
                    >
                      {/* WO No. */}
                      <td style={{ padding: "14px 20px" }}>
                        <span
                          style={{
                            fontFamily:
                              "'JetBrains Mono', 'Fira Code', monospace",
                            fontWeight: 600,
                            color: T.red,
                            fontSize: "12px",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {wo.id}
                        </span>
                      </td>

                      {/* Customer */}
                      <td
                        style={{
                          padding: "14px 20px",
                          color: T.ink70,
                          fontWeight: 500,
                        }}
                      >
                        {wo.customer}
                      </td>

                      {/* Engine */}
                      <td
                        style={{
                          padding: "14px 20px",
                          color: T.ink70,
                        }}
                      >
                        {wo.engine}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "14px 20px" }}>
                        <WOStatusBadge status={wo.status} />
                      </td>

                      {/* Project */}
                      <td style={{ padding: "14px 20px" }}>
                        {wo.project ? (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("my-projects");
                            }}
                            style={{
                              fontFamily:
                                "'JetBrains Mono', 'Fira Code', monospace",
                              fontSize: "12px",
                              color: T.red,
                              fontWeight: 600,
                              cursor: "pointer",
                              textDecoration: "underline",
                              textDecorationColor: "rgba(204,41,41,0.3)",
                            }}
                          >
                            {wo.project}
                          </span>
                        ) : (
                          <span
                            style={{ color: T.ink30, fontSize: "12px" }}
                          >
                            —
                          </span>
                        )}
                      </td>

                      {/* Updated */}
                      <td
                        style={{
                          padding: "14px 20px",
                          color: T.ink50,
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {wo.updated}
                      </td>

                      {/* Actions */}
                      <td
                        style={{
                          padding: "14px 20px",
                          minWidth: "140px",
                        }}
                      >
                        <AnimatePresence>
                          {isHov && (
                            <motion.button
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.14, ease: "easeOut" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate("my-projects");
                              }}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: T.red,
                                background: T.redLight,
                                border: `1px solid rgba(204,41,41,0.18)`,
                                borderRadius: "100px",
                                padding: "6px 14px",
                                cursor: "pointer",
                                fontFamily: T.fontSans,
                                whiteSpace: "nowrap",
                                boxShadow:
                                  "0 2px 8px rgba(204,41,41,0.15)",
                              }}
                            >
                              Open Project
                              <ArrowRight size={12} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>

            {filtered.length === 0 && (
              <div
                style={{
                  padding: "56px 24px",
                  textAlign: "center",
                  color: T.ink30,
                  fontSize: "13px",
                  fontFamily: T.fontSans,
                }}
              >
                No work orders match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Polished stat card (overrides base StatCard for rounded corners) ── */
function PolishedStatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.surface,
        border: `1px solid ${T.surface3}`,
        borderRadius: "20px",
        padding: "24px",
        boxShadow: hov
          ? "0 4px 20px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.18s",
        fontFamily: T.fontSans,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: T.ink50,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: T.ink,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {value}
          </p>
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: color + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterButton() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "12px",
        fontWeight: 600,
        color: hov ? T.ink70 : T.ink50,
        background: hov ? T.surface2 : "none",
        border: `1px solid ${T.surface3}`,
        borderRadius: "100px",
        padding: "6px 14px",
        cursor: "pointer",
        fontFamily: T.fontSans,
        transition: "background 0.13s, color 0.13s",
      }}
    >
      <Filter size={13} />
      Filter
    </button>
  );
}
