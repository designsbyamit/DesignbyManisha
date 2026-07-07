"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { PatientDashboard } from "./screens/dashboard";
import { AppointmentsScreen } from "./screens/appointments";
import { DoctorPortalScreen } from "./screens/doctor-portal";
import { HealthWalletScreen } from "./screens/health-wallet";

/* ─── Sequence ─────────────────────────────────────────────────────────────── */
// Each scene has a duration (ms), then transitions to the next
const SCENES = [
  { id: "splash",          hold: 2200 },
  { id: "home",            hold: 3000 },
  { id: "consultations",   hold: 2800 },
  { id: "circle",          hold: 2800 },
  { id: "wallet",          hold: 3000 },
] as const;

type SceneId = typeof SCENES[number]["id"];

/* ─── Easing ────────────────────────────────────────────────────────────────── */
const IOS_SPRING = { type: "spring" as const, damping: 32, stiffness: 420, mass: 0.9 };
const IOS_PUSH   = { duration: 0.38, ease: [0.42, 0, 0.58, 1] as const };

/* ─── TapRipple ─────────────────────────────────────────────────────────────── */
function TapRipple({ x, y, visible }: { x: number; y: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ripple"
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: x - 20,
            top: y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.45)",
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── Splash screen ─────────────────────────────────────────────────────────── */
function SplashScreen() {
  return (
    <div style={{
      width: 390,
      height: 844,
      background: "linear-gradient(160deg, #1B4A5C 0%, #3D9B8F 50%, #2B7A6F 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background circles */}
      {[220, 340, 460].map((size, i) => (
        <motion.div
          key={size}
          animate={{ scale: [1, 1.06, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          style={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.25)",
          }}
        />
      ))}

      {/* Logo mark */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...IOS_SPRING, delay: 0.1 }}
        style={{
          width: 88,
          height: 88,
          borderRadius: 26,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
        }}
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...IOS_SPRING, delay: 0.3 }}
          style={{ fontSize: 40 }}
        >
          🩺
        </motion.span>
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...IOS_SPRING, delay: 0.45 }}
        style={{ textAlign: "center" }}
      >
        <p style={{ fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: "0em", fontFamily: "var(--font-display), var(--font-display), serif", marginBottom: 6 }}>
          CogniCure
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontWeight: 400, letterSpacing: "0.02em" }}>
          Your health, connected
        </p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ position: "absolute", bottom: 72, width: 120, height: 3, borderRadius: 100, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
          style={{ height: "100%", background: "rgba(255,255,255,0.7)", borderRadius: 100 }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Page slide wrapper ─────────────────────────────────────────────────────── */
const SLIDE_VARIANTS = {
  enterFromRight: { x: "100%", opacity: 1 },
  enterFromLeft:  { x: "-28%", opacity: 0.6 },
  center:         { x: "0%",   opacity: 1 },
  exitToLeft:     { x: "-28%", opacity: 0.6 },
  exitToRight:    { x: "100%", opacity: 1 },
};

/* ─── Scene map ─────────────────────────────────────────────────────────────── */
function SceneContent({ id }: { id: SceneId }) {
  switch (id) {
    case "splash":        return <SplashScreen />;
    case "home":          return <PatientDashboard />;
    case "consultations": return <AppointmentsScreen />;
    case "circle":        return <DoctorPortalScreen />;
    case "wallet":        return <HealthWalletScreen />;
  }
}

/* ─── Main AutoDemo ─────────────────────────────────────────────────────────── */
export function AutoDemo() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [prevIdx,  setPrevIdx]  = useState<number | null>(null);
  const [ripple,   setRipple]   = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Nav tap positions for each transition (relative to 390px screen)
  const TAP_POSITIONS: Record<string, { x: number; y: number }> = {
    "splash→home":          { x: 195, y: 422 },
    "home→consultations":   { x: 78,  y: 810 },
    "consultations→circle": { x: 312, y: 810 },
    "circle→wallet":        { x: 351, y: 810 },
    "wallet→home":          { x: 44,  y: 810 },
  };

  useEffect(() => {
    const scene = SCENES[sceneIdx];

    // Show tap ripple ~300ms before transition
    timerRef.current = setTimeout(() => {
      const nextIdx = (sceneIdx + 1) % SCENES.length;
      const key = `${scene.id}→${SCENES[nextIdx].id}`;
      const pos = TAP_POSITIONS[key];
      if (pos && scene.id !== "splash") {
        setRipple({ x: pos.x, y: pos.y, visible: true });
        setTimeout(() => setRipple(r => ({ ...r, visible: false })), 400);
      }
    }, scene.hold - 300);

    // Transition to next scene
    const transTimer = setTimeout(() => {
      const nextIdx = (sceneIdx + 1) % SCENES.length;
      setPrevIdx(sceneIdx);
      setSceneIdx(nextIdx);
    }, scene.hold);

    return () => {
      clearTimeout(timerRef.current!);
      clearTimeout(transTimer);
    };
  }, [sceneIdx]);

  const current = SCENES[sceneIdx];
  const isSplash = current.id === "splash";
  const goingForward = prevIdx === null || (sceneIdx > (prevIdx ?? 0)) || (prevIdx === SCENES.length - 1 && sceneIdx === 0);

  return (
    <div style={{
      width: 390,
      height: 844,
      position: "relative",
      overflow: "hidden",
      borderRadius: 0,
      background: "#F5F5F0",
    }}>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.id}
          initial={isSplash ? { opacity: 0 } : (goingForward ? SLIDE_VARIANTS.enterFromRight : SLIDE_VARIANTS.enterFromLeft)}
          animate={SLIDE_VARIANTS.center}
          exit={goingForward ? SLIDE_VARIANTS.exitToLeft : SLIDE_VARIANTS.exitToRight}
          transition={isSplash ? { duration: 0.4, ease: "easeOut" } : IOS_PUSH}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            willChange: "transform",
          }}
        >
          <SceneContent id={current.id} />
        </motion.div>
      </AnimatePresence>

      {/* Tap ripple overlay */}
      <TapRipple x={ripple.x} y={ripple.y} visible={ripple.visible} />

      {/* Scene progress dots */}
      <div style={{
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 5,
        zIndex: 100,
        pointerEvents: "none",
      }}>
        {SCENES.map((s, i) => (
          <motion.div
            key={s.id}
            animate={{ width: i === sceneIdx ? 16 : 5, opacity: i === sceneIdx ? 1 : 0.4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ height: 5, borderRadius: 100, background: i === sceneIdx ? "#3D9B8F" : "rgba(27,58,92,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}
