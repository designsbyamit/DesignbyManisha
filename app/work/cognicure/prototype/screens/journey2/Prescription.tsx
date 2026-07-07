// app/work/cognicure/prototype/screens/journey2/Prescription.tsx
"use client";
import React from "react";
import { Download, Share2 } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { ScreenProps } from "../../types";

export function PrescriptionScreen({ navigate, goBack }: ScreenProps) {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Prescription" onBack={goBack} rightLabel="Share" onRight={() => {}} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Prescription paper */}
        <Card style={{ border: `2px dashed ${C.border}` }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: TYPE.body, fontWeight: 800, color: C.navy }}>Dr. Nischhal Shetty</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>MBBS, MD · Reg. No. MH-12345</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>General Physician</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: TYPE.caption, color: C.muted }}>Date</p>
              <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>06/03/2023</p>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 4 }}>Patient: <span style={{ color: C.navy, fontWeight: 600 }}>Chandrashekhar Nair, 63M</span></p>
            <p style={{ fontSize: TYPE.caption, color: C.muted }}>Diagnosis: <span style={{ color: C.textBody }}>Irritable Bowel Syndrome (IBS)</span></p>
          </div>

          {/* Medicine list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "Mebeverine 135mg", freq: "1-0-1-0", dur: "10 days", notes: "Before meals" },
              { name: "Rifaximin 550mg",  freq: "1-0-1-0", dur: "7 days",  notes: "With water" },
              { name: "Probiotics (VSL)", freq: "0-0-0-1", dur: "30 days", notes: "Bedtime" },
            ].map((med, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: RADIUS.sm, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{med.name}</p>
                  <p style={{ fontSize: TYPE.caption, color: C.teal, fontWeight: 600 }}>{med.dur}</p>
                </div>
                <p style={{ fontSize: TYPE.caption, color: C.muted }}>{med.freq} · {med.notes}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontSize: TYPE.caption, color: C.textBody, fontStyle: "italic", lineHeight: 1.5 }}>Follow up after 2 weeks. Maintain a food diary. Avoid spicy and fatty foods.</p>
          </div>
        </Card>

        {/* Medicine reminders */}
        <Card>
          <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Set Medicine Reminders</p>
          {["Mebeverine 135mg", "Rifaximin 550mg"].map((med, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i === 0 ? 12 : 0 }}>
              <p style={{ fontSize: TYPE.small, color: C.textBody }}>{med}</p>
              <div style={{ width: 40, height: 22, borderRadius: 11, background: i === 0 ? C.teal : C.border, position: "relative" }}>
                <div style={{ position: "absolute", top: 2, left: i === 0 ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", gap: 12 }}>
          <Button label="Download" onPress={() => {}} variant="secondary" icon={<Download size={16} />} />
          <Button label="Share" onPress={() => {}} variant="secondary" icon={<Share2 size={16} />} />
        </div>
        <Button label="Save to Health Wallet" onPress={() => navigate("saveToWallet")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
