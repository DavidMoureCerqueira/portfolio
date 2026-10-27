import { ItProjectTechnologyList } from "../components/it-project-technology-list";
import type { ItProjectDetailVm } from "./it-project-detail.vm";

interface Props {
  itProject: ItProjectDetailVm;
}

// Ficha del proyecto: datos en fila y todas las tecnologías debajo
export function ItProjectFacts({ itProject }: Props) {
  const facts = [
    { label: "Tipo", value: itProject.kindLabel },
    { label: "Fechas", value: itProject.dates },
    { label: "Rol", value: itProject.role },
    { label: "Equipo", value: itProject.team },
  ].filter((fact) => fact.value);

  return (
    <section
      aria-label="Ficha del proyecto"
      className="rounded-lg border border-line bg-base-100 p-6"
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-label text-ink-muted">{fact.label}</dt>
            <dd className="text-code wrap-break-word text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <div className="my-6 h-px bg-line" aria-hidden="true" />
      <p className="text-label text-ink-muted">Tecnologías</p>
      <ItProjectTechnologyList technologies={itProject.technologies} showAll />
    </section>
  );
}
