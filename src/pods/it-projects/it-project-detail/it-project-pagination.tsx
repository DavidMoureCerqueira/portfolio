import { Link } from "@tanstack/react-router";
import type { ItProjectLinkVm } from "./it-project-detail.vm";

interface Props {
  prev: ItProjectLinkVm;
  next: ItProjectLinkVm;
}

const card =
  "flex flex-col gap-1 rounded-lg border border-line bg-base-100 p-5 transition-colors duration-150 ease-plano hover:border-brand";

// Enlaces reales a otros detalles: así el prerender los descubre con crawlLinks
export function ItProjectPagination({ prev, next }: Props) {
  return (
    <nav
      aria-label="Otros proyectos"
      className="grid gap-4 border-t border-line pt-8 md:grid-cols-2"
    >
      <Link
        to="/it-projects/$slug"
        params={{ slug: prev.slug }}
        className={card}
      >
        <span className="text-cota text-ink-muted">← anterior</span>
        <span className="text-title text-ink">{prev.title}</span>
      </Link>
      <Link
        to="/it-projects/$slug"
        params={{ slug: next.slug }}
        className={`${card} md:items-end md:text-right`}
      >
        <span className="text-cota text-ink-muted">siguiente →</span>
        <span className="text-title text-ink">{next.title}</span>
      </Link>
    </nav>
  );
}
