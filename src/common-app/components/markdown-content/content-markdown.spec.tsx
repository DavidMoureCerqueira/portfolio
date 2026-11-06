import { render, screen, within } from "@testing-library/react";
import { ContentMarkdown } from "./content-markdown";

// El bloque de solución es el párrafo siguiente a la etiqueta «Solución»
const solutionOf = (item: HTMLElement) => {
  const label = within(item).getByText("Solución");
  return label.nextElementSibling as HTMLElement;
};

describe("ContentMarkdown", () => {
  describe("challenge → solution", () => {
    it("should split a bold challenge from its solution", () => {
      render(
        <ContentMarkdown>
          {"- **Reto:** conseguir datos → **Solución:** usar un Excel"}
        </ContentMarkdown>,
      );

      const item = screen.getByRole("listitem");
      expect(item).toHaveTextContent("Reto: conseguir datos");
      expect(solutionOf(item)).toHaveTextContent("usar un Excel");
      expect(solutionOf(item)).not.toHaveTextContent("→");
    });

    it("should split a challenge without bold", () => {
      render(<ContentMarkdown>{"- Reto: X → Solución: Y"}</ContentMarkdown>);

      const item = screen.getByRole("listitem");
      expect(item).toHaveTextContent("Reto: X");
      expect(solutionOf(item)).toHaveTextContent(/^Y$/);
    });

    it("should split a challenge in a loose list", () => {
      // Arrange: ítems separados por una línea en blanco → contenido dentro de <p>
      const markdown =
        "- **Reto:** conseguir datos → **Solución:** usar un Excel\n\n- Otro punto";

      // Act
      render(<ContentMarkdown>{markdown}</ContentMarkdown>);

      // Assert
      const [challenge] = screen.getAllByRole("listitem");
      expect(challenge).toHaveTextContent("Reto: conseguir datos");
      expect(solutionOf(challenge)).toHaveTextContent("usar un Excel");
      expect(solutionOf(challenge)).not.toHaveTextContent("→");
    });

    it("should render a normal item as it is", () => {
      render(<ContentMarkdown>{"- Un punto normal"}</ContentMarkdown>);

      const item = screen.getByRole("listitem");
      expect(item).toHaveTextContent("Un punto normal");
      expect(within(item).queryByText("Solución")).not.toBeInTheDocument();
    });

    it("should render an item with an arrow but no solution as it is", () => {
      render(<ContentMarkdown>{"- Motor → turbo T25"}</ContentMarkdown>);

      const item = screen.getByRole("listitem");
      expect(item).toHaveTextContent("Motor → turbo T25");
      expect(within(item).queryByText("Solución")).not.toBeInTheDocument();
    });

    it("should give each challenge its own solution", () => {
      render(
        <ContentMarkdown>
          {[
            "- **Reto:** primero → **Solución:** uno",
            "- **Reto:** segundo → **Solución:** dos",
          ].join("\n")}
        </ContentMarkdown>,
      );

      const [first, second] = screen.getAllByRole("listitem");
      expect(solutionOf(first)).toHaveTextContent("uno");
      expect(solutionOf(second)).toHaveTextContent("dos");
    });
  });

  describe("links", () => {
    it("should open external links in a new tab", () => {
      render(
        <ContentMarkdown>{"[Demo](https://example.com)"}</ContentMarkdown>,
      );

      const link = screen.getByRole("link", { name: "Demo" });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });

    it("should open internal links in the same tab", () => {
      render(<ContentMarkdown>{"[Proyectos](/proyectos-it)"}</ContentMarkdown>);

      expect(
        screen.getByRole("link", { name: "Proyectos" }),
      ).not.toHaveAttribute("target");
    });
  });

  it("should render a numbered list as an ordered list", () => {
    render(<ContentMarkdown>{"1. Primero\n2. Segundo"}</ContentMarkdown>);

    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });
});
