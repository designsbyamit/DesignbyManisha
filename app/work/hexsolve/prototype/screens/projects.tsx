"use client";

import React, { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { Plus, Eye, Edit, MoreHorizontal, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { T, type Status } from "../tokens";
import { Sidebar, TopBar, StatusBadge, ProgressBar, Btn, SearchInput, FilterChip, Checkbox, Avatar } from "../components";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

interface Project {
  code: string;
  engine: string;
  customer: string;
  team: string;
  status: Status;
  progress: number;
  updated: string;
}

const ALL_PROJECTS: Project[] = [
  { code: "ENG-2025-041", engine: "AIE Rotary 225cs",  customer: "Autoworks GmbH",        team: "Alpha Team", status: "active",   progress: 11,  updated: "2 hours ago" },
  { code: "ENG-2025-038", engine: "Wankel 13B",         customer: "Mazda Specialist UK",   team: "Beta Team",  status: "review",   progress: 64,  updated: "Yesterday" },
  { code: "ENG-2025-035", engine: "20B Three-Rotor",    customer: "Rotary Revival Co.",    team: "Alpha Team", status: "approved", progress: 100, updated: "3 days ago" },
  { code: "ENG-2025-031", engine: "12A Series II",      customer: "Heritage Motors",       team: "Gamma Team", status: "draft",    progress: 28,  updated: "1 week ago" },
  { code: "ENG-2025-028", engine: "RX-8 Renesis",       customer: "Performance Eng. Ltd", team: "Beta Team",  status: "closed",   progress: 100, updated: "2 weeks ago" },
];

const FILTER_OPTIONS = [
  { label: "All",       value: "all" },
  { label: "Active",    value: "active" },
  { label: "In Review", value: "review" },
  { label: "Approved",  value: "approved" },
  { label: "Draft",     value: "draft" },
];

const progressColor = (p: number): string => {
  if (p === 100) return T.green;
  if (p >= 60) return T.blue;
  if (p >= 30) return T.amber;
  return T.red;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, ease: "easeOut" } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function ProjectsScreen({ onNavigate }: ScreenProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [allSelected, setAllSelected] = useState(false);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        p.engine.toLowerCase().includes(search.toLowerCase()) ||
        p.customer.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "all" || p.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const toggleAll = (checked: boolean) => {
    setAllSelected(checked);
    if (checked) setSelectedRows(new Set(filteredProjects.map((_, i) => i)));
    else setSelectedRows(new Set());
  };

  const toggleRow = (i: number, checked: boolean) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (checked) next.add(i);
      else next.delete(i);
      return next;
    });
  };

  return (
    <div className="flex w-full" style={{ fontFamily: T.fontSans, background: T.bg, height: "100vh", overflow: "hidden" }}>
      <Sidebar activeItem="projects" onNavigate={onNavigate} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          title="Projects"
          onNavigate={onNavigate}
          breadcrumbs={[{ label: "Dashboard", screen: "dashboard" }, { label: "Projects" }]}
          actions={<Btn label="New Project" size="sm" icon={<Plus size={14} />} />}
        />

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-auto px-8 py-7">
          {/* Page header */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-xl font-bold tracking-tight" style={{ color: T.ink, letterSpacing: "-0.02em" }}>Projects</h2>
            <p className="text-sm mt-0.5" style={{ color: T.ink50 }}>Manage and track all manufacturing projects</p>
          </motion.div>

          {/* Filter / toolbar row */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-5 gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
              <div className="flex items-center gap-1.5">
                {FILTER_OPTIONS.map((f) => (
                  <FilterChip key={f.value} label={f.label} active={activeFilter === f.value} onClick={() => setActiveFilter(f.value)} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: T.surface, border: `1px solid ${T.surface3}`, color: T.ink70 }}
              >
                <SlidersHorizontal size={13} />
                Sort by: Last Updated
              </button>
              <span className="text-xs" style={{ color: T.ink50 }}>
                Showing <span className="font-semibold" style={{ color: T.ink70 }}>{filteredProjects.length}</span> of <span className="font-semibold" style={{ color: T.ink70 }}>24</span> projects
              </span>
            </div>
          </motion.div>

          {/* Bulk action bar */}
          {selectedRows.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4"
              style={{ background: T.redLight, border: `1px solid rgba(204,41,41,0.2)` }}
            >
              <span className="text-sm font-semibold" style={{ color: T.red }}>
                {selectedRows.size} project{selectedRows.size !== 1 ? "s" : ""} selected
              </span>
              <div className="flex items-center gap-2 ml-2">
                <Btn label="Bulk Export" variant="danger" size="sm" />
                <Btn label="Assign Team" variant="danger" size="sm" />
                <button
                  className="text-xs font-medium ml-1"
                  style={{ color: T.ink50 }}
                  onClick={() => { setSelectedRows(new Set()); setAllSelected(false); }}
                >
                  Clear selection
                </button>
              </div>
            </motion.div>
          )}

          {/* Projects table */}
          <motion.div variants={itemVariants} className="rounded-xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.surface3}`, boxShadow: T.shadowSm }}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ fontFamily: T.fontSans }}>
                <thead className="sticky top-0 z-10">
                  <tr style={{ background: T.surface2, borderBottom: `1px solid ${T.surface3}` }}>
                    <th className="px-4 py-3 w-10">
                      <Checkbox checked={allSelected} onChange={toggleAll} />
                    </th>
                    {[
                      { label: "Project Code",   w: "130px" },
                      { label: "Engine Model",   w: "180px" },
                      { label: "Customer",       w: "170px" },
                      { label: "Assigned Team",  w: "130px" },
                      { label: "Status",         w: "110px" },
                      { label: "Progress",       w: "150px" },
                      { label: "Last Updated",   w: "120px" },
                      { label: "Actions",        w: "90px"  },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className="text-left px-4 py-3 font-semibold"
                        style={{ color: T.ink50, fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", width: col.w, whiteSpace: "nowrap" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p, i) => {
                    const isSelected = selectedRows.has(i);
                    const isHovered = hoveredRow === i;

                    return (
                      <tr
                        key={p.code}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="transition-colors"
                        style={{ background: isSelected ? "#FFF5F5" : isHovered ? T.surface2 : i % 2 === 0 ? T.surface : "#FAFAFA", borderBottom: `1px solid ${T.surface3}`, cursor: "pointer" }}
                      >
                        <td className="px-4 py-3.5 w-10" onClick={(e) => e.stopPropagation()}>
                          <Checkbox checked={isSelected} onChange={(v) => toggleRow(i, v)} />
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <button
                            className="font-semibold text-xs tracking-wide transition-colors"
                            style={{ color: T.red, fontFamily: "monospace" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = T.redHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = T.red)}
                          >
                            {p.code}
                          </button>
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <span className="font-medium text-sm" style={{ color: T.ink }}>{p.engine}</span>
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <div className="flex items-center gap-2">
                            <Avatar name={p.customer} size={22} />
                            <span className="text-sm" style={{ color: T.ink70 }}>{p.customer}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ background: T.surface2, color: T.ink70, border: `1px solid ${T.surface3}` }}>
                            {p.team}
                          </span>
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <div className="flex flex-col gap-1.5 min-w-[100px]">
                            <ProgressBar value={p.progress} color={progressColor(p.progress)} height={5} />
                            <span className="text-xs font-medium" style={{ color: T.ink50 }}>{p.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5" onClick={() => onNavigate("project-detail")}>
                          <span className="text-sm" style={{ color: T.ink50 }}>{p.updated}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 transition-opacity" style={{ opacity: isHovered ? 1 : 0 }}>
                            <button
                              className="p-1.5 rounded-lg transition-colors"
                              title="Edit"
                              style={{ color: T.ink50 }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = T.surface2; e.currentTarget.style.color = T.ink; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink50; }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors"
                              title="View"
                              style={{ color: T.ink50 }}
                              onClick={() => onNavigate("project-detail")}
                              onMouseEnter={(e) => { e.currentTarget.style.background = T.surface2; e.currentTarget.style.color = T.ink; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink50; }}
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              className="p-1.5 rounded-lg transition-colors"
                              title="More"
                              style={{ color: T.ink50 }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = T.surface2; e.currentTarget.style.color = T.ink; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink50; }}
                            >
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: `1px solid ${T.surface3}`, background: T.surface2 }}>
              <span className="text-xs" style={{ color: T.ink50 }}>
                Showing <span className="font-semibold" style={{ color: T.ink70 }}>1–5</span> of <span className="font-semibold" style={{ color: T.ink70 }}>24</span> results
              </span>
              <div className="flex items-center gap-1.5">
                <button disabled className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium" style={{ background: T.surface, border: `1px solid ${T.surface3}`, color: T.ink30, cursor: "not-allowed" }}>
                  <ChevronLeft size={13} /> Previous
                </button>
                {[1, 2, 3].map((page) => (
                  <button key={page} className="w-8 h-8 rounded-lg text-xs font-semibold" style={{ background: page === 1 ? T.red : T.surface, color: page === 1 ? "#fff" : T.ink70, border: `1px solid ${page === 1 ? T.red : T.surface3}` }}>
                    {page}
                  </button>
                ))}
                <span className="text-xs" style={{ color: T.ink30 }}>...</span>
                <button className="w-8 h-8 rounded-lg text-xs font-semibold" style={{ background: T.surface, color: T.ink70, border: `1px solid ${T.surface3}` }}>5</button>
                <button
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: T.surface, border: `1px solid ${T.surface3}`, color: T.ink70 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = T.surface2)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = T.surface)}
                >
                  Next <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
