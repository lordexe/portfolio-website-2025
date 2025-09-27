"use client";

import { SiteHeader } from "@/components/site-header";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react"; 

const NAV_HEIGHT = '88px'; 
const FIXED_TOP_HEIGHT = '300px'; 
const BACKGROUND_COLOR = '#18181a'; 
const EASE_IN_OUT_EXPO = [0.7, 0, 0.15, 1]; 
const DURATION = 0.7;

const projects = [
  {
    name: "Aether Dynamics",
    image: "https://images.unsplash.com/photo-1758638928928-3d1e5a29ab24?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    tags: ["UX Design", "Motion Graphics", "Branding"]
  },
  {
    name: "Stellar Cartography",
    image: "https://images.unsplash.com/photo-1755609342539-a58d8d6a3e59?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDBfHx8fA%3D%3D",
    tags: ["Product Design", "iOS App", "Prototype"]
  },
  {
    name: "The Artisan Shop",
    image: "https://images.unsplash.com/photo-1510901509170-0d19525c57ac?fit=crop&w=600&h=800&q=80",
    tags: ["Web Dev", "E-Commerce", "Design System"]
  },
  {
    name: "Horizon Dashboard",
    image: "https://images.unsplash.com/photo-1540608677465-b77a06488d5e?fit=crop&w=600&h=800&q=80",
    tags: ["UI/UX", "Data Viz", "Dashboard"]
  },
  {
    name: "Echo Magazine",
    image: "https://images.unsplash.com/photo-1532057636367-e9a92440b8cf?fit=crop&w=600&h=800&q=80",
    tags: ["Print Layout", "Typography", "Art Direction"]
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const x = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const y = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const offsetX = event.clientX - centerX;
      const offsetY = event.clientY - centerY;

      mouseX.set(offsetX / rect.width);
      mouseY.set(offsetY / rect.height);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const imageVariants = {
    initial: { scale: 1, filter: 'blur(0px)' },
    hover: { scale: 1.05, filter: 'blur(30px)' },
  };

  const previewDivVariants = {
    initial: { scale: 0, opacity: 1 },
    hover: { scale: 1, opacity: 1 }, 
  };

  const tagsVariants = {
    initial: { opacity: 0, transition: { staggerChildren: 0.05 } },
    hover: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        duration: DURATION,
        ease: EASE_IN_OUT_EXPO,
      }
    },
  };
  
  const tagItemVariants = {
    initial: { x: 20, opacity: 0 }, 
    hover: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: DURATION, 
        ease: EASE_IN_OUT_EXPO 
      }
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full rounded-3xl overflow-hidden shadow-xl cursor-pointer"
      style={{ aspectRatio: '4 / 4.5' }} 
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onHoverEnd={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image})` }}
        variants={imageVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: DURATION, ease: "easeInOut" }}
      />
      
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        
        <div className="flex justify-start">
          <span className="bg-[#f4f4f5]/90 text-zinc-900 text-sm font-semibold px-3 py-1 rounded-full">
            {project.name}
          </span>
        </div>
        
        <div className="flex justify-center items-center h-full pointer-events-none">
          <motion.div
            className="w-full max-w-[85%] bg-[#f4f4f5]/20 backdrop-blur-sm rounded-md flex justify-center items-center"
            style={{ 
              aspectRatio: '16 / 9', 
              x: x, 
              y: y, 
            }}
            variants={previewDivVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: DURATION, ease: EASE_IN_OUT_EXPO }}
          >
            <span className="text-white text-base md:text-xl font-medium tracking-wider uppercase">
              View Project
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2"
          variants={tagsVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          {project.tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="bg-[#f4f4f5]/20 backdrop-blur-sm text-[#f4f4f5] text-xs font-medium px-3 py-1 rounded-full"
              variants={tagItemVariants}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
      
      <div 
        className={`fixed inset-x-0 top-0 z-50 bg-[${BACKGROUND_COLOR}]`}
        style={{ height: NAV_HEIGHT }}
      >
        <SiteHeader />
      </div>

      <section 
        id="hero" 
        className={`fixed inset-x-0 top-0 z-0 bg-[${BACKGROUND_COLOR}] pointer-events-none`}
        style={{ paddingTop: NAV_HEIGHT }} 
      >
        <div className="p-10 pb-2 h-full flex flex-col justify-end pointer-events-auto">
          <h1 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl">
            Designing Experiences
            <br />
            That Truly Move
          </h1>
        </div>
      </section>

      <main 
        className="flex flex-1 flex-col min-h-screen z-10"
        style={{ paddingTop: FIXED_TOP_HEIGHT }}
      >
        
        <section id="reel" className={`px-10 -my-[80px] pb-[80px]`}>
          <div
            className="h-[150px] w-full"
            style={{
              background: 'linear-gradient(to top, #18181A, rgba(24, 24, 26, 0))',
            }}
          />
          <div className={`bg-[${BACKGROUND_COLOR}]`}>
            
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-700">

              
              <video 
                src="src/../../home/reel_preview.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none"
              />
              
            </div>
            

            <div className="flex justify-between items-start mt-8 text-lg font-medium text-[#f4f4f5]">
              
              
              <div className="flex flex-col">
                <span className="leading-snug">US Based</span>
                <span className="text-gray-500 leading-snug">Working Globally</span>
              </div>
              
              
              <div className="uppercase tracking-wider">
                Scroll Down
              </div>
              
              
              <div className="flex flex-col items-end">
                <span className="leading-snug">Freelance Availability</span>
                <span className="text-gray-500 leading-snug">September 2025</span>
              </div>
              
            </div>
            
            
          </div>
        </section>
        
        <section id="projects" className={`p-10 pt-30 bg-[${BACKGROUND_COLOR}]`}>
          <h2 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl mb-12">
            Selected Projects
          </h2>
          
          <div className="grid gap-8"
               style={{ 
                 gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))' 
               }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          
        </section>

      </main>
    </div>
  );
}