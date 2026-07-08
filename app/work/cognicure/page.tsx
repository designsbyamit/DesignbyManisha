"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Play, Pause, ChevronRight, Heart, Shield, Users, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioNav } from "@/components/PortfolioNav";

/* ─── Real portfolio images from CogniCure case study ─────────────────────── */
const IMGS = {
  hero:        "https://lh3.googleusercontent.com/sitesv/AA5AbUDempZe5kKkJKE14nmF0GfX8bvcqYjFDnoTXmjXBpJfMFPZUKuFNwc7qIvwRkLdm-IXhKVFH90qZKr5PLnaJl-LNy-FogTqMhfrYeqltI_YKWJ7J1mpnrXQB688y4RaXr5XexLG9czQSrtOQKcLmSFAj95OOXNvA-tIxRN0K0kJWtFo2dZseLsFsHDpZQIQBj7amOdB0e8sV9xl1TiKLXEHAgIBtfTcx7TodA=w1280",
  context:     "https://lh3.googleusercontent.com/sitesv/AA5AbUDUonHUGnfjzvkrT87ku6XdwCfxV0_nNsFYAE7PjDWVTmj8H2v5ioP4XBOZyI8GRNktyHrEVZOn29-WduwqDM7kM93A6N5ZjYlQyRpdFOO21oFd5pS6L0tcQ0pP9n-rfjSvk_niK7JlBq2mpxShIQNlC8QocGYXvn662b-2WkNxVVbsU7BgXCiTEXQ02ab44YW5wBsHlL7ShZzAeQ7HdlZvq9tv0MKydUFGvSCezS4=w1280",
  research:    "https://lh3.googleusercontent.com/sitesv/AA5AbUAudLWWKt9Wyi8gOccLuq8TBlI4cLepSKV6hiVa0bnvKPjvrNTZgjjLTXg3ynjekhCBFD4p4GElFX6Iur4m5PJgXbGUdViHi95zA2HN-W93vsbMsepVa8UUr-WHsTDX9nzxmM19h-4UxzesMFxedANmB28UzRipQTsv2cz_bDCc4oO681qSMl90qIuPIGI3K4ze1eJAcGpY2KeNj2sAtNLfBYU9VsMHOvO6wit__CI=w1280",
  problem:     "https://lh3.googleusercontent.com/sitesv/AA5AbUDWflkGWiFiXq0_BH6hQlNKOYHmLqCnRpCE-2leQX02qy6BWcqjLqFfReMcDjU6Yy5oGHCntQURFkyEdEF81iujARB4HMfEBU5ybhfISPHFULCe-qKEYIFdhHQk2Ju2U7jxabZBD6BqmzcUVp2GrRnfo04xmMbvtajQ8ritu4soIH0Pb_O72WqqRZ2AMQfQ1977B96uiQfM1gsEFapTg2Bszl6Udvr9xrGZZ2Fb=w1280",
  process:     "https://lh3.googleusercontent.com/sitesv/AA5AbUAsI8xUylpXRN27rbwO9I2jBMUpf-ZJ_uTLhWl65dbsHOid36Ove9bgg3K5HnBmgQmjcdzHWPi5hpJb8Lm_cfCzTjSZVQklbzWZ6gSmB4-SbepPzu1_iXmrHCibN7vaiFz3y7K16fc-ydq_rs8YeLVtQe6dZGR6Sh5QqJ1ujuhuXrN_TX9TkR5Ezm7kM3MKRMbYBgh87SCzWlHgQo1tbwGvfMnzsE0OI1e22AVbxIE=w1280",
  ia:          "https://lh3.googleusercontent.com/sitesv/AA5AbUDglNMxgGdCMEyfql-GMXU93zWfVF2oACYu1nDqxX_TroNCVhAl4ojUySW-8edXHi1xryfgIwv2bviB-GrBwXum6LgKmu1eX8L6IHQb2hcRvFk0PcQB1XehJ61bn_Qe94CqS8ppIKYwlpVduRyfFETeoIIbu-R5uRMejJQe9DxtfuuUk9VmEFnqW8ubktY=w1280",
  interaction: "https://lh3.googleusercontent.com/sitesv/AA5AbUDq1EDxMoOIGUFvbO49G5JKr0rwyur54MNboCY5AZIl_cFHs4Hs7lQ2uqmkIcInqed20XCJpLBYBXJAr_Dq8ArKV5QBngQYqmR5XhVakSsAomOQCoSTaDEA-IkMLnmNQpGVuE6hM-jEr3JLCSbQNQx_2gngDD7EB7RxwdVvcfGNE-1XEzw0a5HyY0JOzXpJefM612yCP_6FBD7sU1MbFB22dRFV87bRWgOFARfYGpY=w1280",
  wireframes:  "https://lh3.googleusercontent.com/sitesv/AA5AbUAL3wTkREM5v09fmQIzZwDMbrn8QekBYoZr0PGL2roysY08eWIB3L0EFBQUsOdaZ-ZbwuvPyWNUpQRpCn3A4vr-f7Jd15jnIKCfya3hchUB4DBQ5lHx-yoCwXRVuMRm0JqRXWMfDCgr2F58XTuAAnaW6uyGoZS31IfE-lUzBjiBJR-oXAxrbCP5L-pPyiL6lqjw8D5nVyxcF-ZV_ZJNHNVKmQEwsVZAxBATlwsX=w1280",
  proto:       "https://lh3.googleusercontent.com/sitesv/AA5AbUCo7jwn_-qdYTYUVnjTqen9XCUfpiKyu6GhlJotf25v65tHPtJgHmEwz5PvgWPBxpEGX2T2IMOk5M4ddbyZvqprhDzEu9Vf7rSzqAQ-xhqTQw1CRW5i6pcqILGG-4Q1AHrsXKT4M0kMfDFM3nwIqg8537gsqOexfQ0XVedpE97_Dr-X2uhb06zhNcIVtf7OdUl-kwt60_05uE7LLhC6qp3V1vyQt9p2xMh5DNgV1N4=w1280",
} as const;

import { PatientDashboard } from "./screens/dashboard";
import { AutoDemo } from "./AutoDemo";
import { PatientDemo, CaregiverDemo, DoctorDemo } from "./UseCaseDemos";
import { AppointmentsScreen } from "./screens/appointments";
import { MedicalRecordsScreen } from "./screens/records";
import { DoctorPortalScreen } from "./screens/doctor-portal";
import { FamilyScreen } from "./screens/family";
import { FollowUpScreen } from "./screens/followup";

/* ─── Palette — CogniCure: teal + navy + warm off-white ───────────────────── */
const P = {
  ink:          "#1B3A5C",   /* navy — headings, body text */
  dark:         "#0D1E2E",   /* near-black — dark section backgrounds */
  muted:        "#4A6A8A",
  subtle:       "#7A9AB8",
  surface:      "#F5F5F0",
  s2:           "#EBF5F3",
  s3:           "#C8DED9",
  accent:       "#3D9B8F",
  accentLight:  "#E8F5F3",
  green:        "#3D9B8F",
  greenLight:   "#E8F5F3",
  amber:        "#D97706",
  amberLight:   "#FEF3C7",
  white:        "#FFFFFF",
  border:       "#D8E8E5",
} as const;

/* ─── Variants ─────────────────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── MobileFrame ──────────────────────────────────────────────────────────── */
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 28,
      overflow: "hidden",
      border: "3px solid #1C1C1E",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 32px 80px rgba(27,58,92,0.25)",
      background: "#1C1C1E",
      position: "relative",
    }}>
      {/* Dynamic island */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        width: 88, height: 26, background: "#0a0a0a",
        borderRadius: 100, zIndex: 10,
      }} />
      {/* Screen */}
      <div style={{ overflow: "hidden", borderRadius: 24 }}>{children}</div>
      {/* Home indicator */}
      <div style={{
        height: 28, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#1C1C1E",
      }}>
        <div style={{ width: 100, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.25)" }} />
      </div>
    </div>
  );
}

