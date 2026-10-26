import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "principal" | "destacado" | "secundario" | "enlace";

interface Props {
  variant?: ButtonVariant;
  children: ReactNode;
  // Con href se pinta un <a>; sin él, un <button>
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  arrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}

const base =
  "group inline-flex cursor-pointer items-center justify-center gap-2 text-button transition-[background-color,border-color,color,transform] duration-150 ease-plano active:scale-[0.97]";

const pill = "min-h-11 rounded-full px-5";

const variantClass: Record<ButtonVariant, string> = {
  principal: `${pill} bg-brand text-brand-ink hover:bg-brand-hover`,
  destacado: `${pill} bg-accent text-accent-ink hover:brightness-95`,
  secundario: `${pill} border border-line-strong bg-surface text-ink hover:bg-base-300`,
  enlace: "min-h-11 text-brand-text hover:underline underline-offset-4",
};

export function Button({
  variant = "principal",
  children,
  href,
  external = false,
  icon,
  arrow = variant === "enlace",
  type = "button",
  onClick,
  className = "",
}: Props) {
  const classes = `${base} ${variantClass[variant]} ${className}`;

  const content = (
    <>
      {icon && (
        <span className="inline-flex [&>svg]:size-4" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {arrow && (
        <ArrowRight
          size={16}
          strokeWidth={1.75}
          aria-hidden="true"
          className="transition-transform duration-150 ease-plano group-hover:translate-x-[3px]"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
