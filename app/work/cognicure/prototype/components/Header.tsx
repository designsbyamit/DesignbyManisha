// app/work/cognicure/prototype/components/Header.tsx
"use client";
import React from "react";
import { C, TYPE } from "../tokens";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightLabel?: string;
  onRight?: () => void;
  transparent?: boolean;
}

export function Header({ title, onBack, rightLabel, onRight, transparent = false }: HeaderProps) {
  return (
    <div style={{
      padding: "4px 20px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: transparent ? "transparent" : C.surface,
    }}>
      <div style={{ width: 60, display: "flex", alignItems: "center" }}>
        {onBack && (
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 2, color: C.teal }}>
            <ChevronLeft size={20} strokeWidth={2.5} color={C.teal} />
          </button>
        )}
      </div>
      <p style={{ fontSize: TYPE.h4, fontWeight: 700, color: C.navy, letterSpacing: "-0.01em", textAlign: "center", flex: 1 }}>{title}</p>
      <div style={{ width: 60, display: "flex", justifyContent: "flex-end" }}>
        {rightLabel && (
          <button onClick={onRight} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: TYPE.small, fontWeight: 600, color: C.teal }}>
            {rightLabel}
          </button>
        )}
      </div>
    </div>
  );
}
