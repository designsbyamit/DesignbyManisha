"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PortfolioNav } from "@/components/PortfolioNav";
import { IPadMockup, BrowserMockupWithShine, PhoneRotatingMockup } from "@/components/ProjectMockups";

const P = {
  ink:         "var(--p-ink)",
  muted:       "var(--p-muted)",
  subtle:      "var(--p-subtle)",
  surface:     "var(--p-surface)",
  s2:          "var(--p-s2)",
  s3:          "var(--p-s3)",
  accent:      "var(--p-accent)",
  accentLight: "var(--p-accent-lt)",
  white:       "var(--p-card-bg)",
} as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Featured projects ──────────────────────────────────────────────────── */
const FEATURED = [
  {
    slug: "hexsolve",
    title: "HexSolve",
    headline: "Making precision manufacturing feel less like archaeology",
    description:
      "A platform to manage complex rotary engine assembly workflows across distributed manufacturing teams.",
    industry: "Industrial · Manufacturing",
    role: "Lead UX Designer",
    duration: "6 months",
    tags: ["Enterprise", "Workflow", "B2B"],
    accent: "#c8a96e",
    accentLight: "#f0e6d3",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85",
    available: true,
  },
  {
    slug: "holmesworld-cs",
    title: "HomesWorld",
    headline: "Turning a construction material marketplace into a trusted buying experience",
    description:
      "Redesigning product discovery and checkout for contractors buying construction materials online.",
    industry: "Construction · E-commerce",
    role: "Product Designer",
    duration: "4 months",
    tags: ["E-commerce", "Mobile", "B2C"],
    accent: "#C4613A",
    accentLight: "#F5E8E2",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85",
    available: true,
  },
  {
    slug: "cognicure",
    title: "CogniCure",
    headline: "Designing healthcare continuity for patients navigating complex journeys",
    description:
      "A unified patient health companion that brings appointments, records, and family care into one thoughtful app.",
    industry: "Healthcare · Mobile",
    role: "UX & Product Designer",
    duration: "5 months",
    tags: ["Health-tech", "Mobile", "B2C"],
    accent: "#1B3A5C",
    accentLight: "#E8EEF5",
    image:
      "https://lh3.googleusercontent.com/sitesv/AA5AbUDempZe5kKkJKE14nmF0GfX8bvcqYjFDnoTXmjXBpJfMFPZUKuFNwc7qIvwRkLdm-IXhKVFH90qZKr5PLnaJl-LNy-FogTqMhfrYeqltI_YKWJ7J1mpnrXQB688y4RaXr5XexLG9czQSrtOQKcLmSFAj95OOXNvA-tIxRN0K0kJWtFo2dZseLsFsHDpZQIQBj7amOdB0e8sV9xl1TiKLXEHAgIBtfTcx7TodA=w1280",
    available: true,
  },
];

/* ─── Placeholder / upcoming projects ───────────────────────────────────── */
const UPCOMING = [
  { title: "Systems Valley Website", domain: "Branding · Web", accent: "#6366F1" },
  { title: "Agnes", domain: "Product · SaaS", accent: "#10B981" },
  { title: "BIM & Beyond", domain: "Construction · Enterprise", accent: "#F59E0B" },
  { title: "More coming soon", domain: "Various industries", accent: "#a8a8a8" },
];

