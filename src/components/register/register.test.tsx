import { render, screen } from "@testing-library/react";
import { Register } from "./register";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Register", () => {
      render(<Register></Register>);
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
