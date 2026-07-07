"use client";
import React, { useReducer, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "./components/PhoneFrame";
import type { ScreenId, ScreenParams, NavEntry, NavigateFn, ScreenProps } from "./types";
import { SplashScreen } from "./screens/journey1/Splash";
import { WelcomeScreen } from "./screens/journey1/Welcome";
import { LoginScreen } from "./screens/journey1/Login";
import { OtpScreen } from "./screens/journey1/Otp";
import { CreateProfileScreen } from "./screens/journey1/CreateProfile";
import { HealthInfoScreen } from "./screens/journey1/HealthInfo";
import { CirclesIntroScreen } from "./screens/journey1/Circles";
import { InviteFamilyScreen } from "./screens/journey1/InviteFamily";
import { PatientDashboard } from "./screens/journey2/Dashboard";
import { ConsultationDetailsScreen } from "./screens/journey2/ConsultationDetails";
import { AiPrepScreen } from "./screens/journey2/AiPrep";
import { WaitingRoomScreen } from "./screens/journey2/WaitingRoom";
import { ConsultationSummaryScreen } from "./screens/journey2/ConsultationSummary";
import { PrescriptionScreen } from "./screens/journey2/Prescription";
import { SaveToWalletScreen } from "./screens/journey2/SaveToWallet";
import { ConsultationFeedbackScreen } from "./screens/journey2/ConsultationFeedback";
import { CirclesLandingScreen } from "./screens/journey3/CirclesLanding";
import { FamilyListScreen } from "./screens/journey3/FamilyList";
import { AddFamilyMemberScreen } from "./screens/journey3/AddFamilyMember";
import { FamilyOtpScreen } from "./screens/journey3/FamilyOtp";
import { InviteAcceptedScreen } from "./screens/journey3/InviteAccepted";
import { AssignRelationshipScreen } from "./screens/journey3/AssignRelationship";
import { MemberPermissionsScreen } from "./screens/journey3/MemberPermissions";
import { FamilyDashboardScreen } from "./screens/journey3/FamilyDashboard";
import { DoctorsNetworkScreen } from "./screens/journey3/DoctorsNetwork";
import { FriendsCircleScreen } from "./screens/journey3/FriendsCircle";
import { NetworkGraphScreen } from "./screens/journey3/NetworkGraph";
import { HealthWalletScreen } from "./screens/journey4/HealthWallet";
import { BodyVitalsScreen } from "./screens/journey4/BodyVitals";
import { PrescriptionsListScreen } from "./screens/journey4/PrescriptionsList";
import { MedicalReportsScreen } from "./screens/journey4/MedicalReports";
import { HistoricalComplaintsScreen } from "./screens/journey4/HistoricalComplaints";
import { AddComplaintScreen } from "./screens/journey4/AddComplaint";
import { LifestyleScreen } from "./screens/journey4/Lifestyle";
import { AiSummaryScreen } from "./screens/journey4/AiSummary";
import { GlobalSearchScreen } from "./screens/journey4/GlobalSearch";
import { DocumentScannerScreen } from "./screens/journey4/DocumentScanner";
import { HealthTimelineScreen } from "./screens/journey4/HealthTimeline";
import { AiCompanionScreen } from "./screens/premium/AiCompanion";
import { EmergencyModeScreen } from "./screens/premium/EmergencyMode";
import { NotificationsScreen } from "./screens/premium/Notifications";
import { ProfileScreen } from "./screens/premium/Profile";

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
  splash: SplashScreen,
  welcome: WelcomeScreen,
  login: LoginScreen,
  otp: OtpScreen,
  createProfile: CreateProfileScreen,
  healthInfo: HealthInfoScreen,
  circles: CirclesIntroScreen,
  inviteFamily: InviteFamilyScreen,
  dashboard: PatientDashboard,
  consultationDetails: ConsultationDetailsScreen,
  aiPrep: AiPrepScreen,
  waitingRoom: WaitingRoomScreen,
  consultationSummary: ConsultationSummaryScreen,
  prescription: PrescriptionScreen,
  saveToWallet: SaveToWalletScreen,
  consultationFeedback: ConsultationFeedbackScreen,
  circlesLanding: CirclesLandingScreen,
  familyList: FamilyListScreen,
  addFamilyMember: AddFamilyMemberScreen,
  familyOtp: FamilyOtpScreen,
  inviteAccepted: InviteAcceptedScreen,
  assignRelationship: AssignRelationshipScreen,
  memberPermissions: MemberPermissionsScreen,
  familyDashboard: FamilyDashboardScreen,
  doctorsNetwork: DoctorsNetworkScreen,
  friendsCircle: FriendsCircleScreen,
  networkGraph: NetworkGraphScreen,
  healthWallet: HealthWalletScreen,
  bodyVitals: BodyVitalsScreen,
  prescriptionsList: PrescriptionsListScreen,
  medicalReports: MedicalReportsScreen,
  historicalComplaints: HistoricalComplaintsScreen,
  addComplaint: AddComplaintScreen,
  lifestyle: LifestyleScreen,
  aiSummary: AiSummaryScreen,
  globalSearch: GlobalSearchScreen,
  documentScanner: DocumentScannerScreen,
  healthTimeline: HealthTimelineScreen,
  aiCompanion: AiCompanionScreen,
  emergencyMode: EmergencyModeScreen,
  notifications: NotificationsScreen,
  profile: ProfileScreen,
  appointments: PlaceholderScreen,
  consultations: PatientDashboard,
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
