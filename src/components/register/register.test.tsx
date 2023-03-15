/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../services/repositories/users.api.repo";
import { store } from "../../store/store";
import Register from "./register";

jest.mock("../../hooks/use.users");

describe("Given the Register component", () => {
  beforeEach(async () => {
    await act(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        registerUser: jest.fn(),
      });
      render(
        <Provider store={store}>
          <Router>
            <Register></Register>
          </Router>
        </Provider>
      );
    });
  });
  describe("When rendering", () => {
    test("then it should render title Register", () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
    test("Then the name <input> should be in the document", () => {
      const inputs = screen.getAllByRole("textbox");
      expect(inputs[0]).toBeInTheDocument();
    });
    test("Then the lastName <input> should be in the document", () => {
      const inputs = screen.getAllByRole("textbox");
      expect(inputs[1]).toBeInTheDocument();
    });
    test("Then the email <input> should be in the document", () => {
      const inputs = screen.getAllByRole("textbox");
      expect(inputs[2]).toBeInTheDocument();
    });
    test("Then the password <input> should be in the document", () => {
      const inputs = screen.getAllByRole("textbox");
      expect(inputs[3]).toBeInTheDocument();
    });
    test("Then the <button> should be in the document", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When the submit button is clicked", () => {
    test("Then, the handleSubmit function should be called", async () => {
      const usersMockRepo = {} as unknown as UsersApiRepo;
      const inputs = screen.getAllByRole("textbox");
      await userEvent.type(inputs[0], "test");
      await userEvent.type(inputs[1], "test");
      await userEvent.type(inputs[2], "test");
      await userEvent.type(inputs[3], "test");
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(useUsers(usersMockRepo).registerUser).toHaveBeenCalledWith({
        name: "test",
        lastName: "test",
        email: "test",
        passwd: "test",
      });
    });
  });
});
