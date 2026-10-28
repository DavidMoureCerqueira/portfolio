import { useId, useState } from "react";
import {
  Card,
  ContentMarkdown,
  Cover,
  StatusBadge,
  TagList,
} from "../../../common-app/components";
import type { ModificationVm } from "../modifications/modification.vm";

interface Props {
  modification: ModificationVm;
}

export function ModificationCard({ modification }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const detailId = useId();
  const { content, image } = modification;
  const hasDetail = Boolean(content || image);

  // «Ver foto» cuando lo único que hay que desplegar es la foto
  const openLabel = content ? "Ver detalle" : "Ver foto";

  return (
    // Desde md, la tarjeta usa las dos filas del <li>: la primera (resumen) se iguala con
    // su vecina y solo al abrirse ocupa también la segunda (detalle)
    <Card
      tone="accent"
      className={`flex h-full flex-col md:grid md:grid-rows-subgrid md:gap-y-0 ${isOpen ? "md:row-span-2" : ""}`}
    >
      <div className="flex h-full flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-label text-ink-muted">
            {modification.categoryLabel}
          </span>
          <StatusBadge status={modification.status} />
        </div>
        <h3 className="text-title text-ink">{modification.title}</h3>
        <p className="text-small text-ink-muted">{modification.summary}</p>
        <TagList
          items={modification.techniques}
          label="Técnicas"
          tone="accent"
        />
        {hasDetail && (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={detailId}
            onClick={() => setIsOpen(!isOpen)}
            // mt-auto: el botón queda al pie aunque la tarjeta se estire
            className="mt-auto inline-flex min-h-11 cursor-pointer items-center self-start text-button text-brand-text underline-offset-4 hover:underline"
          >
            {isOpen ? "Ocultar detalle" : openLabel}
          </button>
        )}
      </div>

      {hasDetail && (
        <div
          id={detailId}
          hidden={!isOpen}
          className="flex animate-reveal flex-col gap-4 px-6 pb-6"
        >
          {content && (
            <div className="rounded-md bg-base-300 p-4">
              <ContentMarkdown>{content}</ContentMarkdown>
            </div>
          )}
          {image && (
            <figure className="flex flex-col gap-2">
              <Cover
                cover={image}
                className="aspect-4/3 rounded-md border border-line"
              />
              <figcaption className="text-small text-ink-muted">
                {image.alt}
              </figcaption>
            </figure>
          )}
        </div>
      )}
    </Card>
  );
}
