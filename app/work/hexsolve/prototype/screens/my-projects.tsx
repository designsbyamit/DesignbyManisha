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
import { Btn, SearchInput, FilterChip, Avatar } from "../components";
import { AppShell } from "../app-shell";

/* ─────────────────────────────────────────────────────────────────────────────
   My Projects Screen
───────────────────────────────────────────────────────────────────────────── */

type ProjectStatus = "Active" | "In Review" | "Approved" | "Draft";

interface Project {
  id: string;
  name: string;
  customer: string;
  engine: string;
  status: ProjectStatus;
  progress: number;
  woRef: string;
  updatedLabel: string;
}

const PROJECTS: Project[] = [
  {
    id: "ENG-2025-041",
    name: "001942 AIE Rotary 225cs Engine",
    customer: "Autoworks GmbH",
    engine: "AIE Rotary 225cs",
    status: "Active",
    progress: 11,
    woRef: "WO-2025-041",
    updatedLabel: "2 hours ago",
  },
  {
    id: "ENG-2025-038",
    name: "00187 Wankel 13B Rebuild",
    customer: "Mazda Specialist UK",
    engine: "Wankel 13B",
    status: "In Review",
    progress: 64,
    woRef: "WO-2025-038",
    updatedLabel: "Yesterday",
  },
  {
    id: "ENG-2025-035",
    name: "00164 20B Three-Rotor",
    customer: "Rotary Revival Co.",
    engine: "20B Three-Rotor",
    status: "Approved",
    progress: 100,
    woRef: "WO-2025-035",
    updatedLabel: "3 days ago",
  },
  {
    id: "ENG-2025-031",
    name: "00143 12A Series II",
    customer: "Heritage Motors",
    engine: "12A Series II",
    status: "Draft",
    progress: 28,
    woRef: "WO-2025-031",
    updatedLabel: "1 week ago",
  },
  {
    id: "ENG-2025-028",
    name: "00121 RX-8 Renesis",
    customer: "Performance Eng. Ltd",
    engine: "RX-8 Renesis",
    status: "Approved",
    progress: 100,
    woRef: "WO-2025-028",
    updatedLabel: "2 weeks ago",
  },
  {
    id: "ENG-2025-019",
    name: "00089 13B-REW Restoration",
    customer: "Classic JDM Ltd",
    engine: "13B-REW",
    status: "Draft",
    progress: 5,
    woRef: "WO-2025-019",
    updatedLabel: "3 weeks ago",
  },
];

const STATUS_META: Record<
  ProjectStatus,
  { bg: string; text: string; dot: string; barColor: string }
> = {
  Active: {
    bg: "#DBEAFE",
    text: "#1D4ED8",
    dot: "#3B82F6",
    barColor: T.blue,
  },
  "In Review": {
    bg: T.amberBg,
    text: "#92400E",
    dot: T.amber,
    barColor: T.amber,
  },
  Approved: {
    bg: T.greenBg,
    text: "#065F46",
    dot: T.green,
    barColor: T.green,
  },
  Draft: {
    bg: T.surface2,
    text: T.ink50,
    dot: T.ink30,
    barColor: T.ink30,
  },
};

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
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

