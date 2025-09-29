"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ComponentType, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/data/projects";
import { Apex2025Showcase } from "@/components/project-showcases/Apex2025Showcase";
import { RippleRefreshShowcase } from "@/components/project-showcases/RippleRefreshShowcase";
import { LaJoteRefreshShowcase } from "@/components/project-showcases/LaJoteShowcase";
import { SwellMiamiRefreshShowcase } from "@/components/project-showcases/SwellMiamiShowcase";

const NAV_HEIGHT = "88px";
const FIXED_TOP_HEIGHT = "300px";
const BACKGROUND_COLOR = "#18181a";

const showcaseComponents: Record<string, ComponentType> = {
  "apex-2025": Apex2025Showcase,
  "ripple-brand-refresh": RippleRefreshShowcase,
  "la-jote": LaJoteRefreshShowcase,
  "swell-Miami": SwellMiamiRefreshShowcase,
};

const TITLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type InlineLinkProps = {
  href: string;
  children: ReactNode;
};

const InlineLink = ({ href, children }: InlineLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1 text-white/70 hover:text-white transition-colors duration-200 underline underline-offset-4 group"
    >
      <span>{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
    </a>
  );
};

type ProjectPageClientProps = {
  project: ProjectData;
  nextProject: ProjectData;
};

export function ProjectPageClient({ project, nextProject }: ProjectPageClientProps) {
  const { scrollYProgress } = useScroll();
  const yRange = ["0%", "-550%"];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const ShowcaseComponent = showcaseComponents[project.slug];

  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const titleWordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: TITLE_EASE,
      },
    },
  };

  return (
    <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
      <div className={`fixed inset-x-0 top-0 z-50`} style={{ height: NAV_HEIGHT }}>
        <Nav />
      </div>

      <section
        id="project-hero"
        className={`fixed inset-x-0 top-0 z-0 bg-[${BACKGROUND_COLOR}] pointer-events-none`}
        style={{ paddingTop: NAV_HEIGHT }}
      >
        <div className="h-full flex flex-col justify-end pointer-events-auto px-5 md:px-20 pt-20 pb-2">
          <motion.h1
            className="font-saans font-regular text-6xl sm:text-4xl md:text-7xl lg:text-9xl leading-tight tracking-tight text-[#f4f4f5] max-w-[1440px] w-full"
            style={{ y, textAlign: "left" }}
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {project.name.split(" ").map((word, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden"
                style={{ marginRight: "0.15em" }}
              >
                <motion.span className="inline-block" variants={titleWordVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>
      </section>

      <main className="flex flex-1 flex-col min-h-screen z-10" style={{ paddingTop: FIXED_TOP_HEIGHT }}>
        <section id="main" className={`px-5 md:px-20 -my-[80px] pb-[80px]`}>
          <div
            className="h-[150px] w-full"
            style={{
              background: "linear-gradient(to top, #18181A, rgba(24, 24, 26, 0))",
            }}
          />
          <div className={`bg-[${BACKGROUND_COLOR}]`}>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-700">
              <Image
                src={project.heroImage}
                alt={`${project.name} main showcase image`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        <section id="project-info" className={`px-5 md:px-20 pt-30 pb-20 bg-[${BACKGROUND_COLOR}]`}>
          <div className="mx-auto flex flex-col md:flex-row gap-12 text-[#f4f4f5]">
            <div className="md:w-1/2 flex flex-col gap-10">
              <div className="flex gap-10">
                <div className="">
                  <h3 className="text-md text-[#f4f4f5]/60 mb-1">Client</h3>
                  <p className="text-3xl font-regular text-[#f4f4f5]">{project.info.client}</p>
                </div>
              </div>

              <div>
                <h3 className="text-md text-[#f4f4f5]/60 mb-1">Year</h3>
                <p className="text-3xl font-regular text-[#f4f4f5]">{project.info.year}</p>
              </div>

              <div>
                <h3 className="text-md text-[#f4f4f5]/60 mb-3">Key Skills</h3>
                <div className="max-w-md flex flex-wrap gap-2">
                  {project.keyskills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-medium bg-[#3b3b3b] text-[#ffffff] px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col">
              <h2 className="text-4xl/11 font-medium text-[#D2F65A] mb-10">
                {project.info.descriptionTitle}
              </h2>
              <p
                className="text-lg leading-relaxed text-[#f4f4f5]/90"
                dangerouslySetInnerHTML={{ __html: project.info.description }}
              />
              {project.info.siteUrl && (
                <div className="mt-8">
                  <InlineLink href={project.info.siteUrl}>Visit Site</InlineLink>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="project-showcase" className={`px-5 md:px-20 pt-16 pb-20 bg-[${BACKGROUND_COLOR}]`}>
          <div className="mx-auto">
            {ShowcaseComponent ? <ShowcaseComponent /> : null}
          </div>
        </section>

        <section id="next-up" className={`px-5 md:px-20 pt-20 pb-10 bg-[${BACKGROUND_COLOR}]`}>
          <div className="text-center">
            <p className="text-lg uppercase tracking-wider text-[#f4f4f5]/60 mb-4">
              Next Up
            </p>
            <a
              href={`/projects/${nextProject.slug}`}
              className="group inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <h2 className="font-saans text-5xl leading-tight tracking-tight text-[#f4f4f5] sm:text-6xl md:text-8xl">
                {nextProject.name}
              </h2>
              <span className="inline-block mt-4 text-xl font-medium text-[#D2F65A] transition-colors duration-200 group-hover:text-[#fafafa]">
                View Project &rarr;
              </span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
