"use client";
import React from "react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

export function FriendsCircleScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Friends" onBack={goBack} rightLabel="+ Add" onRight={() => {}} />
      </div>
      {/* Empty state */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", gap: 20, textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>👫</div>
        <p style={{ fontSize: TYPE.h3, fontWeight: 800, color: C.navy, letterSpacing: "-0.02em",
          fontFamily: "var(--font-display), Georgia, serif" }}>No friends added yet</p>
        <p style={{ fontSize: TYPE.body, color: C.textBody, lineHeight: 1.6 }}>Add your closest friends who support you in difficult times and give the most valuable health advice.</p>
        <Button label="Invite a Friend" onPress={() => navigate("addFamilyMember")} variant="primary" />
      </div>
    </div>
  );
}
