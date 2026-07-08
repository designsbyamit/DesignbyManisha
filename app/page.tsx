"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Download, Mail, ExternalLink } from "lucide-react";
import { PortfolioNav } from "@/components/PortfolioNav";
import { IPadMockup, BrowserMockupWithShine, PhoneRotatingMockup } from "@/components/ProjectMockups";

/* ─── Inline LinkedIn icon (lucide-react v1 naming inconsistency) ─────── */
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

/* ─── Palette (matches globals.css tokens) ───────────────────────────────── */
const P = {
  ink:         "var(--p-ink)",
  muted:       "var(--p-muted)",
  subtle:      "var(--p-subtle)",
  surface:     "var(--p-surface)",
  s2:          "var(--p-s2)",
  s3:          "var(--p-s3)",
  accent:      "var(--p-accent)",
  accentLight: "var(--p-accent-lt)",
  white:       "var(--p-white)",
} as const;

/* ─── Shared animation variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ─── Project data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    slug: "hexsolve",
    title: "HexSolve",
    headline: "Making precision manufacturing feel less like archaeology",
    industry: "Industrial · Manufacturing",
    role: "Lead UX Designer",
    duration: "6 months",
    tags: ["Enterprise", "Workflow", "B2B"],
    accent: "#c8a96e",
    accentLight: "#f0e6d3",
    // Using the hero image from the hexsolve case study
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85",
    description: "A platform to manage complex rotary engine assembly workflows across distributed manufacturing teams.",
  },
  {
    slug: "holmesworld-cs",
    title: "HomesWorld",
    headline: "Turning a construction material marketplace into a trusted buying experience",
    industry: "Construction · E-commerce",
    role: "Product Designer",
    duration: "4 months",
    tags: ["E-commerce", "Mobile", "B2C"],
    accent: "#C4613A",
    accentLight: "#F5E8E2",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
    description: "Redesigning product discovery and checkout for contractors buying construction materials online.",
  },
  {
    slug: "cognicure",
    title: "CogniCure",
    headline: "Designing healthcare continuity for patients navigating complex journeys",
    industry: "Healthcare · Mobile",
    role: "UX & Product Designer",
    duration: "5 months",
    tags: ["Health-tech", "Mobile", "B2C"],
    accent: "#1B3A5C",
    accentLight: "#E8EEF5",
    image: "https://lh3.googleusercontent.com/sitesv/AA5AbUDempZe5kKkJKE14nmF0GfX8bvcqYjFDnoTXmjXBpJfMFPZUKuFNwc7qIvwRkLdm-IXhKVFH90qZKr5PLnaJl-LNy-FogTqMhfrYeqltI_YKWJ7J1mpnrXQB688y4RaXr5XexLG9czQSrtOQKcLmSFAj95OOXNvA-tIxRN0K0kJWtFo2dZseLsFsHDpZQIQBj7amOdB0e8sV9xl1TiKLXEHAgIBtfTcx7TodA=w1280",
    description: "A unified patient health companion that brings appointments, records, and family care into one thoughtful app.",
  },
];

/* ─── Career timeline ────────────────────────────────────────────────────── */
const CAREER = [
  { year: "2018", role: "Branding & Digital Design", note: "Started here" },
  { year: "2020", role: "UX Designer", org: "Systems Valley", note: "" },
  { year: "2022", role: "Enterprise Product Design", note: "Complex workflows" },
  { year: "2024", role: "Career Break", note: "Personal growth" },
  { year: "2025", role: "Returning", note: "AI-driven design" },
];