/* ─── SectionLabel ─────────────────────────────────────────────────────────── */
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.4)" : P.accent, marginBottom: 16 }}>
      {children}
    </p>
  );
}

/* ─── Prototype steps ──────────────────────────────────────────────────────── */
const PROTO_STEPS = [
  { id: 0, label: "Dashboard",       description: "The home view — consultations at a glance, energy activity, and incoming invites from your circle." },
  { id: 1, label: "Consultations",   description: "Upcoming and past bookings in one place. Book a new consultation in seconds from the same screen." },
  { id: 2, label: "Health Records",  description: "Prescriptions, lab reports, discharge summaries — all organised, searchable, never misplaced." },
  { id: 3, label: "My Circles",      description: "Bring family, doctors, and friends into a single care network. Not just an emergency contact — a real circle." },
  { id: 4, label: "Add Family",      description: "Invite a family member by mobile number. Simple, frictionless, designed for low-digital-literacy users." },
  { id: 5, label: "Video Call",      description: "A telehealth consultation — the moment that made the entire care journey worth building for." },
];

function ScreenRenderer({ stepId }: { stepId: number }) {
  switch (stepId) {
    case 0: return <PatientDashboard />;
    case 1: return <AppointmentsScreen />;
    case 2: return <MedicalRecordsScreen />;
    case 3: return <DoctorPortalScreen />;
    case 4: return <FamilyScreen />;
    case 5: return <FollowUpScreen />;
    default: return <PatientDashboard />;
  }
}

