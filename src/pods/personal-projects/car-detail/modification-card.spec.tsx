import type { Media } from "@content-island/api-client";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ModificationApi } from "../modifications/api/api.model";
import { mapModificationApiToVm } from "../modifications/modification.map";
import { buildModificationApi } from "../personal-project.builders";
import { ModificationCard } from "./modification-card";

const renderCard = (overrides: Partial<ModificationApi> = {}) =>
  render(
    <ModificationCard
      modification={mapModificationApiToVm(buildModificationApi(overrides))}
    />,
  );

const image = { url: "https://example.com/escape.webp" } as Media;

describe("ModificationCard", () => {
  it("should show the category, title, summary and techniques", () => {
    renderCard({
      category: "motor",
      title: "Línea de escape",
      summary: 'Línea de escape completa en 3".',
      techniques: ["soldadura", "impresion-3d"],
    });

    expect(screen.getByText("Motor")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Línea de escape" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Línea de escape completa en 3".'),
    ).toBeInTheDocument();
    const techniques = screen.getByRole("list", { name: "Técnicas" });
    expect(
      within(techniques)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["Soldadura", "Impresión 3D"]);
  });

  it("should not have a detail button without content or image", () => {
    renderCard({ content: undefined, image: undefined });

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should offer «Ver detalle» with the detail hidden when there is content", () => {
    renderCard({ content: "Colector soldado a mano." });

    const button = screen.getByRole("button", { name: "Ver detalle" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Colector soldado a mano.")).not.toBeVisible();
  });

  it("should offer «Ver foto» when there is only an image", () => {
    renderCard({ content: undefined, image, imageAlt: "Escape terminado" });

    expect(
      screen.getByRole("button", { name: "Ver foto" }),
    ).toBeInTheDocument();
  });

  it("should show and hide the content when the button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    renderCard({ content: "Colector soldado a mano." });
    const button = screen.getByRole("button", { name: "Ver detalle" });

    // Act: abrir
    await user.click(button);

    // Assert
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Ocultar detalle");
    expect(screen.getByText("Colector soldado a mano.")).toBeVisible();

    // Act: cerrar
    await user.click(button);

    // Assert
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAccessibleName("Ver detalle");
    expect(screen.getByText("Colector soldado a mano.")).not.toBeVisible();
  });

  it("should show the image with its alt as caption when opened", async () => {
    // Arrange
    const user = userEvent.setup();
    renderCard({ content: undefined, image, imageAlt: "Escape terminado" });

    // Act
    await user.click(screen.getByRole("button", { name: "Ver foto" }));

    // Assert
    expect(screen.getByRole("img", { name: "Escape terminado" })).toBeVisible();
    expect(screen.getByText("Escape terminado")).toBeVisible();
  });

  it("should link the button to its detail with aria-controls", () => {
    renderCard({ content: "Colector soldado a mano." });

    const controls = screen
      .getByRole("button", { name: "Ver detalle" })
      .getAttribute("aria-controls");
    const detail = document.getElementById(controls ?? "");
    expect(detail).toContainElement(
      screen.getByText("Colector soldado a mano."),
    );
  });
});
