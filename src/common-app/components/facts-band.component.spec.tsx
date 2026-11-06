import { render, screen, within } from "@testing-library/react";
import { FactsBand } from "./facts-band.component";

const facts = [
  { label: "Marca", value: "Volvo" },
  { label: "Modelo", value: "940 Turbo" },
];

describe("FactsBand", () => {
  it("should render each fact with its label and value", () => {
    render(<FactsBand facts={facts} label="Ficha del coche" />);

    expect(screen.getAllByRole("term").map((term) => term.textContent)).toEqual(
      ["Marca", "Modelo"],
    );
    expect(
      screen.getAllByRole("definition").map((value) => value.textContent),
    ).toEqual(["Volvo", "940 Turbo"]);
  });

  it("should not render facts with an empty or undefined value", () => {
    render(
      <FactsBand
        facts={[
          { label: "Marca", value: "Volvo" },
          { label: "Motor", value: "" },
          { label: "Comprado", value: undefined },
        ]}
        label="Ficha del coche"
      />,
    );

    expect(screen.getAllByRole("term").map((term) => term.textContent)).toEqual(
      ["Marca"],
    );
  });

  it("should use the label as the accessible name of the section", () => {
    render(<FactsBand facts={facts} label="Ficha del coche" />);

    expect(
      screen.getByRole("region", { name: "Ficha del coche" }),
    ).toBeInTheDocument();
  });

  it("should not render extra content without children", () => {
    render(<FactsBand facts={facts} label="Ficha del coche" />);

    const region = screen.getByRole("region", { name: "Ficha del coche" });
    expect(region.children).toHaveLength(1);
  });

  it("should render the children below the facts", () => {
    render(
      <FactsBand facts={facts} label="Ficha del coche">
        <p>Estado del proyecto</p>
      </FactsBand>,
    );

    const region = screen.getByRole("region", { name: "Ficha del coche" });
    const extra = within(region).getByText("Estado del proyecto");
    const list = within(region).getAllByRole("term")[0].closest("dl")!;
    expect(
      list.compareDocumentPosition(extra) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
