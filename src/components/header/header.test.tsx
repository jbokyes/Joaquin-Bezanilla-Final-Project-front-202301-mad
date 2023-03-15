import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Given the Header component", () => {
  describe("assuming it has anything as children", () => {
    test("then it should Header", () => {
      render(
        <Header>
          <></>
        </Header>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
