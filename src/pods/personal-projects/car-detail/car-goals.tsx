import { Check } from "lucide-react";
import type { CarGoalVm } from "../personal-project.vm";

interface Props {
  goals: CarGoalVm[];
}

// Checklist de metas: el estado también va como texto para los lectores de pantalla
export function CarGoals({ goals }: Props) {
  if (goals.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-label text-ink-muted">Metas</p>
      <ul className="flex flex-col gap-3">
        {goals.map((goal) => (
          <li key={goal.text} className="flex items-start gap-3">
            {goal.done ? (
              <span
                className="mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink"
                aria-hidden="true"
              >
                <Check size={14} strokeWidth={2.5} />
              </span>
            ) : (
              <span
                className="mt-px size-[22px] shrink-0 rounded-full border border-dashed border-line-strong"
                aria-hidden="true"
              />
            )}
            <span className="text-body text-ink">
              {goal.text}
              <span className="sr-only">
                {goal.done ? " (cumplida)" : " (pendiente)"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
