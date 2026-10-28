import { SectionHeader } from "../../common-app/components";
import { CarPreview } from "./components/car-preview";
import type { CarProjectPreviewVm } from "./personal-project-preview/personal-project-preview.vm";

interface PersonalProjectContainerProps {
  carProjects: CarProjectPreviewVm[];
}

export function PersonalProjectContainer({
  carProjects,
}: PersonalProjectContainerProps) {
  return (
    <section className="flex flex-col gap-8">
      <header className="border-b border-line">
        <SectionHeader
          number={carProjects.length}
          name="Proyectos personales"
          title="En el garaje"
          titleAs="h1"
          tone="accent"
          stripe
          lead="Tres coches proyecto donde aplico lo mismo que en el código: diagnosticar, planificar y construir piezas a medida."
        />
      </header>

      <ul className="flex flex-col gap-6">
        {carProjects.map((car) => (
          <li key={car.slug}>
            <CarPreview car={car} />
          </li>
        ))}
      </ul>
    </section>
  );
}
