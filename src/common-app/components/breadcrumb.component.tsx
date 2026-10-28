import { Link, type LinkProps } from "@tanstack/react-router";

interface Props {
  backTo: LinkProps["to"];
  backLabel: string;
  // Ruta en mono junto al enlace: «it-projects / novus»
  path: string;
}

export function Breadcrumb({ backTo, backLabel, path }: Props) {
  return (
    <nav
      aria-label="Migas de pan"
      className="flex flex-wrap items-center gap-x-4 gap-y-1"
    >
      <Link
        to={backTo}
        className="text-button text-brand-text underline-offset-4 hover:underline"
      >
        ← {backLabel}
      </Link>
      <span className="text-cota text-ink-muted">{path}</span>
    </nav>
  );
}
