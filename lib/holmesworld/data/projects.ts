import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "3BHK Koramangala Renovation",
    location: "Koramangala, Bengaluru",
    budget: 2800000,
    spent: 1940000,
    completionPercent: 68,
    lastUpdated: "2024-12-20",
    orders: ["HW-2024-00801", "HW-2024-00834"],
    pendingItems: ["p-025", "p-027", "p-039", "p-040", "p-049"],
  },
  {
    id: "proj-002",
    name: "Villa Interiors — Whitefield",
    location: "Whitefield, Bengaluru",
    budget: 5500000,
    spent: 1200000,
    completionPercent: 22,
    lastUpdated: "2024-12-22",
    orders: ["HW-2024-00847"],
    pendingItems: ["p-009", "p-010", "p-012", "p-013", "p-015", "p-043", "p-044", "p-045"],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
