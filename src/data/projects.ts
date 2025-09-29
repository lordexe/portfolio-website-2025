export interface CoreProjectData {
  slug: string;
  name: string;
  thumbnail: string;
  tags: string[];
  keyskills: string[];
  reelVideoUrl: string;
  heroImage: string;
  info: {
    client: string;
    year: string;
    description: string;
    descriptionTitle: string;
    siteUrl?: string;
  };
}

export interface ProjectData extends CoreProjectData {
  nextProjectSlug: string;
  nextProjectName: string;
}

const RAW_PROJECTS: CoreProjectData[] = [
  {
    slug: "apex-2025",
    name: "Apex 2025",
  thumbnail: "/apex_2025/apex_2025-thumbnail.png",
    tags: ["Design", "Motion", "Branding", "Development"],
    keyskills: ["Creative Direction", "Design", "Animation", "Development", "Webflow", "Figma", "After Effects"],
  reelVideoUrl: "/apex_2025/apex_2025-preview.mp4",
    heroImage: "/apex_2025/Apex_2025-Hero.jpg",
    info: {
      client: "XRP Ledger",
      year: "2025",
      description: "Hosted by Ripple, Apex 2025 is the official global community summit that unites developers, innovators, businesses, and investors for an exciting three-day celebration of blockchain technology and the incredible world of the XRP Ledger. <br/> <br/> The event was a landmark success—surpassing registration goals and drawing a global audience of over half a million views. The event featured expansive LED stages, intersecting stage layouts, and a cohesive design system that seamlessly translated from digital to physical. Every detail contributed to a dynamic, memorable experience that showcased the power of community and innovation on a truly global stage.",
      descriptionTitle: "The fifth annual global summmit for the XRPL Community, hosted in Singapore", 
      siteUrl: "https://www.xrpledgerapex.com/",
    },
  },
  {
    slug: "ripple-brand-refresh",
    name: "Ripple Brand Refresh",
    thumbnail: "/ripple_refresh/ripple_refresh-thumbnail.png",
    tags: ["Motion", "Design", "Branding", "Development"],
    keyskills: ["Lead Motion Direction", "Animation", "Design", "Development", "Scripting", "Figma", "After Effects", "Cinema4D"],
    reelVideoUrl: "/ripple_refresh/ripple_refresh-preview.mp4",
    heroImage: "/ripple_refresh/ripple_refresh-hero.png", 
    info: {
      client: "Ripple",
      year: "2025",
      description: "Ripple, a global leader in blockchain-based financial services, set out to refresh its brand system to reflect growth and expand its storytelling capabilities. As part of this initiative, I contributed to the refreshed identity and led the creation of Ripple’s motion system. <br/><br/> Animating illustrations, creating detailed motion guidelines, building a custom plugin, and developing reusable templates—together these formed a scalable framework that reinforces Ripple’s values of speed, security, and clarity, turning motion into a core asset that powers the refreshed identity across digital platforms.",
      descriptionTitle: "Translating Complex Technology into Simple, Expressive Motion", 
      siteUrl: "https://brand.ripple.com/",
    },
  },
  {
    slug: "la-jote",
    name: "La Jote",
    thumbnail: "/la_jote/la_jote-thumbnail.png",
    tags: ["3D", "Film", "Branding"],
    keyskills: ["Branding", "Design", "Animation", "3D", "Cinema4d", "Film", "After Effects", "Packaging", "Staging", "Photography", "Cricut"],
    reelVideoUrl: "/la_jote/la_jote-preview.mp4",
    heroImage: "/la_jote/la_jote-hero.png", 
    info: {
      client: "Personal Project",
      year: "2024",
      description: "This project was a calculated experiment in extreme value elevation, proving that perceived product worth is dictated by brand experience, not cost. I took a simple art class prompt—design packaging for a cheap item—and extrapolated it to a real-world concept, selecting a $1 Dollar Tree pen and transforming it into a high-end luxury product. The core challenge was using design, animation, and strategy to generate massive consumer confidence for a minimal investment. <br/><br/> The result is La Jote, a luxury pen brand that redefines value through meticulous design and storytelling. Every element, from the sophisticated logo to the 3D animated commercial and the physical unboxing experience, was crafted to evoke exclusivity. This project underscores the power of branding in shaping consumer perceptions and demonstrates how strategic design, executed across multiple media can elevate even the most ordinary products to extraordinary heights.",
      descriptionTitle: "Elevating a $1 Dollar Tree Item to a $100 Luxury Brand",
    },
  },
  {
    slug: "swell-Miami",
    name: "Swell Miami",
    thumbnail: "/swell_miami/swell_miami-thumbnail.png",
    tags: ["Motion", "Design", "Branding"],
    keyskills: ["Design", "Animation", "Branding", "After Effects", "Figma", "Illustrator", "Cinema4D"],
    reelVideoUrl: "/swell_miami/swell_miami-preview.mp4",
    heroImage: "/swell_miami/swell_miami-hero.png", 
    info: {
      client: "Ripple",
      year: "2024",
      description: "Ripple Swell 2024 convened more than 600 thought leaders, partners, and innovators across the blockchain, finance, and payments industries for two days of forward-looking content and connection. As part of the core creative team, I oversaw the unified design system for the event—defining the branding, motion design, stage environments, digital assets, and immersive experiences—ensuring every moment felt intentional and elevated across multiple venues in Miami. <br/><br/> The design system was crafted to reflect Ripple's commitment to innovation and the transformative power of blockchain technology. From the dynamic stage visuals to the branded experiences, every element was designed to engage attendees and foster a sense of community and excitement about the future of finance.",
      descriptionTitle: "Designing a Cohesive Brand Experience for a Global Summit", 
    },
  },
];

export const ALL_PROJECTS = RAW_PROJECTS.map((project, index) => {
  const nextProjectIndex = (index + 1) % RAW_PROJECTS.length;
  const nextProject = RAW_PROJECTS[nextProjectIndex];

  return {
    ...project,
    nextProjectSlug: `/projects/${nextProject.slug}`,
    nextProjectName: nextProject.name,
  };
});

export function getProjectDataBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find(p => p.slug === slug);
}