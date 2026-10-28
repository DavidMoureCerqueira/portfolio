interface Props {
  cover?: { url: string; alt: string };
  // Tamaño, radio y borde los decide cada uso
  className?: string;
  // Las portadas visibles al cargar la página van con "eager"
  loading?: "lazy" | "eager";
  // Texto del hueco reservado cuando no hay imagen
  placeholder?: string;
}

export function Cover({
  cover,
  className = "",
  loading = "lazy",
  placeholder = "Sin imagen",
}: Props) {
  if (!cover) {
    return (
      <div
        className={`flex items-center justify-center bg-base-300 text-cota text-ink-muted ${className}`}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <img
      className={`w-full object-cover ${className}`}
      src={cover.url}
      alt={cover.alt}
      loading={loading}
    />
  );
}
