"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FolderOpen, Clock, CheckCircle, AlertTriangle, Plus, Upload, ArrowRight, TrendingUp } from "lucide-react";
import { T, type Status } from "../tokens";
import { Sidebar, TopBar, StatCard, StatusBadge, ProgressBar, Btn, Avatar } from "../components";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

interface Project {
  code: string;
  engine: string;
  customer: string;
  status: Status;
  progress: number;
  updated: string;
}

const PROJECTS: Project[] = [
  { code: "ENG-2025-041", engine: "AIE Rotary 225cs",  customer: "Autoworks GmbH",        status: "active",   progress: 11,  updated: "2 hours ago" },
  { code: "ENG-2025-038", engine: "Wankel 13B",         customer: "Mazda Specialist UK",   status: "review",   progress: 64,  updated: "Yesterday" },
  { code: "ENG-2025-035", engine: "20B Three-Rotor",    customer: "Rotary Revival Co.",    status: "approved", progress: 100, updated: "3 days ago" },
  { code: "ENG-2025-031", engine: "12A Series II",      customer: "Heritage Motors",       status: "draft",    progress: 28,  updated: "1 week ago" },
  { code: "ENG-2025-028", engine: "RX-8 Renesis",       customer: "Performance Eng. Ltd", status: "closed",   progress: 100, updated: "2 weeks ago" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const progressColor = (p: number): string => {
  if (p === 100) return T.green;
  if (p >= 60) return T.blue;
  if (p >= 30) return T.amber;
  return T.red;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function DashboardScreen({ onNavigate }: ScreenProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="flex w-full" style={{ fontFamily: T.fontSans, background: T.bg, height: "100vh", overflow: "hidden" }}>
      <Sidebar activeItem="dashboard" onNavigate={onNavigate} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          title="Dashboard"
          onNavigate={onNavigate}
          actions={<Btn label="New Project" size="sm" icon={<Plus size={14} />} onClick={() => onNavigate("projects")} />}
        />

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-auto px-8 py-7">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-7">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: T.ink, letterSpacing: "-0.02em" }}>
              {getGreeting()}, Manisha
            </h2>
            <p className="text-sm mt-0.5" style={{ color: T.ink50 }}>{formatDate()} — Here&apos;s what&apos;s happening today.</p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-5 mb-8">
            <StatCard label="Active Projects"       value="4" delta="+1 this week"       icon={<FolderOpen size={20} />}    color={T.blue}  />
            <StatCard label="In Review"              value="2" delta="Awaiting approval"  icon={<Clock size={20} />}          color={T.amber} />
            <StatCard label="Completed This Month"  value="7" delta="↑ 3 vs last month"  icon={<CheckCircle size={20} />}   color={T.green} />
            <StatCard label="Overdue"               value="1" delta="Needs attention"    icon={<AlertTriangle size={20} />} color={T.red}   />
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden"
            style={{ background: T.surface, border: `1px solid ${T.surface3}`, boxShadow: T.shadowSm }}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${T.surface3}` }}>
              <div>
                <h3 className="text-base font-bold" style={{ color: T.ink, letterSpacing: "-0.01em" }}>Recent Projects</h3>
                <p className="text-xs mt-0.5" style={{ color: T.ink50 }}>Your most recently updated engineering projects</p>
              </div>
              <button
                onClick={() => onNavigate("projects")}
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: T.red }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.redHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.red)}
              >
                View All Projects <ArrowRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ fontFamily: T.fontSans }}>
                <thead>
                  <tr style={{ background: T.surface2, borderBottom: `1px solid ${T.surface3}` }}>
                    {[
                      { label: "Project Code", w: "140px" },
                      { label: "Engine Model",  w: "180px" },
                      { label: "Customer",      w: "180px" },
                      { label: "Status",        w: "110px" },
                      { label: "Progress",      w: "160px" },
                      { label: "Updated",       w: "120px" },
                      { label: "Actions",       w: "100px" },
                    ].map((col) => (
                      <th key={col.label} className="text-left px-5 py-3 font-semibold" style={{ color: T.ink50, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", width: col.w, whiteSpace: "nowrap" }}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr
                      key={p.code}
                      onClick={() => onNavigate("project-detail")}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="transition-colors"
                      style={{ background: hoveredRow === i ? T.surface2 : i % 2 === 0 ? T.surface : "#FAFAFA", borderBottom: `1px solid ${T.surface3}`, cursor: "pointer" }}
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-xs tracking-wide" style={{ color: T.red, fontFamily: "monospace" }}>{p.code}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-medium text-sm" style={{ color: T.ink }}>{p.engine}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Avatar name={p.customer} size={24} />
                          <span className="text-sm" style={{ color: T.ink70 }}>{p.customer}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5"><StatusBadge status={p.status} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5">
                          <ProgressBar value={p.progress} color={progressColor(p.progress)} height={5} />
                          <span className="text-xs font-medium" style={{ color: T.ink50 }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm" style={{ color: T.ink50 }}>{p.updated}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 transition-opacity" style={{ opacity: hoveredRow === i ? 1 : 0 }}>
                          <button
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                            style={{ background: T.surface2, color: T.ink70, border: `1px solid ${T.surface3}` }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = T.surface3)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = T.surface2)}
                          >
                            Open
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mt-6">
            <Btn label="New Project"    icon={<Plus size={15} />}        onClick={() => onNavigate("projects")} />
            <Btn label="Import"         variant="secondary" icon={<Upload size={15} />} />
            <Btn label="View Analytics" variant="ghost"     icon={<TrendingUp size={15} />} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
