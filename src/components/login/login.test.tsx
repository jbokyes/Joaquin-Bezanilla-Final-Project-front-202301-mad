import { render, screen } from "@testing-library/react";
import { Login } from "./login";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Login", () => {
      render(<Login></Login>);
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