/* ─── Design principles ──────────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    number: "01",
    title: "People before pixels",
    body: "Every interface begins with understanding real human needs. The visual language is always a consequence of that understanding.",
  },
  {
    number: "02",
    title: "Design for clarity",
    body: "Simplifying complexity without oversimplifying problems. The goal is to make hard things feel easy, not to hide their depth.",
  },
  {
    number: "03",
    title: "Systems thinking",
    body: "Designing experiences that work cohesively across entire journeys, not just individual screens.",
  },
  {
    number: "04",
    title: "Thoughtful craftsmanship",
    body: "Careful attention to interactions, accessibility, and visual details. The small things are often what make users feel cared for.",
  },
];

/* ─── Organic background blobs ──────────────────────────────────────────── */
function OrgBlob({
  style,
  color = P.accentLight,
}: {
  style?: React.CSSProperties;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
        background: color,
        opacity: 0.45,
        filter: "blur(56px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─── Section wrapper ────────────────────────────────────────────────────── */
function Section({
  children,
  style,
  className = "",
  id,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ─── Fade-in wrapper ────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(249,248,246,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${P.s3}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: 15, color: P.ink, letterSpacing: "-0.01em" }}>
        Manisha
      </span>
      <div style={{ display: "flex", gap: "clamp(1.5rem, 3vw, 2.5rem)", alignItems: "center" }}>
        {[{ label: "Work", href: "/work" }, { label: "About", href: "/about" }].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ fontSize: 14, color: P.muted, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = P.ink)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = P.muted)}
          >
            {label}
          </a>
        ))}
        <a href="https://drive.google.com/file/d/1sGE2ReJoqJKbga0SDpcge8vDMjbx59aZ/view?usp=sharing" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: P.ink, textDecoration: "none", padding: "6px 14px", borderRadius: 9999, border: `1.5px solid ${P.s3}`, transition: "border-color 0.2s" }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = P.accent} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = P.s3}>Resume ↓</a>
      </div>
    </motion.nav>
  );
}

/* ─── Hero section ───────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <Section
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        background: P.surface,
        paddingTop: 80,
      }}
    >
      <OrgBlob style={{ width: 560, height: 400, top: "5%", right: "-8%", opacity: 0.35 }} />
      <OrgBlob
        style={{ width: 320, height: 280, bottom: "10%", left: "-4%", opacity: 0.28 }}
        color="var(--p-blob-2)"
      />

      <motion.div
        ref={ref}
        className="grid-2col"
        style={{
          y,
          opacity,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
        }}
      >
        {/* Left — text */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: P.muted,
              fontWeight: 500,
              marginBottom: "1.5rem",
            }}
          >
            UX Designer · Product Designer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: P.ink,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            People first.
            <br />
            <span style={{ color: P.muted, fontWeight: 400, fontStyle: "italic" }}>Clarity always.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
              color: P.muted,
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: "2.5rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif", fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", color: P.accent, fontWeight: 400, letterSpacing: "0.01em" }}>Hi! My name is Manisha.</span>
            {" "}I design experiences that make the complex feel simple — without hiding the depth that makes them useful.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <a
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.75rem 1.75rem",
                borderRadius: 9999,
                background: "var(--p-accent)",
                color: "var(--p-surface)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              View Selected Work <ArrowRight size={15} />
            </a>
            <a
              href="#about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.75rem 1.75rem",
                borderRadius: 9999,
                background: "transparent",
                color: P.ink,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: `1.5px solid ${P.s3}`,
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = P.accent;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = P.s3;
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              About Me
            </a>
          </motion.div>

          {/* Handwritten accent */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: 0.6,
            }}
          >
            <svg width="32" height="2" viewBox="0 0 32 2" fill="none">
              <line x1="0" y1="1" x2="32" y2="1" stroke={P.accent} strokeWidth="1.5" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-handwritten), cursive",
                fontSize: 15,
                color: P.muted,
                letterSpacing: "0.01em",
              }}
            >
              3 projects · enterprise to consumer
            </span>
          </motion.div>
        </motion.div>

        {/* Right — portrait placeholder with organic frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
          style={{ position: "relative" }}
        >
          {/* Decorative ring */}
          <div
            style={{
              position: "absolute",
              inset: -16,
              borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%",
              border: `1.5px solid ${P.s3}`,
              zIndex: 0,
            }}
          />
          {/* Portrait frame */}
          <div
            className="hero-portrait"
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "56% 44% 52% 48% / 48% 58% 42% 52%",
              overflow: "hidden",
              aspectRatio: "4/5",
              background: "var(--p-portrait-bg)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
            }}
          >
            {/* Portrait — replace src with Manisha's actual photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portraits/manisha.png"
              alt="Manisha — UX Designer"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          </div>

          {/* Floating tag */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hero-status-badge"
            style={{
              position: "absolute",
              bottom: "10%",
              left: "-12%",
              zIndex: 2,
              background: "var(--p-card-bg)",
              borderRadius: 12,
              padding: "0.75rem 1.25rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 180,
            }}
          >
            <span style={{ fontSize: 22 }}>✦</span>
            <div>
              <p style={{ fontSize: 11, color: P.muted, margin: 0, lineHeight: 1 }}>Currently</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: P.ink, margin: 0 }}>
                Open to opportunities
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1.5, height: 36, background: P.s3, borderRadius: 2 }}
        />
        <span style={{ fontSize: 11, color: P.subtle, letterSpacing: "0.08em" }}>scroll</span>
      </motion.div>
    </Section>
  );
}

