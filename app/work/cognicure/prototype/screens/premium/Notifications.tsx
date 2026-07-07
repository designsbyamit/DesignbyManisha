"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C, RADIUS, TYPE, SHADOW } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import { Header } from "../../components/Header";
import type { ScreenProps } from "../../types";

const NOTIFICATIONS = {
  Today: [
    { emoji: "📅", title: "Consultation tomorrow",     body: "Dr. Nischhal Shetty at 10:30 AM",         time: "2 min ago",  unread: true  },
    { emoji: "💊", title: "Medicine reminder",          body: "Mebeverine 135mg — before lunch",         time: "30 min ago", unread: true  },
    { emoji: "👩", title: "Preethi joined your circle", body: "Your daughter has accepted your invite.",  time: "1 hr ago",   unread: false },
  ],
  Earlier: [
    { emoji: "🔬", title: "Lab report ready",           body: "Your CBC report is now available",        time: "Yesterday",  unread: false },
    { emoji: "👨‍⚕️", title: "Dr. Shetty sent a message", body: "Regarding your follow-up appointment",   time: "2 days ago", unread: false },
    { emoji: "❤️", title: "Weekly health summary",      body: "Your health trends look stable this week", time: "3 days ago", unread: false },
  ],
};

export function NotificationsScreen({ navigate, goBack }: ScreenProps) {
  const [dismissed, setDismissed] = useState<number[]>([]);

  return (
    <div style={{ width: 390, height: 844, background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ background: C.surface }}>
        <StatusBar />
        <Header title="Notifications" onBack={goBack} rightLabel="Clear all" onRight={() => setDismissed([0, 1, 2, 3, 4, 5])} />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {Object.entries(NOTIFICATIONS).map(([group, items]) => (
          <div key={group}>
            <p style={{ fontSize: TYPE.caption, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "16px 20px 8px" }}>{group}</p>
            {items.map((n, i) => {
              const globalIdx = group === "Today" ? i : i + 3;
              if (dismissed.includes(globalIdx)) return null;
              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: 80 }}
                  style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "flex-start", background: n.unread ? `${C.tealLight}60` : C.surface }}
                >
                  {n.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, marginTop: 5, flexShrink: 0 }} />}
                  <div style={{ width: 40, height: 40, borderRadius: RADIUS.md, background: C.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ fontSize: TYPE.small, fontWeight: 700, color: C.navy }}>{n.title}</p>
                      <p style={{ fontSize: TYPE.caption, color: C.subtle }}>{n.time}</p>
                    </div>
                    <p style={{ fontSize: TYPE.caption, color: C.textBody, marginTop: 2, lineHeight: 1.4 }}>{n.body}</p>
                  </div>
                  <button onClick={() => setDismissed(d => [...d, globalIdx])} style={{ background: "none", border: "none", color: C.subtle, cursor: "pointer", padding: 0, fontSize: 16 }}>×</button>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
