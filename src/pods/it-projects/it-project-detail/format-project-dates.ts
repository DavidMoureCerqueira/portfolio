// Array fijo en lugar de Intl: servidor y navegador generan exactamente el mismo texto
const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

// "2026-03-01" o "2026-03-01T00:00:00.000Z" → { month: "Mar", year: "2026" }
const parseDate = (date: string) => ({
  month: MONTHS[Number(date.slice(5, 7)) - 1],
  year: date.slice(0, 4),
});

// «Mar – Jun 2026» · «Ago 2025 – Mar 2026» · «Oct 2026 – hoy» · «»
export function formatProjectDates(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "";
  if (!startDate) {
    const end = parseDate(endDate!);
    return `${end.month} ${end.year}`;
  }

  const start = parseDate(startDate);
  if (!endDate) return `${start.month} ${start.year} – hoy`;

  const end = parseDate(endDate);
  return start.year === end.year
    ? `${start.month} – ${end.month} ${end.year}`
    : `${start.month} ${start.year} – ${end.month} ${end.year}`;
}
