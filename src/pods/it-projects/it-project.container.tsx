import { SectionHeader } from "../../common-app/components";
import { ItProjectPreview } from "./components/it-project-preview";
import { ItProjectPreviewVm } from "./it-projects-preview/it-project-preview.vm";

interface ItProjectProps {
  projects: ItProjectPreviewVm[];
}

export function ItProjectContainer({ projects }: ItProjectProps) {
  return (
    <>
      <SectionHeader
        number={4}
        name={"Proyectos IT"}
        title={"Lo que he construido"}
        lead={
          "Recopilatorio de proyectos IT propios o en los que he participado. Entra en cualquiera para ver qué hace, por qué existe y cómo está hecho."
        }
      ></SectionHeader>
      {projects.map((project) => (
        <ItProjectPreview itProject={project} />
      ))}
    </>
  );
}
