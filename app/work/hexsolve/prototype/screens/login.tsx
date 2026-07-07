"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { T } from "../tokens";
import { Input } from "../components";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

function GeometricIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md opacity-90"
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h-${i}`} x1={0} y1={i * 52} x2={480} y2={i * 52} stroke="rgba(204,41,41,0.07)" strokeWidth="1" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 48} y1={0} x2={i * 48} y2={420} stroke="rgba(204,41,41,0.07)" strokeWidth="1" />
      ))}
      <polygon points="240,60 320,108 320,204 240,252 160,204 160,108" stroke="rgba(204,41,41,0.35)" strokeWidth="1.5" fill="rgba(204,41,41,0.04)" />
      <polygon points="240,96 296,128 296,192 240,224 184,192 184,128" stroke="rgba(204,41,41,0.22)" strokeWidth="1" fill="rgba(204,41,41,0.06)" />
      <polygon points="240,128 268,144 268,176 240,192 212,176 212,144" stroke="rgba(204,41,41,0.45)" strokeWidth="1.5" fill="rgba(204,41,41,0.1)" />
      <polygon points="360,30 386,45 386,75 360,90 334,75 334,45" stroke="rgba(204,41,41,0.18)" strokeWidth="1" fill="rgba(204,41,41,0.03)" />
      <polygon points="100,300 126,315 126,345 100,360 74,345 74,315" stroke="rgba(204,41,41,0.18)" strokeWidth="1" fill="rgba(204,41,41,0.03)" />
      <polygon points="390,310 408,321 408,343 390,354 372,343 372,321" stroke="rgba(204,41,41,0.14)" strokeWidth="1" fill="rgba(204,41,41,0.03)" />
      <line x1="320" y1="108" x2="334" y2="75" stroke="rgba(204,41,41,0.15)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="160" y1="204" x2="126" y2="315" stroke="rgba(204,41,41,0.12)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="320" y1="204" x2="372" y2="321" stroke="rgba(204,41,41,0.12)" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 60 60 L 120 60 L 90 110 Z" stroke="rgba(204,41,41,0.14)" strokeWidth="1" fill="rgba(204,41,41,0.04)" />
      <path d="M 380 270 L 440 270 L 410 320 Z" stroke="rgba(204,41,41,0.14)" strokeWidth="1" fill="rgba(204,41,41,0.04)" />
      <circle cx="240" cy="156" r="3" fill="rgba(204,41,41,0.6)" />
      <circle cx="240" cy="60" r="2" fill="rgba(204,41,41,0.35)" />
      <circle cx="320" cy="108" r="2" fill="rgba(204,41,41,0.35)" />
      <circle cx="160" cy="108" r="2" fill="rgba(204,41,41,0.35)" />
      <circle cx="160" cy="204" r="2" fill="rgba(204,41,41,0.35)" />
      <circle cx="320" cy="204" r="2" fill="rgba(204,41,41,0.35)" />
      <circle cx="240" cy="252" r="2" fill="rgba(204,41,41,0.35)" />
      <line x1="240" y1="30" x2="240" y2="50" stroke="rgba(204,41,41,0.3)" strokeWidth="1" />
      <line x1="220" y1="40" x2="260" y2="40" stroke="rgba(204,41,41,0.3)" strokeWidth="1" />
      <path d="M 20 20 L 20 50 L 50 20" stroke="rgba(204,41,41,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M 460 400 L 460 370 L 430 400" stroke="rgba(204,41,41,0.2)" strokeWidth="1.5" fill="none" />
      <polyline points="80,180 140,260 200,320 300,340 380,380" stroke="rgba(204,41,41,0.1)" strokeWidth="1" fill="none" />
      {([[ 80,180],[140,260],[200,320],[300,340],[380,380]] as [number,number][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(204,41,41,0.18)" />
      ))}
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M 9 2 A 7 7 0 0 1 16 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const successVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export function LoginScreen({ onNavigate }: ScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = useCallback((v: string) => {
    setEmail(v);
    setEmailError("");
  }, []);

  const handlePasswordChange = useCallback((v: string) => {
    setPassword(v);
    setPasswordError("");
  }, []);

  const handleSubmit = useCallback(async () => {
    let hasError = false;
    if (!email.trim()) { setEmailError("Email is required"); hasError = true; }
    else if (!email.includes("@")) { setEmailError("Please enter a valid email address"); hasError = true; }
    if (!password) { setPasswordError("Password is required"); hasError = true; }
    else if (password.length < 4) { setPasswordError("Password must be at least 4 characters"); hasError = true; }
    if (hasError) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 600));
    onNavigate("dashboard");
  }, [email, password, onNavigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Enter") handleSubmit(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handleSubmit]);

  return (
    <div className="flex w-full" style={{ fontFamily: T.fontSans, height: "100vh", overflow: "hidden" }}>
      {/* Left branding panel */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col justify-between px-16 py-12 relative overflow-hidden"
        style={{ background: "#0F172A", minWidth: 0 }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 40% 50%, rgba(204,41,41,0.08) 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <span className="font-black text-2xl tracking-tight" style={{ color: "#FFFFFF", letterSpacing: "-0.03em" }}>
            <span style={{ color: T.red }}>HEX</span>SOLVE
          </span>
          <p className="text-xs font-medium mt-1" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Engineering Intelligence Platform
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-12">
          <GeometricIllustration />
          <div className="mt-10 text-center max-w-sm">
            <h2 className="text-3xl font-black tracking-tight leading-tight" style={{ color: "#FFFFFF", letterSpacing: "-0.03em" }}>
              Precision at Every<br /><span style={{ color: T.red }}>Assembly Step</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
              Manage engine manufacturing workflows, instruction documents, and quality assurance in one unified platform built for aerospace-grade precision.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
            {["Real-time assembly instruction tracking", "Multi-role approval workflows", "Integrated QA checkpoints"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(204,41,41,0.15)", border: "1px solid rgba(204,41,41,0.3)" }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke={T.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.48)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>Trusted by precision engineering teams worldwide</p>
        </div>
      </motion.div>

      {/* Right auth panel */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center px-12 py-12"
        style={{ width: "480px", flexShrink: 0, background: T.surface, boxShadow: "-20px 0 60px rgba(0,0,0,0.12)" }}
      >
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: T.red, letterSpacing: "0.12em" }}>Welcome back</p>
            <h1 className="text-2xl font-black tracking-tight" style={{ color: T.ink, letterSpacing: "-0.02em" }}>Sign in to HexSolve</h1>
            <p className="text-sm mt-1.5" style={{ color: T.ink50 }}>Enter your credentials to continue</p>
          </div>

          <div className="flex flex-col gap-5">
            <Input
              label="Email address"
              placeholder="name@aie.com"
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={emailError}
              autoFocus
              onEnter={handleSubmit}
            />

            <div className="flex flex-col gap-1.5">
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                error={passwordError}
                onEnter={handleSubmit}
              />
              <div className="flex justify-end mt-1">
                <button
                  className="text-xs font-semibold transition-colors"
                  style={{ color: T.red }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.redHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.red)}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <motion.div className="mt-1" whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleSubmit}
                disabled={loading || success}
                className="w-full flex items-center justify-center gap-2.5 font-bold text-sm rounded-xl transition-all"
                style={{
                  height: "48px",
                  background: success ? T.green : loading ? T.redHover : T.red,
                  color: "#fff",
                  border: "none",
                  cursor: loading || success ? "default" : "pointer",
                  fontFamily: T.fontSans,
                  letterSpacing: "-0.01em",
                  boxShadow: "0 4px 14px rgba(204,41,41,0.3)",
                  transition: "background 0.3s ease",
                }}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.span key="success" variants={successVariants} initial="hidden" animate="visible" className="flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3.5 9L7.5 13L14.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Signed in successfully
                    </motion.span>
                  ) : loading ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
                      <Spinner />
                      Signing in...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Sign In</motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            <p className="text-center text-xs" style={{ color: T.ink50 }}>
              Need help signing in?{" "}
              <button
                className="font-semibold transition-colors"
                style={{ color: T.red }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.redHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.red)}
              >
                Contact IT Support
              </button>
            </p>
          </div>

          <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${T.surface3}` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: T.green }} />
                <span className="text-xs" style={{ color: T.ink50 }}>Secure connection established</span>
              </div>
              <span className="text-xs" style={{ color: T.ink30 }}>v2.4.1</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 w-full flex justify-center">
          <p className="text-xs" style={{ color: T.ink30 }}>© 2025 AIE. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
