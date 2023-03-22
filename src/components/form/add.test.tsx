import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import Add from "./add";

describe("Given the Form component", () => {
  describe("When we render the form component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Add></Add>
        </MemoryRouter>
      </Provider>
    );
    test("Then there should be a title should appear on the screen", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
