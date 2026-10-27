import { SectionHeader } from "../../common-app/components";
import { ItProjectPreview } from "./it-project-preview";
import { ItProjectPreviewVm } from "./it-projects-preview/it-project-preview.vm";

interface ItProjectProps {
  projects: ItProjectPreviewVm[];
}

export function ItProjectPreviewContainer({ projects }: ItProjectProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="border-b border-line">
        <SectionHeader
          number={projects.length}
          name="Proyectos IT"
          title="Lo que he construido"
          lead="Recopilatorio de proyectos IT propios o en los que he participado. Entra en cualquiera para ver qué hace, por qué existe y cómo está hecho."
        />
      </header>

      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ItProjectPreview itProject={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
