"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { BottomNav } from "../../components/BottomNav";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

const MEMBERS = [
  { name: "Suneeta Nair", role: "Spouse",   emoji: "👵", appt: "Cardiology check-up — tomorrow", alert: false },
  { name: "Preethi Nair", role: "Daughter", emoji: "👩", appt: "No upcoming appointments",        alert: false },
];

export function FamilyDashboardScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Family Health" onBack={goBack} />
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 14 }}>
        {MEMBERS.map((m, i) => (
          <Card key={m.name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{m.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{m.name}</p>
                <p style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600 }}>{m.role}</p>
              </div>
            </div>
            <div style={{ background: C.bg, borderRadius: RADIUS.sm, padding: "10px 12px" }}>
              <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 2, fontWeight: 600 }}>Next Appointment</p>
              <p style={{ fontSize: TYPE.small, color: C.textBody }}>{m.appt}</p>
            </div>
          </Card>
        ))}
      </div>
      <BottomNav active="circlesLanding" navigate={navigate} />
    </div>
  );
}
