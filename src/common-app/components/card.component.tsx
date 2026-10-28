import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  // Color del borde al hover: "brand" en Inicio y Proyectos IT, "accent" en Proyectos personales
  tone?: "brand" | "accent";
  // Layout propio de cada tarjeta (rejilla, padding, alto…)
  className?: string;
}

const hoverBorder = {
  brand: "hover:border-brand",
  accent: "hover:border-accent",
};

// Tarjeta del sistema: borde line y, al hover, sube 4px y el borde toma el color de la pestaña
export function Card({ children, tone = "brand", className = "" }: Props) {
  return (
    <article
      className={`rounded-lg border border-line bg-base-100 transition-[translate,border-color] duration-250 ease-plano hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${hoverBorder[tone]} ${className}`}
    >
      {children}
    </article>
  );
}
