import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mocking the Next.js Link component for compatibility in this environment.
// In your Next.js project, you would use: import Link from "next/link";
const Link = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

const BRAND_COLOR = "#D2F65A";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const contactLink = {
  href: "mailto:thechauhananirudh@gmail.com",
  label: "Get in Touch",
};

const mobileMenuLinks = [...links, contactLink];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const navLinksContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const navLinkVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "tween", duration: 0.4, ease: "circOut" } },
    hidden: { y: "-150%", opacity: 1, transition: { type: "tween", duration: 0.3, ease: "circIn" } },
  };

  const mobileMenuContainerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };
  
  const mobileLinkVariants = {
    open: { y: 0, opacity: 1, transition: { type: "tween", ease: "circOut", duration: 0.4 } },
    closed: { y: "100%", opacity: 0, transition: { type: "tween", ease: "circIn", duration: 0.3 } },
  };

  return (
    <header className={`px-5 md:px-20 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}>
      <nav className="relative flex w-full items-center">
        <div className="flex-1 flex justify-start">
          <Link className="flex items-center gap-3 z-40" href="/" aria-label="Ani Chauhan home">
            <span className="inline-flex h-8 w-8 items-center justify-center">
              <svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d="M26.7539 0L33.9113 19.3426L53.2539 26.5L33.9113 33.6574L26.7539 53L19.5965 33.6574L0.253906 26.5L19.5965 19.3426L26.7539 0Z" fill={BRAND_COLOR}/>
              </svg>
            </span>
            <span className="flex flex-col font-saans text-lg leading-tight">
              <span>Ani</span>
              <span>Chauhan</span>
            </span>
          </Link>
        </div>

        <motion.div
          onMouseLeave={() => setHoveredLink(null)}
          className="hidden md:flex items-center gap-6 text-lg font-medium"
          initial="hidden"
          animate={isScrolled ? "hidden" : "visible"}
          variants={navLinksContainerVariants}
        >
          {links.map((l) => (
            <div key={l.href}>
              <motion.div
                variants={navLinkVariants}
                className="relative"
                onMouseEnter={() => setHoveredLink(l.href)}
              >
                {hoveredLink === l.href && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: "#35353E" }}
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 50 }}
                  />
                )}
                <Link
                  href={l.href}
                  className={`relative z-10 block px-4 py-1.5 transition-all duration-300 ${
                    hoveredLink ? (hoveredLink === l.href ? "text-[#fafafa]" : "opacity-60") : "hover:text-[#fafafa]"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <div className="flex-1 flex justify-end">
          <button className="md:hidden z-40 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#18181a]" style={{ backgroundColor: BRAND_COLOR }} onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>

          <div className="hidden md:block relative h-10 w-auto">
            <AnimatePresence initial={false}>
              {!isScrolled ? (
                <motion.div
                  key="get-in-touch-btn"
                  className="absolute top-0 right-0 h-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: "circOut" } }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "circIn" } }}
                  style={{ transformOrigin: "right" }}
                >
                  <motion.div
                    className="relative h-full"
                    onHoverStart={() => setIsButtonHovered(true)}
                    onHoverEnd={() => setIsButtonHovered(false)}
                  >
                    <Link
                      href={contactLink.href}
                      className="relative z-10 inline-flex items-center h-full whitespace-nowrap rounded-full px-6 text-lg font-semibold text-[#18181a] transition-transform duration-200"
                      style={{ backgroundColor: BRAND_COLOR }}
                    >
                      {contactLink.label}
                    </Link>

                    <AnimatePresence>
                      {isButtonHovered && (
                        <motion.div
                          className="absolute top-0 left-0 h-10 w-10 rounded-full flex items-center justify-center text-xl z-0"
                          style={{ backgroundColor: BRAND_COLOR }}
                          initial={{ x: 0, rotate: 180 }}
                          animate={{ x: "-100%", rotate: 0 }}
                          exit={{ x: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                          🤙🏽
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="hamburger-btn-desktop"
                  className="absolute top-0 right-0 h-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, ease: "circOut" } }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "circIn" } }}
                  style={{ transformOrigin: "right" }}
                >
                  <button
                    className="inline-flex h-full w-10 items-center justify-center rounded-full text-[#18181a]"
                    style={{ backgroundColor: BRAND_COLOR }}
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu size={23} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {open && <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true"/>}
        <motion.div className="absolute top-0 right-0 z-40 overflow-hidden rounded-3xl" style={{ backgroundColor: BRAND_COLOR, transformOrigin: "top right" }} initial={false} animate={open ? "open" : "closed"} variants={{ open: { width: "250px", height: "auto", transition: { type: "tween", duration: 0.5, ease: "circOut" } }, closed: { width: 0, height: 0, transition: { type: "tween", duration: 0.5, ease: "circIn" } }}}>
          <div className="w-64 p-4">
            <div className="flex items-center justify-between">
              <span className="pl-4 text-xs font-bold opacity-50 text-[#18181a]">MENU</span>
              <button className="rounded-full p-2" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} color="#18181a" />
              </button>
            </div>
            <motion.ul className="mt-2 flex flex-col" initial="closed" animate={open ? "open" : "closed"} variants={mobileMenuContainerVariants}>
              {mobileMenuLinks.map((l) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div variants={mobileLinkVariants}>
                    <Link
                      href={l.href}
                      className="block py-2 pl-4 text-lg font-semibold text-[#18181a] hover:opacity-80"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}