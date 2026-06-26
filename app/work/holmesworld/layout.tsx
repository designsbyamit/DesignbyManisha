import type { Metadata } from "next";
import { HolmesWorldProvider } from "@/lib/holmesworld/store";
import HWHeader from "./components/HWHeader";
import HWFooter from "./components/HWFooter";

export const metadata: Metadata = {
  title: "HolmesWorld — Premium Construction Materials",
  description: "India's premium marketplace for home construction materials. Tiles, cement, steel, fittings and more.",
};

export default function HolmesWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HolmesWorldProvider>
      <div style={{ background: "var(--hw-surface)", minHeight: "100vh", color: "var(--hw-ink)" }}>
        <HWHeader />
        <main>{children}</main>
        <HWFooter />
      </div>
    </HolmesWorldProvider>
  );
}
