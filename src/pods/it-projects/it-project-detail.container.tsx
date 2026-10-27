import { ItProjectCover } from "./components/it-project-cover";
import { ItProjectContent } from "./it-project-detail/it-project-content";
import { ItProjectDetailHeader } from "./it-project-detail/it-project-detail-header";
import type { ItProjectDetailVm } from "./it-project-detail/it-project-detail.vm";
import { ItProjectFacts } from "./it-project-detail/it-project-facts";
import { ItProjectGallery } from "./it-project-detail/it-project-gallery";
import { ItProjectHeader } from "./it-project-detail/it-project-headera";
import { ItProjectPagination } from "./it-project-detail/it-project-pagination";
import { splitContentSections } from "./it-project-detail/split-content-sections";

interface Props {
  itProject: ItProjectDetailVm;
}

export function ItProjectDetailContainer({ itProject }: Props) {
  const { intro, sections } = splitContentSections(itProject.content);

  return (
    <article className="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col gap-8">
        <ItProjectHeader slug={itProject.slug} />
        <ItProjectDetailHeader itProject={itProject} />
      </div>
      <ItProjectFacts itProject={itProject} />
      {itProject.cover && (
        <ItProjectCover cover={itProject.cover} variant="detail" />
      )}
      <ItProjectContent intro={intro} sections={sections} />
      {itProject.gallery.length > 0 && (
        <ItProjectGallery
          number={sections.length + 1}
          gallery={itProject.gallery}
        />
      )}
      <ItProjectPagination prev={itProject.prev} next={itProject.next} />
    </article>
  );
}
