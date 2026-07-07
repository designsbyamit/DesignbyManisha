"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { PortfolioNav } from "@/components/PortfolioNav";

const P = {
  ink: "var(--p-ink)", muted: "var(--p-muted)", subtle: "var(--p-subtle)",
  surface: "var(--p-surface)", s2: "var(--p-s2)", s3: "var(--p-s3)",
  accent: "var(--p-accent)", accentLight: "var(--p-accent-lt)", white: "var(--p-card-bg)",
} as const;

const fadeUp: Variants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} style={style} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay }}>{children}</motion.div>;
}

function OrgBlob({ style, color = P.accentLight }: { style?: React.CSSProperties; color?: string }) {
  return <div aria-hidden style={{ position: "absolute", borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%", background: color, opacity: 0.4, filter: "blur(56px)", pointerEvents: "none", ...style }} />;
}

const STORY = [
  { period: "Early days", text: "I started in Computer Science, which gave me an unusual advantage: I've always been comfortable with systems, logic, and the technical constraints designers rarely see. That background never left me — it shapes how I think about every product I work on." },
  { period: "Branding & Digital Marketing", text: "My first years were in branding and digital marketing, where I learned that design is only as good as its context. Every pixel exists for a reason — to communicate, to persuade, to build trust. I absorbed that lesson early." },
  { period: "Transition into UX", text: "The shift to UX was natural. I had always been more interested in how things worked than how they looked. I wanted to design the experience, not just the surface. The move felt like finding the right language for thoughts I had always had." },
  { period: "Systems Valley", text: "At Systems Valley, I got my first real exposure to enterprise product design at scale. Complex workflows, multiple stakeholders, technical constraints, and users who couldn't afford to make mistakes. I learned that good enterprise UX isn't about simplification — it's about precision." },
  { period: "Resume Work", text: "I'm returning with a focus on AI-assisted design and building thoughtful digital experiences that help people navigate complexity with confidence." },
];

const SKILLS = [
  "UX Design", "Interaction Design", "Visual Design",
  "Information Architecture", "User Research", "Design Systems",
  "Prototyping", "AI-assisted Design",
];

const PHILOSOPHY = [
  { number: "01", title: "People before pixels", body: "Every interface begins with understanding real human needs." },
  { number: "02", title: "Design for clarity", body: "Simplifying complexity without oversimplifying problems." },
  { number: "03", title: "Systems thinking", body: "Designing experiences that work cohesively across entire journeys." },
  { number: "04", title: "Craft with intention", body: "The small details are often what make users feel cared for." },
];

export default function AboutPage() {
  return (
    <div style={{ background: P.surface, minHeight: "100vh" }}>
      <PortfolioNav />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: 100, paddingBottom: "clamp(4rem, 8vw, 7rem)", padding: `100px clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)` }}>
        <OrgBlob style={{ width: 480, height: 360, top: "-5%", right: "-6%", opacity: 0.35 }} />
        <OrgBlob style={{ width: 300, height: 240, bottom: "5%", left: "-3%", opacity: 0.25 }} color="var(--p-blob-2)" />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: P.muted, fontWeight: 500, marginBottom: "1rem" }}>About Manisha</motion.p>
            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)", color: P.ink, lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Designer.<br />
              <span style={{ color: P.muted, fontWeight: 400, fontStyle: "italic" }}>Systems thinker.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)", color: P.muted, lineHeight: 1.75, maxWidth: 480, marginBottom: "2rem" }}>
              I design for the space between complexity and clarity — the moment when something overwhelming starts to feel navigable. That's the work I'm here to do.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="https://drive.google.com/file/d/1sGE2ReJoqJKbga0SDpcge8vDMjbx59aZ/view?usp=sharing" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "0.8rem 2rem", borderRadius: 9999, background: "var(--p-accent)", color: "var(--p-surface)", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.2s, transform 0.15s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <Download size={15} /> Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right — portrait */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} style={{ position: "relative" }}>
            <div style={{ borderRadius: "48% 52% 56% 44% / 44% 48% 52% 56%", overflow: "hidden", aspectRatio: "4/5", background: "var(--p-s3)", boxShadow: "0 24px 80px rgba(0,0,0,0.1)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/portraits/manisha-sq.jpg" alt="Manisha at work" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: P.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: P.muted, fontWeight: 500, marginBottom: "0.75rem" }}>The Journey</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: P.ink, lineHeight: 1.1, marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              How I got here.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STORY.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "clamp(2rem, 4vw, 4rem)", padding: "clamp(1.5rem, 3vw, 2.5rem) 0", borderBottom: i < STORY.length - 1 ? `1px solid ${P.s3}` : "none", alignItems: "start" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: P.accent, margin: 0, paddingTop: 3, letterSpacing: "0.01em" }}>{item.period}</p>
                  <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", color: P.muted, lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ─────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: P.s2, position: "relative", overflow: "hidden" }}>
        <OrgBlob style={{ width: 400, height: 320, bottom: "-8%", left: "-4%", opacity: 0.3 }} color="#dde8d4" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: P.muted, fontWeight: 500, marginBottom: "0.75rem" }}>Design Philosophy</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: P.ink, lineHeight: 1.1, marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              Principles I design by.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(1rem, 2vw, 1.75rem)", alignItems: "stretch" }}>
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.08} style={{ height: "100%" }}>
                <div style={{ background: "var(--p-card-bg)", borderRadius: 16, padding: "2rem", border: `1px solid ${P.s3}`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "var(--font-handwritten), var(--font-handwritten), cursive", fontSize: 30, color: P.accent, lineHeight: 1, marginBottom: "1rem" }}>{p.number}</span>
                  <h3 style={{ fontSize: 16, color: P.ink, marginBottom: "0.6rem", }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.7, margin: 0, flexGrow: 1 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)", background: P.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: P.muted, fontWeight: 500, marginBottom: "0.75rem" }}>Capabilities</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: P.ink, lineHeight: 1.1, marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              Skills &amp; tools.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
            {SKILLS.map((skill, i) => (
              <Reveal key={skill} delay={i * 0.05}>
                <div style={{ padding: "0.75rem 1.5rem", borderRadius: 9999, border: `1.5px solid ${P.s3}`, background: P.surface, fontSize: 14, fontWeight: 500, color: P.ink, whiteSpace: "nowrap" }}>
                  {skill}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)", background: "var(--p-dark-bg)", position: "relative", overflow: "hidden" }}>
        <OrgBlob style={{ width: 400, height: 300, top: "-10%", right: "-4%", opacity: 0.07 }} color="var(--p-accent)" />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", position: "relative", zIndex: 1 }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500, marginBottom: "0.75rem" }}>Ready to work together?</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--p-on-ink)", lineHeight: 1.1, margin: 0 }}>
              {"Let's create something"}<br />
              <span style={{ color: P.accent }}>people will love.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="https://drive.google.com/file/d/1sGE2ReJoqJKbga0SDpcge8vDMjbx59aZ/view?usp=sharing" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "0.875rem 2rem", borderRadius: 9999, background: P.accent, color: P.ink, fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "opacity 0.2s, transform 0.15s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <Download size={15} /> Download Resume
            </a>
            <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "0.875rem 2rem", borderRadius: 9999, background: "transparent", color: "var(--p-on-ink)", fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)", transition: "border-color 0.2s, transform 0.15s" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              View My Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ padding: "2rem clamp(1.5rem, 5vw, 4rem)", borderTop: `1px solid ${P.s3}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: P.surface }}>
        <Link href="/" style={{ fontSize: 14, color: P.muted, textDecoration: "none" }}>← Home</Link>
        <p style={{ fontSize: 13, color: P.subtle, margin: 0 }}>© 2025 Manisha</p>
      </footer>
    </div>
  );
}
