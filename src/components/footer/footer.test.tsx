import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Given the Footer component", () => {
  describe("When rendering", () => {
    test("then it should render Footer", () => {
      render(<Footer></Footer>);
      const element = screen.getAllByRole("img");
      expect(element[0]).toBeInTheDocument();
    });
  });
});
