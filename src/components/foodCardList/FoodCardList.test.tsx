/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { FoodStructure } from "../../models/food";
import { store } from "../../store/store";
import { FoodCard } from "../foodCard/FoodCard";

const mockFoods = {
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
};

describe("Given FoodCardList component", () => {
  /*beforeEach(() => {
    render(
      <Provider store={store}>
        <FoodCardList></FoodCardList>
      </Provider>
    );
  });*/

  describe("When we render a FoodCard", () => {
    test("Then we should be able to see it in the document", async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              {mockFoods.foods.map((item: FoodStructure) => (
                <FoodCard food={item} key={item.id}></FoodCard>
              ))}
            </MemoryRouter>
          </Provider>
        );
      });
      const foodName = await screen.findByText("choripan1");
      expect(foodName).toBeInTheDocument();
    });
  });
  describe("When it is rendered", () => {
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
