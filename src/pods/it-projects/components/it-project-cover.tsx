interface ItProjectCoverProps {
  cover: { url: string; alt: string };
  horizontal?: boolean;
  // "card": cabecera de la tarjeta del listado · "detail": portada a lo ancho del detalle
  variant?: "card" | "detail";
}

export function ItProjectCover({
  cover,
  horizontal = false,
  variant = "card",
}: ItProjectCoverProps) {
  if (variant === "detail") {
    return (
      <img
        className="aspect-video w-full rounded-lg border border-line object-cover object-top"
        src={cover.url}
        alt={cover.alt}
      />
    );
  }

  return (
    <img
      className={`aspect-video w-full border-b border-line object-cover object-top ${horizontal ? "md:aspect-auto md:h-full md:border-r md:border-b-0" : ""}`}
      src={cover.url}
      alt={cover.alt}
      loading="lazy"
    />
  );
}
