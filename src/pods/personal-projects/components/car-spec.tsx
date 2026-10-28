interface CarSpecProps {
  spec: string;
}

// Línea técnica del coche en mono: tarjeta del listado y cabecera del detalle
export function CarSpec({ spec }: CarSpecProps) {
  return <p className="text-cota text-ink-muted">{spec}</p>;
}
