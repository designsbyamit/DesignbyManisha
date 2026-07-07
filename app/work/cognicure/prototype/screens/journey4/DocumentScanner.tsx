// app/work/cognicure/prototype/screens/journey4/DocumentScanner.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Upload } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

export function DocumentScannerScreen({ navigate, goBack }: ScreenProps) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setPhase("scanning");
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setPhase("done");
      }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Scan Document" onBack={goBack} />
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "32px 24px", gap: 28,
      }}>
        {phase === "idle" && (
          <>
            <div style={{
              width: 240, height: 300, borderRadius: RADIUS.xl,
              border: `2px dashed ${C.teal}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 16,
              background: C.tealLight + "40",
            }}>
              <Camera size={48} color={C.teal} strokeWidth={1.5} />
              <p style={{ fontSize: TYPE.small, color: C.teal, fontWeight: 600, textAlign: "center" }}>
                Position your document<br />within the frame
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <Button label="Scan Now" onPress={startScan} variant="primary"   icon={<Camera size={16} />} />
              <Button label="Upload"   onPress={startScan} variant="secondary" icon={<Upload size={16} />} />
            </div>
          </>
        )}

        {phase === "scanning" && (
          <>
            <div style={{
              width: 240, height: 300, borderRadius: RADIUS.xl,
              border: `2px solid ${C.teal}`, overflow: "hidden",
              position: "relative", background: "#1A2A3A",
            }}>
              {/* Scan line animation */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", left: 0, right: 0, height: 3,
                  background: `linear-gradient(to right, transparent, ${C.teal}, transparent)`,
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: TYPE.small }}>Scanning...</p>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontSize: TYPE.small, color: C.navy, fontWeight: 600 }}>Processing OCR</p>
                <p style={{ fontSize: TYPE.small, color: C.teal, fontWeight: 700 }}>{Math.round(progress)}%</p>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: C.border, overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ height: "100%", background: C.teal, borderRadius: 3 }}
                />
              </div>
            </div>
          </>
        )}

        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={MOTION.spring}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%" }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: C.tealLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
            }}>
              ✓
            </div>
            <p style={{
              fontSize: TYPE.h3, fontWeight: 800, color: C.navy,
              fontFamily: "var(--font-display), Georgia, serif",
            }}>
              Document Scanned!
            </p>
            <div style={{
              background: C.surface, borderRadius: RADIUS.lg,
              padding: 16, width: "100%",
              display: "flex", flexDirection: "column", gap: 8,
              boxShadow: SHADOW.card,
            }}>
              {[
                { label: "Type Detected", value: "Lab Report" },
                { label: "Auto-tagged",   value: "CBC, Blood Count" },
                { label: "Saved to",      value: "Health Wallet → Lab Reports" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: TYPE.caption, color: C.muted }}>{row.label}</p>
                  <p style={{ fontSize: TYPE.caption, fontWeight: 600, color: C.navy }}>{row.value}</p>
                </div>
              ))}
            </div>
            <Button label="Done" onPress={() => navigate("healthWallet")} variant="primary" fullWidth />
          </motion.div>
        )}
      </div>
    </div>
  );
}
