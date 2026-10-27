interface ItProjectCoverProps {
  cover: { url: string; alt: string };
  horizontal?: boolean;
}

export function ItProjectCover({
  cover,
  horizontal = false,
}: ItProjectCoverProps) {
  return (
    <img
      className={`aspect-video w-full border-b border-line object-cover object-top ${horizontal ? "md:aspect-auto md:h-full md:border-r md:border-b-0" : ""}`}
      src={cover.url}
      alt={cover.alt}
      loading="lazy"
    />
  );
}
