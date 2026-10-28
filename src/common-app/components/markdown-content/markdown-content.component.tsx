import { SectionCota } from "../section-cota.component";
import { ContentMarkdown } from "./content-markdown";
import { splitContentSections } from "./split-content-sections";

interface Props {
  content: string;
  // Número de la primera cota: «01» por defecto
  startAt?: number;
  tone?: "brand" | "accent";
}

// Contenido de un detalle: cada «## » del markdown es una sección con su cota numerada
export function MarkdownContent({
  content,
  startAt = 1,
  tone = "brand",
}: Props) {
  const { intro, sections } = splitContentSections(content);

  return (
    <div className="flex max-w-[800px] flex-col gap-12">
      {intro && <ContentMarkdown>{intro}</ContentMarkdown>}
      {sections.map((section, index) => (
        <section key={section.title}>
          <SectionCota
            number={startAt + index}
            name={section.title}
            tone={tone}
          />
          <ContentMarkdown>{section.body}</ContentMarkdown>
        </section>
      ))}
    </div>
  );
}
