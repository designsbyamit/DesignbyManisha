"use client";
import React, { useReducer, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "./components/PhoneFrame";
import type { ScreenId, ScreenParams, NavEntry, NavigateFn, ScreenProps } from "./types";

// ── Navigation reducer ────────────────────────────────────────────────────────
type NavState = { stack: NavEntry[] };
type NavAction =
  | { type: "PUSH"; id: ScreenId; params?: ScreenParams }
  | { type: "POP" }
  | { type: "REPLACE"; id: ScreenId; params?: ScreenParams }
  | { type: "RESET"; id: ScreenId };

function navReducer(state: NavState, action: NavAction): NavState {
  switch (action.type) {
    case "PUSH":    return { stack: [...state.stack, { id: action.id, params: action.params }] };
    case "POP":     return { stack: state.stack.length > 1 ? state.stack.slice(0, -1) : state.stack };
    case "REPLACE": return { stack: [...state.stack.slice(0, -1), { id: action.id, params: action.params }] };
    case "RESET":   return { stack: [{ id: action.id }] };
    default:        return state;
  }
}

// ── Placeholder screen (used until Journey plans fill real screens) ───────────
function PlaceholderScreen({ goBack, params }: ScreenProps) {
  const id = params?.screenId ?? "unknown";
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, gap: 16 }}>
      <div style={{ fontSize: 40 }}>🚧</div>
      <p style={{ fontSize: 17, fontWeight: 700, color: "#1B3A5C", textAlign: "center" }}>Screen: {String(id)}</p>
      <p style={{ fontSize: 13, color: "#6B7A8D", textAlign: "center" }}>Coming in a Journey plan</p>
      <button onClick={goBack} style={{ marginTop: 8, padding: "10px 24px", borderRadius: 999, background: "#3D9B8F", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
    </div>
  );
}

// ── Screen registry — Journey plans replace PlaceholderScreen with real screens
const SCREEN_REGISTRY: Record<ScreenId, React.FC<ScreenProps>> = {
  splash: PlaceholderScreen,
  welcome: PlaceholderScreen,
  login: PlaceholderScreen,
  otp: PlaceholderScreen,
  createProfile: PlaceholderScreen,
  healthInfo: PlaceholderScreen,
  circles: PlaceholderScreen,
  inviteFamily: PlaceholderScreen,
  dashboard: PlaceholderScreen,
  consultationDetails: PlaceholderScreen,
  aiPrep: PlaceholderScreen,
  waitingRoom: PlaceholderScreen,
  consultationSummary: PlaceholderScreen,
  prescription: PlaceholderScreen,
  saveToWallet: PlaceholderScreen,
  consultationFeedback: PlaceholderScreen,
  circlesLanding: PlaceholderScreen,
  familyList: PlaceholderScreen,
  addFamilyMember: PlaceholderScreen,
  familyOtp: PlaceholderScreen,
  inviteAccepted: PlaceholderScreen,
  assignRelationship: PlaceholderScreen,
  memberPermissions: PlaceholderScreen,
  familyDashboard: PlaceholderScreen,
  doctorsNetwork: PlaceholderScreen,
  friendsCircle: PlaceholderScreen,
  networkGraph: PlaceholderScreen,
  healthWallet: PlaceholderScreen,
  bodyVitals: PlaceholderScreen,
  prescriptionsList: PlaceholderScreen,
  medicalReports: PlaceholderScreen,
  historicalComplaints: PlaceholderScreen,
  addComplaint: PlaceholderScreen,
  lifestyle: PlaceholderScreen,
  aiSummary: PlaceholderScreen,
  globalSearch: PlaceholderScreen,
  documentScanner: PlaceholderScreen,
  healthTimeline: PlaceholderScreen,
  aiCompanion: PlaceholderScreen,
  emergencyMode: PlaceholderScreen,
  notifications: PlaceholderScreen,
  profile: PlaceholderScreen,
  appointments: PlaceholderScreen,
  consultations: PlaceholderScreen,
};

// ── Slide transition variants ─────────────────────────────────────────────────
const slideVariants = {
  enter:  { x: 390,  opacity: 1 },
  center: { x: 0,    opacity: 1 },
  exit:   { x: -120, opacity: 0 },
};

// ── Root component ────────────────────────────────────────────────────────────
export default function CogniCuyrPrototype() {
  const [state, dispatch] = useReducer(navReducer, { stack: [{ id: "splash" }] });
  const current = state.stack[state.stack.length - 1];

  const navigate: NavigateFn = useCallback((to, params) => {
    dispatch({ type: "PUSH", id: to, params });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: "POP" });
  }, []);

  const Screen = SCREEN_REGISTRY[current.id] ?? PlaceholderScreen;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0D0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    }}>
      <PhoneFrame>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}
          >
            <Screen
              navigate={navigate}
              goBack={goBack}
              params={{ ...current.params, screenId: current.id }}
            />
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>
    </div>
  );
}
