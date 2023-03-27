import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Welcome } from "./welcome";

describe("Given the Welcome component", () => {
  describe("When rendering", () => {
    test("then it should render Welcome", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Welcome></Welcome>
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
