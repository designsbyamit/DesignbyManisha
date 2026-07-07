// app/work/cognicure/prototype/screens/journey2/ConsultationDetails.tsx
"use client";
import React from "react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

// Figma correction: very minimal — doctor mini-card, date/time, notes textarea,
// Chat (ghost) + Start Consultation (teal) at bottom. No big AI prep CTA.

export function ConsultationDetailsScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{
      width: 390, height: 844, background: C.bg,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Consultation" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Doctor mini-card */}
        <div style={{
          background: C.surface, borderRadius: RADIUS.lg,
          padding: "14px 16px", boxShadow: SHADOW.card,
          display: "flex", gap: 14, alignItems: "center",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: C.tealLight, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
          }}>
            👨‍⚕️
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Dr. Nischhal Shetty</p>
            <p style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 500 }}>General Physician · 12 yrs exp</p>
          </div>
        </div>

        {/* Date / Time row */}
        <div style={{
          background: C.surface, borderRadius: RADIUS.lg,
          padding: "14px 16px", boxShadow: SHADOW.card,
          display: "flex", gap: 24,
        }}>
          <div>
            <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 4 }}>Date</p>
            <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>Thu, 6 Mar 2023</p>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div>
            <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 4 }}>Time</p>
            <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>10:30 AM</p>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div>
            <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 4 }}>Mode</p>
            <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>Video</p>
          </div>
        </div>

        {/* Notes for doctor */}
        <div>
          <p style={{ fontSize: TYPE.caption, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Notes for doctor
          </p>
          <div style={{
            background: C.surface, borderRadius: RADIUS.lg,
            border: `1px solid ${C.border}`, padding: "14px 16px",
            minHeight: 100, boxShadow: SHADOW.card,
          }}>
            <p style={{ fontSize: TYPE.small, color: C.subtle, lineHeight: 1.6 }}>
              Abdominal pain and discomfort in lower abdomen for last 3 days...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom action row */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: C.surface, borderTop: `1px solid ${C.border}`,
        padding: "16px 20px 32px",
        display: "flex", gap: 12,
      }}>
        <Button label="Chat" onPress={() => {}} variant="ghost" fullWidth />
        <Button label="Start Consultation" onPress={() => navigate("aiPrep")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
