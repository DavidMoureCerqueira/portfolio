import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ModificationApi } from "../modifications/api/api.model";
import { mapModificationApiToVm } from "../modifications/modification.map";
import {
  buildCarProjectApi,
  buildModificationApi,
} from "../personal-project.builders";
import { mapCarProjectProgress } from "../personal-project.helpers";
import { ModificationsSection } from "./modifications-section";

// Mismo camino que en producción: tarjetas y contadores salen de las mismas modificaciones
const renderSection = (modifications: ModificationApi[]) => {
  const { progress } = mapCarProjectProgress(
    buildCarProjectApi({ modifications }),
  );
  return render(
    <ModificationsSection
      number={3}
      modifications={modifications.map(mapModificationApiToVm)}
      progress={progress}
    />,
  );
};

const modifications = [
  buildModificationApi({ id: "1", title: "Turbo T25", status: "finalizado" }),
  buildModificationApi({ id: "2", title: 'Escape 3"', status: "finalizado" }),
  buildModificationApi({ id: "3", title: "Centralita", status: "en-curso" }),
  buildModificationApi({ id: "4", title: "Frenos", status: "idea" }),
];

const cardTitles = () =>
  screen
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);

const filterButton = (name: RegExp) => screen.getByRole("button", { name });

describe("ModificationsSection", () => {
  it("should render nothing when there are no modifications", () => {
    const { container } = renderSection([]);

    expect(container).toBeEmptyDOMElement();
  });

  it("should show «Todas» and only the statuses with modifications, in order, with their counts", () => {
    renderSection(modifications);

    const filters = within(
      screen.getByRole("list", { name: "Filtrar por estado" }),
    ).getAllByRole("button");
    expect(filters.map((button) => button.textContent)).toEqual([
      "Todas4",
      "Finalizadas2",
      "En curso1",
      "Ideas1",
    ]);
  });

  it("should start with «Todas» pressed and every card visible", () => {
    renderSection(modifications);

    expect(filterButton(/^Todas/)).toHaveAttribute("aria-pressed", "true");
    expect(cardTitles()).toHaveLength(4);
  });

  it("should show only the matching cards when a status is selected", async () => {
    // Arrange
    const user = userEvent.setup();
    renderSection(modifications);

    // Act
    await user.click(filterButton(/^Finalizadas/));

    // Assert
    expect(cardTitles()).toEqual(["Turbo T25", 'Escape 3"']);
    expect(filterButton(/^Finalizadas/)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(filterButton(/^Todas/)).toHaveAttribute("aria-pressed", "false");
  });

  it("should show every card again when going back to «Todas»", async () => {
    // Arrange
    const user = userEvent.setup();
    renderSection(modifications);
    await user.click(filterButton(/^Finalizadas/));

    // Act
    await user.click(filterButton(/^Todas/));

    // Assert
    expect(cardTitles()).toHaveLength(4);
    expect(filterButton(/^Todas/)).toHaveAttribute("aria-pressed", "true");
  });
});
