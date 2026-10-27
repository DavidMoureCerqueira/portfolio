import { StatusBadge, type Status } from "../../../common-app/components";

interface ItProjectPreviewMetaProps {
  status: Status;
  kindLabel: string;
  year?: string;
}

export function ItProjectPreviewMeta({
  status,
  kindLabel,
  year,
}: ItProjectPreviewMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <StatusBadge status={status} />
      <span className="text-label text-ink-muted">{kindLabel}</span>
      {year && <span className="ml-auto text-cota text-ink-muted">{year}</span>}
    </div>
  );
}
