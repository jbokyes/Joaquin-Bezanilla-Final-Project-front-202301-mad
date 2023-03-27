import { render, screen } from "@testing-library/react";
import { MenuOption } from "../app/app";
import { MemoryRouter as Router } from "react-router-dom";
import { Menu } from "./menu";
import { useUsers } from "../../hooks/use.users";
jest.mock("../../hooks/use.users");

describe("Given the menu component", () => {
  describe("when we render the component while being logged", () => {
    test("then it should render the menu component in the header component, with menuLoggedOptions", () => {
      (useUsers as jest.Mock).mockReturnValue({
        logoutUser: jest.fn(),
        usersState: {
          userLogged: {
            email: "test",
          },
        },
      });
      const mockOptions: MenuOption[] = [
        {
          label: "test",
          path: "/test",
        },
      ];
      render(
        <Router>
          <Menu options={mockOptions}></Menu>
        </Router>
      );

      const element = screen.getByRole("list");
      expect(element).toBeInTheDocument();
    });
    test("then it should render the menu component in the header component, with menuOptions", () => {
      (useUsers as jest.Mock).mockReturnValue({
        logoutUser: jest.fn(),
        usersState: {
          userLogged: {},
        },
      });
      const mockOptions: MenuOption[] = [
        {
          label: "test",
          path: "/test",
        },
      ];
      render(
        <Router>
          <Menu options={mockOptions}></Menu>
        </Router>
      );

      const element = screen.getByRole("list");
      expect(element).toBeInTheDocument();
    });
  });
});
