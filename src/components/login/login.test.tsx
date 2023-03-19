/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../services/repositories/users.repo";
import { store } from "../../store/store";
import { Login } from "./login";

jest.mock("../../hooks/use.users");

describe("Given the Login component", () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        loginUser: jest.fn(),
      });
      render(
        <Provider store={store}>
          <Router>
            <Login></Login>
          </Router>
        </Provider>
      );
    });
  });
  describe("When rendering the login component", () => {
    test("Then it should render the title 'login'", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
    test("Then the email <input> should be in the document", () => {
      const inputs0 = screen.getAllByRole("textbox");
      expect(inputs0[0]).toBeInTheDocument();
    });
    test("Then the password <input> should be in the document", () => {
      const inputs1 = screen.getAllByRole("textbox");
      expect(inputs1[1]).toBeInTheDocument();
    });
    test("Then the <button> should be in the document", () => {
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
    describe("When the submit button is clicked", () => {
      test("Then, the handleSubmit function should be called", async () => {
        const usersMockRepo = {} as unknown as UsersApiRepo;
        const inputs = screen.getAllByRole("textbox");
        await userEvent.type(inputs[0], "test");
        await userEvent.type(inputs[1], "test");
        const button = screen.getByRole("button");
        await userEvent.click(button);
        expect(useUsers(usersMockRepo).loginUser).toHaveBeenCalledWith({
          email: "test",
          passwd: "test",
        });
      });
    });
  });
});
