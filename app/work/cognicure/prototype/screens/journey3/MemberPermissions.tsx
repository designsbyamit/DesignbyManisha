"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import type { ScreenProps } from "../../types";

const PERMISSIONS = [
  { id: "history",       label: "Medical History",    desc: "View past conditions and treatments", default: true  },
  { id: "emergency",     label: "Emergency Access",   desc: "Access in emergency situations",      default: true  },
  { id: "reports",       label: "Lab Reports",        desc: "View test results and reports",       default: false },
  { id: "prescriptions", label: "Prescriptions",      desc: "View prescriptions and medicines",    default: true  },
  { id: "appointments",  label: "Appointments",       desc: "View and manage appointments",        default: false },
];

export function MemberPermissionsScreen({ navigate, goBack }: ScreenProps) {
  const [perms, setPerms] = useState<Record<string, boolean>>(
    Object.fromEntries(PERMISSIONS.map(p => [p.id, p.default]))
  );

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Permissions" onBack={goBack} />
        <div style={{ padding: "0 24px 16px" }}>
          <p style={{ fontSize: TYPE.small, color: C.muted }}>Configure what Preethi Nair can access in your health profile.</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px", display: "flex", flexDirection: "column", gap: 10 }}>
        {PERMISSIONS.map(p => (
          <div key={p.id} style={{ background: C.surface, borderRadius: RADIUS.md, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, boxShadow: SHADOW.card }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy, marginBottom: 2 }}>{p.label}</p>
              <p style={{ fontSize: TYPE.caption, color: C.muted, lineHeight: 1.4 }}>{p.desc}</p>
            </div>
            <motion.button
              onClick={() => setPerms(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
              animate={{ background: perms[p.id] ? C.teal : C.border }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", position: "relative", flexShrink: 0 }}
            >
              <motion.div
                animate={{ left: perms[p.id] ? 22 : 2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ position: "absolute", top: 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              />
            </motion.button>
          </div>
        ))}
      </div>

      <div style={{ padding: "16px 20px 36px", background: C.bg }}>
        <Button label="Save Permissions" onPress={() => navigate("familyList")} variant="primary" fullWidth />
      </div>
    </div>
  );
}
