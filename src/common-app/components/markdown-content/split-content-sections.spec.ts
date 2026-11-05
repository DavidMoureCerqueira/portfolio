import { splitContentSections } from "./split-content-sections";

const md = (...lines: string[]) => lines.join("\n");

describe("splitContentSections", () => {
  it("should return everything as intro where there are no sections (##)", () => {
    const lines = md("Una linea", "Dos lineas", "Tres lineas");
    const linesWithEmtpy = md("Una linea", "", "Tres lineas");

    const resultLines = splitContentSections(lines);
    const resultLinesWithEmpty = splitContentSections(linesWithEmtpy);

    expect(resultLines).toEqual({
      intro: "Una linea\nDos lineas\nTres lineas",
      sections: [],
    });

    expect(resultLinesWithEmpty).toEqual({
      intro: "Una linea\n\nTres lineas",
      sections: [],
    });
  });
  it("should split each section into its title and body without intro", () => {
    const markdown = md(
      "## Qué es",
      "Un comparador de discos de freno.",
      "",
      "## Por qué",
      "No existía ninguno.",
    );

    const result = splitContentSections(markdown);

    expect(result.intro).toBe("");
    expect(result.sections).toEqual([
      {
        title: "Qué es",
        body: "Un comparador de discos de freno.",
      },
      {
        title: "Por qué",
        body: "No existía ninguno.",
      },
    ]);
  });
  it("should keep the text before the first section as intro", () => {
    const markdown = md("Texto de entrada.", "", "## Qué es", "Cuerpo");

    const result = splitContentSections(markdown);

    expect(result.intro).toBe("Texto de entrada.");
    expect(result.sections).toHaveLength(1);
  });

  it("should return an empty body when section has only title", () => {
    const markdown = md("## Qué es", "Cuerpo.", "## Próximos pasos");

    const result = splitContentSections(markdown);

    expect(result.sections[1]).toEqual({ title: "Próximos pasos", body: "" });
  });
  it("should not split on smaller headings", () => {
    const markdown = md("## Cómo", "Texto.", "### Detalle", "Más texto.");

    const result = splitContentSections(markdown);

    expect(result.sections).toHaveLength(1);
    expect(result.sections[0].body).toBe("Texto.\n### Detalle\nMás texto.");
  });

  it("should handle Windows line breaks", () => {
    const markdown = "## Qué es\r\nCuerpo.";

    const result = splitContentSections(markdown);

    expect(result.sections[0]).toEqual({ title: "Qué es", body: "Cuerpo." });
  });
});
