import { render, screen } from "@testing-library/react";
import { Welcome } from "./welcome";

describe("Given the Welcome component", () => {
  describe("When rendering", () => {
    test("then it should render Home", () => {
      render(<Welcome></Welcome>);
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
