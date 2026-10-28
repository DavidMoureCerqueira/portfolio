import { Link } from "@tanstack/react-router";
import { Card } from "./card.component";

interface DetailLink {
  slug: string;
  title: string;
}

interface Props {
  prev: DetailLink;
  next: DetailLink;
  // Ruta del detalle al que llevan los dos enlaces
  to: "/it-projects/$slug" | "/personal-projects/$slug";
  // Nombre accesible: «Otros proyectos», «Otros coches»
  label: string;
  tone?: "brand" | "accent";
}

// Enlaces reales a otros detalles: así el prerender los descubre con crawlLinks
export function PrevNextNav({ prev, next, to, label, tone = "brand" }: Props) {
  return (
    <nav
      aria-label={label}
      className="grid gap-4 border-t border-line pt-8 md:grid-cols-2"
    >
      <Link to={to} params={{ slug: prev.slug }} className="block rounded-lg">
        <Card tone={tone} className="flex h-full flex-col gap-1 p-5">
          <span className="text-cota text-ink-muted">← anterior</span>
          <span className="text-title text-ink">{prev.title}</span>
        </Card>
      </Link>
      <Link to={to} params={{ slug: next.slug }} className="block rounded-lg">
        <Card
          tone={tone}
          className="flex h-full flex-col gap-1 p-5 md:items-end md:text-right"
        >
          <span className="text-cota text-ink-muted">siguiente →</span>
          <span className="text-title text-ink">{next.title}</span>
        </Card>
      </Link>
    </nav>
  );
}
