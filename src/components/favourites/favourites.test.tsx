import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { UserStructure } from "../../models/user";
import { store } from "../../store/store";
import { Favourites } from "./favourites";

jest.mock("../../hooks/use.users");
describe("Given the Favourites component", () => {
  describe("When rendering", () => {
    beforeEach(async () => {
      (useUsers as jest.Mock).mockReturnValue({
        usersState: {
          user: {
            addFoods: [
              { id: "1", name: "choripan" },
              { id: "2", name: "arepas" },
            ],
          } as UserStructure,
          userFavourites: jest.fn(),
        },
      });
    });
    test("then it should render Favourites", () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Favourites></Favourites>
          </MemoryRouter>
        </Provider>
      );
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