/* ─── Featured card (full-width row) ────────────────────────────────────── */
function FeaturedCard({ project, index }: { project: (typeof FEATURED)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.08 }}
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
            display: "grid",
            gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
            minHeight: 400,
            transition: "box-shadow 0.35s, transform 0.35s",
            boxShadow: hovered ? "0 28px 64px rgba(0,0,0,0.11)" : "0 4px 20px rgba(0,0,0,0.05)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {/* Image — left on even, right on odd */}
          {isEven ? (
            <>
              <ImagePane project={project} hovered={hovered} />
              <ContentPane project={project} hovered={hovered} />
            </>
          ) : (
            <>
              <ContentPane project={project} hovered={hovered} />
              <ImagePane project={project} hovered={hovered} />
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function ImagePane({
  project,
}: {
  project: (typeof FEATURED)[0];
  hovered: boolean;
}) {
  if (project.slug === "hexsolve") return <div style={{ minHeight: 400 }}><IPadMockup src="/hexsolve/hexsolve-login.png" alt={project.title} /></div>;
  if (project.slug === "holmesworld-cs") return <div style={{ minHeight: 400 }}><BrowserMockupWithShine src="/homesworld/homesworld-hero.png" alt={project.title} /></div>;
  if (project.slug === "cognicure") return <div style={{ minHeight: 400 }}><PhoneRotatingMockup alt={project.title} /></div>;
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
    </div>
  );
}

function ContentPane({
  project,
  hovered,
}: {
  project: (typeof FEATURED)[0];
  hovered: boolean;
}) {
  return (
    <div
      style={{
        padding: "clamp(2rem, 4vw, 3.5rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: project.accent,
                background: project.accentLight,
                borderRadius: 6,
                padding: "3px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: P.subtle,
            letterSpacing: "0.04em",
            marginBottom: "0.75rem",
          }}
        >
          {project.title}
        </p>

        <h3
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            color: P.ink,
            lineHeight: 1.25,
            marginBottom: "1rem",
          }}
        >
          {project.headline}
        </h3>

        <p
          style={{
            fontSize: 15,
            color: P.muted,
            lineHeight: 1.7,
            maxWidth: 420,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Meta + CTA */}
      <div>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            borderTop: `1px solid ${P.s2}`,
            borderBottom: `1px solid ${P.s2}`,
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Industry", value: project.industry },
            { label: "Role", value: project.role },
            { label: "Duration", value: project.duration },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: P.subtle, margin: 0, letterSpacing: "0.04em" }}>
                {label}
              </p>
              <p style={{ fontSize: 13, color: P.ink, fontWeight: 500, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: project.accent,
            transition: "gap 0.2s",
          }}
        >
          View Case Study
          <ArrowRight
            size={15}
            style={{
              transition: "transform 0.2s",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Upcoming placeholder card ─────────────────────────────────────────── */
function UpcomingCard({ project }: { project: (typeof UPCOMING)[0] }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1.5px dashed ${P.s3}`,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        background: P.surface,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        ✦
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: P.ink, margin: 0 }}>{project.title}</p>
      <p style={{ fontSize: 12, color: P.subtle, margin: 0, letterSpacing: "0.04em" }}>
        {project.domain}
      </p>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: P.subtle,
          margin: 0,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Coming soon
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function WorkPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <div style={{ background: P.surface, minHeight: "100vh" }}>
      <PortfolioNav />

      {/* Hero */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          padding: `120px clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)`,
        }}
      >
        <motion.div
          ref={heroRef}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <motion.p
            variants={fadeUp}
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
          </motion.p>
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              color: P.ink,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Work that matters.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
              color: P.muted,
              lineHeight: 1.7,
              maxWidth: 540,
            }}
          >
            Three projects across enterprise manufacturing, construction e-commerce, and health-tech
            — each one a different kind of complexity, approached with the same care.
          </motion.p>
        </motion.div>
      </section>

      {/* Featured projects */}
      <section
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {FEATURED.map((project, i) => (
            <FeaturedCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section
        style={{
          padding:
            "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)",
          background: P.s2,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
            Up Next
          </p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: P.ink,
              marginBottom: "2.5rem",
            }}
          >
            More work in progress.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {UPCOMING.map((p) => (
              <UpcomingCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem clamp(1.5rem, 5vw, 4rem)",
          borderTop: `1px solid ${P.s3}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link href="/" style={{ fontSize: 14, color: P.muted, textDecoration: "none" }}>
          ← Home
        </Link>
        <p style={{ fontSize: 13, color: P.subtle, margin: 0 }}>© 2025 Manisha</p>
      </footer>
    </div>
  );
}
