import type { ReactNode } from "react";

export interface Fact {
  label: string;
  value?: string;
}

interface Props {
  facts: Fact[];
  // Nombre accesible de la ficha: «Ficha del proyecto», «Ficha del coche»
  label: string;
  columns?: 4 | 5;
  // Contenido propio de cada dominio, debajo de un separador fino
  children?: ReactNode;
}

const columnsClass = {
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

// Ficha a lo ancho: datos en fila; los vacíos no se pintan
export function FactsBand({ facts, label, columns = 4, children }: Props) {
  const visibleFacts = facts.filter((fact) => fact.value);

  return (
    <section
      aria-label={label}
      className="rounded-lg border border-line bg-base-100 p-6"
    >
      <dl
        className={`grid grid-cols-2 gap-x-6 gap-y-5 ${columnsClass[columns]}`}
      >
        {visibleFacts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-label text-ink-muted">{fact.label}</dt>
            <dd className="text-code wrap-break-word text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      {children && (
        <>
          <div className="my-6 h-px bg-line" aria-hidden="true" />
          {children}
        </>
      )}
    </section>
  );
}
