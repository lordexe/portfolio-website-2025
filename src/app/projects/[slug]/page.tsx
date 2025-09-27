import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Reusing constants from the Home page for consistent styling/structure
const NAV_HEIGHT = '88px'; 
const FIXED_TOP_HEIGHT = '300px'; 
const BACKGROUND_COLOR = '#18181a'; 

// Placeholder function to fetch project data based on the slug
// In a real application, this would fetch data from a CMS or local JSON file.
async function getProjectData(slug: string) {
  // Mock data for a single project
  return {
    slug: slug,
    name: "Project Title Placeholder",
    subtitle: "A Brief Subtitle for the Project",
    reelVideoUrl: "/home/reel_preview.mp4", // Using the existing reel for a quick demo
    info: {
      client: "Client Name",
      role: "Lead Designer",
      year: "2025",
      description: "This is a detailed description of the project, highlighting the challenges, process, and final outcomes. It can span multiple paragraphs to fully articulate the design thinking and technical implementation. The project aimed to solve a complex user problem through innovative and accessible design."
    },
    showcaseImages: [
      "https://images.unsplash.com/photo-1510901509170-0d19525c57ac?fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540608677465-b77a06488d5e?fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532057636367-e9a92440b8cf?fit=crop&w=1200&q=80",
    ],
    nextProjectSlug: "/projects/stellar-cartography",
    nextProjectName: "Stellar Cartography",
  };
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectData(params.slug);

  return (
    <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
      
      {/* Fixed Site Header (Nav) */}
      <div 
        className={`fixed inset-x-0 top-0 z-50 bg-[${BACKGROUND_COLOR}]`}
        style={{ height: NAV_HEIGHT }}
      >
        <SiteHeader />
      </div>

      {/* Fixed Hero Section (Project Name) */}
      <section 
        id="project-hero" 
        className={`fixed inset-x-0 top-0 z-0 bg-[${BACKGROUND_COLOR}] pointer-events-none`}
        style={{ paddingTop: NAV_HEIGHT }} 
      >
        <div className="p-10 pb-2 h-full flex flex-col justify-end pointer-events-auto">
          <h1 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl">
            {project.name}
          </h1>
          <p className="text-xl text-[#f4f4f5]/80 mt-2">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area - starts below the fixed hero */}
      <main 
        className="flex flex-1 flex-col min-h-screen z-10"
        style={{ paddingTop: FIXED_TOP_HEIGHT }}
      >
        
        {/* Project Reel Section */}
        <section id="project-reel" className={`px-10 -my-[80px] pb-[80px]`}>
          <div
            className="h-[150px] w-full"
            style={{
              background: 'linear-gradient(to top, #18181A, rgba(24, 24, 26, 0))',
            }}
          />
          <div className={`bg-[${BACKGROUND_COLOR}]`}>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-gray-700">
              <video 
                src={project.reelVideoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div className="flex justify-center items-start mt-8 text-xl font-medium text-[#f4f4f5]/80 uppercase tracking-widest">
              Project Reel
            </div>
          </div>
        </section>
        
        {/* Project Info Section */}
        <section id="project-info" className={`p-10 pt-30 bg-[${BACKGROUND_COLOR}]`}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1 text-2xl font-semibold text-[#D2F65A]">
              Project Details
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-3 gap-4 mb-10 text-lg">
                <div>
                  <h3 className="text-[#f4f4f5]/60">Client</h3>
                  <p className="text-[#f4f4f5] font-medium">{project.info.client}</p>
                </div>
                <div>
                  <h3 className="text-[#f4f4f5]/60">Role</h3>
                  <p className="text-[#f4f4f5] font-medium">{project.info.role}</p>
                </div>
                <div>
                  <h3 className="text-[#f4f4f5]/60">Year</h3>
                  <p className="text-[#f4f4f5] font-medium">{project.info.year}</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed text-[#f4f4f5]/90">
                {project.info.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Project Showcase Section */}
        <section id="project-showcase" className={`p-10 pt-16 bg-[${BACKGROUND_COLOR}]`}>
          <h2 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl mb-12 text-center">
            Showcase
          </h2>
          <div className="space-y-16">
            {project.showcaseImages.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Project detail ${index + 1}`} 
                className="w-full h-auto object-cover rounded-3xl shadow-2xl"
              />
            ))}
          </div>
        </section>

        {/* Next Up Section */}
        <section id="next-up" className={`p-10 pt-20 bg-[${BACKGROUND_COLOR}]`}>
          <div className="text-center">
            <p className="text-lg uppercase tracking-wider text-[#f4f4f5]/60 mb-4">
              Next Up
            </p>
            <a 
              href={project.nextProjectSlug} 
              className="group inline-block transition-transform duration-300 hover:scale-[1.02]"
            >
              <h2 className="font-saans text-5xl leading-tight tracking-tight text-[#f4f4f5] sm:text-6xl md:text-8xl">
                {project.nextProjectName}
              </h2>
              <span className="inline-block mt-4 text-xl font-medium text-[#D2F65A] transition-colors duration-200 group-hover:text-[#fafafa]">
                View Project &rarr;
              </span>
            </a>
          </div>
        </section>
        
      </main>

      <SiteFooter />
    </div>
  );
}