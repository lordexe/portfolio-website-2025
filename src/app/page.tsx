"use client";

import { SiteHeader } from "@/components/site-header";
import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "Motion Design",
  "Visual Design",
  "Branding",
  "3D Animation",
  "Development",
];

const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];


const NAV_HEIGHT = '88px'; 
const FIXED_TOP_HEIGHT = '300px'; 
const BACKGROUND_COLOR = '#18181a'; 


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
        
        <section id="reel" className={`px-10 -my-[70px]`}>
          <div
            className="h-[70px] w-full"
            style={{
              background: 'linear-gradient(to top, #18181A, rgba(24, 24, 26, 0))',
            }}
          />
          <div className={`bg-[${BACKGROUND_COLOR}]`}>
            {/* START: Updated Video Reel Content */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-700">

              {/* Video Element */}
              <video 
                src="src/../../home/reel_preview.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute top-0 left-0 right-0 h-16 bg-[#D2F65A] overflow-hidden">
                <motion.div
                  className="flex h-full whitespace-nowrap items-center text-lg font-semibold text-[#18181a] will-change-transform"
                  animate={{
                    x: ["0%", "-100%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      duration: 25,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedItems.map((item, index) => (
                    <span key={index} className="uppercase tracking-wider">
                      {item}
                      <span className="m-10 text-gray-500">•</span>
                    </span>
                  ))}
                </motion.div>
              </div>
              
              {/* Removed: Video Reel Placeholder div */}
            </div>
            {/* END: Updated Video Reel Content */}
          </div>
        </section>
        
        <div className={`h-[200vh] p-10 bg-[${BACKGROUND_COLOR}]`}>
          <h2 className="text-3xl mt-10">More Content Below (Projects, About, etc.)</h2>
          <p className="mt-4">This section scrolls **over** the fixed hero but **under** the fixed navigation.</p>
        </div>
      </main>
    </div>
  );
}