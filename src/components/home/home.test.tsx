import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Home } from "./home";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Home", () => {
      render(
        <Provider store={store}>
          <Home></Home>
        </Provider>
      );
      const element = screen.getByRole("img");
      expect(element).toBeInTheDocument();
    });
  });
});
