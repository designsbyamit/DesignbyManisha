// app/work/cognicure/prototype/screens/journey2/WaitingRoom.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { C, RADIUS, TYPE } from "../../tokens";
import { StatusBar } from "../../components/StatusBar";
import type { ScreenProps } from "../../types";

export function WaitingRoomScreen({ navigate, goBack }: ScreenProps) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div style={{ width: 390, height: 844, background: "#1A1A2E", display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>
      <StatusBar dark />

      {/* Doctor video area */}
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Animated pulse rings around doctor */}
        {[1,2,3].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.15 + i*0.08, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            style={{ position: "absolute", width: 160 + i*40, height: 160 + i*40, borderRadius: "50%", border: `1px solid ${C.teal}` }}
          />
        ))}

        {/* Doctor avatar */}
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, #2C4A70 0%, #1A2E4A 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, position: "relative", zIndex: 1 }}>
          👨‍⚕️
          <div style={{ position: "absolute", bottom: 8, right: 4, width: 14, height: 14, borderRadius: "50%", background: C.success, border: "2px solid #1A1A2E" }} />
        </div>

        <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center" }}>
          <p style={{ fontSize: TYPE.body, fontWeight: 700, color: "#fff" }}>Dr. Nischhal Shetty</p>
          <p style={{ fontSize: TYPE.small, color: "rgba(255,255,255,0.6)" }}>Connected · {fmt(timer)}</p>
        </div>

        {/* Self view PiP */}
        <div style={{ position: "absolute", top: 16, right: 16, width: 80, height: 110, borderRadius: RADIUS.md, background: "#2A3A50", overflow: "hidden", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {videoOff ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <VideoOff size={20} color="rgba(255,255,255,0.5)" />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Video off</span>
            </div>
          ) : (
            <span style={{ fontSize: 32 }}>👴</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: "rgba(0,0,0,0.4)", padding: "20px 32px 40px" }}>
        {/* Notes input */}
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: RADIUS.md, padding: "10px 14px", marginBottom: 20, border: `1px solid rgba(255,255,255,0.1)` }}>
          <p style={{ fontSize: TYPE.caption, color: "rgba(255,255,255,0.4)" }}>Patient notes...</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {[
            { Icon: muted ? MicOff : Mic, active: !muted, onPress: () => setMuted(v=>!v), label: "Mic" },
            { Icon: videoOff ? VideoOff : Video, active: !videoOff, onPress: () => setVideoOff(v=>!v), label: "Video" },
          ].map(({ Icon, active, onPress, label }) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <motion.button
                onClick={onPress}
                whileTap={{ scale: 0.9 }}
                style={{ width: 56, height: 56, borderRadius: "50%", background: active ? "rgba(255,255,255,0.15)" : "rgba(255,0,0,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon size={22} color={active ? "#fff" : "#ff6b6b"} />
              </motion.button>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{label}</span>
            </div>
          ))}

          {/* End call */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <motion.button
              onClick={() => navigate("consultationSummary")}
              whileTap={{ scale: 0.9 }}
              style={{ width: 64, height: 64, borderRadius: "50%", background: "#E53E3E", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <PhoneOff size={24} color="#fff" />
            </motion.button>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
