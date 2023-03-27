import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import { Home } from "./home";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Home", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Home></Home>
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
