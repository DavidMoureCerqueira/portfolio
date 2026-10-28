interface Props {
  // "lg": bajo el título de la página (96×8) · "sm": bajo el nombre de cada coche (48×6)
  size?: "lg" | "sm";
  className?: string;
}

const sizeClass = {
  lg: "h-2 w-24",
  sm: "h-1.5 w-12",
};

// Franja amarilla decorativa, exclusiva de Proyectos personales
export function AccentStripe({ size = "lg", className = "" }: Props) {
  return (
    <span
      className={`franja-accent ${sizeClass[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
