import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const HIGHLIGHT_COLOR = '#D2F65A';
const HIGHLIGHT_STYLE = { color: HIGHLIGHT_COLOR };

type ShowcaseItem = {
  src?: string;
  alt?: string;
  colSpan: 1 | 2 | 4;
  ratio: 'square' | 'wide' | 'portrait' | string;
  type: 'img' | 'video' | 'embed' | 'text';
  embedHtml?: string;
  title?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
};

type InlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
};

const InlineLink: React.FC<InlineLinkProps> = ({ href, children, ...props }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1 text-white/70 hover:text-white transition-colors duration-200 underline underline-offset-4 group"
      {...props}
    >
      <span>{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
    </a>
  );
};

const parseTextWithCustomTags = (text: string, startTag: string, endTag: string, style?: React.CSSProperties) => {
  if (!text) return null;
  
  const parts = text.split(startTag);

  return parts.map((section, sectionIndex) => {
    if (!section.includes(endTag)) {
      return <React.Fragment key={sectionIndex}>{section}</React.Fragment>;
    }

    const [highlightedText, followingText] = section.split(endTag);

    return (
      <React.Fragment key={sectionIndex}>
        <span style={style}>{highlightedText}</span>
        {followingText}
      </React.Fragment>
    );
  });
};

const SHORTS_SHOWCASE_DATA: ShowcaseItem[] = [
    {
    title: 'TWO SHORTS, TWO WEEKS, AND LOTS OF FUN. LEARNED A TON ALONG THE WAY.',
    colSpan: 2,
    ratio: 'square',
    type: 'text',
    },
    {
    alt: 'Glint Short',
    colSpan: 1,
    ratio: 'portrait',
    type: 'embed',
    embedHtml:
      `<div style="padding:177.78% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/930920822?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Glint"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
    },
    {
    alt: 'Designer\'s Block Short',
    colSpan: 1,
    ratio: 'portrait',
    type: 'embed',
    embedHtml:
      `<div style="padding:177.78% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/930915245?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Designer's Block"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
    },
    { src: '/shorts/shorts-shot1.mp4', alt: 'Shorts Social Card', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot2.mp4', alt: 'Shorts Intro video', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot3.mp4', alt: 'Shorts Signage', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot4.mp4', alt: 'Shorts Check In', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot5.mp4', alt: 'Shorts Signage', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot6.mp4', alt: 'Shorts Check In', colSpan: 2, ratio: 'wide', type: 'video' },
    {
    title: 'A much requested tutorial about my process',
    description: 'Following the posting of my animation on Reddit, I was inundated with an influx of comments requesting a tutorial. In response, I crafted a comprehensive breakdown of my animation and shared it on YouTube. This garnered notable recognition from prominent figures such as Ben Marriott and School of Motion, and propelled me to start my own YouTube journey. Check out the ',
    linkText: ' tutorial.',
    linkHref: 'https://www.youtube.com/watch?v=8KTnXxW4n7E',
    colSpan: 2,
    ratio: 'wide',
    type: 'text',
    },
    {
    alt: 'Shorts Tutorial',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/8KTnXxW4n7E?si=L-OIpKQHhSJEU-Gw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    },
    { src: '/shorts/shorts-shot8.mp4', alt: 'Shorts Signage', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/shorts/shorts-shot9.mp4', alt: 'Shorts Check In', colSpan: 2, ratio: 'wide', type: 'video' },
];

const contentClass = "w-full h-full";
const mediaClass = "object-cover transition-transform duration-300 hover:scale-105";

type MediaProps = {
  item: ShowcaseItem;
};

const TextContent: React.FC<MediaProps> = ({ item }) => (
  <div className="flex flex-col items-start justify-start h-full w-full">
    <div className="p-0">
      <h2 className="text-left text-5xl font-normal mb-4 text-white">
        {item.title ? parseTextWithCustomTags(item.title, '##HL_START##', '##HL_END##', HIGHLIGHT_STYLE) : null}
      </h2>
      <p className="text-left text-white opacity-90">
        {item.description}
        {item.linkText && item.linkHref && (
          <>
            {' '}
            <InlineLink href={item.linkHref}>{item.linkText}</InlineLink>
          </>
        )}
      </p>
    </div>
  </div>
);

const EmbedContent: React.FC<MediaProps> = ({ item }) => (
  <div
    className={`${contentClass} non-scaling-embed`}
    dangerouslySetInnerHTML={{ __html: item.embedHtml ?? '' }}
    style={{ position: 'relative', width: '100%', height: '100%' }}
  />
);

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

  const desktopSizes: { [key: number]: string } = {
    1: '25vw',
    2: '50vw',
    4: '100vw',
  };

  const dynamicSizes = `(min-width: 768px) ${desktopSizes[item.colSpan]}, 100vw`;

  return (
    <div className={`relative ${contentClass}`}>
      {!isLoaded && <Skeleton className="absolute inset-0" aria-hidden="true" />}
      <Image
        src={item.src!}
        alt={item.alt ?? ''}
        fill
        className={cn(mediaClass, 'transition-opacity duration-500', !isLoaded && 'opacity-0')}
        sizes={dynamicSizes}
        onLoadingComplete={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
};

const MediaContent: React.FC<MediaProps> = ({ item }) => {
  if (item.type === 'text') {
    return <TextContent item={item} />;
  }

  if (item.type === 'embed') {
    return <EmbedContent item={item} />;
  }

  if (item.type === 'video') {
    return <VideoContent item={item} />;
  }

  if (item.type === 'img') {
    return <ImageContent item={item} />;
  }

  return null;
};

export const ShortsShowcase = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
      {SHORTS_SHOWCASE_DATA.map((item, index) => {
        let aspectRatioClass;

        if (item.ratio === 'portrait') {
            aspectRatioClass = 'aspect-[9/16]';
        } else if (item.colSpan === 1) {
            aspectRatioClass = item.ratio === 'square' ? 'aspect-square' : 'aspect-[16/9]';
        } else {
            if (item.ratio === 'wide') {
                 aspectRatioClass = 'aspect-video';
            } else {
                 aspectRatioClass = 'aspect-video md:aspect-square';
            }
        }

        if (item.type === 'text' && aspectRatioClass) {
          aspectRatioClass = `md:${aspectRatioClass}`;
        }
        
        let colSpanClass;

        if (index === 0) {
            colSpanClass = 'col-span-2 md:col-span-4 lg:col-span-2';
        } else if (index === 1 || index === 2) {
            colSpanClass = 'col-span-2 md:col-span-2 lg:col-span-1';
        } 
        else {
            switch (item.colSpan) {
                case 1:
                    colSpanClass = 'col-span-1';
                    break;
                case 4:
                    colSpanClass = 'col-span-2 md:col-span-4';
                    break;
                case 2:
                default:
                    colSpanClass = 'col-span-2 md:col-span-2';
                    break;
            }
        }

        return (
          <div
            key={index}
            className={`${colSpanClass} overflow-hidden ${item.type !== 'text' ? 'rounded-xl md:rounded-2xl' : ''} ${aspectRatioClass} ${item.type === 'embed' ? 'bg-black' : ''} ${item.type === 'text' ? 'p-6 sm:p-8' : ''}`}
          >
            <MediaContent item={item} />
          </div>
        );
      })}
    </div>
  );
};