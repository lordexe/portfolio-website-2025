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
  ratio: 'square' | 'wide' | string;
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

const LAJOTE_SHOWCASE_DATA: ShowcaseItem[] = [
  { 
    title: 'COMMERCIAL MODELLED, STAGED, AND ANIMATED IN CINEMA4D + REDSHIFT',
    colSpan: 2, 
    ratio: 'wide',
    type: 'text'
  },
  {
    alt: 'La Jote Commercial',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/931831648?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="La Jote Commercial"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
  },
  { src: '/la_jote/la_jote-shot1.mp4', alt: 'La Jote Commercial', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/la_jote/la_jote-shot2.mp4', alt: 'La Jote Commercial', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/la_jote/la_jote-process.mp4', alt: 'La Jote Process', colSpan: 4, ratio: 'wide', type: 'video' },
  { src: '/la_jote/la_jote-box_model.mp4', alt: 'La Jote Box Modelling', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/la_jote/la_jote-pen_model.mp4', alt: 'La Jote Pen Modelling', colSpan: 2, ratio: 'wide', type: 'video' },
  { 
    title: 'DOCUMENTING MY PROCESS, AND SOME FUN ALONG THE WAY FOR YOUTUBE',
    colSpan: 2, 
    ratio: 'wide',
    type: 'text'
  },
  {
    alt: 'La Jote YouTube Video',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/h6TTFKjpE-Q?si=2T-RaX6rddHIHuHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  { src: '/la_jote/la_jote-photo5.png', alt: 'La Jote Refresh Motion Curves', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/la_jote/la_jote-photo2.png', alt: 'La Jote Refresh Booth', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/la_jote/la_jote-gold.mp4', alt: 'La Jote Refresh Consensus Cube', colSpan: 1, ratio: 'square', type: 'video' },
  { src: '/la_jote/la_jote-photo3.png', alt: 'La Jote Refresh Custody Campaign', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/la_jote/la_jote-gallery.png', alt: 'La Jote Refresh Templates', colSpan: 4, ratio: 'wide', type: 'img' },
  { 
    title: 'THE OG DOLLAR TREE BOX THAT STARTED IT ALL',
    colSpan: 2, 
    ratio: 'wide',
    type: 'text'
  },
  { src: '/la_jote/la_jote-original.png', alt: 'La Jote Refresh Orignial Box', colSpan: 2, ratio: 'wide', type: 'img' },
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

export const LaJoteRefreshShowcase = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {LAJOTE_SHOWCASE_DATA.map((item, index) => {
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
            className={`col-span-2 ${colSpanClasses[item.colSpan]} overflow-hidden ${item.type !== 'text' ? 'rounded-xl md:rounded-2xl' : ''} ${aspectRatioClass} ${item.type === 'embed' ? 'bg-black' : ''} ${item.type === 'text' ? 'bg-transparent' : ''}`}
          >
            <MediaContent item={item} />
          </div>
        );
      })}
    </div>
  );
};