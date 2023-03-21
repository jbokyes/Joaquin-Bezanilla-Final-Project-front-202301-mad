import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Form } from "./form";

describe("Given the Form component", () => {
  let elements: HTMLElement[];

  describe("When we render the form component", () => {
    test("Then the form should appear on the screen", () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Form></Form>
          </MemoryRouter>
        </Provider>
      );
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When the user writes in all of the inputs the form asks for", () => {
    test("Then they should appear on the screen", () => {
      const mockFood = null;
    });
  });
});