/* ─── Per-project mockup selector ───────────────────────────────────────── */
function ProjectMockupPane({ slug, title }: { slug: string; title: string }) {
  if (slug === "hexsolve") return <IPadMockup src="/hexsolve/hexsolve-login.png" alt={title} />;
  if (slug === "holmesworld-cs") return <BrowserMockupWithShine src="/homesworld/homesworld-hero.png" alt={title} />;
  if (slug === "cognicure") return <PhoneRotatingMockup alt={title} />;
  return null;
}

/* ─── Project card — image top, details below ───────────────────────────── */
function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.1 }}
    >
      <Link
        href={`/work/${project.slug}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--p-card-bg)",
            border: `1px solid ${P.s3}`,
            transition: "box-shadow 0.35s, transform 0.3s",
            boxShadow: hovered ? "0 28px 72px rgba(0,0,0,0.13)" : "0 4px 20px rgba(0,0,0,0.05)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {/* Mockup — full width, fixed aspect ratio, safe padding inside */}
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "21/9", background: "var(--p-s2)" }}>
            <ProjectMockupPane slug={project.slug} title={project.title} />
          </div>

          {/* Details below */}
          <div style={{ padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: P.muted, background: P.s2, borderRadius: 6, padding: "3px 10px" }}>{tag}</span>
              ))}
            </div>

            <p style={{ fontSize: 11, color: P.subtle, margin: "0 0 0.35rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>{project.title}</p>
            <h3 style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)", color: P.ink, lineHeight: 1.3, marginBottom: "0.6rem" }}>{project.headline}</h3>
            <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.65, marginBottom: "1.25rem" }}>{project.description}</p>

            {/* Meta row */}
            <div style={{ display: "flex", gap: "1.5rem", paddingTop: "1rem", borderTop: `1px solid ${P.s2}`, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {[{ label: "Industry", value: project.industry }, { label: "Role", value: project.role }, { label: "Duration", value: project.duration }].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontSize: 11, color: P.subtle, margin: 0, letterSpacing: "0.04em" }}>{label}</p>
                    <p style={{ fontSize: 13, color: P.ink, fontWeight: 500, margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>
              {/* Consistent accent CTA */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "var(--p-accent)", flexShrink: 0 }}>
                View Case Study
                <ArrowRight size={14} style={{ transition: "transform 0.2s", transform: hovered ? "translateX(4px)" : "translateX(0)" }} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Selected work section ──────────────────────────────────────────────── */
function SelectedWork() {
  return (
    <Section
      id="work"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: P.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: P.muted,
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                }}
              >
                Selected Work
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: P.ink,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Work that matters.
              </h2>
            </div>
          </div>
        </Reveal>

        {/* 3-column grid of image-top cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Design principles ──────────────────────────────────────────────────── */
function Principles() {
  return (
    <Section
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: P.s2,
      }}
    >
      <OrgBlob
        style={{ width: 500, height: 360, top: "-10%", right: "-5%", opacity: 0.3 }}
        color="var(--p-blob-1)"
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: P.muted,
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            How I Work
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: P.ink,
              lineHeight: 1.1,
              marginBottom: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            Design principles
            <br />
            <span style={{ color: P.muted, fontWeight: 400 }}>that guide every decision.</span>
          </h2>
        </Reveal>

        {/* Desktop: 4-col grid. Mobile: horizontal scroll strip */}
        <div className="principles-container">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.08} className="principle-card-wrap">
              <div
                style={{
                  background: "var(--p-card-bg)",
                  borderRadius: 16,
                  padding: "2rem",
                  border: `1px solid ${P.s3}`,
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-handwritten), cursive",
                    fontSize: 28,
                    color: P.accent,
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {p.number}
                </span>
                <h3
                  style={{
                    fontSize: 17,
                    color: P.ink,
                    marginBottom: "0.75rem",
                    }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: P.muted, lineHeight: 1.7, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Career timeline ────────────────────────────────────────────────────── */
function CareerTimeline() {
  return (
    <Section
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: P.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: P.muted,
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            Career
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: P.ink,
              lineHeight: 1.1,
              marginBottom: "clamp(3rem, 6vw, 5rem)",
            }}
          >
            Seven years of growth.
          </h2>
        </Reveal>

        {/* Horizontal timeline */}
        <div style={{ position: "relative" }}>
          {/* Line */}
          <Reveal>
            <div
              style={{
                height: 1,
                background: P.s3,
                width: "100%",
                marginBottom: 0,
                position: "relative",
              }}
            />
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${CAREER.length}, 1fr)`,
              gap: 0,
            }}
          >
            {CAREER.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1}>
                <div style={{ paddingTop: "1.75rem", paddingRight: "1rem" }}>
                  {/* Dot */}
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: i === CAREER.length - 1 ? P.accent : P.s3,
                      border: `2px solid ${i === CAREER.length - 1 ? P.accent : P.muted}`,
                      marginBottom: "1rem",
                      marginTop: "-36px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: P.accent,
                      margin: "0 0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.year}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: P.ink,
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.role}
                    {item.org ? (
                      <span style={{ fontWeight: 400, color: P.muted }}> · {item.org}</span>
                    ) : null}
                  </p>
                  {item.note && (
                    <p
                      style={{
                        fontFamily: "var(--font-handwritten), cursive",
                        fontSize: 13,
                        color: P.muted,
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── About preview ──────────────────────────────────────────────────────── */
function AboutPreview() {
  return (
    <Section
      id="about"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        background: P.s2,
      }}
    >
      <OrgBlob
        style={{ width: 420, height: 340, bottom: "-5%", left: "-4%", opacity: 0.28 }}
        color="var(--p-blob-2)"
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 5vw, 5rem)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: P.muted,
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            About
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              color: P.ink,
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            I'm Manisha.
            <br />A designer who cares.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
              color: P.muted,
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: "2rem",
            }}
          >
            I've spent the last seven years designing for complexity — enterprise manufacturing
            platforms, construction e-commerce, and healthcare apps. What drives me is the moment
            when something that felt overwhelming starts to feel navigable. That's the work I'm
            here to do.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: P.accent,
              textDecoration: "none",
              borderBottom: `1.5px solid ${P.accent}`,
              paddingBottom: 2,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Let's connect <ArrowRight size={14} />
          </a>
        </Reveal>

        {/* Skills & tools grid */}
        <Reveal delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {[
              { label: "Specialisation", items: ["UX Design", "Product Design", "Research", "Design Systems"] },
              { label: "Tools", items: ["Figma", "Framer", "Maze", "Notion"] },
              { label: "Industries", items: ["Manufacturing", "Healthcare", "E-commerce", "Enterprise SaaS"] },
              { label: "Experience", items: ["7 years", "3 products shipped", "Enterprise to consumer", "0→1 & scaling"] },
            ].map((group) => (
              <div
                key={group.label}
                style={{
                  background: "var(--p-card-bg)",
                  borderRadius: 14,
                  padding: "1.25rem 1.5rem",
                  border: `1px solid ${P.s3}`,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: P.subtle,
                    margin: "0 0 0.75rem",
                  }}
                >
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <p
                    key={item}
                    style={{ fontSize: 13, color: P.ink, margin: "0 0 4px", fontWeight: 500 }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ─── Contact + Footer ───────────────────────────────────────────────────── */
function Contact() {
  return (
    <Section
      id="contact"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
        background: "var(--p-dark-bg)",
        overflow: "hidden",
      }}
    >
      <OrgBlob
        style={{ width: 480, height: 360, top: "-15%", right: "-5%", opacity: 0.08 }}
        color="var(--p-accent)"
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              color: "var(--p-on-ink)",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
            }}
          >
            Let's build something
            <br />
            <span style={{ color: P.accent }}>worth using.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: "3rem",
            }}
          >
            I'm currently open to full-time roles and select freelance projects. If you're working
            on something meaningful, I'd love to hear about it.
          </p>

          <div className="contact-buttons" style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <a
              href="mailto:manisha@example.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                background: P.accent,
                color: P.ink,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.88";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Mail size={16} /> Email Me
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                background: "transparent",
                color: "var(--p-on-ink)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <LinkedInIcon size={16} /> LinkedIn <ExternalLink size={12} />
            </a>
            <a
              href="https://drive.google.com/file/d/1sGE2ReJoqJKbga0SDpcge8vDMjbx59aZ/view?usp=sharing" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "0.875rem 2rem",
                borderRadius: 9999,
                background: "transparent",
                color: "var(--p-on-ink)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </Reveal>

        {/* Footer row */}
        <div
          style={{
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-handwritten), cursive",
              fontSize: 16,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
            }}
          >
            Thanks for stopping by. I'd love to build meaningful products together.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>
            © 2025 Manisha
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <PortfolioNav />
      <main>
        <Hero />
        <SelectedWork />
        <Principles />
        <Contact />
      </main>
    </>
  );
}