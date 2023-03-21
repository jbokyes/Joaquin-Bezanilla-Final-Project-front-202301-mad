/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { FoodStructure } from "../models/food";
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
  const mockFood = {
    id: "3",
    name: "empanada",
  } as unknown as FoodStructure;

  const mockRepo: FoodRepo = {
    url: "testing",
    loadFoods: jest.fn(),
    loadSingleFood: jest.fn(),
    createFood: jest.fn(),
    editFood: jest.fn(),
    deleteFood: jest.fn(),
  };
  beforeEach(async () => {
    const TestComponent = function () {
      const { loadFoods, loadOneFood, addFood, editFood, deleteFood } =
        useFood(mockRepo);
      return (
        <div>
          <button onClick={() => loadFoods()}></button>
          <button onClick={() => loadOneFood("1")}></button>
          <button title="addbutton" onClick={() => addFood(mockFood)}></button>
          <button title="edit" onClick={() => editFood(mockFood)}></button>
          <button
            title="delete"
            onClick={() => deleteFood(mockFood.id)}
          ></button>
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
  describe("When createFood is called", () => {
    test("Then it should create a new food with given details", async () => {
      await fireEvent.click(elements[2]);
      expect(mockRepo.createFood).toHaveBeenCalled();
    });
  });
  describe("When editFood is called", () => {
    test("Then it should change the details of given food to the ones it gives", async () => {
      await fireEvent.click(elements[3]);
      expect(mockRepo.editFood).toHaveBeenCalled();
    });
  });
  describe("When deleteFood is called", () => {
    test("Then it should call the delete mockFood", async () => {
      await fireEvent.click(elements[4]);
      expect(mockRepo.deleteFood).toHaveBeenCalled();
    });
  });
});
