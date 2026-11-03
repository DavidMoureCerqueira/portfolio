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
const ISO_DATE =
  /^(\d{4})-(0[1-9]|1[0-2])(?:-(?:0[1-9]|[12]\d|3[01])(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?)?$/;

// "2026-03-01" o "2026-03-01T00:00:00.000Z" → { month: "Mar", year: "2026" }
const parseDate = (date?: string) => {
  if (!date) return undefined;
  if (!ISO_DATE.test(date)) return undefined;

  return {
    month: MONTHS[Number(date.slice(5, 7)) - 1],
    year: date.slice(0, 4),
  };
};

const monthYear = ({ month, year }: { month: string; year: string }) =>
  `${month} ${year}`;

// Una sola fecha: «Dic 2016» · «»
export function formatMonthYear(date?: string) {
  const parsed = parseDate(date);
  return parsed ? monthYear(parsed) : "";
}

// «Mar – Jun 2026» · «Ago 2025 – Mar 2026» · «Oct 2026 – hoy» · «»
export function formatProjectDates(startDate?: string, endDate?: string) {
  const startDateParsed = parseDate(startDate!);
  const endDateParsed = parseDate(endDate!);

  if (!startDateParsed && !endDateParsed) return "";
  if (!startDateParsed) {
    return monthYear(endDateParsed!);
  }

  if (!endDateParsed) {
    return `${monthYear(startDateParsed)} – hoy`;
  }
  return startDateParsed.year === endDateParsed.year
    ? `${startDateParsed.month} – ${endDateParsed.month} ${endDateParsed.year}`
    : `${startDateParsed.month} ${startDateParsed.year} – ${endDateParsed.month} ${endDateParsed.year}`;
}
