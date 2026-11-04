interface Orderable {
  order?: number | null;
}
export const sortByOrder = <T extends Orderable>(
  items: T[],
  getDate: (item: T) => string | undefined,
): T[] =>
  [...items].sort((a, b) => {
    const orderA = a.order ?? null;
    const orderB = b.order ?? null;
    if (orderA !== orderB) {
      if (a.order == null) return 1;
      if (b.order == null) return -1;
      return orderA! - orderB!;
    }
    return (getDate(b) ?? "").localeCompare(getDate(a) ?? "");
  });
