"use client";

import {
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
} from "../ui-screens";

const screens = [
  { id: "login", label: "Login", component: LoginScreen },
  { id: "dashboard", label: "Dashboard", component: DashboardScreen },
  { id: "projects", label: "Project List", component: ProjectListScreen },
  { id: "project-detail", label: "Project Detail", component: ProjectDetailScreen },
  { id: "instruction-doc", label: "Instruction Document", component: InstructionDocumentScreen },
  { id: "instruction-editor", label: "Instruction Editor", component: InstructionEditorScreen },
  { id: "assembly", label: "Assembly Workspace", component: AssemblyWorkspaceScreen },
  { id: "review", label: "Review Panel", component: ReviewPanelScreen },
  { id: "qa", label: "QA Validation", component: QAValidationScreen },
  { id: "checklist", label: "Checklist Detail", component: ChecklistDetailScreen },
  { id: "section-nav", label: "Section Navigation", component: SectionNavigationScreen },
  { id: "handoff", label: "Handoff", component: HandoffScreen },
];

export default function HexSolveScreensGallery() {
  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", padding: "40px 32px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* header */}
        <div style={{ marginBottom: "48px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>
            HexSolve — UI Screen Mockups
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Application Screens
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginTop: "8px" }}>
            All 12 screens from the HexSolve manufacturing platform. Share feedback below each screen.
          </p>
        </div>

        {/* screens grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))", gap: "32px" }}>
          {screens.map(({ id, label, component: Screen }) => (
            <div key={id}>
              {/* screen label */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#CC2929" }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {label}
                </span>
              </div>
              {/* browser frame */}
              <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
                {/* browser chrome */}
                <div style={{ background: "#2a2a2a", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                  ))}
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: "4px", height: "20px", marginLeft: "8px", display: "flex", alignItems: "center", paddingLeft: "10px" }}>
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>hexsolve.app/{id}</span>
                  </div>
                </div>
                {/* screen content */}
                <div style={{ height: "480px", overflow: "hidden" }}>
                  <Screen className="w-full h-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ marginTop: "64px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
          Manisha — HexSolve Case Study · Screen mockups for portfolio use
        </div>
      </div>
    </div>
  );
}
