import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./theme-toggle.component";

const html = document.documentElement;
const systemMatchMedia = window.matchMedia;

describe("ThemeToggle", () => {
  afterEach(() => {
    // Desmontar antes de tocar <html>: si no, el MutationObserver actualiza el componente fuera de act()
    cleanup();
    html.removeAttribute("data-theme");
    localStorage.clear();
    window.matchMedia = systemMatchMedia;
    vi.restoreAllMocks();
  });

  it("should offer the dark theme when the system is light and there is no saved theme", () => {
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Cambiar a tema oscuro" }),
    ).toBeInTheDocument();
  });

  it("should offer the light theme when <html> already has the dark theme", () => {
    html.setAttribute("data-theme", "plano");

    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Cambiar a tema claro" }),
    ).toBeInTheDocument();
  });

  it("should switch to the dark theme and save it when clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ThemeToggle />);

    // Act
    await user.click(
      screen.getByRole("button", { name: "Cambiar a tema oscuro" }),
    );

    // Assert
    expect(
      await screen.findByRole("button", { name: "Cambiar a tema claro" }),
    ).toBeInTheDocument();
    expect(html).toHaveAttribute("data-theme", "plano");
    expect(localStorage.getItem("theme")).toBe("plano");
  });

  it("should go back to the light theme when clicked twice", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ThemeToggle />);

    // Act
    await user.click(
      screen.getByRole("button", { name: "Cambiar a tema oscuro" }),
    );
    await user.click(
      await screen.findByRole("button", { name: "Cambiar a tema claro" }),
    );

    // Assert
    expect(
      await screen.findByRole("button", { name: "Cambiar a tema oscuro" }),
    ).toBeInTheDocument();
    expect(html).toHaveAttribute("data-theme", "papel");
    expect(localStorage.getItem("theme")).toBe("papel");
  });

  it("should change the theme even if the storage is not available", async () => {
    // Arrange
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    render(<ThemeToggle />);

    // Act
    await user.click(
      screen.getByRole("button", { name: "Cambiar a tema oscuro" }),
    );

    // Assert
    expect(
      await screen.findByRole("button", { name: "Cambiar a tema claro" }),
    ).toBeInTheDocument();
    expect(html).toHaveAttribute("data-theme", "plano");
  });

  it("should offer the light theme when the system is dark and there is no saved theme", () => {
    // Arrange: el sistema prefiere el tema oscuro
    window.matchMedia = (query: string) => ({
      ...systemMatchMedia(query),
      matches: true,
    });

    // Act
    render(<ThemeToggle />);

    // Assert
    expect(
      screen.getByRole("button", { name: "Cambiar a tema claro" }),
    ).toBeInTheDocument();
  });
});
