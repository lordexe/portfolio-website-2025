import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const BRAND_COLOR = "#D2F65A";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "mailto:thechauhananirudh@gmail.com", label: "Get in Touch" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <header className="px-5 py-5 md:px-20">
      <nav className="relative flex w-full items-center justify-between">
        <Link className="flex items-center gap-3 z-40" href="/" aria-label="Ani Chauhan home">
          <span className="inline-flex h-8 w-8 items-center justify-center">
            <svg width="54" height="53" viewBox="0 0 54 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path d="M26.7539 0L33.9113 19.3426L53.2539 26.5L33.9113 33.6574L26.7539 53L19.5965 33.6574L0.253906 26.5L19.5965 19.3426L26.7539 0Z" fill={BRAND_COLOR} />
            </svg>
          </span>
          <span className="flex flex-col font-saans text-lg leading-tight">
            <span>Ani</span>
            <span>Chauhan</span>
          </span>
        </Link>

        <button
          className="md:hidden z-40 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#18181a]"
          style={{ backgroundColor: BRAND_COLOR }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center gap-10 text-lg font-medium">
          {links.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors duration-200 hover:text-[#fafafa]">
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="mailto:thechauhananirudh@gmail.com"
          className="hidden md:block rounded-full px-6 py-2 text-lg font-semibold text-[#18181a] transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          Get in Touch
        </Link>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <motion.div
          className="md:hidden absolute top-0 right-0 z-40 overflow-hidden rounded-xl"
          style={{ backgroundColor: BRAND_COLOR, transformOrigin: "top right" }}
          initial={false}
          animate={open ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "tween", duration: 0.6, ease: "circInOut" }}
        >
          <div className="w-64 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold opacity-50 text-[#18181a]">MENU</span>
              <button
                className="rounded-full p-2"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} color="#18181a"/>
              </button>
            </div>

            <motion.ul
              className="mt-2 flex flex-col"
              initial="closed"
              animate={open ? "open" : "closed"}
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    open: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.35, ease: "circOut" } },
                    closed: { x: -12, opacity: 0, transition: { type: "tween", duration: 0.18, ease: "circIn" } },
                  }}
                >
                  <Link
                    href={l.href}
                    className="block py-2 text-lg font-semibold text-[#18181a] hover:opacity-80"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}