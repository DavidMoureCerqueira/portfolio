import type { ContentSection } from "./split-content-sections";
import { ItProjectMarkdown } from "./it-project-markdown";
import { ItProjectSectionCota } from "./it-project-section-cota";

interface Props {
  intro: string;
  sections: ContentSection[];
}

// Contenido del proyecto: cada «## » del markdown es una sección con su cota numerada
export function ItProjectContent({ intro, sections }: Props) {
  return (
    <div className="flex max-w-[800px] flex-col gap-12">
      {intro && <ItProjectMarkdown>{intro}</ItProjectMarkdown>}
      {sections.map((section, index) => (
        <section key={section.title}>
          <ItProjectSectionCota number={index + 1} name={section.title} />
          <ItProjectMarkdown>{section.body}</ItProjectMarkdown>
        </section>
      ))}
    </div>
  );
}
