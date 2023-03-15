import { render, screen } from "@testing-library/react";
import { About } from "./about";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render About", () => {
      render(<About></About>);
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
