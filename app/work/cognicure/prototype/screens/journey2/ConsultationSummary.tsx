// app/work/cognicure/prototype/screens/journey2/ConsultationSummary.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

export function ConsultationSummaryScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Consultation Summary" onBack={goBack} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
          <Card>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.tealLight, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>👨‍⚕️</div>
              <div>
                <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>Dr. Nischhal Shetty</p>
                <p style={{ fontSize: TYPE.caption, color: C.muted }}>General Physician · 6 Mar 2023, 10:30 AM</p>
              </div>
              <div style={{ marginLeft: "auto", background: C.tealLight, borderRadius: RADIUS.full, padding: "4px 10px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.teal }}>COMPLETED</span>
              </div>
            </div>

            {[
              { label: "Diagnosis", value: "Irritable Bowel Syndrome (IBS)" },
              { label: "Advice", value: "Avoid spicy food, maintain a food diary. Stress management recommended." },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 14 }}>
                <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{row.label}</p>
                <p style={{ fontSize: TYPE.small, color: C.textBody, lineHeight: 1.5 }}>{row.value}</p>
              </div>
            ))}
          </Card>
        </motion.div>

        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Prescribed Medicines</p>
          {[
            { name: "Mebeverine 135mg", freq: "3× daily before meals", duration: "10 days" },
            { name: "Rifaximin 550mg", freq: "2× daily",               duration: "7 days" },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, marginBottom: 12, borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>{m.name}</p>
                <p style={{ fontSize: TYPE.caption, color: C.muted }}>{m.freq}</p>
              </div>
              <p style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600, alignSelf: "flex-start" }}>{m.duration}</p>
            </div>
          ))}
        </Card>

        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Follow-up &amp; Lab Tests</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>📅</span>
            <p style={{ fontSize: TYPE.small, color: C.textBody }}>Follow-up in 2 weeks — <span style={{ color: C.teal, fontWeight: 600 }}>Book now</span></p>
          </div>
          {["Complete Blood Count (CBC)", "Stool Culture Test"].map(t => (
            <div key={t} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.mustard, marginTop: 5, flexShrink: 0 }} />
              <p style={{ fontSize: TYPE.small, color: C.textBody }}>{t}</p>
            </div>
          ))}
        </Card>

        <Button label="View Prescription" onPress={() => navigate("prescription")} variant="primary" fullWidth />
        <Button label="Save to Health Wallet" onPress={() => navigate("saveToWallet")} variant="secondary" fullWidth />
      </div>
    </div>
  );
}
