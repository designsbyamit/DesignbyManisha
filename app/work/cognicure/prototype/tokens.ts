export const C = {
  bg:          "#F5F5F0",
  surface:     "#FFFFFF",
  surfaceAlt:  "#FAFAFA",
  navy:        "#1B3A5C",
  navyLight:   "#2A4D73",
  teal:        "#3D9B8F",
  tealLight:   "#E8F5F3",
  tealGlow:    "rgba(61,155,143,0.15)",
  mustard:     "#E8A838",
  mustardLight:"#FFF8E7",
  muted:       "#6B7A8D",
  subtle:      "#9AAABB",
  border:      "#E8EBF2",
  textBody:    "#4A5568",
  textLight:   "#718096",
  danger:      "#E53E3E",
  success:     "#38A169",
  overlay:     "rgba(27,58,92,0.5)",
  pageBg:      "#0D0D0D",
} as const;

export const RADIUS = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 28,
  full: 9999,
} as const;

export const SHADOW = {
  card:    "0 2px 12px rgba(27,58,92,0.08)",
  cardHover:"0 6px 24px rgba(27,58,92,0.14)",
  fab:     "0 6px 20px rgba(61,155,143,0.4)",
  tealGlow:"0 0 24px rgba(61,155,143,0.25)",
  modal:   "0 -8px 40px rgba(0,0,0,0.18)",
} as const;

export const TYPE = {
  hero:    56,
  h1:      32,
  h2:      24,
  h3:      20,
  h4:      17,
  body:    15,
  small:   13,
  caption: 11,
  micro:   10,
} as const;

export const MOTION = {
  fast:    0.18,
  normal:  0.28,
  slow:    0.42,
  spring:  { type: "spring" as const, stiffness: 400, damping: 30 },
  springGentle: { type: "spring" as const, stiffness: 260, damping: 24 },
} as const;
