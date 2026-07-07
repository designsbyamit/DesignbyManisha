"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./tokens";

// Screens
import { LoginScreen } from "./screens/login";
import { WorkOrdersScreen } from "./screens/work-orders";
import { MyProjectsScreen } from "./screens/my-projects";
import { ProjectDetailScreen } from "./screens/project-detail";
import { InstructionDocScreen } from "./screens/instruction-doc";
import { AssemblyScreen } from "./screens/assembly";
import { QAReviewScreen } from "./screens/qa-review";

// Legacy screens removed — new screens cover all flows

type Screen =
  | "login"
  | "work-orders"
  | "my-projects"
  | "project-detail"
  | "instruction-doc"
  | "assembly"
  | "qa-review"
  // legacy aliases resolved below
  | "dashboard"
  | "projects"
  | "qa";

export function HexSolvePrototype() {
  const [screen, setScreen] = useState<Screen>("login");

  const navigate = (to: string) => {
    // Normalise aliases
    const map: Record<string, Screen> = {
      dashboard:   "my-projects",
      projects:    "my-projects",
      "my-projects": "my-projects",
      qa:          "qa-review",
    };
    setScreen((map[to] ?? to) as Screen);
  };

  const screens: Record<Screen, React.ReactNode> = {
    login:             <LoginScreen onNavigate={navigate} />,
    "work-orders":     <WorkOrdersScreen onNavigate={navigate} />,
    "my-projects":     <MyProjectsScreen onNavigate={navigate} />,
    "project-detail":  <ProjectDetailScreen onNavigate={navigate} />,
    "instruction-doc": <InstructionDocScreen onNavigate={navigate} />,
    assembly:          <AssemblyScreen onNavigate={navigate} />,
    "qa-review":       <QAReviewScreen onNavigate={navigate} />,
    // Legacy aliases — resolve to equivalent components
    dashboard:         <MyProjectsScreen onNavigate={navigate} />,
    projects:          <MyProjectsScreen onNavigate={navigate} />,
    qa:                <QAReviewScreen onNavigate={navigate} />,
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", fontFamily: T.fontSans, position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        >
          {screens[screen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
