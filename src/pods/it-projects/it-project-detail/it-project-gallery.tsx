import { ItProjectSectionCota } from "./it-project-section-cota";

interface Props {
  // Sigue la numeración de las secciones del contenido
  number: number;
  gallery: { url: string; alt: string }[];
}

export function ItProjectGallery({ number, gallery }: Props) {
  return (
    <section className="max-w-200">
      <ItProjectSectionCota number={number} name="Capturas" />
      <ul className="grid gap-6 sm:grid-cols-2">
        {gallery.map((image) => (
          <li key={image.url}>
            <figure className="flex flex-col gap-2">
              <img
                className="aspect-16/10 w-full rounded-md border border-line object-cover object-top"
                src={image.url}
                alt={image.alt}
                loading="lazy"
              />
              <figcaption className="text-small text-ink-muted">
                {image.alt}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
