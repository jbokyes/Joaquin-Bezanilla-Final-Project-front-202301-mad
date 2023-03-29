import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import UserLogout from "./userLogout";

describe("Given the Logout component", () => {
  describe("When rendering", () => {
    test("then it should render Logout", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <UserLogout></UserLogout>
          </Provider>
        </MemoryRouter>
      );
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
});