/* ─── MAIN ─────────────────────────────────────────────────────────────────── */
export default function CogniCurePage() {
  const { scrollY } = useScroll();
  const navBg     = useTransform(scrollY, [0, 80], ["rgba(250,251,254,0)", "rgba(250,251,254,0.97)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["none", "0 1px 0 rgba(0,0,0,0.06)"]);

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    mouseX.set((e.clientX - cx) / cx);
    mouseY.set((e.clientY - cy) / cy);
  }

  const [activeStep, setActiveStep] = useState(0);
  const [playing,    setPlaying]    = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActiveStep((s) => (s + 1) % PROTO_STEPS.length), 2800);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    const id = setInterval(() => setActiveInsight((p) => (p + 1) % 4), 3200);
    return () => clearInterval(id);
  }, []);

  /* Section refs */
  const heroRef    = useRef<HTMLDivElement>(null);
  const ctxRef     = useRef<HTMLDivElement>(null);
  const oppRef     = useRef<HTMLDivElement>(null);
  const resRef     = useRef<HTMLDivElement>(null);
  const insRef     = useRef<HTMLDivElement>(null);
  const probRef    = useRef<HTMLDivElement>(null);
  const iaRef      = useRef<HTMLDivElement>(null);
  const expRef     = useRef<HTMLDivElement>(null);
  const decRef     = useRef<HTMLDivElement>(null);
  const valRef     = useRef<HTMLDivElement>(null);
  const tokRef     = useRef<HTMLDivElement>(null);
  const protoRef   = useRef<HTMLDivElement>(null);
  const impactRef  = useRef<HTMLDivElement>(null);
  const refRef     = useRef<HTMLDivElement>(null);
  const nextRef    = useRef<HTMLDivElement>(null);

  const heroInView   = useInView(heroRef,   { once: true });
  const ctxInView    = useInView(ctxRef,    { once: true });
  const oppInView    = useInView(oppRef,    { once: true });
  const resInView    = useInView(resRef,    { once: true });
  const insInView    = useInView(insRef,    { once: true });
  const probInView   = useInView(probRef,   { once: true });
  const iaInView     = useInView(iaRef,     { once: true });
  const expInView    = useInView(expRef,    { once: true });
  const decInView    = useInView(decRef,    { once: true });
  const valInView    = useInView(valRef,    { once: true });
  const tokInView    = useInView(tokRef,    { once: true });
  const protoInView  = useInView(protoRef,  { once: true });
  const impactInView = useInView(impactRef, { once: true });
  const refInView    = useInView(refRef,    { once: true });
  const nextInView   = useInView(nextRef,   { once: true });

  return (
    <div style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", background: P.surface, minHeight: "100vh" }}>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <PortfolioNav />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} onMouseMove={handleMouseMove}
        style={{ background: "#080F14", position: "relative", overflow: "hidden" }}
      >
        {/* Single clean radial — deep, subtle, no banding */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 90% at 75% 45%, rgba(61,155,143,0.08) 0%, rgba(61,155,143,0.04) 40%, transparent 70%)",
        }} />

        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 64px 100px 64px" }}
          >
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: P.accent, marginBottom: 28 }}>
              Case Study — CogniCure
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontSize: "clamp(34px, 4.2vw, 62px)", fontWeight: 900, lineHeight: 1.06, color: P.white, marginBottom: 28,
            }}>
              Making healthcare feel less like a system and more like someone who cares
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", maxWidth: 440 }}>
              How I designed a telehealth app for rural India that connected patients with family doctors, caregivers, and their own health records — in one calm, coherent place.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 12 }}
            >
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 1, height: 36, background: "rgba(255,255,255,0.15)" }}
              />
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll to explore</p>
            </motion.div>
          </motion.div>

          {/* Right — dominant phone, fills column */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "100vh",
          }}>
            {/* Deep teal glow pool at base */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "-10%",
                left: "30%",
                width: 640,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(61,155,143,0.12) 0%, rgba(61,155,143,0.05) 45%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />

            {/* The phone — 280px chassis, vertically centred, clean crop */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                top: "5%",
                left: "12%",
                width: 350,
                x: useTransform(springX, [-1, 1], [10, -10]),
                y: useTransform(springY, [-1, 1], [6, -6]),
                rotate: -4,
                transformOrigin: "50% 55%",
              }}
            >
              {/* Chassis */}
              <div style={{
                borderRadius: 28,
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.22)",
                boxShadow: [
                  "0 48px 120px rgba(0,0,0,0.95)",
                  "0 20px 48px rgba(0,0,0,0.7)",
                  "0 0 0 1px rgba(255,255,255,0.07) inset",
                  "inset 0 1px 0 rgba(255,255,255,0.12)",
                ].join(", "),
                background: "#060606",
                position: "relative",
              }}>
                {/* Dynamic island */}
                <div style={{
                  position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
                  width: 88, height: 24, background: "#000",
                  borderRadius: 100, zIndex: 20,
                }} />
                {/* Volume buttons */}
                <div style={{ position: "absolute", left: -3, top: 112, width: 3, height: 31, background: "rgba(255,255,255,0.18)", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 155, width: 3, height: 55, background: "rgba(255,255,255,0.18)", borderRadius: "2px 0 0 2px" }} />
                {/* Power button */}
                <div style={{ position: "absolute", right: -3, top: 137, width: 3, height: 65, background: "rgba(255,255,255,0.18)", borderRadius: "0 2px 2px 0" }} />

                {/* Screen — AutoDemo at 390px scaled down via zoom */}
                <div style={{
                  width: 344,
                  overflow: "hidden",
                  borderRadius: 25,
                  background: "#F5F5F0",
                  position: "relative",
                }}>
                  {/* White mask covers each screen's own status bar — persistent one is on chassis below */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 30,
                    background: "#F5F5F0",
                    zIndex: 30,
                    pointerEvents: "none",
                  }} />

                  {/* Demo content */}
                  <div style={{
                    width: 390,
                    zoom: 0.882,
                    pointerEvents: "none",
                    display: "block",
                  }}>
                    <AutoDemo />
                  </div>
                </div>

                {/* Persistent status bar — lives on chassis, never inside screen clip */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 36,
                  background: "#F5F5F0",
                  zIndex: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 18px",
                  borderRadius: "26px 26px 0 0",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#1B3A5C", letterSpacing: "-0.01em" }}>9:41</span>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5 }}>
                      {[1,2,3].map(i => <div key={i} style={{ width: 2, height: 3 + i * 2, background: "#1B3A5C", borderRadius: 1 }} />)}
                    </div>
                    <div style={{ width: 13, height: 7, border: "1.5px solid #1B3A5C", borderRadius: 2, position: "relative", marginLeft: 2 }}>
                      <div style={{ position: "absolute", left: 1.5, top: 1, bottom: 1, width: "70%", background: "#3D9B8F", borderRadius: 1 }} />
                      <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", width: 2, height: 4, background: "#1B3A5C", borderRadius: 1 }} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom crop — smooth 6-stop perceptual fade, no visible bands */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "55%",
                background: [
                  "linear-gradient(to bottom,",
                  "  rgba(8,15,20,0) 0%,",
                  "  rgba(8,15,20,0.04) 20%,",
                  "  rgba(8,15,20,0.15) 38%,",
                  "  rgba(8,15,20,0.42) 55%,",
                  "  rgba(8,15,20,0.75) 72%,",
                  "  rgba(8,15,20,0.96) 88%,",
                  "  #080F14 100%)",
                ].join(""),
                borderRadius: "0 0 28px 28px",
                pointerEvents: "none",
              }} />
            </motion.div>


            {/* Revolving circles — represents Family Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                bottom: "16%",
                right: "6%",
                zIndex: 20,
                width: 80,
                height: 80,
              }}
            >
              {/* Three dotted circles revolving around centre */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 7 + i * 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.8,
                  }}
                  style={{
                    position: "absolute",
                    inset: i * 10,
                    borderRadius: "50%",
                    border: `1.5px dashed rgba(61,155,143,${0.9 - i * 0.22})`,
                    boxShadow: `0 0 ${8 + i * 4}px rgba(61,155,143,${0.25 - i * 0.06})`,
                  }}
                />
              ))}
              {/* Centre dot */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 10, height: 10,
                borderRadius: "50%",
                background: P.accent,
                boxShadow: "0 0 12px rgba(61,155,143,0.7)",
              }} />
            </motion.div>
          </div>
        </div>

        {/* Metadata strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 64px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 32 }}>
            {[
              { label: "Role",     value: "UX Designer" },
              { label: "Industry", value: "Digital Healthcare" },
              { label: "Platform", value: "iOS · Android" },
              { label: "Scope",    value: "Research to Prototype" },
              { label: "Users",    value: "Patients · Families · Doctors" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 5 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTEXT — The world before
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={ctxRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={ctxInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          >
            <div>
              <motion.div variants={fadeUp}><SectionLabel>Context</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 20, lineHeight: 1.15 }}>
                Healthcare is emotionally different from every other product.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: P.muted, marginBottom: 16 }}>
                When someone interacts with a banking app or a travel booking site, a mistake is inconvenient. When someone interacts with a healthcare product, a missed notification or a buried test result isn't an inconvenience — it's anxiety. It can feel like being abandoned.
              </motion.p>
              <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.8, color: P.muted }}>
                COVID made this visible to everyone. Telehealth adoption accelerated by a decade in eighteen months. And yet most digital health experiences were built for administrative efficiency — not for the emotional reality of being sick, scared, or simply trying to stay well.
              </motion.p>
            </div>

            {/* Visual — fragmentation diagram */}
            <motion.div variants={scaleIn} style={{ position: "relative", height: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 300, height: 300 }}>
                {/* Disconnected fragments */}
                {[
                  { label: "Lab Results",     x: 20,  y: 10,  color: "#3D9B8F", size: 80 },
                  { label: "Prescriptions",   x: 180, y: 0,   color: "#3D9B8F", size: 72 },
                  { label: "Appointments",    x: 0,   y: 160, color: "#D97706", size: 76 },
                  { label: "Doctor Notes",    x: 170, y: 155, color: "#3D9B8F", size: 68 },
                  { label: "Family",          x: 90,  y: 230, color: "#DC3545", size: 64 },
                ].map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={ctxInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.22,1,0.36,1] }}
                    style={{
                      position: "absolute", left: node.x, top: node.y,
                      width: node.size, height: node.size, borderRadius: 16,
                      background: node.color + "15", border: `1.5px dashed ${node.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, color: node.color, textAlign: "center", lineHeight: 1.3, padding: "0 8px" }}>{node.label}</span>
                  </motion.div>
                ))}
                {/* No-connection label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={ctxInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                    background: P.white, border: `1px solid ${P.border}`, borderRadius: 10,
                    padding: "6px 12px", whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 600, color: P.muted }}>No connection</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE OPPORTUNITY
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={oppRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={oppInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>The Opportunity</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, maxWidth: 700, lineHeight: 1.15 }}>
              What if the care experience felt as continuous as the care itself?
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={oppInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              { icon: <Heart size={20} />, title: "Patients lose continuity", body: "Between visits, patients are left to manage fragmented information across apps, printed sheets, and memory. The care stops at the clinic door.", color: "#3D9B8F" },
              { icon: <Users size={20} />, title: "Caregivers are invisible", body: "Family members who provide daily care — reminders, transportation, emotional support — have no formal place in most healthcare products.", color: "#3D9B8F" },
              { icon: <Activity size={20} />, title: "Trust must come before efficiency", body: "A system that is fast but opaque creates anxiety. The design challenge was building trust first, then building speed on top of it.", color: "#D97706" },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 16, padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: card.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: card.color }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: 16, color: P.ink, marginBottom: 10, }}>{card.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: P.muted }}>{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RESEARCH — Understanding people
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={resRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={resInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Research</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 12 }}>
              Understanding people, not users
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.7, color: P.muted, maxWidth: 560 }}>
              I needed to understand what healthcare actually felt like — not how it was supposed to work. That required listening more than asking.
            </motion.p>
          </motion.div>

          {/* 2-column asymmetric layout: pull quote left, numbered findings right */}
          <motion.div variants={stagger} initial="hidden" animate={resInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 60 }}
          >
            {/* Left — large pull quote */}
            <motion.div variants={fadeUp} style={{ paddingTop: 8 }}>
              <div style={{ width: 32, height: 3, background: P.accent, borderRadius: 100, marginBottom: 24 }} />
              <blockquote style={{ fontSize: 22, fontWeight: 700, color: P.ink, lineHeight: 1.5, letterSpacing: "-0.02em", marginBottom: 24 }}>
                "The problem wasn't that people lacked access to their health data. It was that none of it felt connected — to them, or to each other."
              </blockquote>
              <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.7 }}>
                I went into this project expecting to find feature gaps. Instead I found something more fundamental: a breakdown in coherence. Every touchpoint in healthcare was an island.
              </p>
            </motion.div>

            {/* Right — numbered findings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { n: "12", label: "Patient interviews", detail: "Rural and semi-urban India · Chronic condition management · Ages 22–74" },
                { n: "5",  label: "Caregiver conversations", detail: "Family members coordinating care — the invisible workforce in healthcare" },
                { n: "3",  label: "Provider shadowing sessions", detail: "Observing how doctors communicated next steps, follow-ups, and referrals" },
                { n: "386+", label: "Screens designed", detail: "Addressing approximately 90% of the problems identified during research" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: P.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 900, color: P.accent }}>{item.n}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: P.ink, marginBottom: 3 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: P.muted, lineHeight: 1.55 }}>{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Personas ───────────────────────────────────────────────────────── */}
      <section style={{ background: P.s2, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={resInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              {
                name: "Yatish", role: "Young citizen", age: "33 yrs, Cochin", job: "IT Professional",
                relevance: "90%", emoji: "🧑‍💻",
                quote: '"Need a family doctor for regular consultations for myself and family."',
                goals: ["Lead a healthy life with consistent medical support for self and family."],
                pains: ["No personal connects with any doctor", "Longer wait time at consultations", "Need to carry papers from different consultations"],
                traits: ["Extrovert", "Well versed with mobile apps"],
                color: "#3D9B8F",
              },
              {
                name: "Sengupta", role: "Senior citizen", age: "68 yrs, Thiruvallam", job: "Retd. Bank Clerk",
                relevance: "80%", emoji: "👴",
                quote: '"Need regular consultations for my diabetes and knee joint pain."',
                goals: ["Easy connect with health professional consistently and on need basis."],
                pains: ["Difficulty in travel outside", "Forgets or misplaces previous health records", "Wait long to get appointment with the same doctor"],
                traits: ["Vulnerable", "Novice user of smartphone"],
                color: "#1B3A5C",
              },
              {
                name: "Faizal", role: "Family Doctor", age: "42 yrs, Calicut", job: "MD, General Practitioner",
                relevance: "85%", emoji: "👨‍⚕️",
                quote: '"Healthcare in India needs a paradigm shift in terms of digital infrastructure."',
                goals: ["Serve more people and build a bigger network of healthcare professionals."],
                pains: ["Unable to connect to a larger pool of people who need services", "Unable to manage appointments optimally"],
                traits: ["Objective", "Tech savvy and gadget lover"],
                color: "#5B7DB8",
              },
            ].map((persona) => (
              <motion.div key={persona.name} variants={scaleIn} style={{ background: P.white, borderRadius: 16, padding: 24, border: `1px solid ${P.border}` }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: persona.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: `2px solid ${persona.color}25` }}>
                      {persona.emoji}
                    </div>
                    <div>
                      <p style={{ fontSize: 17, fontWeight: 800, color: "#1B3A5C", letterSpacing: "-0.02em" }}>{persona.name}</p>
                      <p style={{ fontSize: 11, color: P.muted }}>{persona.role}</p>
                      <p style={{ fontSize: 11, color: P.subtle }}>{persona.age}</p>
                      <p style={{ fontSize: 11, color: P.subtle }}>{persona.job}</p>
                    </div>
                  </div>
                  <div style={{ background: "#3D9B8F", borderRadius: 8, padding: "4px 8px", textAlign: "center" }}>
                    <p style={{ fontSize: 14, fontWeight: 900, color: "#fff" }}>{persona.relevance}</p>
                    <p style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>Relevance</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, fontStyle: "italic", color: "#1B3A5C", lineHeight: 1.6, marginBottom: 14, borderLeft: `3px solid ${persona.color}`, paddingLeft: 10 }}>{persona.quote}</p>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#1B3A5C", marginBottom: 6 }}>Goals</p>
                  {persona.goals.map((g, i) => <p key={i} style={{ fontSize: 11, color: P.muted, lineHeight: 1.5, paddingLeft: 12, position: "relative" }}>· {g}</p>)}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#1B3A5C", marginBottom: 6 }}>Pain points</p>
                  {persona.pains.map((pain, i) => <p key={i} style={{ fontSize: 11, color: P.muted, lineHeight: 1.5, paddingLeft: 12 }}>· {pain}</p>)}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#1B3A5C", marginBottom: 6 }}>Personality</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {persona.traits.map((t) => (
                      <span key={t} style={{ fontSize: 10, fontWeight: 600, color: persona.color, background: persona.color + "15", borderRadius: 100, padding: "3px 8px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INSIGHTS — Turning points
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={insRef} style={{ background: P.dark, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={insInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel light>What changed our thinking</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.white, lineHeight: 1.15 }}>
              Four moments that redirected the design.
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              {
                n: "01",
                headline: "Patients wanted reassurance more than information.",
                body: "Every participant could access test results online. Almost none felt confident interpreting them. The gap wasn't data — it was context, tone, and a sense that someone was watching over them.",
                icon: <Heart size={18} />,
                color: P.accent,
              },
              {
                n: "02",
                headline: "Families were invisible in most healthcare experiences.",
                body: "The daughter coordinating her mother's appointments was doing the work of a care coordinator — but had no official role in any system. She worked around every tool, not with them.",
                icon: <Users size={18} />,
                color: P.green,
              },
              {
                n: "03",
                headline: "People remembered emotional moments, not medical details.",
                body: "Participants recalled exactly how they felt when a doctor rushed them, when a result was buried behind a portal login, when a reminder came too late. Emotional memory outlasts clinical memory.",
                icon: <Activity size={18} />,
                color: P.amber,
              },
              {
                n: "04",
                headline: "The gap between appointments was the most neglected space.",
                body: "Providers focused on the visit. Patients felt most lost between visits. The follow-up care, the action items, the sense that the care was continuing — that was where trust was actually built or broken.",
                icon: <Shield size={18} />,
                color: "#A78BFA",
              },
            ].map((insight, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" animate={insInView ? "visible" : "hidden"}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveInsight(i)}
                style={{
                  background: activeInsight === i ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${activeInsight === i ? insight.color + "50" : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 16, padding: 28, cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: insight.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: insight.color, flexShrink: 0 }}>
                    {insight.icon}
                  </div>
                  <span style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.1)", letterSpacing: "-0.05em", lineHeight: 1 }}>{insight.n}</span>
                </div>
                <h3 style={{ fontSize: 16, color: P.white, marginBottom: 10, lineHeight: 1.35, }}>{insight.headline}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>{insight.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROBLEM STATEMENT
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={probRef} style={{ background: P.white, padding: "120px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <motion.div variants={stagger} initial="hidden" animate={probInView ? "visible" : "hidden"}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: P.accent, marginBottom: 40 }}>
              Problem Statement
            </motion.p>
            <motion.blockquote variants={fadeUp} style={{
              fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800, letterSpacing: "-0.035em",
              lineHeight: 1.28, color: P.ink, margin: 0, marginBottom: 48,
            }}>
              "How might we design a healthcare experience where patients feel continuously held — not just during appointments, but through every moment of managing their health?"
            </motion.blockquote>

            {/* Constraints */}
            <motion.div variants={stagger} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["Continuous care, not episodic", "Families as first-class users", "Trust before feature depth", "Calm information hierarchy"].map((tag) => (
                <motion.span key={tag} variants={fadeUp} style={{
                  fontSize: 12, fontWeight: 600, color: P.muted,
                  background: P.s2, borderRadius: 100, padding: "7px 16px",
                  border: `1px solid ${P.border}`,
                }}>{tag}</motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INFORMATION ARCHITECTURE — Making sense of complexity
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={iaRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={iaInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Making Sense of Complexity</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 12 }}>
              Three ecosystems. One coherent experience.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.7, color: P.muted, maxWidth: 560 }}>
              The first structural challenge was that patients, doctors, and caregivers needed radically different views of the same underlying information. The IA had to unify them without flattening them.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={iaInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              { role: "Patient",   color: "#3D9B8F", nodes: ["Dashboard · Health Summary", "Appointments · Book & Manage", "Medical Records · Full History", "Medications · Schedule & Refills", "Family Circle · Manage Access", "Follow-Up · Action Items"] },
              { role: "Caregiver", color: "#3D9B8F", nodes: ["Family Overview · All Members", "Shared Calendar · Appointments", "Medication Reminders · Alerts", "Care Notes · Provider Updates", "Emergency Contacts", "Delegate Access · Permissions"] },
              { role: "Provider",  color: "#3D9B8F", nodes: ["Today's Schedule · Appointments", "Patient Queue · Status", "Clinical Notes · Create & Share", "Lab Results · Review & Flag", "Prescriptions · Renew & Issue", "Referral Management"] },
            ].map((col) => (
              <motion.div key={col.role} variants={fadeUp}>
                <div style={{ background: col.color, borderRadius: "12px 12px 0 0", padding: "14px 18px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{col.role}</span>
                </div>
                <div style={{ border: `1px solid ${P.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden", background: P.white }}>
                  {col.nodes.map((node, i) => (
                    <div key={node} style={{ padding: "10px 18px", borderBottom: i < col.nodes.length - 1 ? `1px solid ${P.s2}` : "none", display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: col.color + "60", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: P.ink }}>{node}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Network diagram ─────────────────────────────────────────────────── */}
      <section style={{ background: P.s2, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ background: P.white, borderRadius: 20, padding: "48px 32px", border: `1px solid ${P.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
              {/* Family tree (left) */}
              <div style={{ flex: 1, position: "relative", height: 280 }}>
                {/* Lines */}
                <svg width="100%" height="280" style={{ position: "absolute", inset: 0 }}>
                  <line x1="50%" y1="140" x2="20%" y2="70" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="50%" y1="140" x2="80%" y2="70" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="50%" y1="140" x2="15%" y2="140" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="50%" y1="140" x2="40%" y2="220" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="50%" y1="140" x2="75%" y2="220" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="20%" y1="70" x2="8%" y2="35" stroke="#C5D8E8" strokeWidth="1.5" />
                  <line x1="15%" y1="140" x2="5%" y2="220" stroke="#C5D8E8" strokeWidth="1.5" />
                </svg>
                {/* Nodes */}
                {[
                  { emoji: "👴", x: "50%", y: 120, size: 52 }, // center
                  { emoji: "👩‍🦳", x: "20%", y: 50, size: 40 },
                  { emoji: "👩‍🦳", x: "80%", y: 50, size: 40 },
                  { emoji: "👦", x: "15%", y: 120, size: 40 },
                  { emoji: "👱", x: "40%", y: 200, size: 40 },
                  { emoji: "👨", x: "75%", y: 200, size: 40 },
                  { emoji: "👧", x: "8%", y: 15, size: 36 },
                  { emoji: "🧕", x: "5%", y: 200, size: 36 },
                ].map((node, i) => (
                  <div key={i} style={{
                    position: "absolute", left: node.x, top: node.y,
                    transform: "translateX(-50%)",
                    width: node.size, height: node.size, borderRadius: "50%",
                    background: "#EEF5FB", border: "2px solid #C5D8E8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: node.size * 0.4,
                  }}>{node.emoji}</div>
                ))}
              </div>

              {/* Teal connector line */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3D9B8F", border: "2px solid #3D9B8F" }} />
                <div style={{ width: 80, height: 2, background: "#3D9B8F" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3D9B8F", border: "2px solid #3D9B8F" }} />
              </div>

              {/* Doctor network (right) */}
              <div style={{ flex: 1, position: "relative", height: 280 }}>
                <svg width="100%" height="280" style={{ position: "absolute", inset: 0 }}>
                  <line x1="40%" y1="140" x2="75%" y2="70" stroke="#1B3A5C" strokeWidth="1.5" />
                  <line x1="40%" y1="140" x2="90%" y2="140" stroke="#1B3A5C" strokeWidth="1.5" />
                  <line x1="40%" y1="140" x2="75%" y2="220" stroke="#1B3A5C" strokeWidth="1.5" />
                  <line x1="40%" y1="140" x2="20%" y2="50" stroke="#1B3A5C" strokeWidth="1.5" />
                </svg>
                {[
                  { emoji: "👩‍⚕️", x: "40%", y: 120, size: 52 },
                  { emoji: "👨‍⚕️", x: "75%", y: 50, size: 40 },
                  { emoji: "🧑‍⚕️", x: "90%", y: 120, size: 40 },
                  { emoji: "👩‍⚕️", x: "75%", y: 200, size: 40 },
                  { emoji: "👨‍⚕️", x: "20%", y: 30, size: 40 },
                ].map((node, i) => (
                  <div key={i} style={{
                    position: "absolute", left: node.x, top: node.y,
                    transform: "translateX(-50%)",
                    width: node.size, height: node.size, borderRadius: "50%",
                    background: "#EEF0F8", border: "2px solid #1B3A5C",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: node.size * 0.4,
                  }}>{node.emoji}</div>
                ))}
              </div>
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: P.subtle, marginTop: 16 }}>
              Patient's family network ↔ Doctor's care network — connected through CogniCure
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DESIGN EXPLORATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={expRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={expInView ? "visible" : "hidden"} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>Early Thinking</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink, marginBottom: 12 }}>
              What didn't survive — and why that mattered.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 15, lineHeight: 1.7, color: P.muted, maxWidth: 560 }}>
              The strongest ideas weren't the first ones. Most of the early exploration was about eliminating directions that felt obvious — because obvious, in healthcare, often means cold.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={expInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
            {[
              {
                label: "Clinical dashboard",
                outcome: "Discarded",
                reason: "Modeled after hospital EMR systems. Felt like being managed, not cared for. Prioritised completeness over comprehension.",
                color: "#DC3545",
                icon: "✗",
              },
              {
                label: "Notification-first design",
                outcome: "Discarded",
                reason: "Generated too much anxiety. Patients described a prototype heavy on reminders as 'feeling like an alarm'. Healthcare needs calm, not urgency.",
                color: "#DC3545",
                icon: "✗",
              },
              {
                label: "Calm summary view",
                outcome: "Evolved into final",
                reason: "A single coherent daily view — what matters today, what's next, what's been done. Created a sense of being looked after rather than managed.",
                color: "#3D9B8F",
                icon: "✓",
              },
            ].map((concept, i) => (
              <motion.div key={i} variants={scaleIn} style={{
                background: concept.outcome === "Discarded" ? P.s2 : P.accentLight,
                border: `1px solid ${concept.outcome === "Discarded" ? P.border : P.accent + "30"}`,
                borderRadius: 16, padding: 28, position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: 20, right: 20,
                  width: 28, height: 28, borderRadius: "50%",
                  background: concept.outcome === "Discarded" ? "#DC354520" : P.greenLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700,
                  color: concept.outcome === "Discarded" ? "#DC3545" : P.green,
                }}>{concept.icon}</div>
                <div style={{ height: 80, background: P.white, borderRadius: 10, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${P.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: P.subtle }}>{concept.label}</span>
                </div>
                <div style={{ display: "inline-flex", borderRadius: 100, padding: "3px 10px", marginBottom: 12, background: concept.outcome === "Discarded" ? "#DC354515" : P.greenLight }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: concept.outcome === "Discarded" ? "#DC3545" : P.green }}>{concept.outcome}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: P.muted }}>{concept.reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── Onboarding flow — horizontal editorial steps ────────────────────── */}
      <section style={{ background: P.white, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: P.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 28 }}>Onboarding flow</p>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, overflowX: "auto" }}>
            {[
              { n: "01", icon: "📱", label: "Splash + 4 onboarding slides", sub: "Value proposition, first impression" },
              { n: "02", icon: "🔐", label: "Sign up via mobile number", sub: "OTP verification — no passwords" },
              { n: "03", icon: "👤", label: "Welcome + questionnaire", sub: "9 key health inputs, personalisation" },
              { n: "04", icon: "🎁", label: "Rewards message", sub: "Immediate positive reinforcement" },
              { n: "05", icon: "⊞", label: "Dashboard — 0", sub: "Personalised home, ready to use" },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ display: "flex", alignItems: "flex-start", flex: 1, minWidth: 160 }}>
                <div style={{ flex: 1 }}>
                  {/* Step card */}
                  <div style={{ background: P.s2, borderRadius: 14, padding: "20px 18px", border: `1px solid ${P.border}`, marginRight: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: P.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>
                      {step.icon}
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: P.accent, marginBottom: 4, letterSpacing: "0.06em" }}>{step.n}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: P.ink, lineHeight: 1.4, marginBottom: 4 }}>{step.label}</p>
                    <p style={{ fontSize: 11, color: P.muted, lineHeight: 1.5 }}>{step.sub}</p>
                  </div>
                </div>
                {/* Connector arrow */}
                {i < arr.length - 1 && (
                  <div style={{ display: "flex", alignItems: "center", paddingTop: 30, flexShrink: 0, width: 32 }}>
                    <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${P.s3}, ${P.border})` }} />
                    <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `5px solid ${P.s3}` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Branch note */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: P.subtle }} />
            <p style={{ fontSize: 11, color: P.subtle }}>If immediate consultation needed at step 3 → alternate urgent care flow is triggered instead</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          KEY DECISIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={decRef} style={{ background: P.s2, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={decInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>The Turning Points</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>
              The decisions that shaped trust.
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={decInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: 64 }}
          >
            {[
              {
                n: "01",
                decision: "Making the family caregiver a first-class user",
                challenge: "Most platforms treated caregivers as external — adding someone as an 'emergency contact' rather than a participant in care.",
                alternatives: "Role-based permissions only. A read-only 'care portal'. Treating caregivers identically to patients.",
                tradeoff: "Adding a third user type increased IA complexity significantly. It required designing separate entry points and permission models.",
                reasoning: "The research was clear: the person who remembers appointments, who coordinates between providers, who drives to the pharmacy — that person deserved to be designed for explicitly. Not as an afterthought.",
                screen: 4,
              },
              {
                n: "02",
                decision: "Post-visit summaries as a designed experience",
                challenge: "Most follow-up care was communicated through an auto-generated PDF or a brief note that arrived with no structure or human warmth.",
                alternatives: "Standard discharge summary format. Email-only notifications. App push notifications alone.",
                tradeoff: "Required provider workflow changes — doctors needed to generate structured summaries rather than free-form notes.",
                reasoning: "The gap between appointments was where anxiety lived. A structured, warm, action-oriented follow-up view turned passive patients into confident participants in their own care.",
                screen: 5,
              },
              {
                n: "03",
                decision: "Calm information hierarchy over clinical completeness",
                challenge: "Healthcare data is extensive. Showing all of it creates a dashboard that feels like a medical chart — complete, but exhausting.",
                alternatives: "Full data display. Tabbed category views. A search-first approach.",
                tradeoff: "Some clinical information was intentionally not surfaced on the dashboard. Providers initially resisted reducing what patients could see.",
                reasoning: "Patients didn't need all their information immediately. They needed the right information at the right moment, presented in a way that reduced rather than increased cognitive load.",
                screen: 0,
              },
            ].map((item, i) => (
              <motion.div key={item.n} variants={fadeUp} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.35fr" : "1.35fr 1fr",
                gap: 56, alignItems: "start",
              }}>
                {i % 2 === 0 ? (
                  <>
                    <div>
                      <span style={{ fontSize: 48, fontWeight: 900, color: P.s3, letterSpacing: "-0.05em", display: "block", marginBottom: 12, lineHeight: 1 }}>{item.n}</span>
                      <h3 style={{ fontSize: 21, color: P.ink, marginBottom: 20, lineHeight: 1.3 }}>{item.decision}</h3>
                      {[
                        { label: "Challenge",    text: item.challenge },
                        { label: "Alternatives", text: item.alternatives },
                        { label: "Trade-off",    text: item.tradeoff },
                        { label: "Reasoning",    text: item.reasoning },
                      ].map((row) => (
                        <div key={row.label} style={{ marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: P.accent, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>{row.label}</span>
                          <p style={{ fontSize: 14, lineHeight: 1.65, color: P.muted }}>{row.text}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 220 }}>
                        <MobileFrame>
                          <div style={{ height: 476, overflow: "hidden" }}>
                            <div style={{ transform: "scale(0.565)", transformOrigin: "top left", width: "177%", pointerEvents: "none" }}>
                              <ScreenRenderer stepId={item.screen} />
                            </div>
                          </div>
                        </MobileFrame>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 220 }}>
                        <MobileFrame>
                          <div style={{ height: 476, overflow: "hidden" }}>
                            <div style={{ transform: "scale(0.565)", transformOrigin: "top left", width: "177%", pointerEvents: "none" }}>
                              <ScreenRenderer stepId={item.screen} />
                            </div>
                          </div>
                        </MobileFrame>
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: 48, fontWeight: 900, color: P.s3, letterSpacing: "-0.05em", display: "block", marginBottom: 12, lineHeight: 1 }}>{item.n}</span>
                      <h3 style={{ fontSize: 21, color: P.ink, marginBottom: 20, lineHeight: 1.3 }}>{item.decision}</h3>
                      {[
                        { label: "Challenge",    text: item.challenge },
                        { label: "Alternatives", text: item.alternatives },
                        { label: "Trade-off",    text: item.tradeoff },
                        { label: "Reasoning",    text: item.reasoning },
                      ].map((row) => (
                        <div key={row.label} style={{ marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: P.accent, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>{row.label}</span>
                          <p style={{ fontSize: 14, lineHeight: 1.65, color: P.muted }}>{row.text}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── User needs bubble diagram ──────────────────────────────────────── */}
      <section style={{ background: P.s2, padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ background: P.white, borderRadius: 20, padding: "48px 32px", border: `1px solid ${P.border}` }}>
            <div style={{ position: "relative", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Concentric circles */}
              {[220, 150, 80].map((r, i) => (
                <div key={r} style={{
                  position: "absolute", width: r * 2, height: r * 2, borderRadius: "50%",
                  border: `1px solid ${i === 2 ? "#3D9B8F40" : "#C5D8E8"}`,
                }} />
              ))}
              {/* Center person */}
              <div style={{ position: "absolute", width: 64, height: 64, borderRadius: "50%", background: "#E8F0F8", border: "2px solid #C5D8E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, zIndex: 2 }}>👴</div>
              {/* Small icons on rings */}
              {[
                { emoji: "🫁", angle: -45, ring: 155 },
                { emoji: "💊", angle: 20, ring: 155 },
                { emoji: "🌿", angle: 160, ring: 155 },
                { emoji: "🧘", angle: 270, ring: 155 },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    left: `calc(50% + ${Math.cos(rad) * item.ring}px)`,
                    top: `calc(50% + ${Math.sin(rad) * item.ring}px)`,
                    transform: "translate(-50%, -50%)",
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#EEF5FB", border: "1.5px solid #C5D8E8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14,
                  }}>{item.emoji}</div>
                );
              })}
              {/* User avatars */}
              {[
                { emoji: "👱", angle: 15, ring: 220 },
                { emoji: "👨‍🦱", angle: 200, ring: 220 },
              ].map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    left: `calc(50% + ${Math.cos(rad) * item.ring}px)`,
                    top: `calc(50% + ${Math.sin(rad) * item.ring}px)`,
                    transform: "translate(-50%, -50%)",
                    width: 48, height: 48, borderRadius: "50%",
                    background: "#EEF0F8", border: "2px solid #C5D8E8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                  }}>{item.emoji}</div>
                );
              })}
              {/* Speech bubbles */}
              {[
                { text: "Need a family doctor who can be always available 🕐", angle: -30, ring: 220, align: "right" },
                { text: "Need consultation for my diabetes & cardiac problems!", angle: 165, ring: 210, align: "left" },
                { text: "Manage and organise all my health data across apps. 📁", angle: 145, ring: 220, align: "left" },
              ].map((bubble, i) => {
                const rad = (bubble.angle * Math.PI) / 180;
                const bx = Math.cos(rad) * bubble.ring;
                const by = Math.sin(rad) * bubble.ring;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    left: `calc(50% + ${bx + (bubble.align === "left" ? -120 : 20)}px)`,
                    top: `calc(50% + ${by - 40}px)`,
                    background: "#1B3A5C", borderRadius: 12, padding: "10px 14px",
                    maxWidth: 180,
                  }}>
                    <p style={{ fontSize: 11, color: "#fff", lineHeight: 1.5, fontWeight: 500 }}>{bubble.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THREE USE CASES — interactive demos
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: P.dark, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ textAlign: "center", marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel light>Three perspectives, one platform</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.white, lineHeight: 1.15 }}>
              Every user. One coherent experience.
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, alignItems: "start" }}>
            {[
              {
                label: "Patient",
                desc: "Dashboard → Consultations → Records → Follow-up",
                color: "#3D9B8F",
                Demo: PatientDemo,
              },
              {
                label: "Caregiver",
                desc: "My Circles → Family → Health Wallet",
                color: "#3D9B8F",
                Demo: CaregiverDemo,
              },
              {
                label: "Doctor",
                desc: "Schedule → Consultation → Patient records",
                color: "#1B3A5C",
                Demo: DoctorDemo,
              },
            ].map(({ label, desc, color, Demo }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                {/* Label */}
                <div>
                  <div style={{ display: "inline-flex", background: color + "22", borderRadius: 100, padding: "5px 14px", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{desc}</p>
                </div>

                {/* Phone */}
                <div style={{ position: "relative", width: 220 }}>
                  <div style={{
                    borderRadius: 22,
                    overflow: "hidden",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
                    background: "#060606",
                    position: "relative",
                  }}>
                    {/* Dynamic island */}
                    <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 64, height: 20, background: "#000", borderRadius: 100, zIndex: 20 }} />
                    {/* Side buttons */}
                    <div style={{ position: "absolute", left: -3, top: 80, width: 3, height: 22, background: "rgba(255,255,255,0.15)", borderRadius: "2px 0 0 2px" }} />
                    <div style={{ position: "absolute", left: -3, top: 110, width: 3, height: 38, background: "rgba(255,255,255,0.15)", borderRadius: "2px 0 0 2px" }} />
                    <div style={{ position: "absolute", right: -3, top: 96, width: 3, height: 46, background: "rgba(255,255,255,0.15)", borderRadius: "0 2px 2px 0" }} />

                    {/* Screen */}
                    <div style={{ width: 214, overflow: "hidden", borderRadius: 20, background: "#F5F5F0", position: "relative" }}>
                      {/* Status bar mask */}
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 24, background: "#F5F5F0", zIndex: 30, pointerEvents: "none" }} />
                      <div style={{ width: 390, zoom: 0.549, pointerEvents: "none" }}>
                        <Demo />
                      </div>
                    </div>

                    {/* Persistent status bar on chassis */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, background: "#F5F5F0", zIndex: 25, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", borderRadius: "26px 26px 0 0" }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#1B3A5C" }}>9:41</span>
                      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
                          {[1,2,3].map(i => <div key={i} style={{ width: 1.5, height: 2 + i * 1.5, background: "#1B3A5C", borderRadius: 1 }} />)}
                        </div>
                        <div style={{ width: 9, height: 5, border: "1px solid #1B3A5C", borderRadius: 1.5, position: "relative", marginLeft: 2 }}>
                          <div style={{ position: "absolute", left: 1, top: 0.5, bottom: 0.5, width: "65%", background: color, borderRadius: 1 }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom crop */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                    background: `linear-gradient(to bottom, transparent 0%, rgba(8,15,20,0.4) 35%, rgba(8,15,20,0.9) 70%, #080F14 100%)`,
                    borderRadius: "0 0 22px 22px", pointerEvents: "none",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VALIDATION — Building confidence
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={valRef} style={{ background: P.white, padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={valInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Building Confidence</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 36, color: P.ink }}>Building confidence, not just confidence-testing.</motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={valInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 40 }}
          >
            {[
              {
                phase: "Round 1: Navigation testing",
                uncertain: "Could patients find what they needed without instruction?",
                finding: "The dashboard landing created genuine orientation. Participants started exploring naturally — a sign the hierarchy was working.",
                changed: "Increased visual weight of the appointment card after two participants missed it on first pass.",
              },
              {
                phase: "Round 2: Caregiver flow",
                uncertain: "Would family members understand their permission model?",
                finding: "The 'Family Circle' framing resonated deeply. One caregiver said: 'Finally, I'm actually in the system — not just copied on an email.'",
                changed: "Added explicit confirmation screens when caregivers were granted new access levels, reducing uncertainty about what sharing meant.",
              },
              {
                phase: "Round 3: Emotional tone",
                uncertain: "Did the product feel reassuring — not just usable?",
                finding: "Participants used the word 'calm' unprompted in three of five sessions. One said it felt 'like having a nurse who isn't rushed'.",
                changed: "Reduced notification density on the dashboard — confirmed our instinct that less urgency created more trust.",
              },
              {
                phase: "Round 4: Provider alignment",
                uncertain: "Would the doctor-side portal align with clinical workflow?",
                finding: "The schedule view reduced cognitive overhead. Providers appreciated that patient context was surfaced inline, not behind an extra click.",
                changed: "Adjusted appointment card density after providers asked for slightly more clinical detail in the list view.",
              },
            ].map((round, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: P.s2, border: `1px solid ${P.border}`, borderRadius: 16, padding: 28 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: P.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{round.phase}</p>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: P.subtle, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>What we weren't sure about</p>
                  <p style={{ fontSize: 13, color: P.ink, lineHeight: 1.6 }}>{round.uncertain}</p>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: P.subtle, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>What we found</p>
                  <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>{round.finding}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: P.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>What changed</p>
                  <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.6 }}>{round.changed}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          DESIGN LANGUAGE
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={tokRef} style={{ background: P.dark, padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 72 }}
          >
            <div>
              <motion.div variants={fadeUp}><SectionLabel light>A Language for Care</SectionLabel></motion.div>
              <motion.h2 variants={fadeUp} style={{ fontSize: 40, lineHeight: 1.1, color: P.white }}>
                Consistency<br />creates trust.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", alignSelf: "flex-end" }}>
              Every visual decision — color, spacing, type weight, interaction — was in service of one idea: that the product should feel like a person who is calm, organised, and quietly watching out for you.
            </motion.p>
          </motion.div>

          {/* Colour swatches — 4 across */}
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}
          >
            {[
              { name: "Deep Navy",  hex: "#1B3A5C", swatch: "#1B3A5C", border: false },
              { name: "Teal",       hex: "#3D9B8F", swatch: "#3D9B8F", border: false },
              { name: "Teal Light", hex: "#BFD8D5", swatch: "#BFD8D5", border: false },
              { name: "Warm White", hex: "#F5F5F0", swatch: "#F5F5F0", border: true  },
            ].map((item) => (
              <motion.div key={item.name} variants={fadeUp} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{ width: "100%", height: 80, borderRadius: 10, background: item.swatch, border: item.border ? "1px solid rgba(255,255,255,0.25)" : "none", flexShrink: 0 }} />
                <div>
                  <p style={{ color: P.white, fontSize: 13, fontWeight: 700 }}>{item.name}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 3, fontFamily: "monospace" }}>{item.hex}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Type scale + component samples — 2+4 */}
          <motion.div variants={stagger} initial="hidden" animate={tokInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {/* Type Display */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <span style={{ color: P.white, fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>Aa</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Display / 40px</p>
            </motion.div>
            {/* Type Body */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <span style={{ color: P.white, fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1 }}>Aa</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Body / 14px</p>
            </motion.div>
            {/* Primary CTA */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ background: P.accent, color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 100, padding: "9px 16px", whiteSpace: "nowrap" }}>Book Appointment</div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Primary CTA</p>
            </motion.div>
            {/* Ghost */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600, borderRadius: 100, padding: "9px 16px", border: "1.5px solid rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>View records</div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Ghost</p>
            </motion.div>
            {/* Status badges */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ background: "#E8F5F3", color: P.accent, fontSize: 10, fontWeight: 700, borderRadius: 100, padding: "4px 10px" }}>Normal</div>
                <div style={{ background: "#FEF3C7", color: P.amber, fontSize: 10, fontWeight: 700, borderRadius: 100, padding: "4px 10px" }}>Review</div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Status badges</p>
            </motion.div>
            {/* Progress */}
            <motion.div variants={fadeUp} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: 20, display: "flex", flexDirection: "column", gap: 10, minHeight: 140 }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Care Plan</span>
                  <span style={{ fontSize: 10, color: P.accent, fontWeight: 700 }}>3/5</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.10)", borderRadius: 100, overflow: "hidden", width: "100%" }}>
                  <div style={{ width: "60%", height: "100%", background: P.accent, borderRadius: 100 }} />
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>Progress</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE EXPERIENCE — Prototype Player (centered phone)
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={protoRef} style={{ background: P.surface, padding: "120px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={protoInView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: 56 }}>
            <motion.div variants={fadeUp}><SectionLabel>The Experience</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink, marginBottom: 12 }}>
              A day with CogniCure.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 16, lineHeight: 1.7, color: P.muted, maxWidth: 480, margin: "0 auto" }}>
              Follow a patient from morning to follow-up. Every screen from the production prototype.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={protoInView ? "visible" : "hidden"}>
            {/* Pill navigation */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {PROTO_STEPS.map((step) => (
                <button key={step.id} onClick={() => setActiveStep(step.id)} style={{
                  padding: "8px 18px", borderRadius: 100, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 600,
                  background: activeStep === step.id ? P.accent : P.s2,
                  color: activeStep === step.id ? P.white : P.muted,
                  transition: "all 0.18s ease",
                }}>{step.label}</button>
              ))}
            </div>

            {/* Centered phone + description */}
            <div style={{ display: "flex", gap: 64, alignItems: "flex-start", justifyContent: "center" }}>
              {/* Phone */}
              <div style={{ width: 280, flexShrink: 0 }}>
                <MobileFrame>
                  <div style={{ height: 605, overflow: "hidden", position: "relative" }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeStep}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
                        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
                      >
                        <div style={{ transform: "scale(0.718)", transformOrigin: "top left", width: "139%", pointerEvents: "none" }}>
                          <ScreenRenderer stepId={activeStep} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </MobileFrame>

                {/* Dots + auto-play */}
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20, alignItems: "center" }}>
                  {PROTO_STEPS.map((step) => (
                    <button key={step.id} onClick={() => setActiveStep(step.id)} style={{
                      width: activeStep === step.id ? 20 : 6, height: 6, borderRadius: 100,
                      background: activeStep === step.id ? P.accent : P.s3,
                      border: "none", cursor: "pointer", transition: "all 0.2s ease", padding: 0,
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                  <button onClick={() => setPlaying((p) => !p)} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 20px", background: playing ? P.ink : P.accent, color: P.white,
                    border: "none", borderRadius: 100, cursor: "pointer", fontSize: 12, fontWeight: 600,
                  }}>
                    {playing ? <><Pause size={11} /> Pause</> : <><Play size={11} /> Auto-play</>}
                  </button>
                </div>
              </div>

              {/* Step descriptions */}
              <div style={{ maxWidth: 340, paddingTop: 48 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: P.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: P.accent }}>{activeStep + 1}</span>
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: P.ink, letterSpacing: "-0.02em" }}>{PROTO_STEPS[activeStep].label}</p>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: P.muted, marginBottom: 24 }}>
                      {PROTO_STEPS[activeStep].description}
                    </p>
                    {/* Step list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {PROTO_STEPS.map((step, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: i === activeStep ? 1 : 0.35 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === activeStep ? P.accent : P.subtle, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, fontWeight: i === activeStep ? 600 : 400, color: i === activeStep ? P.ink : P.muted }}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          IMPACT
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={impactRef} style={{ background: P.white, padding: "120px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={impactInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>What Became Better</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink }}>What became better.</motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={impactInView ? "visible" : "hidden"}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 64 }}
          >
            {[
              { n: "01", headline: "Calm replaced anxiety",        body: "Participants described the experience using words like 'organised', 'held', and 'calm' — unprompted." },
              { n: "02", headline: "Families were included",       body: "The Family Circle model gave caregivers a designed role — removing the workaround burden entirely." },
              { n: "03", headline: "Care felt continuous",         body: "Follow-up summaries and action items made patients feel the care hadn't ended when the appointment did." },
              { n: "04", headline: "Complexity became manageable", body: "Three distinct user types — patient, caregiver, provider — unified under one coherent information model." },
            ].map((card) => (
              <motion.div key={card.n} variants={fadeUp} style={{ background: P.white, border: `1px solid ${P.border}`, borderRadius: 16, padding: 28 }}>
                <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: P.accent, background: P.accentLight, borderRadius: 100, padding: "4px 10px", marginBottom: 18 }}>{card.n}</span>
                <h3 style={{ fontSize: 17, color: P.ink, marginBottom: 10, }}>{card.headline}</h3>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.65 }}>{card.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={impactInView ? "visible" : "hidden"}
            style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", padding: "40px 0" }}
          >
            <div style={{ width: 32, height: 2, background: P.accent, margin: "0 auto 28px" }} />
            <p style={{ fontSize: 18, lineHeight: 1.8, color: P.muted, fontStyle: "italic" }}>
              "The most meaningful outcome wasn't a usability score. It was that participants stopped talking about the app — and started talking about how they felt. When someone says 'it felt like someone was actually paying attention', that's the design working."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          REFLECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={refRef} style={{ background: P.s2, padding: "120px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <motion.div variants={stagger} initial="hidden" animate={refInView ? "visible" : "hidden"} style={{ marginBottom: 64 }}>
            <motion.div variants={fadeUp}><SectionLabel>Reflection</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize: 40, color: P.ink }}>What I carried forward.</motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate={refInView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: 32 }}
          >
            {[
              { num: "01", text: "Healthcare is as much about reassurance as it is about functionality." },
              { num: "02", text: "Designing for the caregiver is designing for the patient — they are part of the same care system." },
              { num: "03", text: "The most important interaction sometimes happens in the quiet space between screens." },
              { num: "04", text: "Calm is a design decision. It requires removing as much as adding." },
            ].map((s) => (
              <motion.div key={s.num} variants={slideLeft} style={{
                display: "flex", alignItems: "baseline", gap: 28,
                paddingBottom: 32, borderBottom: `1px solid ${P.border}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: P.accent, letterSpacing: "0.1em", flexShrink: 0, userSelect: "none", lineHeight: 2.8 }}>{s.num}</span>
                <p style={{ fontSize: 20, fontWeight: 600, color: P.ink, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          NEXT PROJECT
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={nextRef} style={{ background: P.dark, padding: "100px 0 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <motion.p variants={fadeUp} initial="hidden" animate={nextInView ? "visible" : "hidden"}
            style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 40 }}
          >Next Case Study</motion.p>

          <Link href="/work/hexsolve" style={{ textDecoration: "none", display: "block" }}>
            <motion.div
              variants={fadeUp} initial="hidden" animate={nextInView ? "visible" : "hidden"}
              onMouseEnter={() => setNextHovered(true)}
              onMouseLeave={() => setNextHovered(false)}
              style={{
                background: "#1a1a22", borderRadius: 28,
                border: `1px solid ${nextHovered ? P.accent + "40" : "rgba(255,255,255,0.06)"}`,
                padding: "56px 64px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 64, alignItems: "center",
                cursor: "pointer", transition: "all 0.25s ease",
                transform: nextHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: nextHovered ? "0 40px 80px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A96E", marginBottom: 16 }}>Industrial Manufacturing · Enterprise</p>
                <h3 style={{ fontSize: 32, color: P.white, lineHeight: 1.2, marginBottom: 28 }}>
                  Engineering a single source of truth for precision assembly
                </h3>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#C8A96E", fontSize: 14, fontWeight: 600 }}>
                  View case study <ChevronRight size={14} />
                </div>
              </div>
              <div style={{ borderRadius: 16, height: 200, overflow: "hidden", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hexsolve/hexsolve-login.png" alt="HexSolve"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
              </div>
            </motion.div>
          </Link>

          <motion.div variants={fadeUp} initial="hidden" animate={nextInView ? "visible" : "hidden"}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              ← Back to all work
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)" }}>© 2025 Manisha. All rights reserved.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
