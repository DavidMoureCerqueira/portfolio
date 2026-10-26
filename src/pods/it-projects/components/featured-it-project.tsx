import { Button, SectionHeader } from "../../../common-app/components";
import type { ItProjectPreview as ItProjectPreviewVm } from "../it-projects-preview/it-project-preview.vm";
import { ItProjectPreview } from "./it-project-preview";

interface FeaturedItProjectProps {
  itProject: ItProjectPreviewVm;
}

// Proyecto IT destacado en Home: siempre uno, el último
export function FeaturedItProject({ itProject }: FeaturedItProjectProps) {
  return (
    <section className="mt-12 md:mt-20">
      <SectionHeader
        number={5}
        name="Proyectos"
        title="Lo último que he construido"
        action={
          <Button variant="enlace" href="/it-projects">
            Ver todos los proyectos IT
          </Button>
        }
      />
      <div className="animate-reveal">
        <ItProjectPreview itProject={itProject} horizontal />
      </div>
    </section>
  );
}
