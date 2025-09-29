import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const HIGHLIGHT_COLOR = '#D2F65A';
const HIGHLIGHT_STYLE = { color: HIGHLIGHT_COLOR };

const InlineLink = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-1 text-white/70 hover:text-white transition-colors duration-200 underline underline-offset-4 group"
    >
      <span>{children}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
    </a>
  );
};

const parseTextWithCustomTags = (text, startTag, endTag, style) => {
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

const SWELLMIAMI_SHOWCASE_DATA = [
  {
    alt: 'Swell Miami Recap',
    colSpan: 4,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/oV5w-Urm3Ls?si=6tQQnBCwbjdQpxfw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  },
  { src: '/swell_miami/swell_miami-social_card.mp4', alt: 'Swell Miami Social Card', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/swell_miami/swell_miami-intro_video.mp4', alt: 'Swell Miami Intro video', colSpan: 2, ratio: 'wide', type: 'video' },
  { src: '/swell_miami/swell_miami-experience1.mp4', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'video' },
  { src: '/swell_miami/swell_miami-experience2.mp4', alt: 'Swell Miami Check In', colSpan: 1, ratio: 'square', type: 'video' },
  { src: '/swell_miami/swell_miami-experience3.mp4', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'video' },
  { src: '/swell_miami/swell_miami-experience4.mp4', alt: 'Swell Miami Check In', colSpan: 1, ratio: 'square', type: 'video' },
  { src: '/swell_miami/swell_miami-stage1.png', alt: 'Swell Miami Stage', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-stage2.png', alt: 'Swell Miami Stage', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-signage2.png', alt: 'Swell Miami Stage', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-experience11.png', alt: 'Swell Miami Ampitheater', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-signage3.png', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-experience6.jpg', alt: 'Swell Miami Check In', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-reg.png', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-signage4.png', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-experience9.png', alt: 'Swell Miami Swellebration', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-experience10.png', alt: 'Swell Miami Stage', colSpan: 2, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-experience8.png', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-experience7.png', alt: 'Swell Miami Check In', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-gifts.png', alt: 'Swell Miami Gifts', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-experience5.png', alt: 'Swell Miami Signage', colSpan: 1, ratio: 'square', type: 'img' },
  { src: '/swell_miami/swell_miami-guidelines.png', alt: 'Swell Miami Guidelines', colSpan: 4, ratio: 'wide', type: 'img' },
  { src: '/swell_miami/swell_miami-reel.mp4', alt: 'Swell Miami Motion', colSpan: 4, ratio: 'wide', type: 'video' },
];

const colSpanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  4: 'lg:col-span-4',
};

const contentClass = "w-full h-full";
const mediaClass = "object-cover transition-transform duration-300 hover:scale-105";

export const SwellMiamiRefreshShowcase = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {SWELLMIAMI_SHOWCASE_DATA.map((item, index) => {
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
        
        if (item.type === 'text') {
             content = (
                <div className="flex flex-col items-start justify-start h-full w-full">
                    <div className="p-0">
                        <h2 className="text-left text-5xl font-normal mb-4 text-white">
                            {parseTextWithCustomTags(item.title, '##HL_START##', '##HL_END##', HIGHLIGHT_STYLE)}
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
        } else if (item.type === 'video') {
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
            className={`col-span-2 ${colSpanClasses[item.colSpan]} overflow-hidden ${item.type !== 'text' ? 'rounded-xl md:rounded-2xl' : ''} ${aspectRatioClass} ${item.type === 'embed' ? 'bg-black' : ''} ${item.type === 'text' ? 'bg-transparent' : ''}`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};