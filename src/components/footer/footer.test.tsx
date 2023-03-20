import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Given the Footer component", () => {
  describe("When rendering", () => {
    test("then it should render Home", () => {
      render(<Footer></Footer>);
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
