import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Re-created based on the InlineLink component from page.tsx
type InlineLinkProps = {
  href: string;
  children: React.ReactNode;
};

const InlineLink: React.FC<InlineLinkProps> = ({ href, children }) => {
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


export function Footer(): React.ReactElement {
  return (
    <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-5 md:px-20 py-5 text-lg text-[#f4f4f5]/60 border-t border-[#f4f4f5]/10 mt-20">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <InlineLink href="mailto:thechauhananirudh@gmail.com">
          thechauhananirudh@gmail.com
        </InlineLink>
        <InlineLink href="https://www.linkedin.com/in/anichauhan01/">
          LinkedIn
        </InlineLink>
      </div>
      <div>
        <span>Ani Chauhan © 2025</span>
      </div>
    </footer>
  );
}