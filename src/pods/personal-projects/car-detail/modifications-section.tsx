import { useState } from "react";
import { SectionHeader } from "../../../common-app/components";
import type { Status } from "../../../common-app/models/status.model";
import type { ModificationVm } from "../modifications/modification.vm";
import { PROGRESS_ORDER } from "../personal-project-preview/progress-order";
import { ModificationCard } from "./modification-card";

interface Props {
  // Sigue la numeración de las secciones de la historia
  number: number;
  modifications: ModificationVm[];
  progress: Record<Status, number>;
}

type Filter = Status | "todas";

const filterLabels: Record<Status, string> = {
  finalizado: "Finalizadas",
  "en-curso": "En curso",
  pendiente: "Pendientes",
  pausado: "Pausadas",
  idea: "Ideas",
};

const pill =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-button transition-colors duration-150 ease-plano";

export function ModificationsSection({
  number,
  modifications,
  progress,
}: Props) {
  // Estado de interfaz: qué grupo de modificaciones se ve
  const [filter, setFilter] = useState<Filter>("todas");

  // «Todas» y solo los estados que tengan alguna modificación
  const filters = [
    { value: "todas" as const, label: "Todas", count: modifications.length },
    ...PROGRESS_ORDER.filter((status) => progress[status] > 0).map(
      (status) => ({
        value: status,
        label: filterLabels[status],
        count: progress[status],
      }),
    ),
  ];

  const visibleModifications =
    filter === "todas"
      ? modifications
      : modifications.filter((modification) => modification.status === filter);

  if (modifications.length === 0) return null;

  return (
    <section>
      <SectionHeader
        number={number}
        name="Modificaciones"
        title="Lo que le he hecho"
        tone="accent"
        action={
          <ul className="flex flex-wrap gap-2" aria-label="Filtrar por estado">
            {filters.map((option) => {
              const isActive = filter === option.value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(option.value)}
                    className={`${pill} ${isActive ? "border-transparent bg-accent-soft text-accent-text" : "border-line-strong text-ink hover:bg-base-300"}`}
                  >
                    {option.label}
                    <span className="text-cota">{option.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        }
      />
      {/* Desde md cada <li> ocupa dos filas compartidas con su vecina (subgrid):
          la primera, la tarjeta cerrada, iguala la altura de las dos; la segunda,
          el detalle desplegado, solo la ocupa la tarjeta que se abre */}
      <ul className="grid gap-x-5 md:grid-cols-2">
        {visibleModifications.map((modification) => (
          <li
            key={modification.id}
            className="pb-5 md:row-span-2 md:grid md:grid-rows-subgrid"
          >
            <ModificationCard modification={modification} />
          </li>
        ))}
      </ul>
    </section>
  );
}
