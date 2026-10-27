export interface ContentSection {
  title: string;
  body: string;
}

// Parte el markdown por los «## »: cada uno es una sección numerada de la página.
// Lo que haya antes del primer «## » queda como intro, sin cota.
export function splitContentSections(markdown: string) {
  const [intro, ...blocks] = markdown.split(/^## /m);

  const sections: ContentSection[] = blocks.map((block) => {
    const lineEnd = block.indexOf("\n");
    return lineEnd === -1
      ? { title: block.trim(), body: "" }
      : {
          title: block.slice(0, lineEnd).trim(),
          body: block.slice(lineEnd + 1).trim(),
        };
  });

  return { intro: intro.trim(), sections };
}
