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

const DURALAST_SHOWCASE_DATA: ShowcaseItem[] = [
    { src: '/duralast_mechanics/duralast_mechanics-motion1.mp4', alt: 'Duralast Social Card', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/duralast_mechanics/duralast_mechanics-motion2.mp4', alt: 'Duralast Intro video', colSpan: 2, ratio: 'wide', type: 'video' },
    { src: '/duralast_mechanics/duralast_mechanics-image1.png', alt: 'Duralast Intro video', colSpan: 4, ratio: 'wide', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image2.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image3.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image4.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image5.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image6.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image7.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image8.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
    { src: '/duralast_mechanics/duralast_mechanics-image9.png', alt: 'Duralast Intro video', colSpan: 1, ratio: 'square', type: 'img' },
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

export const DuralastMechanicsShowcase = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {DURALAST_SHOWCASE_DATA.map((item, index) => {
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
