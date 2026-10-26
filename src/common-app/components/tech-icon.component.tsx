import type { CSSProperties } from "react";

interface Props {
  // Slug de Simple Icons que guarda Content Island en el campo icon
  slug: string;
  size?: number;
  className?: string;
}

const iconUrl = (slug: string) =>
  `url("https://cdn.jsdelivr.net/npm/simple-icons@15.22.0/icons/${slug}.svg")`;

// Hereda el color del texto: por defecto se pinta en ink-muted
export function TechIcon({
  slug,
  size = 16,
  className = "text-ink-muted",
}: Props) {
  if (!slug) return null;

  return (
    <span
      aria-hidden="true"
      className={`tech-icon ${className}`}
      style={
        {
          "--icon-url": iconUrl(slug),
          width: size,
          height: size,
        } as CSSProperties
      }
    />
  );
}
