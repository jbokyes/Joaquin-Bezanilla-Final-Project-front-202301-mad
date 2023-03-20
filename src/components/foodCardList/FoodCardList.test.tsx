/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodStructure } from "../../models/food";
import { store } from "../../store/store";
import { FoodCardList } from "./FoodCardList";

jest.mock("../foodCard/FoodCard");
jest.mock("../../hooks/use.food");

describe("Given FoodCardList component", () => {
  beforeEach(async () => {
    (useFood as jest.Mock).mockReturnValue({
      foods: [
        {
          id: "1",
          name: "choripan1",
        } as FoodStructure,
        {
          id: "2",
          name: "choripan",
        } as FoodStructure,
      ],
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <FoodCardList></FoodCardList>
          </MemoryRouter>
        </Provider>
      );
    });
  });

  describe("When FoodCardList is rendered", () => {
    test("Then it should return images too", async () => {
      act(async () => {
        const elements = await screen.findAllByRole("img");
        expect(elements[0]).toBeInTheDocument();
        const name = await screen.findByRole("list");
        expect(name).toBeInTheDocument();
        const elementNumbers = screen.getAllByRole("list");
        for (let i = 0; i < elementNumbers.length; i++) {
          expect(elementNumbers).toBeTruthy();
        }
      });
    });
  });
});
