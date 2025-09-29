import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ShowcaseItem = {
  src?: string;
  alt?: string;
  colSpan: 1 | 2 | 4;
  ratio: 'square' | 'wide' | string;
  type: 'img' | 'video' | 'embed' | 'text';
  embedHtml?: string;
  title?: string;
  description?: string;
};

const APEX_SHOWCASE_DATA: ShowcaseItem[] = [
  { 
    src: '/apex_2025/apex_2025-mockup.png', 
    alt: 'Apex 2025 Social Mockup', 
    colSpan: 2, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-website.gif', 
    alt: 'Apex 2025 Website Mockup', 
    colSpan: 2, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-stage3.png', 
    alt: 'Apex 2025 Stage Design', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-prod.png', 
    alt: 'Apex 2025 Barista Swag', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-prod3.png', 
    alt: 'Apex 2025 Pins', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-speakers.mp4', 
    alt: 'Apex 2025 Pillar', 
    colSpan: 1, 
    ratio: 'square',
    type: 'video'
  },
  { 
    src: '/apex_2025/apex_2025-prod4.png', 
    alt: 'Apex 2025 Swag', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-banner.png', 
    alt: 'Apex 2025 Banner', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-language.png', 
    alt: 'Apex 2025 Design', 
    colSpan: 4, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-layards.png', 
    alt: 'Apex 2025 Lanyards', 
    colSpan: 2, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-prod2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 2, 
    ratio: 'wide',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-audience.jpg', 
    alt: 'Apex 2025 Audience', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-lollipop.png', 
    alt: 'Apex 2025 Lollipop Sign', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-signage2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-stage4.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-prod5.png', 
    alt: 'Apex 2025 Standing Sign', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-stage.png', 
    alt: 'Apex 2025 Floor Signage', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-prod6.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  { 
    src: '/apex_2025/apex_2025-stage2.png', 
    alt: 'Apex 2025 Desk', 
    colSpan: 1, 
    ratio: 'square',
    type: 'img'
  },
  {
  src: '/apex_2025/apex_2025-stats.png',
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

type MediaProps = {
  item: ShowcaseItem;
};

const VideoContent: React.FC<MediaProps> = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && <Skeleton className="absolute inset-0" aria-hidden="true" />}
      <video
        src={item.src!}
        aria-label={item.alt}
        className={cn(
          contentClass,
          mediaClass,
          'transition-opacity duration-500',
          !isLoaded && 'opacity-0'
        )}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

const ImageContent: React.FC<MediaProps> = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${contentClass}`}>
      {!isLoaded && <Skeleton className="absolute inset-0" aria-hidden="true" />}
      <Image
        src={item.src!}
        alt={item.alt ?? ''}
        fill
        className={cn(mediaClass, 'transition-opacity duration-500', !isLoaded && 'opacity-0')}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
        onLoadingComplete={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

const MediaContent: React.FC<MediaProps> = ({ item }) => {
  if (item.type === 'embed' && item.embedHtml) {
    return (
      <div
        className={`${contentClass} non-scaling-embed`}
        dangerouslySetInnerHTML={{ __html: item.embedHtml }}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      />
    );
  }

  if (item.type === 'video') {
    return <VideoContent item={item} />;
  }

  if (item.type === 'img') {
    return <ImageContent item={item} />;
  }

  return null;
};

export const Apex2025Showcase = (): React.ReactElement => {
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
            <MediaContent item={item} />
          </div>
        );
      })}
    </div>
  );
};