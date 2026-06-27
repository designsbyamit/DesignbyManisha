import type { Metadata } from "next";
import { HolmesWorldProvider } from "@/lib/holmesworld/store";
import HWHeader from "./components/HWHeader";
import HWFooter from "./components/HWFooter";
import { HolmesWorldPortfolioBar } from "./components/HolmesWorldPortfolioBar";

export const metadata: Metadata = {
  title: "HomesWorld — Premium Construction Materials",
  description: "India's premium marketplace for home construction materials. Tiles, cement, steel, fittings and more.",
};

export default function HolmesWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HolmesWorldProvider>
      {/* Portfolio context bar — lets visitors navigate back to Manisha's portfolio */}
      <HolmesWorldPortfolioBar />
      <div style={{ background: "var(--hw-surface)", minHeight: "100vh", color: "var(--hw-ink)", paddingTop: 40 }}>
        <HWHeader />
        <main>{children}</main>
        <HWFooter />
      </div>
    </HolmesWorldProvider>
  );
}
