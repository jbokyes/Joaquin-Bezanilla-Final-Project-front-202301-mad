import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Register } from "./register";

describe("Given the Home component", () => {
  describe("When rendering", () => {
    test("then it should render Register", () => {
      render(
        <Provider store={store}>
          <Register></Register>
        </Provider>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
