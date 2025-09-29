// parallax-image.tsx

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  imageUrl: string;
  altText: string;
  heightClass?: string; 
  parallaxFactor?: number;
  roundedClass?: string; 
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  imageUrl, 
  altText, 
  heightClass = 'h-[50vh]', 
  parallaxFactor = 0.05,
  roundedClass = 'rounded-xl',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  
  // FIXED IMAGE SCALE FACTOR
  const imageScaleFactor = 1.1; 

  const calculateParallaxOffset = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const viewportHeight = window.innerHeight;

      const { top, height } = container.getBoundingClientRect();

      const centerPoint = top + (height / 2);
      const distance = (centerPoint - (viewportHeight / 2)); 

      const newOffset = -distance * parallaxFactor;
      
      const maxOffset = (height * imageScaleFactor - height) / 2;
      
      const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

      setOffsetY(clampedOffset);
    }
  }, [parallaxFactor]);

  useEffect(() => {
    calculateParallaxOffset(); 

    window.addEventListener('scroll', calculateParallaxOffset);
    window.addEventListener('resize', calculateParallaxOffset); 

    return () => {
      window.removeEventListener('scroll', calculateParallaxOffset);
      window.removeEventListener('resize', calculateParallaxOffset);
    };
  }, [calculateParallaxOffset]);

  return (
    <div
      ref={containerRef}
      className={`
        ${heightClass} 
        w-full 
        relative 
        overflow-hidden
        ${roundedClass}
      `}
      role="img"
      aria-label={altText}
    >
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover"
        sizes="100vw"
        style={{
          width: `${imageScaleFactor * 100}%`,
          height: `${imageScaleFactor * 100}%`,
          top: '50%',
          left: '50%',
          transform: `translate(-50% , calc(-50% + ${offsetY}px))`
        }}
      />
    </div>
  );
};

export default ParallaxImage;