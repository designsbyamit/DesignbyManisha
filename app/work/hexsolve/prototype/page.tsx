import type { Metadata } from "next";
import { HexSolvePrototypeEntry } from "./entry";

export const metadata: Metadata = {
  title: "HexSolve — Prototype",
  description: "Interactive HexSolve enterprise prototype",
};

export default function PrototypePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <HexSolvePrototypeEntry />
    </div>
  );
}
