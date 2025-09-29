import React from 'react';
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

const RIPPLE_SHOWCASE_DATA = [
  { 
    title: 'A TEASER TO GET PEOPLE EXCITED, GETTING ALMOST ##HL_START##HALF A MILLION##HL_END## VIEWS',
    description: 'See for youreslf. Check out the ',
    linkText: ' tweet.',
    linkHref: 'https://x.com/Ripple/status/1890489428809863170',
    colSpan: 2, 
    ratio: 'wide',
    type: 'text'
  },
  {
    alt: 'Ripple Brand Refresh Teaser',
    colSpan: 2,
    ratio: 'wide',
    type: 'embed',
    embedHtml: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1122560525?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Ripple Brand Refresh"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
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
    description: 'This allowed us to quickly generate brand-compliant assets. Thing that took days before now take minutes. This plugin is available for the entire design team at Ripple.',
    colSpan: 2,
    ratio: 'wide',
    type: 'text'
  },
  { src: '/ripple_refresh/ripple_refresh-plugin.mp4', alt: 'Ripple Refresh Custom Plugin', colSpan: 2, ratio: 'wide', type: 'video' },
];

const colSpanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  4: 'lg:col-span-4',
};

const contentClass = "w-full h-full transition-transform duration-300";
const imageVideoClass = contentClass + " object-cover hover:scale-105";

export const RippleRefreshShowcase = () => {
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
                  className={imageVideoClass}
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
                    className={contentClass + " non-scaling-embed"}
                    dangerouslySetInnerHTML={{ __html: item.embedHtml }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                />
             );
        } else {
            content = (
                <img
                  src={item.src}
                  alt={item.alt}
                  className={imageVideoClass}
                  loading="lazy"
                />
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