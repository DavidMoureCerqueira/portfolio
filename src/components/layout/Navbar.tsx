import { NavLink } from "react-router";
import LogoImage from "./LogoImage";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `cursor-pointer hover-zoom ${isActive ? "text-primary" : ""}`;

export default function Navbar() {
  return (
    <header className="flex items-center justify-center border-b-2 border-b-primary bg-surface p-2 shadow-md md:px-7 lg:px-15">
      <LogoImage />
      <nav className="sm:text-md flex flex-1 justify-around font-bold md:text-xl lg:text-xl">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/it-projects" className={linkClass}>
          IT Proyects
        </NavLink>
        <NavLink to="/personal-projects" className={linkClass}>
          Personal Proyects
        </NavLink>
      </nav>
    </header>
  );
}
