import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getProjectDataBySlug, ProjectData } from "@/data/projects";

const NAV_HEIGHT = '88px'; 
const FIXED_TOP_HEIGHT = '300px'; 
const BACKGROUND_COLOR = '#18181a'; 

async function getProjectData(slug: string): Promise<ProjectData> {
  const projectData = getProjectDataBySlug(slug);
  if (!projectData) {
    throw new Error(`Project with slug ${slug} not found`);
  }
  return projectData;
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectData(params.slug);
  const ShowcaseComponent = project.showcaseComponent;

  return (
    <div className={`flex min-h-screen flex-col bg-[${BACKGROUND_COLOR}]`}>
      
      <div 
        className={`fixed inset-x-0 top-0 z-50 bg-[${BACKGROUND_COLOR}]`}
        style={{ height: NAV_HEIGHT }}
      >
        <Nav />
      </div>

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

      <main 
        className="flex flex-1 flex-col min-h-screen z-10"
        style={{ paddingTop: FIXED_TOP_HEIGHT }}
      >
        
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
        
        <section id="project-showcase" className={`p-10 pt-16 bg-[${BACKGROUND_COLOR}]`}>
          <h2 className="font-saans text-4xl leading-tight tracking-tight text-[#f4f4f5] sm:text-5xl md:text-6xl mb-12 text-center">
            Showcase
          </h2>
          <div className="max-w-7xl mx-auto">
            <ShowcaseComponent />
          </div>
        </section>

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

      <Footer />
    </div>
  );
}