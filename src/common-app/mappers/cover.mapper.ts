import type { Media } from "@content-island/api-client";

interface WithCover {
  title: string;
  cover?: Media;
  coverAlt?: string;
}

// Sin imagen → undefined; alt vacío → texto por defecto con el título
export const mapCover = (item: WithCover) =>
  item.cover?.url
    ? { url: item.cover.url, alt: item.coverAlt || `Portada de ${item.title}` }
    : undefined;
