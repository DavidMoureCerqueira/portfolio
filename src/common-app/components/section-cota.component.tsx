interface Props {
  number: number;
  name: string;
  // "accent": Proyectos personales (cota amarilla en ambos temas)
  tone?: "brand" | "accent";
}

// La cota hace de título de la sección («01 · Qué es»), con la línea de SectionHeader
export function SectionCota({ number, name, tone = "brand" }: Props) {
  const cotaColor = tone === "accent" ? "text-accent-text" : "text-cota-text";

  return (
    <h2 className="mb-5 flex items-center gap-3">
      <span className={`text-cota whitespace-nowrap ${cotaColor}`}>
        {String(number).padStart(2, "0")} · {name}
      </span>
      <span
        className="h-px flex-1 origin-left animate-draw bg-line"
        aria-hidden="true"
      />
    </h2>
  );
}
