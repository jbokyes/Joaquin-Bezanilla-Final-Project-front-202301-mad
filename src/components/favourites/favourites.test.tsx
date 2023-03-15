import { render, screen } from "@testing-library/react";
import { Favourites } from "./favourites";

describe("Given the Favourites component", () => {
  describe("When rendering", () => {
    test("then it should render Favourites", () => {
      render(<Favourites></Favourites>);
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
