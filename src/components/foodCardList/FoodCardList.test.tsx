/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import { FoodCardList } from "./FoodCardList";

jest.mock("../foodCard/FoodCard");
jest.mock("../../hooks/use.food");
const foodMockRepo = {} as FoodRepo;
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
      loadFoods: jest.fn(),
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <FoodCardList></FoodCardList>
        </MemoryRouter>
      );
    });
  });

  describe("When FoodCardList is rendered", () => {
    test("Then it should return a functionable button that pages forward", async () => {
      await act(async () => {
        const buttons = await screen.findAllByRole("button");
        expect(buttons[1]).toBeInTheDocument();
        await userEvent.click(buttons[1]);

        expect(useFood(foodMockRepo).loadFoods).toHaveBeenCalled();
      });
    });
    test("Then it should return a functionable button that pages back", async () => {
      await act(async () => {
        const buttons = await screen.findAllByRole("button");
        expect(buttons[0]).toBeInTheDocument();
        await userEvent.click(buttons[0]);
        expect(useFood(foodMockRepo).loadFoods).toHaveBeenCalled();
      });
    });
    test("Then it should return a functionable button that changes filter", async () => {
      await act(async () => {
        const buttons = await screen.findAllByRole("button");
        expect(buttons[2]).toBeInTheDocument();
        await userEvent.click(buttons[0]);
        expect(useFood(foodMockRepo).loadFoods).toHaveBeenCalled();
      });
    });
  });
});
