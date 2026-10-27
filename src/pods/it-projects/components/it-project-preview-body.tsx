import { ItProjectPreviewVm } from "../it-projects-preview/it-project-preview.vm";
import { ItProjectButtons } from "./it-project-buttons";
import { ItProjectTechnologyList } from "./it-project-technology-list";
import { ItProjectPreviewMeta } from "./it-project-preview-meta";

interface ItProjectPreviewBodyProps {
  itProject: ItProjectPreviewVm;
}

export function ItProjectPreviewBody({ itProject }: ItProjectPreviewBodyProps) {
  return (
    <div className="flex flex-1 flex-col p-6">
      <ItProjectPreviewMeta
        status={itProject.status}
        kindLabel={itProject.kindLabel}
        year={itProject.year}
      />
      <h3 className="mt-4 text-title text-ink">{itProject.title}</h3>
      <p className="mt-2 text-small text-ink-muted">{itProject.summary}</p>
      <ItProjectTechnologyList technologies={itProject.technologies} />
      <ItProjectButtons
        slug={itProject.slug}
        demoUrl={itProject.demoUrl}
        repoUrl={itProject.repoUrl}
      />
    </div>
  );
}
