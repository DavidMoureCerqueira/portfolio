import { Link } from "@tanstack/react-router";
import { LogoImage } from "../../common-app/components/logo-image.component";

const linkClass = "cursor-pointer hover-zoom";
const activeProps = { className: "text-primary" };

export const Navbar = () => {
  return (
    <header className="flex items-center justify-center border-b-2 border-b-primary bg-surface p-2 shadow-md md:px-7 lg:px-15">
      <LogoImage />
      <nav className="sm:text-md flex flex-1 justify-around font-bold md:text-xl lg:text-xl">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className={linkClass}
          activeProps={activeProps}
        >
          Home
        </Link>
        <Link to="/it-projects" className={linkClass} activeProps={activeProps}>
          IT Proyects
        </Link>
        <Link
          to="/personal-projects"
          className={linkClass}
          activeProps={activeProps}
        >
          Personal Proyects
        </Link>
      </nav>
    </header>
  );
};
