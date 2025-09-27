import { SiteHeader } from "@/components/site-header";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col p-10">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="font-saans text-4xl text-[#f4f4f5]">Projects</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#d4d4d8]">
            A showcase of motion, brand, and immersive product collaborations will live here soon.
          </p>
        </div>
      </main>
    </div>
  );
}
