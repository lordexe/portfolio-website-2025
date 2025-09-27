import { Apex2025Showcase } from "@/components/project-showcases/Apex2025Showcase";
import React from 'react';

export interface ProjectData {
  slug: string;
  name: string;
  subtitle: string;
  reelVideoUrl: string;
  info: {
    client: string;
    role: string;
    year: string;
    description: string;
  };
  showcaseComponent: React.ComponentType;
  nextProjectSlug: string;
  nextProjectName: string;
}

export const ALL_PROJECTS: ProjectData[] = [
  {
    slug: "apex-2025",
    name: "Apex 2025",
    subtitle: "A modern design system for a complex enterprise application.",
    reelVideoUrl: "/public/apex_2025/apex_2025-preview.mp4",
    info: {
      client: "Apex Corp",
      role: "Lead Product Designer",
      year: "2025",
      description: "This project involved a complete overhaul of a legacy enterprise software's user interface and experience. The goal was to create a scalable, accessible, and intuitive design system."
    },
    showcaseComponent: Apex2025Showcase,
    nextProjectSlug: "/projects/stellar-cartography",
    nextProjectName: "Stellar Cartography",
  },
  {
    slug: "stellar-cartography",
    name: "Stellar Cartography",
    subtitle: "An iOS app for stargazing and celestial body tracking.",
    reelVideoUrl: "/public/home/reel_preview.mp4",
    info: {
      client: "AstroLabs Inc.",
      role: "Product Designer & Prototyper",
      year: "2024",
      description: "Focusing on AR integration, this project brought the night sky to life through innovative mobile UX patterns and high-fidelity astronomical data visualization."
    },
    showcaseComponent: StellarCartographyShowcase,
    nextProjectSlug: "/projects/apex-2025",
    nextProjectName: "Apex 2025",
  },
];

export function getProjectDataBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find(p => p.slug === slug);
}