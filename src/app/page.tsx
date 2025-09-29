"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { cubicBezier, motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ALL_PROJECTS, ProjectData } from "@/data/projects";
import Player from '@vimeo/player';

const NAV_HEIGHT = '88px';
const FIXED_TOP_HEIGHT = '300px';
const BACKGROUND_COLOR = '#18181a';
const EASE_IN_OUT_EXPO = cubicBezier(0.7, 0, 0.15, 1);
const EASE_OUT_EXPO = cubicBezier(0.16, 1, 0.3, 1);
const DURATION = 0.7;
const VIMEO_VIDEO_ID = '1122734552';

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
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
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.div
        ref={cardRef}
        className="relative w-full rounded-3xl overflow-hidden shadow-xl cursor-pointer"
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
      </motion.div>
    </Link>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -160], { clamp: false }); 

  const [isReelHovered, setIsReelHovered] = useState(false);
  const [showVimeoPlayer, setShowVimeoPlayer] = useState(false);
  const reelRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const cursorMouseX = useMotionValue(-200);
  const cursorMouseY = useMotionValue(-200);

  const springConfig = { damping: 35, stiffness: 250 };
  const smoothCursorX = useSpring(cursorMouseX, springConfig);
  const smoothCursorY = useSpring(cursorMouseY, springConfig);

  const handleReelMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    cursorMouseX.set(clientX);
    cursorMouseY.set(clientY);
  };

  const cursorVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: { scale: 1, opacity: 1, transition: { duration: DURATION, ease: EASE_IN_OUT_EXPO } },
  };

  const playButtonVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { scale: 0.8, opacity: 0.8, transition: { duration: DURATION, ease: EASE_IN_OUT_EXPO } },
  };

  const lines = [
    "Designing Experiences",
    "That Truly Move",
  ];

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const headingWordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: EASE_OUT_EXPO,
      },
    },
  };
  
  useEffect(() => {
    if (showVimeoPlayer && reelRef.current) {
      playerRef.current = new Player(reelRef.current, {
        id: parseInt(VIMEO_VIDEO_ID),
        autoplay: true,
        responsive: true,
        byline: false,
        portrait: false,
        title: false,
      });

      playerRef.current.on('ended', () => {
        setShowVimeoPlayer(false);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVimeoPlayer]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-[#D2F65A] rounded-3xl z-50 pointer-events-none flex items-center justify-center overflow-hidden -translate-x-1/2 -translate-y-1/2 px-0 py-2 max-w-[200px]"
        style={{ x: smoothCursorX, y: smoothCursorY }}
        variants={cursorVariants}
        animate={isReelHovered && !showVimeoPlayer ? "hover" : "initial"}
      >
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="inline-flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 6,
                ease: 'linear',
              },
            }}
          >
            <span className="text-[#18181A] text-xl font-medium uppercase">
              PLAY SHOWREEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PLAY SHOWREEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span
              className="text-[#18181A] text-xl font-medium uppercase"
              aria-hidden="true"
            >
              PLAY SHOWREEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PLAY SHOWREEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
        <div 
          className={`fixed inset-x-0 top-0 z-40`}
          style={{ height: NAV_HEIGHT }}
        >
          <Nav />
        </div>

        <motion.section 
          id="hero" 
          className={`fixed inset-x-0 top-0 z-0 bg-[${BACKGROUND_COLOR}] pointer-events-none`}
          style={{ paddingTop: NAV_HEIGHT, y: y }} 
        >
          <div className="h-full flex flex-col justify-end pointer-events-auto px-5 md:px-20 pt-20 pb-2">
            <motion.h1 
              className="font-saans text-4xl leading-none tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl"
              variants={headingContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="inline-block md:block">
                  {line.split(" ").map((word, wordIndex) => (
                    <span 
                      key={wordIndex} 
                      className="inline-block overflow-hidden"
                      style={{ marginRight: '0.25em' }}
                    >
                      <motion.span 
                        className="inline-block"
                        variants={headingWordVariants}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
        </motion.section>

        <main 
          className="flex flex-1 flex-col min-h-screen z-10"
          style={{ paddingTop: FIXED_TOP_HEIGHT }}
        >
          <section id="reel" className={`px-5 md:px-20 -my-[80px] pb-[80px]`}>
            <div
              className="h-[150px] w-full"
              style={{
                background: 'linear-gradient(to top, #18181A, rgba(24, 24, 26, 0))',
              }}
            />
            <div className={`bg-[${BACKGROUND_COLOR}]`}>
              <motion.div
                ref={reelRef}
                className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-900"
                onHoverStart={() => setIsReelHovered(true)}
                onHoverEnd={() => setIsReelHovered(false)}
                onMouseMove={handleReelMouseMove}
                onClick={() => !showVimeoPlayer && setShowVimeoPlayer(true)}
              >
                {!showVimeoPlayer && (
                  <>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      variants={playButtonVariants}
                      initial="initial"
                      animate={isReelHovered ? "hover" : "initial"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="text-white opacity-95"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </motion.div>
                    
                    <video 
                      src="src/../../home/reel_preview.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </>
                )}
              </motion.div>

              <div className="hidden md:flex justify-between items-start mt-8 text-lg font-medium text-[#f4f4f5]">
                <div className="flex flex-col">
                  <span className="leading-snug">US Based</span>
                  <span className="text-gray-500 leading-snug">Working Globally</span>
                </div>
                <div>
                  Scroll Down
                </div>
                <div className="flex flex-col items-end">
                  <span className="leading-snug">Freelance Availability</span>
                  <span className="text-gray-500 leading-snug">September 2025</span>
                </div>
              </div>
            </div>
          </section>
          
          <section id="projects" className={`px-5 md:px-20 pt-30 pb-20 bg-[${BACKGROUND_COLOR}]`}>
            <h2 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl mb-12">
              Selected Projects
            </h2>
            <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
              {ALL_PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}