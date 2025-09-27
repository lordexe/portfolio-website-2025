import { Nav } from "@/components/nav";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col p-10">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="font-saans text-4xl text-[#f4f4f5]">About</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#d4d4d8]">
            More about Ani’s process, approach, and background will be shared here shortly.
          </p>
        </div>
      </main>
    </div>
  );
}
