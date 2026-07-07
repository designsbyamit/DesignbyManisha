"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function PortfolioNav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isWork = pathname.startsWith("/work");
  const isDark = resolvedTheme === "dark";

  // Case study pages with DARK hero backgrounds force white nav items until scrolled.
  // holmesworld-cs has a LIGHT hero — exclude it so nav stays readable.
  const darkHeroCaseStudy = /^\/work\/(hexsolve|cognicure)$/.test(pathname);
  const forceLight = darkHeroCaseStudy && !scrolled;

  const itemColor = forceLight ? "#ffffff" : "var(--p-ink)";
  const itemColorMuted = forceLight ? "rgba(255,255,255,0.7)" : "var(--p-muted)";
  const borderColor = forceLight ? "rgba(255,255,255,0.3)" : "var(--p-s3)";
  const borderColorHover = forceLight ? "rgba(255,255,255,0.7)" : "var(--p-accent)";
  const bgHover = forceLight ? "rgba(255,255,255,0.1)" : "var(--p-accent-lt)";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
        height: 60,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled ? "var(--p-nav-bg)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(128,128,128,0.1)" : "none",
        transition: "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Manisha — Home"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          color: itemColor,
          transition: "opacity 0.2s, color 0.3s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        <svg width="28" height="28" viewBox="0 0 671 671" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M335.5 0C520.792 0 671 150.208 671 335.5C671 520.792 520.792 671 335.5 671C150.208 671 0 520.792 0 335.5C0 150.208 150.208 0 335.5 0ZM134 455.972H258.79L336.097 322.071L273.702 214L134 455.972ZM336.097 322.071L413.404 455.972H538.195L398.493 214L336.097 322.071Z"
            fill="currentColor"
          />
        </svg>
      </Link>

      {/* Links + toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 2.5vw, 1.75rem)" }}>
        <NavLink href="/work" active={isWork} color={itemColor} activeColor={itemColor} accentColor={forceLight ? "#ffffff" : "var(--p-accent)"}>Work</NavLink>
        <NavLink href="/about" active={pathname === "/about"} color={itemColorMuted} activeColor={itemColor} accentColor={forceLight ? "#ffffff" : "var(--p-accent)"}>About</NavLink>

        <a
          href="https://drive.google.com/file/d/1sGE2ReJoqJKbga0SDpcge8vDMjbx59aZ/view?usp=sharing" target="_blank" rel="noreferrer"
         
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: itemColor,
            textDecoration: "none",
            padding: "5px 14px",
            borderRadius: 9999,
            border: `1.5px solid ${borderColor}`,
            transition: "border-color 0.2s, background 0.2s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = borderColorHover;
            (e.currentTarget as HTMLElement).style.background = bgHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = borderColor;
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          Resume ↓
        </a>

        {/* Theme toggle */}
        {mounted && (
          <button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `1.5px solid ${borderColor}`,
              background: "transparent",
              cursor: "pointer",
              color: itemColor,
              transition: "border-color 0.2s, background 0.2s, color 0.3s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = borderColorHover;
              (e.currentTarget as HTMLElement).style.background = "var(--p-accent-lt)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = borderColor;
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {isDark ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>
        )}
      </div>
    </motion.nav>
  );
}

function NavLink({ href, active, color, activeColor, accentColor, children }: {
  href: string;
  active: boolean;
  color?: string;
  activeColor?: string;
  accentColor?: string;
  children: React.ReactNode;
}) {
  const fg = active ? (activeColor ?? "var(--p-ink)") : (color ?? "var(--p-muted)");
  const accent = accentColor ?? "var(--p-accent)";
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        fontSize: 13,
        fontWeight: active ? 600 : 500,
        color: fg,
        position: "relative",
        paddingBottom: 2,
        transition: "color 0.3s",
      }}
    >
      {children}
      {active && (
        <span style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          right: 0,
          height: 1.5,
          background: accent,
          borderRadius: 2,
        }} />
      )}
    </Link>
  );
}

