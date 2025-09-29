import React from 'react';
import Image from 'next/image';

const APEX_SHOWCASE_DATA = [
  { 
    src: '/apex_2025/Apex_2025-Mockup.png', 
    alt: 'Apex 2025 Social Mockup', 
    colSpan: 2, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Website.gif', 
    alt: 'Apex 2025 Website Mockup', 
    colSpan: 2, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Stage3.png', 
    alt: 'Apex 2025 Stage Design', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod.png', 
    alt: 'Apex 2025 Barista Swag', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod3.png', 
    alt: 'Apex 2025 Pins', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Speakers.mp4', 
    alt: 'Apex 2025 Pillar', 
    colSpan: 1, 
    ratio: 'square',
    type: 'video'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod4.png', 
    alt: 'Apex 2025 Swag', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Banner.png', 
    alt: 'Apex 2025 Banner', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Language.png', 
    alt: 'Apex 2025 Design', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Layards.png', 
    alt: 'Apex 2025 Lanyards', 
    colSpan: 2, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 2, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Audience.jpg', 
    alt: 'Apex 2025 Audience', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Lollipop.png', 
    alt: 'Apex 2025 Lollipop Sign', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Signage2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Stage4.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod5.png', 
    alt: 'Apex 2025 Standing Sign', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Stage.png', 
    alt: 'Apex 2025 Floor Signage', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Prod6.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/Apex_2025-Stage2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  {
    src: '/apex_2025/Apex_2025-Stats.png',
    alt: 'Apex 2025 Stats',
    colSpan: 2,
    ratio: 'wide',
    type: 'img'
  },

  {
    alt: 'Apex 2025 Highlight Reel',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/AXN9-m0uXKk"
      title="Apex 2025 Highlight Reel"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`
  },
];

const colSpanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  4: 'lg:col-span-4',
};

const contentClass = "w-full h-full";
const mediaClass = "object-cover transition-transform duration-300 hover:scale-105";

export const Apex2025Showcase = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {APEX_SHOWCASE_DATA.map((item, index) => {
        let aspectRatioClass;

        if (item.colSpan === 1) {
            aspectRatioClass = item.ratio === 'square' ? 'aspect-square' : 'aspect-[16/9]';
        } else {
            if (item.ratio === 'wide') {
                 aspectRatioClass = 'aspect-video';
            } else {
                 aspectRatioClass = 'aspect-video md:aspect-square';
            }
        }

        let content;
        
        if (item.type === 'video') {
            content = (
                <video
                  src={item.src}
                  alt={item.alt}
                  className={`${contentClass} ${mediaClass}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
            );
        } else if (item.type === 'embed' && item.embedHtml) {
             content = (
                <div
                    className={`${contentClass} non-scaling-embed`}
                    dangerouslySetInnerHTML={{ __html: item.embedHtml }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                />
             );
        } else {
            content = (
                <div className={`relative ${contentClass}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={mediaClass}
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                  />
                </div>
            );
        }
        
        return (
          <div
            key={index}
            className={`
              col-span-2 
              ${colSpanClasses[item.colSpan]} 
              overflow-hidden 
              rounded-xl md:rounded-2xl 
              ${aspectRatioClass} 
              ${item.type === 'embed' ? 'bg-black' : ''}
            `}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};