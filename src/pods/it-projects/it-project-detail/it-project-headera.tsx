import { Link } from "@tanstack/react-router";

interface Props {
  slug: string;
}

export function ItProjectHeadera({ slug }: Props) {
  return (
    <nav
      aria-label="Migas de pan"
      className="flex flex-wrap items-center gap-x-4 gap-y-1"
    >
      <Link
        to="/it-projects"
        className="text-button text-brand-text underline-offset-4 hover:underline"
      >
        ← Proyectos IT
      </Link>
      <span className="text-cota text-ink-muted">it-projects / {slug}</span>
    </nav>
  );
}
