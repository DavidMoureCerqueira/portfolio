import { Cover } from "../../../common-app/components";

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
      <Cover
        cover={cover}
        loading="eager"
        className="aspect-video rounded-lg border border-line object-top"
      />
    );
  }

  return (
    <Cover
      cover={cover}
      className={`aspect-video border-b border-line object-top ${horizontal ? "md:aspect-auto md:h-full md:border-r md:border-b-0" : ""}`}
    />
  );
}
