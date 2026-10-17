export interface ArcCardItemData {
  id: string;
  title: string;
  description: string;
  actionText: string;
  imageSrc: string;
}

export const defaultArcCards: ArcCardItemData[] = [
  {
    id: "card-1",
    title: "Typography & Scale",
    description:
      "Calibrate vertical rhythm, optical kerning, and negative letter-spacing to establish authoritative readability and visual hierarchy.",
    actionText: "Learn more ›",
    imageSrc: "/Orbit.png",
  },
  {
    id: "card-2",
    title: "Whitespace & Layout",
    description:
      "Compose balanced spatial margins and negative breathing room to reduce cognitive load and naturally guide user focus.",
    actionText: "Learn more ›",
    imageSrc: "/Circles.png",
  },
  {
    id: "card-3",
    title: "Spring Kinematics",
    description:
      "Orchestrate natural inertia, fluid gesture velocity, and subtle micro-animations that make digital elements feel physical and responsive.",
    actionText: "Try it now ›",
    imageSrc: "/Dunes.png",
  },
  {
    id: "card-4",
    title: "Atmospheric Blurs",
    description:
      "Diffuse background layers with real-time backdrop filters and frosted glass effects to craft intuitive spatial elevation and depth.",
    actionText: "Learn more ›",
    imageSrc: "/Edge.png",
  },
  {
    id: "card-5",
    title: "Concentric Radii",
    description:
      "Harmonize nested container curves using mathematically precise concentric formulas where outer radius equals inner radius plus padding.",
    actionText: "Try it now ›",
    imageSrc: "/Ellipses.png",
  },
  {
    id: "card-6",
    title: "Tactile Interactions",
    description:
      "Engineer responsive feedback loops and frictionless gesture tracking that turn everyday interactions into seamless, delight-filled moments.",
    actionText: "Join waitlist ›",
    imageSrc: "/Spark.png",
  },
];
