import type { Status } from "../../../common-app/models/status.model";
import { PROGRESS_ORDER } from "../personal-project-preview/progress-order";

interface ModificationsProgressProps {
  progress: Record<Status, number>;
  // Texto con el desglose: es la información accesible, la barra es decorativa
  label: string;
}

const segmentColor: Record<Status, string> = {
  finalizado: "bg-success",
  "en-curso": "bg-accent",
  pendiente: "bg-line-strong",
  pausado: "bg-line-strong",
  idea: "bg-line-strong",
};

export function ModificationsProgress({
  progress,
  label,
}: ModificationsProgressProps) {
  const segments = PROGRESS_ORDER.filter((status) => progress[status] > 0);

  return (
    <div className="flex flex-col gap-2">
      {segments.length > 0 && (
        <div className="flex h-2 gap-0.75" aria-hidden="true">
          {segments.map((status) => (
            <span
              key={status}
              className={`rounded-full ${segmentColor[status]}`}
              // Cada segmento ocupa un ancho proporcional a su número de modificaciones
              style={{ flexGrow: progress[status] }}
            />
          ))}
        </div>
      )}
      <p className="text-cota text-ink-muted">{label}</p>
    </div>
  );
}
