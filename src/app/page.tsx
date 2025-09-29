"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"; 
import { useState, useRef } from "react"; 
import Link from "next/link"; 
import { ALL_PROJECTS, ProjectData } from "@/data/projects"; // IMPORT DATA

const NAV_HEIGHT = '88px'; 
const FIXED_TOP_HEIGHT = '300px'; 
const BACKGROUND_COLOR = '#18181a'; 
const EASE_IN_OUT_EXPO = [0.7, 0, 0.15, 1]; 
const DURATION = 0.7;

interface ProjectCardProps {
  project: ProjectData; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleHoverStart = () => {
    setIsHovered(true);
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
    }
  }

  const handleHoverEnd = () => {
    setIsHovered(false);
    if (videoRef.current) {
        videoRef.current.pause();
    }
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
    <Link href={`/projects/${project.slug}`} passHref legacyBehavior>
      <motion.a
        ref={cardRef}
        className="relative w-full rounded-3xl overflow-hidden shadow-xl cursor-pointer block"
        style={{ aspectRatio: '4 / 4.5' }} 
        onHoverStart={handleHoverStart}
        onMouseMove={handleMouseMove}
        onHoverEnd={handleHoverEnd}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.thumbnail})` }}
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: DURATION, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0"></div>

        <div className="relative z-10 p-5 h-full flex flex-col justify-between">
          
          <div className="flex justify-start">
            <span className="bg-[#f4f4f5]/90 text-zinc-900 text-lg font-semibold px-3 py-1 rounded-full">
              {project.name}
            </span>
          </div>
          
          <div className="flex justify-center items-center h-full pointer-events-none">
            <motion.div
              className="w-full max-w-[85%] bg-[#f4f4f5]/20 backdrop-blur-sm rounded-md flex justify-center items-center overflow-hidden" 
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
              <video 
                ref={videoRef}
                src={project.reelVideoUrl} 
                autoPlay={false} 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
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
      </motion.a>
    </Link>
  );
};

export default function Home() {
  
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 800], [0, -160], { clamp: false }); 

  return (
    <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
      
      <div 
        className={`fixed inset-x-0 top-0 z-50 bg-[${BACKGROUND_COLOR}]`}
        style={{ height: NAV_HEIGHT }}
      >
        <Nav />
      </div>

      <motion.section 
        id="hero" 
        className={`fixed inset-x-0 top-0 z-0 bg-[${BACKGROUND_COLOR}] pointer-events-none`}
        style={{ 
          paddingTop: NAV_HEIGHT,
          y: y,
        }} 
      >
        <div className="p-20 pb-2 h-full flex flex-col justify-end pointer-events-auto">
          <h1 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl">
            Designing Experiences
            <br />
            That Truly Move
          </h1>
        </div>
      </motion.section>

      <main 
        className="flex flex-1 flex-col min-h-screen z-10"
        style={{ paddingTop: FIXED_TOP_HEIGHT }}
      >
        
        <section id="reel" className={`px-20 -my-[80px] pb-[80px]`}>
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
              
              
              <div className="">
                Scroll Down
              </div>
              
              
              <div className="flex flex-col items-end">
                <span className="leading-snug">Freelance Availability</span>
                <span className="text-gray-500 leading-snug">September 2025</span>
              </div>
              
            </div>
            
            
          </div>
        </section>
        
        <section id="projects" className={`p-20 pt-30 bg-[${BACKGROUND_COLOR}]`}>
          <h2 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl mb-12">
            Selected Projects
          </h2>
          
          <div className="grid gap-8"
               style={{ 
                 gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' 
               }}
          >
            {ALL_PROJECTS.map((project, index) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          
        </section>

      </main>
      
      <Footer />
    </div>
  );
}