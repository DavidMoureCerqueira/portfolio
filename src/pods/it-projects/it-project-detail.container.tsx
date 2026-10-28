import {
  Breadcrumb,
  FactsBand,
  MarkdownContent,
  PrevNextNav,
  splitContentSections,
} from "../../common-app/components";
import { ItProjectCover } from "./components/it-project-cover";
import { ItProjectTechnologyList } from "./components/it-project-technology-list";
import { ItProjectDetailHeader } from "./it-project-detail/it-project-detail-header";
import type { ItProjectDetailVm } from "./it-project-detail/it-project-detail.vm";
import { ItProjectGallery } from "./it-project-detail/it-project-gallery";

interface Props {
  itProject: ItProjectDetailVm;
}

export function ItProjectDetailContainer({ itProject }: Props) {
  // La galería sigue la numeración de las secciones del contenido
  const { sections } = splitContentSections(itProject.content);

  return (
    <article className="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col gap-8">
        <Breadcrumb
          backTo="/it-projects"
          backLabel="Proyectos IT"
          path={`it-projects / ${itProject.slug}`}
        />
        <ItProjectDetailHeader itProject={itProject} />
      </div>
      <FactsBand
        label="Ficha del proyecto"
        facts={[
          { label: "Tipo", value: itProject.kindLabel },
          { label: "Fechas", value: itProject.dates },
          { label: "Rol", value: itProject.role },
          { label: "Equipo", value: itProject.team },
        ]}
      >
        <p className="text-label text-ink-muted">Tecnologías</p>
        <ItProjectTechnologyList
          technologies={itProject.technologies}
          showAll
        />
      </FactsBand>
      {itProject.cover && (
        <ItProjectCover cover={itProject.cover} variant="detail" />
      )}
      <MarkdownContent content={itProject.content} />
      {itProject.gallery.length > 0 && (
        <ItProjectGallery
          number={sections.length + 1}
          gallery={itProject.gallery}
        />
      )}
      <PrevNextNav
        label="Otros proyectos"
        to="/it-projects/$slug"
        prev={itProject.prev}
        next={itProject.next}
      />
    </article>
  );
}
