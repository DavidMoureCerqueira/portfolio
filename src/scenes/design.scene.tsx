import { Download, Mail } from "lucide-react";
import {
  Button,
  Marker,
  SectionHeader,
  StatusBadge,
  type Status,
} from "../common-app/components";

// Escena temporal para revisar el sistema de diseño en los dos temas. Borrar al terminar.

const statuses: Status[] = ["idea", "pendiente", "en-curso", "pausado", "finalizado"];

const swatches = [
  "bg-base-200",
  "bg-base-100",
  "bg-base-300",
  "bg-line",
  "bg-line-strong",
  "bg-grid",
  "bg-ink",
  "bg-ink-muted",
  "bg-brand",
  "bg-brand-soft",
  "bg-accent",
  "bg-accent-soft",
  "bg-success",
  "bg-success-soft",
];

function ThemePanel({ theme }: { theme: "papel" | "plano" }) {
  return (
    <section
      data-theme={theme}
      className="flex flex-col gap-12 rounded-lg border border-line bg-base-200 p-6 text-ink"
    >
      <p className="text-label text-ink-muted">Tema {theme}</p>

      <div className="bg-plano-grid rounded-lg border border-line p-6">
        <p className="text-cota text-cota-text">Desarrollador Full Stack</p>
        <p className="text-display-xl">David Moure</p>
        <p className="text-lead text-ink-muted">
          Puedo parar a coger aire, pero no me rindo.
        </p>
      </div>

      <SectionHeader
        number={1}
        name="Sobre mí"
        title={
          <>
            Del taller al <Marker>código</Marker>
          </>
        }
        lead="Antes de escribir código pasé seis años como mecánico."
        action={
          <Button variant="enlace" href="#">
            Ver todos los proyectos IT
          </Button>
        }
      />

      <SectionHeader number={2} name="En el garaje" title="Volvo 940 Turbo" tone="accent" stripe />

      <div className="flex flex-wrap gap-2">
        <Button variant="principal" href="#" arrow>
          Ver proyecto
        </Button>
        <Button variant="destacado" icon={<Download />}>
          Descargar CV
        </Button>
        <Button variant="secundario" icon={<Mail />}>
          Correo
        </Button>
        <Button variant="enlace" href="#">
          Enlace
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-line bg-base-100 p-6">
        <p className="text-display-l">display-l</p>
        <p className="text-heading">heading</p>
        <p className="text-title">title</p>
        <p className="text-lead">lead</p>
        <p className="text-body">body</p>
        <p className="text-small text-ink-muted">small</p>
        <p className="text-cota text-cota-text">01 · cota</p>
        <p className="text-label">label</p>
        <code className="text-code w-fit rounded-sm bg-base-300 px-2">
          includeRelatedContent: 1
        </code>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {swatches.map((swatch) => (
          <div key={swatch} className="flex flex-col gap-1">
            <span className={`h-10 rounded-sm border border-line ${swatch}`} />
            <span className="text-label normal-case text-ink-muted">
              {swatch.replace("bg-", "")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DesignScene() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ThemePanel theme="papel" />
      <ThemePanel theme="plano" />
    </div>
  );
}
