"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PatientDashboard } from "./screens/dashboard";
import { AppointmentsScreen } from "./screens/appointments";
import { MedicalRecordsScreen } from "./screens/records";
import { HealthWalletScreen } from "./screens/health-wallet";
import { DoctorPortalScreen } from "./screens/doctor-portal";
import { FamilyScreen } from "./screens/family";
import { FollowUpScreen } from "./screens/followup";

const IOS_PUSH = { duration: 0.38, ease: [0.42, 0, 0.58, 1] as const };

type SceneDef = { id: string; component: React.ReactNode; hold: number };

function SceneSlide({ scenes, accent }: { scenes: SceneDef[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDir(1);
      setIdx(i => (i + 1) % scenes.length);
    }, scenes[idx].hold);
    return () => clearTimeout(t);
  }, [idx, scenes]);

  return (
    <div style={{ width: 390, height: 844, position: "relative", overflow: "hidden", background: "#F5F5F0" }}>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={scenes[idx].id}
          initial={{ x: dir > 0 ? "100%" : "-28%", opacity: dir > 0 ? 1 : 0.6 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: dir > 0 ? "-28%" : "100%", opacity: dir > 0 ? 0.6 : 1 }}
          transition={IOS_PUSH}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", willChange: "transform" }}
        >
          {scenes[idx].component}
        </motion.div>
      </AnimatePresence>
      {/* Progress dots */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, zIndex: 100, pointerEvents: "none" }}>
        {scenes.map((_, i) => (
          <motion.div key={i} animate={{ width: i === idx ? 16 : 5, opacity: i === idx ? 1 : 0.35 }}
            transition={{ duration: 0.25 }}
            style={{ height: 4, borderRadius: 100, background: i === idx ? accent : "rgba(27,58,92,0.35)" }}
          />
        ))}
      </div>
    </div>
  );
}

/** Patient flow: Dashboard → Appointments → Records → Follow-up */
export function PatientDemo() {
  const scenes: SceneDef[] = [
    { id: "home",   component: <PatientDashboard />,    hold: 2800 },
    { id: "appts",  component: <AppointmentsScreen />,  hold: 2600 },
    { id: "recs",   component: <MedicalRecordsScreen />,hold: 2600 },
    { id: "followup", component: <FollowUpScreen />,    hold: 2800 },
  ];
  return <SceneSlide scenes={scenes} accent="#3D9B8F" />;
}

/** Caregiver flow: Family circle → Add member → Shared updates */
export function CaregiverDemo() {
  const scenes: SceneDef[] = [
    { id: "circles", component: <DoctorPortalScreen />, hold: 2800 },
    { id: "family",  component: <FamilyScreen />,       hold: 2600 },
    { id: "wallet",  component: <HealthWalletScreen />, hold: 2800 },
  ];
  return <SceneSlide scenes={scenes} accent="#3D9B8F" />;
}

/** Doctor flow: Provider schedule → Consultations → Patient records */
export function DoctorDemo() {
  const scenes: SceneDef[] = [
    { id: "schedule", component: <DoctorPortalScreen />, hold: 2800 },
    { id: "consult",  component: <AppointmentsScreen />, hold: 2600 },
    { id: "records",  component: <MedicalRecordsScreen />, hold: 2800 },
  ];
  return <SceneSlide scenes={scenes} accent="#1B3A5C" />;
}
