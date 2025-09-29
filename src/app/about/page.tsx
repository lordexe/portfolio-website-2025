"use client";

import Image from "next/image";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col px-5 py-50 md:px-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <Image
                src="/about/AniChauhan.png"
                alt="Ani Chauhan"
                width={360}
                height={800}
                className="h-[380px] w-full md:max-w-xs rounded-lg object-cover"
                priority
              />
            </div>
            <div className="max-w-2xl space-y-6 text-lg text-[#d4d4d8]">
              <p>
                For me, design started as a curiosity—as a musician and a developer,
                I began creating visuals to support my work. That spark grew into a
                passion for motion and design, where I now focus on turning complex
                ideas into clear, human experiences.
              </p>
              <p>
                I’m an award-winning designer with 5+ years of experience
                collaborating with individuals, startups, and global companies. My
                work spans large-scale product premieres, international ad
                campaigns, and global events—alongside plenty of other fun,
                challenging projects that push creativity and craft.
              </p>
              <p>
                Select awards include NASA Conrad Innovation, Ravie Animation Challenge, AngelHack Hackathon, and multiple Design Challenge Awards. 
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}