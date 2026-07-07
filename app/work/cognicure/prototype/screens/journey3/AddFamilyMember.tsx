"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Phone, Users, Link } from "lucide-react";
import { C, RADIUS, TYPE, SHADOW, MOTION } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const INVITE_METHODS = [
  { Icon: Phone,  label: "Mobile Number", desc: "Enter their number"    },
  { Icon: QrCode, label: "QR Code",       desc: "Scan to connect"       },
  { Icon: Users,  label: "Contacts",      desc: "Choose from contacts"  },
  { Icon: Link,   label: "Share Link",    desc: "Send invite link"      },
];

export function AddFamilyMemberScreen({ navigate, goBack }: ScreenProps) {
  const [method, setMethod] = useState(0);
  const [phone, setPhone] = useState("98127 82927");

  return (
    <div style={{ width: 390, height: 844, background: C.surface, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <StatusBar />
      <Header title="Add Family Member" onBack={goBack} rightLabel="Cancel" onRight={goBack} />

      <div style={{ flex: 1, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Invite method selector */}
        <div style={{ display: "flex", gap: 8 }}>
          {INVITE_METHODS.map((m, i) => (
            <motion.button
              key={m.label}
              onClick={() => setMethod(i)}
              animate={{ background: method === i ? C.teal : C.bg, color: method === i ? "#fff" : C.muted }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ flex: 1, padding: "10px 4px", borderRadius: RADIUS.md, border: `1px solid ${method === i ? C.teal : C.border}`, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <m.Icon size={16} color={method === i ? "#fff" : C.muted} />
              <span style={{ fontSize: 9, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{m.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Phone input */}
        <div>
          <p style={{ fontSize: TYPE.caption, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Mobile Number</p>
          <div style={{ border: `1.5px solid ${C.teal}`, borderRadius: RADIUS.md, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFAFA" }}>
            <span style={{ fontSize: TYPE.body, color: C.navy, fontWeight: 500 }}>{phone}</span>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14 }}>👤</span>
            </div>
          </div>
        </div>

        {/* Simulated iOS keyboard */}
        <div style={{ background: "#D1D3D8", borderRadius: RADIUS.md, overflow: "hidden", marginTop: "auto" }}>
          {[
            ["1", "2\nABC", "3\nDEF"],
            ["4\nGHI", "5\nJKL", "6\nMNO"],
            ["7\nPQRS", "8\nTUV", "9\nWXYZ"],
            ["+*#", "0", "⌫"],
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex", gap: 1, marginBottom: 1 }}>
              {row.map((key, ki) => (
                <button
                  key={ki}
                  onClick={() => {
                    if (key === "⌫") setPhone(p => p.slice(0,-1));
                    else if (key !== "+*#") setPhone(p => p + key.split("\n")[0]);
                  }}
                  style={{ flex: 1, background: key === "⌫" || key === "+*#" ? "#ADB1BA" : "#FFFFFF", borderRadius: 5, padding: "12px 0", border: "none", cursor: "pointer", boxShadow: "0 1px 0 rgba(0,0,0,0.3)" }}
                >
                  {key.split("\n").map((line, li) => (
                    <div key={li} style={{ fontSize: li === 0 ? 20 : 9, fontWeight: li === 0 ? 400 : 700, color: C.navy, lineHeight: 1.2, letterSpacing: li === 0 ? "-0.01em" : "0.08em" }}>{line}</div>
                  ))}
                </button>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 20px", background: "#D1D3D8" }}>
            <span style={{ fontSize: 20 }}>🌐</span>
            <div style={{ width: 100, height: 4, borderRadius: 100, background: C.navy, opacity: 0.3 }} />
            <button
              onClick={() => navigate("familyOtp")}
              style={{ background: C.teal, border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: TYPE.small, fontWeight: 700, color: "#fff", fontFamily: "inherit" }}
            >
              Send →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
