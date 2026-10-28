import { Link } from "@tanstack/react-router";
import {
  AccentStripe,
  Button,
  Card,
  Cover,
  StatusBadge,
  TagList,
} from "../../../common-app/components";
import type { CarProjectPreviewVm } from "../personal-project-preview/personal-project-preview.vm";
import { CarSpec } from "./car-spec";
import { ModificationsProgress } from "./modifications-progress";

interface CarPreviewProps {
  car: CarProjectPreviewVm;
}

// Tarjeta del listado: portada a la izquierda y datos a la derecha (desde md)
export function CarPreview({ car }: CarPreviewProps) {
  return (
    <Card
      tone="accent"
      className="flex flex-col gap-6 p-3 md:grid md:grid-cols-2"
    >
      {/* Fuera del orden de tabulación: el enlace accesible es «Ver coche» */}
      <Link
        to="/personal-projects/$slug"
        params={{ slug: car.slug }}
        tabIndex={-1}
        aria-hidden="true"
        className="block md:self-start"
      >
        {/* Proporción fija en todas las tarjetas: la foto se recorta centrada sin deformarse */}
        <Cover
          cover={car.cover}
          className="aspect-4/3 rounded-md object-center"
        />
      </Link>

      <div className="flex flex-col gap-4 px-3 pb-3 md:py-3 md:pl-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CarSpec spec={car.spec} />
          <StatusBadge status={car.status} />
        </div>
        <div>
          <h2 className="font-display text-[30px] leading-tight font-semibold text-ink">
            {car.title}
          </h2>
          <AccentStripe size="sm" className="mt-3" />
        </div>
        <p className="text-[15px] leading-relaxed text-ink-muted">
          {car.summary}
        </p>
        <ModificationsProgress
          progress={car.progress}
          label={car.progressLabel}
        />
        <TagList items={car.techniques} label="Técnicas" />
        <div className="mt-auto pt-2">
          <Button
            variant="principal"
            to="/personal-projects/$slug"
            params={{ slug: car.slug }}
            arrow
          >
            Ver coche
          </Button>
        </div>
      </div>
    </Card>
  );
}
