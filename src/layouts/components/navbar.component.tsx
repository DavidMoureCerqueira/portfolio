import { Link } from "@tanstack/react-router";
import { LogoImage } from "../../common-app/components/logo-image.component";
import { ThemeToggle } from "../../common-app/components/theme-toggle.component";

const linkClass =
  "hover-zoom inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-ink-muted not-data-[status=active]:hover:text-ink";
// El enlace activo toma el color protagonista de su pestaña
const activeProps = { className: "bg-brand-soft text-brand-text" };
const activeAccentProps = { className: "bg-accent-soft text-accent-text" };

export const Navbar = () => {
  return (
    <header className="flex items-center justify-center gap-4 border-b border-line bg-surface px-6 py-2 md:px-7 lg:px-15">
      <LogoImage />
      <nav className="flex flex-1 justify-around text-button md:text-lg">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={linkClass}
          activeProps={activeProps}
        >
          Sobre mí
        </Link>
        <Link to="/it-projects" className={linkClass} activeProps={activeProps}>
          Proyectos IT
        </Link>
        <Link
          to="/personal-projects"
          className={linkClass}
          activeProps={activeAccentProps}
        >
          Proyectos personales
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  );
};
