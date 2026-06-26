// app/work/cognicure/prototype/components/BottomNav.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, Calendar, Users, Heart } from "lucide-react";
import { C, TYPE, MOTION } from "../tokens";
import type { NavigateFn, ScreenId } from "../types";

interface TabDef { id: ScreenId; label: string; Icon: React.FC<{ size: number; color: string; strokeWidth: number }>; }

const TABS: TabDef[] = [
  { id: "dashboard",      label: "Home",          Icon: Home },
  { id: "consultations",  label: "Consultations", Icon: Calendar },
  { id: "circlesLanding", label: "My Circle",     Icon: Users },
  { id: "healthWallet",   label: "Health Wallet", Icon: Heart },
];

interface BottomNavProps { active: ScreenId; navigate: NavigateFn; }

export function BottomNav({ active, navigate }: BottomNavProps) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      paddingBottom: 24,
      paddingTop: 10,
    }}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            onClick={() => navigate(id)}
            whileTap={{ scale: 0.9 }}
            transition={MOTION.spring}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: 0,
            }}
          >
            <Icon size={22} color={isActive ? C.teal : C.subtle} strokeWidth={isActive ? 2.5 : 1.8} />
            <span style={{
              fontSize: TYPE.caption,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? C.teal : C.subtle,
            }}>
              {label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                style={{ width: 4, height: 4, borderRadius: 2, background: C.teal, marginTop: -2 }}
                transition={MOTION.springGentle}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