const TEAM_MEMBERS = ["Manisha R.", "Arjun T.", "Sofia W.", "Kai L."];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.055, duration: 0.27, ease: "easeOut" },
  }),
};

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const m = STATUS_META[project.status];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: T.surface,
        border: `1px solid ${hov ? "#D1D5DB" : T.surface3}`,
        borderRadius: "20px",
        boxShadow: hov
          ? "0 4px 20px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        cursor: "pointer",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "border-color 0.15s, box-shadow 0.18s",
        fontFamily: T.fontSans,
      }}
    >
      {/* Top row: WO pill + Status badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: T.surface2,
            color: T.ink50,
            fontSize: "10px",
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: "6px",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            letterSpacing: "0.02em",
            border: `1px solid ${T.surface3}`,
          }}
        >
          {project.woRef}
        </span>
        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Project code + name */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: T.red,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            letterSpacing: "0.01em",
          }}
        >
          {project.id}
        </span>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: T.ink,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
          }}
        >
          {project.name}
        </span>
      </div>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          color: T.ink50,
        }}
      >
        <span>{project.customer}</span>
        <span
          style={{
            color: T.ink10,
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 1,
          }}
        >
          ·
        </span>
        <span>{project.engine}</span>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            color: T.ink50,
            fontWeight: 500,
          }}
        >
          <span>Progress</span>
          <span
            style={{
              fontWeight: 700,
              color: m.barColor,
            }}
          >
            {project.progress}%
          </span>
        </div>
        <div
          style={{
            height: "6px",
            borderRadius: "100px",
            background: T.surface3,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
              delay: index * 0.05 + 0.2,
            }}
            style={{
              height: "100%",
              background: m.barColor,
              borderRadius: "100px",
            }}
          />
        </div>
      </div>

      {/* Footer: team + action */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "8px",
          borderTop: `1px solid ${T.surface3}`,
        }}
      >
        {/* Team avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {TEAM_MEMBERS.slice(0, 3).map((name, i) => (
              <div
                key={name}
                style={{
                  marginLeft: i === 0 ? 0 : "-8px",
                  border: `2px solid ${T.surface}`,
                  borderRadius: "50%",
                  zIndex: 3 - i,
                  position: "relative",
                }}
              >
                <Avatar name={name} size={22} />
              </div>
            ))}
          </div>
          <span style={{ fontSize: "11px", color: T.ink50, fontWeight: 500 }}>
            4 members
          </span>
        </div>

        {/* Open project action */}
        <AnimatePresence mode="wait">
          {hov ? (
            <motion.button
              key="action"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.13, ease: "easeOut" }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                fontWeight: 700,
                color: T.red,
                background: T.redLight,
                border: `1px solid rgba(204,41,41,0.18)`,
                borderRadius: "100px",
                padding: "6px 14px",
                cursor: "pointer",
                fontFamily: T.fontSans,
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(204,41,41,0.15)",
              }}
            >
              Open Project
              <ArrowRight size={11} />
            </motion.button>
          ) : (
            <motion.span
              key="time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                fontSize: "11px",
                color: T.ink30,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Clock size={11} />
              {project.updatedLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

type FilterTab = "All" | "Active" | "In Review" | "Completed";
const FILTER_TABS: FilterTab[] = ["All", "Active", "In Review", "Completed"];

export function MyProjectsScreen({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = PROJECTS.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Active" && p.status === "Active") ||
      (activeFilter === "In Review" && p.status === "In Review") ||
      (activeFilter === "Completed" && p.status === "Approved");

    return matchesSearch && matchesFilter;
  });

  return (
    <AppShell
      onNavigate={onNavigate}
      currentScreen="my-projects"
      crumbs={[
        { label: "Work Orders", screen: "work-orders" },
        { label: "Projects" },
      ]}
      action={
        <Btn
          label="+ New Project"
          variant="primary"
          size="sm"
        />
      }
    >
      <div style={{ padding: "32px 40px 56px", fontFamily: T.fontSans }}>
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
            My Projects
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: T.ink50,
              margin: "5px 0 0",
              fontWeight: 400,
            }}
          >
            All manufacturing projects across active work orders
          </p>
        </div>

        {/* Filter row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search projects…"
          />

          {/* Filter chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {FILTER_TABS.map((tab) => (
              <FilterChip
                key={tab}
                label={tab}
                active={activeFilter === tab}
                onClick={() => setActiveFilter(tab)}
              />
            ))}
          </div>

          {/* Sort */}
          <div style={{ marginLeft: "auto" }}>
            <SortButton />
          </div>
        </div>

        {/* Project grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => onNavigate("project-detail")}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "72px 24px",
              textAlign: "center",
              color: T.ink30,
              fontSize: "13px",
              fontFamily: T.fontSans,
            }}
          >
            No projects match your search or filter.
          </div>
        )}
      </div>
    </AppShell>
  );
}

function SortButton() {
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
        background: hov ? T.surface2 : T.surface,
        border: `1px solid ${T.surface3}`,
        borderRadius: "100px",
        padding: "7px 14px",
        cursor: "pointer",
        fontFamily: T.fontSans,
        transition: "background 0.13s, color 0.13s",
      }}
    >
      Sort by: Last Updated
      <ChevronRight
        size={12}
        style={{
          transform: "rotate(90deg)",
          color: T.ink30,
        }}
      />
    </button>
  );
}
