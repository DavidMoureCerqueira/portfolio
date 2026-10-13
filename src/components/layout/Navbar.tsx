import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Navbar({ children }: Props) {
  return <nav>This is the navbar component {children}</nav>;
}
