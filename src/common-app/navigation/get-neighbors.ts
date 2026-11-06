export interface NeighborLink {
  slug: string;
  title: string;
}

export function getNeighbors<T extends NeighborLink>(
  items: T[],
  slug: string,
): { prev: NeighborLink; next: NeighborLink } | null {
  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  const prev = items.at(index - 1)!;
  const next = items[(index + 1) % items.length];
  return {
    prev: { slug: prev.slug, title: prev.title },
    next: { slug: next.slug, title: next.title },
  };
}
