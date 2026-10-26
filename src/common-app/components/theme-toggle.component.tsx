import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "papel" | "plano";

const darkQuery = "(prefers-color-scheme: dark)";

const getCurrentTheme = (): Theme => {
  const saved = document.documentElement.getAttribute("data-theme");
  if (saved === "papel" || saved === "plano") return saved;
  return window.matchMedia(darkQuery).matches ? "plano" : "papel";
};

// Se actualiza si cambia data-theme en <html> o el tema del sistema
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
};

export function ThemeToggle() {
  // null en el servidor: no conoce el tema del visitante
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    getCurrentTheme,
    () => null,
  );

  const toggle = () => {
    const next: Theme = getCurrentTheme() === "plano" ? "papel" : "plano";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Sin almacenamiento disponible: el cambio dura solo esta visita
    }
  };

  const isDark = theme === "plano";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors duration-150 ease-plano hover:border-line-strong hover:bg-base-300"
    >
      {isDark ? (
        <Sun size={20} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={20} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
