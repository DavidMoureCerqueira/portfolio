import type { Status } from "../models/status.model";

// Se reexporta para que los imports desde components sigan funcionando
export type { Status };

interface Props {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  idea: {
    label: "Idea",
    className: "border border-dashed border-line-strong text-ink-muted",
  },
  pendiente: { label: "Pendiente", className: "bg-brand-soft text-brand-text" },
  "en-curso": {
    label: "En curso",
    className: "bg-accent-soft text-accent-text",
  },
  pausado: { label: "Pausado", className: "bg-base-300 text-ink-muted" },
  finalizado: {
    label: "Finalizado",
    className: "bg-success-soft text-success",
  },
};

export function StatusBadge({ status }: Props) {
  const { label, className } = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-label ${className}`}
    >
      {status === "en-curso" && (
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      )}
      {label}
    </span>
  );
}
