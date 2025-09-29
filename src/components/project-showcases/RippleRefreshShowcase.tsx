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

const RIPPLE_SHOWCASE_DATA: ShowcaseItem[] = [
  {
    title: 'A TEASER TO GET PEOPLE EXCITED, GETTING ALMOST ##HL_START##HALF A MILLION##HL_END## VIEWS',
    description: 'See for youreslf. Check out the ',
    linkText: ' tweet.',
    linkHref: 'https://x.com/Ripple/status/1890489428809863170',
    colSpan: 2,
    ratio: 'wide',
    type: 'text',
  },
  {
    alt: 'Ripple Brand Refresh Teaser',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml:
      `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1122560525?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Ripple Brand Refresh"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
  },
  { src: '/ripple_refresh/ripple_refresh-color.mp4', alt: 'Ripple Refresh Colors', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-illustrations.mp4', alt: 'Ripple Refresh Illustrations', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-icons2.mp4', alt: 'Ripple Refresh Icons', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-logo.mp4', alt: 'Ripple Refresh Logo', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-mock3.png', alt: 'Ripple Refresh Billboard', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/ripple_refresh/ripple_refresh-mock1.png', alt: 'Ripple Refresh Cube', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/ripple_refresh/ripple_refresh-illustrations1.png', alt: 'Ripple Refresh Illustrations', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/ripple_refresh/ripple_refresh-curves.mp4', alt: 'Ripple Refresh Motion Curves', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-booth.jpg', alt: 'Ripple Refresh Booth', colSpan: 4, ratio: 'wide', type: 'img' },
  { src: '/ripple_refresh/ripple_refresh-consensus_cube.mp4', alt: 'Ripple Refresh Consensus Cube', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-custody.mp4', alt: 'Ripple Refresh Custody Campaign', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/ripple_refresh/ripple_refresh-templates.png', alt: 'Ripple Refresh Templates', colSpan: 4, ratio: 'wide', type: 'img' },
  { src: '/ripple_refresh/ripple_refresh-illustrations3.png', alt: 'Ripple Refresh Illustrations', colSpan: 4, ratio: 'wide', type: 'img' },
  {
    title: 'MADE A CUSTOM PLUGIN TO COMBINE 12 STEPS INTO 1',
    description:
      'This allowed us to quickly generate brand-compliant assets. Thing that took days before now take minutes. This plugin is available for the entire design team at Ripple.',
    colSpan: 2,
    ratio: 'wide',
    type: 'text',
  },
  { src: '/ripple_refresh/ripple_refresh-plugin.mp4', alt: 'Ripple Refresh Custom Plugin', colSpan: 2, ratio: 'wide', type: 'video' },
];

const colSpanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  4: 'lg:col-span-4',
};

const contentClass = 'w-full h-full';
const mediaClass = 'object-cover transition-transform duration-300 hover:scale-105';

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

export const RippleRefreshShowcase = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {RIPPLE_SHOWCASE_DATA.map((item, index) => {
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
            className={`col-span-2 ${colSpanClasses[item.colSpan as 1 | 2 | 4]} overflow-hidden ${item.type !== 'text' ? 'rounded-xl md:rounded-2xl' : ''} ${aspectRatioClass} ${item.type === 'embed' ? 'bg-black' : ''} ${item.type === 'text' ? 'bg-transparent' : ''}`}
          >
            <MediaContent item={item} />
          </div>
        );
      })}
    </div>
  );
};