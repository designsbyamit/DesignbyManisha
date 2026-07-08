"use client";

import { useEffect, useState } from "react";

/* ─── Shared rotating shine border ─────────────────────────────────────── */
function ShineBorder({
  children,
  color1 = "rgba(255,255,255,0.45)",
  color2 = "rgba(200,169,110,0.5)",
  borderRadius = 16,
  padding = 2,
  glowColor = "rgba(200,169,110,0.25)",
}: {
  children: React.ReactNode;
  color1?: string;
  color2?: string;
  borderRadius?: number;
  padding?: number;
  glowColor?: string;
}) {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 1) % 360), 18);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      borderRadius,
      padding,
      background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, ${color1} 40deg, ${color2} 80deg, transparent 120deg, transparent 360deg)`,
      boxShadow: `0 0 40px ${glowColor}`,
      width: "100%",
      height: "100%",
    }}>
      {children}
    </div>
  );
}

/* ─── Browser chrome inner ──────────────────────────────────────────────── */
function BrowserChrome({
  url,
  accentColor,
  children,
}: {
  url: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", width: "100%", height: "100%", background: "#1e2433", display: "flex", flexDirection: "column" }}>
      {/* Chrome bar */}
      <div style={{ height: 32, background: "#252c3b", display: "flex", alignItems: "center", padding: "0 12px", gap: 8, flexShrink: 0 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, marginLeft: 8, height: 18, background: "rgba(255,255,255,0.07)", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{url}</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {children}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

/* ─── HexSolve: browser chrome + dark industrial bg ─────────────────────── */
export function IPadMockup({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(145deg, #0d0d0d 0%, #1a0a0a 50%, #0d0d14 100%)",
      overflow: "hidden",
      padding: "5% 4%",
      boxSizing: "border-box",
    }}>
      {/* Background grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(204,41,41,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(204,41,41,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      {/* Red glow */}
      <div style={{ position: "absolute", width: "60%", height: "60%", top: "-10%", right: "-10%", background: "rgba(204,41,41,0.08)", borderRadius: "50%", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", width: "40%", height: "40%", bottom: "-5%", left: "5%", background: "rgba(200,169,110,0.06)", borderRadius: "50%", filter: "blur(50px)" }} />

      {/* Browser frame */}
      <div style={{ position: "relative", width: "86%", maxWidth: 640, aspectRatio: "16/10" }}>
        <ShineBorder color1="rgba(255,255,255,0.4)" color2="rgba(204,41,41,0.6)" glowColor="rgba(204,41,41,0.2)" borderRadius={16} padding={2}>
          <BrowserChrome url="hexsolve.app/login" accentColor="#CC2929">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
          </BrowserChrome>
        </ShineBorder>
      </div>

      {/* Reflection */}
      <div style={{ position: "absolute", bottom: 0, left: "7%", right: "7%", height: "14%", background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── HomesWorld: browser chrome + deep night bg ────────────────────────── */
export function BrowserMockupWithShine({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(145deg, #0a0e1a 0%, #0f1823 60%, #0a1510 100%)",
      padding: "5% 4%",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>
      {/* Background ambient blobs */}
      <div style={{ position: "absolute", width: "55%", height: "55%", top: "-5%", right: "-5%", background: "rgba(196,97,58,0.09)", borderRadius: "50%", filter: "blur(70px)" }} />
      <div style={{ position: "absolute", width: "40%", height: "40%", bottom: "0%", left: "0%", background: "rgba(45,106,79,0.1)", borderRadius: "50%", filter: "blur(60px)" }} />

      {/* Browser frame */}
      <div style={{ position: "relative", width: "88%", maxWidth: 680, aspectRatio: "16/10" }}>
        <ShineBorder color1="rgba(255,255,255,0.45)" color2="rgba(200,169,110,0.5)" glowColor="rgba(200,169,110,0.2)" borderRadius={16} padding={2}>
          <BrowserChrome url="homesworld.in" accentColor="#C4613A">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
          </BrowserChrome>
        </ShineBorder>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: "6%", right: "6%", height: "12%", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

/* ─── CogniCure: static marketing mockup on teal bg ─────────────────────── */
const SCREENS = [
  "/cognicure/screens/cognicure-home.png",
  "/cognicure/screens/cognicure-consultation.png",
  "/cognicure/screens/cognicure-wallet.png",
];

export function PhoneRotatingMockup({ alt = "" }: { alt?: string }) {
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#061218",
      overflow: "hidden",
      minHeight: 380,
      padding: "4% 3%",
      boxSizing: "border-box",
    }}>
      {/* Mesh gradient animation */}
      <style>{`
        @keyframes meshBlob1 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(15%,-20%) scale(1.2); }
          66%      { transform: translate(-10%,15%) scale(0.9); }
        }
        @keyframes meshBlob2 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(-20%,10%) scale(1.15); }
          66%      { transform: translate(18%,-15%) scale(0.85); }
        }
        @keyframes meshBlob3 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          33%      { transform: translate(10%,18%) scale(1.1); }
          66%      { transform: translate(-15%,-10%) scale(1.2); }
        }
        @keyframes meshBlob4 {
          0%,100% { transform: translate(0%,0%) scale(1); }
          50%      { transform: translate(-12%,12%) scale(1.15); }
        }
      `}</style>

      {/* Blob 1 — vivid teal top-right */}
      <div style={{
        position: "absolute", width: "80%", height: "80%",
        top: "-25%", right: "-20%",
        background: "radial-gradient(ellipse, rgba(16,200,170,0.85) 0%, rgba(16,200,170,0.3) 40%, transparent 70%)",
        borderRadius: "50%", filter: "blur(18px)",
        animation: "meshBlob1 8s ease-in-out infinite",
      }} />
      {/* Blob 2 — vivid amber bottom-left */}
      <div style={{
        position: "absolute", width: "70%", height: "70%",
        bottom: "-15%", left: "-15%",
        background: "radial-gradient(ellipse, rgba(255,140,0,0.75) 0%, rgba(255,140,0,0.25) 45%, transparent 70%)",
        borderRadius: "50%", filter: "blur(18px)",
        animation: "meshBlob2 10s ease-in-out infinite",
      }} />
      {/* Blob 3 — cyan mid-left */}
      <div style={{
        position: "absolute", width: "55%", height: "55%",
        top: "20%", left: "-5%",
        background: "radial-gradient(ellipse, rgba(0,220,200,0.6) 0%, rgba(0,220,200,0.15) 50%, transparent 70%)",
        borderRadius: "50%", filter: "blur(20px)",
        animation: "meshBlob3 12s ease-in-out infinite",
      }} />
      {/* Blob 4 — violet center-right */}
      <div style={{
        position: "absolute", width: "60%", height: "60%",
        top: "15%", right: "5%",
        background: "radial-gradient(ellipse, rgba(120,60,255,0.55) 0%, rgba(120,60,255,0.15) 50%, transparent 70%)",
        borderRadius: "50%", filter: "blur(20px)",
        animation: "meshBlob4 9s ease-in-out infinite",
      }} />

      {/* Mockup image — padded so phones are never clipped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cognicure/mob.png"
        alt={alt}
        style={{
          position: "relative",
          zIndex: 1,
          width: "90%",
          maxWidth: 520,
          height: "auto",
          objectFit: "contain",
          display: "block",
          padding: "5% 4%",
        }}
      />

      {/* Edge vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,18,24,0.35) 0%, transparent 35%)", pointerEvents: "none", zIndex: 2 }} />
    </div>
  );
}

