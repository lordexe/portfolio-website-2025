// src/components/LoaderAnimation.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

interface LoaderAnimationProps {
  onComplete: () => void;
}

const EASE_IN_OUT_EXPO = [0.87, 0, 0.13, 1];

export const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ onComplete }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = async () => {
      // Don't start until the video metadata is loaded
      if (!videoLoaded) return;

      // --- Animation Sequence ---

      // 1. Enforce minimum display time for "Ani Chauhan"
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Animate text and video simultaneously
      await Promise.all([
        // Scale up the video from 0, pushing the text apart
        animate(
          "#loader-video",
          { scale: 1, width: '40vw', aspectRatio: '16 / 9' },
          { duration: 1.2, ease: EASE_IN_OUT_EXPO }
        ),
        // Push "Ani" to the left
        animate(
          "#loader-ani",
          { x: "-22vw", scale: 1.2 },
          { duration: 1.2, ease: EASE_IN_OUT_EXPO }
        ),
        // Push "Chauhan" to the right
        animate(
          "#loader-chauhan",
          { x: "22vw", scale: 1.2 },
          { duration: 1.2, ease: EASE_IN_OUT_EXPO }
        )
      ]);
      
      // 3. Hide the text as the video prepares to take over
      await Promise.all([
         animate("#loader-ani", { opacity: 0 }, { duration: 0.5 }),
         animate("#loader-chauhan", { opacity: 0 }, { duration: 0.5 }),
      ]);

      // 4. The loader itself fades out, revealing the page content.
      // The video from the main page will be in the correct spot.
      await animate(scope.current, { opacity: 0 }, { duration: 0.7, ease: EASE_IN_OUT_EXPO });

      // 5. Signal completion to the parent component
      onComplete();
    };

    sequence();

  }, [videoLoaded, animate, onComplete, scope]);

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#18181a]"
    >
      <div className="flex items-center justify-center font-saans text-4xl leading-none tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl">
        <motion.span id="loader-ani" style={{ scale: 1 }}>Ani</motion.span>
        
        <motion.div
          id="loader-video"
          className="relative mx-4 rounded-lg overflow-hidden"
          style={{ 
            scale: 0, 
            width: '0vw', // Start with no width
          }}
        >
          <video
            src="/home/reel_preview.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
          />
        </motion.div>
        
        <motion.span id="loader-chauhan" style={{ scale: 1 }}>Chauhan</motion.span>
      </div>
    </motion.div>
  );
};