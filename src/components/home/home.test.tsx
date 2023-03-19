import { render, screen } from "@testing-library/react";
import { Home } from "./home";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Home", () => {
      render(<Home></Home>);
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
