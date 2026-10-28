interface Props {
  items: string[];
  // Nombre accesible de la lista: «Técnicas», «Categorías»…
  label: string;
  tone?: "neutral" | "accent";
  className?: string;
}

const toneClass = {
  neutral: "bg-base-300 text-ink-muted",
  accent: "bg-accent-soft text-accent-text",
};

// Etiquetas mono pequeñas; los textos deben ser únicos porque hacen de key
export function TagList({
  items,
  label,
  tone = "neutral",
  className = "",
}: Props) {
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-sm px-2 py-0.5 text-cota ${toneClass[tone]}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
