import { StatusBadge } from "../../../common-app/components";
import { ItProjectButtons } from "../components/it-project-buttons";
import type { ItProjectDetailVm } from "./it-project-detail.vm";

interface Props {
  itProject: ItProjectDetailVm;
}

export function ItProjectDetailHeader({ itProject }: Props) {
  const meta = [itProject.kindLabel, itProject.dates]
    .filter(Boolean)
    .join(" · ");

  return (
    <header className="flex max-w-205 flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <StatusBadge status={itProject.status} />
        <span className="text-cota text-ink-muted">{meta}</span>
      </div>
      <h1 className="mt-4 text-display-l text-ink">{itProject.title}</h1>
      <p className="mt-3 text-lead text-ink-muted">{itProject.summary}</p>
      {itProject.isInternal ? (
        <p className="mt-6 text-cota text-ink-muted">
          {"// herramienta interna, sin código público"}
        </p>
      ) : (
        <ItProjectButtons
          demoUrl={itProject.demoUrl}
          repoUrl={itProject.repoUrl}
        />
      )}
    </header>
  );
}
