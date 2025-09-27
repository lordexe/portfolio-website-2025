import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="px-10 py-5">
      <nav className="flex w-full items-center justify-between">
        <Link className="flex items-center gap-3" href="/" aria-label="Ani Chauhan home">
          <span className="inline-flex h-8 w-8 items-center justify-center">
            <svg
              width="54"
              height="53"
              viewBox="0 0 54 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M26.7539 0L33.9113 19.3426L53.2539 26.5L33.9113 33.6574L26.7539 53L19.5965 33.6574L0.253906 26.5L19.5965 19.3426L26.7539 0Z"
                fill="#D2F65A"
              />
            </svg>
          </span>
          <span className="flex flex-col font-saans text-lg leading-tight">
            <span>Ani</span>
            <span>Chauhan</span>
          </span>
        </Link>
        <div className="flex items-center gap-10 text-lg font-medium">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors duration-200 hover:text-[#fafafa]">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="mailto:thechauhananirudh@gmail.com"
          className="rounded-full bg-[#D2F65A] px-6 py-2 text-lg font-semibold text-[#18181a] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}