import { useId, useState } from "react";
import { TimeLineEntryVm } from "../time-line/time-line-entry.vm";
import { TimelineType } from "../time-line/api/api.model";
import { Markdown, StatusBadge } from "../../../common-app/components";
import { ChevronDown, MapPin } from "lucide-react";

interface TimeLineItemProps {
  entry: TimeLineEntryVm;
  index: number;
}
const typeLabel: Record<TimelineType, string> = {
  practicas: "Prácticas",
  laboral: "Laboral",
  formacion: "Formación",
};

const monthFormatter = new Intl.DateTimeFormat("es-ES", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

// "2026-03-01T00:00:00.000Z" → "Mar 2026"
const formatMonth = (date: string) => {
  const parts = monthFormatter.formatToParts(new Date(date));
  const month = parts.find((part) => part.type === "month")?.value.replace(".", "") ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
};

const formatRange = ({ startDate, endDate }: TimeLineEntryVm) =>
  `${formatMonth(startDate)} – ${endDate ? formatMonth(endDate) : "Actualidad"}`;

const isCurrent = ({ startDate, endDate }: TimeLineEntryVm) => {
  const now = Date.now();
  return new Date(startDate).getTime() <= now && (!endDate || new Date(endDate).getTime() >= now);
};

export function TimeLineItem({ entry, index }: TimeLineItemProps) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const current = isCurrent(entry);
  const range = formatRange(entry);

  // Amarillo solo para la etapa en curso; azul para las técnicas, hueco para el resto
  const dotClass = current
    ? "bg-accent animate-pulse-soft"
    : entry.isTech
      ? "bg-brand"
      : "border-2 border-line-strong bg-surface";

  return (
    <li
      className="group grid animate-reveal md:grid-cols-[10rem_1fr] md:gap-x-8"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <p className="hidden pt-1 text-right text-cota text-ink-muted md:block">{range}</p>

      <div className="relative border-l border-line pb-12 pl-8 group-last:pb-0">
        <span
          className={`absolute top-1.5 -left-1.75 size-3.5 rounded-full ring-4 ring-surface ${dotClass}`}
          aria-hidden="true"
        />

        <p className="text-cota text-ink-muted md:hidden">{range}</p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label text-ink-muted">{typeLabel[entry.type]}</span>
          {current && <StatusBadge status="en-curso" />}
        </div>

        <h3 className="mt-2 text-title text-ink">{entry.title}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-ink-muted">
          <span>{entry.organization}</span>
          {entry.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
              {entry.location}
            </span>
          )}
        </p>

        <p className="mt-3 max-w-[65ch] text-body text-ink">{entry.summary}</p>

        {entry.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
            {entry.technologies.map((technology) => (
              <li
                key={technology.id}
                className="rounded-sm bg-base-300 px-2 py-0.5 text-cota text-ink-muted"
              >
                {technology.name}
              </li>
            ))}
          </ul>
        )}

        {entry.content && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailId}
              onClick={() => setOpen(!open)}
              className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1 text-button text-brand-text hover:underline underline-offset-4"
            >
              {open ? "Ocultar detalle" : "Ver detalle"}
              <ChevronDown
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                className={`transition-transform duration-250 ease-plano ${open ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={detailId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-250 ease-plano ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <Markdown className="mt-2 rounded-md border border-line bg-base-200 p-6">{entry.content}</Markdown>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
}