/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { foodReducer } from "../reducers/food.reducer";
import { FoodRepo } from "../services/repositories/food.repo";
import { useFood } from "./use.food";

describe("Given the useFood hook", () => {
  let elements: HTMLElement[];

  const mockStore = configureStore({
    reducer: { foods: foodReducer },
    preloadedState: {
      foods: [
        {
          id: "20",
          name: "comida rica",
          cuisine: "cocina test",
          diet: "nada",
          info: "hola test",
          region: "CHILE",
          img: "test link",
        },
        {
          id: "25",
          name: "comida mala",
          cuisine: "cocina test",
          diet: "veganisimo",
          info: "chao test",
          region: "argentina :(",
          img: "link test",
        },
      ],
    },
  });

  const mockRepo: FoodRepo = {
    url: "testing",
    loadFoods: jest.fn(),
    loadSingleFood: jest.fn(),
  };
  beforeEach(async () => {
    const TestComponent = function () {
      const { loadFoods, loadOneFood } = useFood(mockRepo);
      return (
        <div>
          <button onClick={() => loadFoods()}></button>
          <button onClick={() => loadOneFood("1")}></button>
        </div>
      );
    };
    await act(async () => {
      render(
        <>
          <Provider store={mockStore}>
            <TestComponent></TestComponent>
          </Provider>
        </>
      );
    });
    elements = await screen.findAllByRole("button");
  });
  describe("When the TestComponent is rendered", () => {
    test("We should find a button in the document", async () => {
      const element = await screen.findAllByRole("button");
      expect(element[0]).toBeInTheDocument();
    });
  });

  describe("When clicking on the first button", () => {
    test("Then it should call the repo method loadFoods", async () => {
      await fireEvent.click(elements[0]);
      expect(mockRepo.loadFoods).toHaveBeenCalled();
    });
  });
  describe("When clicking on the second button", () => {
    test("Then it should call the repo method loadOneBombardino", async () => {
      const loadSingleFood = await fireEvent.click(elements[1]);
      expect(mockRepo.loadSingleFood).toHaveBeenCalled();
      expect(loadSingleFood).toEqual(true);
    });
  });
});
