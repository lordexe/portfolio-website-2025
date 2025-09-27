import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Portfolio",
  description: "A minimalist starting point for the portfolio homepage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#18181a] text-[#f4f4f5] antialiased`}
      >
        <div className="relative min-h-screen">
          <header className="fixed inset-x-0 top-0 z-50 bg-[#18181a]/80 px-10 py-6">
            <nav className="flex w-full items-center justify-between">
              <a className="flex items-center gap-3" href="#home" aria-label="Ani Chauhan home">
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
              </a>
              <div className="flex items-center gap-10 text-lg font-medium">
                {[
                  { href: "#work", label: "Work" },
                  { href: "#reel", label: "Reel" },
                  { href: "#about", label: "About" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[#fafafa]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="rounded-full bg-[#D2F65A] px-6 py-2 text-lg font-semibold text-[#18181a]"
              >
                Get in Touch
              </a>
            </nav>
          </header>
          <main className="pt-32">{children}</main>
        </div>
      </body>
    </html>
  );
}
