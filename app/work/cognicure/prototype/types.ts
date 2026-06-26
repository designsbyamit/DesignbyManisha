export type ScreenId =
  // Journey 1 — Onboarding
  | "splash"
  | "welcome"
  | "login"
  | "otp"
  | "createProfile"
  | "healthInfo"
  | "circles"
  | "inviteFamily"
  // Journey 2 — Consultation
  | "dashboard"
  | "consultationDetails"
  | "aiPrep"
  | "waitingRoom"
  | "consultationSummary"
  | "prescription"
  | "saveToWallet"
  | "consultationFeedback"
  // Journey 3 — Family & Network
  | "circlesLanding"
  | "familyList"
  | "addFamilyMember"
  | "familyOtp"
  | "inviteAccepted"
  | "assignRelationship"
  | "memberPermissions"
  | "familyDashboard"
  | "doctorsNetwork"
  | "friendsCircle"
  | "networkGraph"
  // Journey 4 — Health Data
  | "healthWallet"
  | "bodyVitals"
  | "prescriptionsList"
  | "medicalReports"
  | "historicalComplaints"
  | "addComplaint"
  | "lifestyle"
  | "aiSummary"
  | "globalSearch"
  | "documentScanner"
  | "healthTimeline"
  // Premium
  | "aiCompanion"
  | "emergencyMode"
  | "notifications"
  | "profile"
  // Appointments sub-screen
  | "appointments"
  // Consultations tab
  | "consultations";

export type ScreenParams = Record<string, string | number | boolean>;

export interface NavEntry {
  id: ScreenId;
  params?: ScreenParams;
}

export type NavigateFn = (to: ScreenId, params?: ScreenParams) => void;

export interface ScreenProps {
  navigate: NavigateFn;
  goBack: () => void;
  params?: ScreenParams;
}
