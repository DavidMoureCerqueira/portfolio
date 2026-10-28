import type { ReactNode } from "react";
import { AccentStripe } from "./accent-stripe.component";

interface Props {
  // Numeración correlativa dentro de cada página: 1 → «01»
  number: number;
  name: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
  // "accent": Proyectos personales (cota amarilla en ambos temas)
  tone?: "brand" | "accent";
  // Franja amarilla bajo el título, solo en la cabecera de Proyectos personales
  stripe?: boolean;
  // "h1" cuando la cabecera es el título de la página
  titleAs?: "h1" | "h2";
}

export function SectionHeader({
  number,
  name,
  title,
  lead,
  action,
  tone = "brand",
  stripe = false,
  titleAs: Title = "h2",
}: Props) {
  const cotaColor = tone === "accent" ? "text-accent-text" : "text-cota-text";

  return (
    <header className="mb-6 md:mb-12">
      <div className="flex items-center gap-3">
        <span className={`text-cota whitespace-nowrap ${cotaColor}`}>
          {String(number).padStart(2, "0")} · {name}
        </span>
        <span
          className="h-px flex-1 origin-left animate-draw bg-line"
          aria-hidden="true"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Title className="text-heading text-ink">{title}</Title>
          {stripe && <AccentStripe size="lg" className="mt-3" />}
          {lead && <p className="mt-3 text-lead text-ink-muted">{lead}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}

// Una palabra del título con el marcador amarillo (una vez por página)
export function Marker({ children }: { children: ReactNode }) {
  return <span className="marcador">{children}</span>;
}
