// app/work/cognicure/prototype/screens/journey4/GlobalSearch.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { C, RADIUS, TYPE } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

const SUGGESTIONS = [
  "Show my asthma reports",
  "Find prescriptions from last year",
  "Show Dr Shetty consultations",
  "Blood pressure readings March",
];

const RESULTS = [
  { type: "Prescription", label: "IBS Treatment — Dr. Shetty", date: "6 Mar 2023",  emoji: "💊" },
  { type: "Lab Report",   label: "Complete Blood Count",       date: "5 Jan 2023",  emoji: "🔬" },
  { type: "Consultation", label: "Dr. Mahima Gupta — Physio",  date: "24 Feb 2023", emoji: "👩‍⚕️" },
];

export function GlobalSearchScreen({ goBack }: ScreenProps) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div style={{
      width: 390, height: 844, background: C.surface,
      display: "flex", flexDirection: "column",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden",
    }}>
      <StatusBar />

      {/* Search bar row */}
      <div style={{ padding: "8px 20px 12px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 10,
          background: C.bg, borderRadius: RADIUS.full,
          padding: "12px 16px",
          border: `1.5px solid ${searched ? C.teal : C.border}`,
        }}>
          <Search size={16} color={C.teal} />
          <span style={{ flex: 1, fontSize: TYPE.body, color: query ? C.navy : C.subtle }}>
            {query || "Search your health records..."}
          </span>
          {query && (
            <X size={14} color={C.muted} style={{ cursor: "pointer" }} onClick={() => { setQuery(""); setSearched(false); }} />
          )}
        </div>
        <button
          onClick={goBack}
          style={{
            background: "none", border: "none",
            fontSize: TYPE.small, fontWeight: 600, color: C.teal,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Cancel
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px" }}>
        {!searched ? (
          <>
            <p style={{
              fontSize: TYPE.caption, fontWeight: 700, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
            }}>
              TRY ASKING
            </p>
            {SUGGESTIONS.map((s, i) => (
              <motion.div
                key={i}
                onClick={() => { setQuery(s); setSearched(true); }}
                whileTap={{ background: C.bg }}
                style={{
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.border}`,
                  display: "flex", gap: 12, alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Search size={14} color={C.subtle} />
                <p style={{ fontSize: TYPE.small, color: C.textBody }}>{s}</p>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            <p style={{
              fontSize: TYPE.caption, fontWeight: 700, color: C.muted,
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
            }}>
              RESULTS FOR &quot;{query.slice(0, 20)}...&quot;
            </p>
            {RESULTS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
                style={{
                  padding: "12px 0", borderBottom: `1px solid ${C.border}`,
                  display: "flex", gap: 14, alignItems: "center",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: RADIUS.md,
                  background: C.tealLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>
                  {r.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    background: C.mustardLight, borderRadius: RADIUS.full,
                    padding: "2px 8px", display: "inline-block", marginBottom: 4,
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.mustard }}>{r.type}</span>
                  </div>
                  <p style={{ fontSize: TYPE.small, fontWeight: 600, color: C.navy }}>{r.label}</p>
                  <p style={{ fontSize: TYPE.caption, color: C.muted }}>{r.date}</p>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
