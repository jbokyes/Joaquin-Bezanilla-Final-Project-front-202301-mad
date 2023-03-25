/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { configureStore } from "@reduxjs/toolkit";
import { act, render, screen, fireEvent } from "@testing-library/react";
import * as ac from "../reducers/food.action.creator";
import { Provider } from "react-redux";
import { FoodStructure } from "../models/food";
import { foodReducer } from "../reducers/food.reducer";
import { FoodRepo } from "../services/repositories/food.repo";
import { useFood } from "./use.food";

jest.mock("../services/firebase/firebase-food");

describe("Given the useFood hook", () => {
  const mockFood = {
    id: "3",
    name: "empanada",
    img: "charli",
  } as unknown as FoodStructure;
  let initialState = [
    { id: "3", img: "charli", name: "empanada" } as FoodStructure,
  ];
  const action = ac.addCreator(mockFood);
  const updateAction = ac.updateCreator(mockFood);
  let elements: HTMLElement[];

  const mockStore = configureStore({
    reducer: { foods: foodReducer },
    preloadedState: {
      foods: [],
    },
  });

  const mockFile = new File(["image"], "test.jpeg");
  const mockFormImage = "image";

  const mockRepo = {
    url: "testing",
    loadFoods: jest.fn(),
    loadSingleFood: jest.fn(),
    createFood: jest.fn(),
    patchFood: jest.fn(),
    deleteFood: jest.fn(),
  } as unknown as FoodRepo;
  beforeEach(async () => {
    const TestComponent = function () {
      const { loadFoods, loadOneFood, addFood, editFood, deleteFood } =
        useFood(mockRepo);
      return (
        <div>
          <button onClick={() => loadFoods()}></button>
          <button onClick={() => loadOneFood("1")}></button>
          <button
            title="addbutton"
            onClick={() => addFood(mockFood, mockFile)}
          ></button>
          <button
            title="edit"
            onClick={() => editFood(mockFood, mockFile, mockFormImage)}
          ></button>
          <button
            title="delete"
            onClick={() => deleteFood(mockFood.id)}
          ></button>
          <button
            title="edit with no formImage"
            onClick={() => editFood(mockFood, mockFile, "")}
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
    test("Then it should call the repo method loadSingleFood", async () => {
      const loadSingleFood = await fireEvent.click(elements[1]);
      expect(mockRepo.loadSingleFood).toHaveBeenCalled();
      expect(loadSingleFood).toEqual(true);
    });
  });
  describe("When createFood is called", () => {
    test("Then it should create a new food with given details", async () => {
      await fireEvent.click(elements[2]);
      expect(mockRepo.createFood).toHaveBeenCalled();
      const state = foodReducer(initialState, action);
      expect(state).toContainEqual(action.payload);
    });
  });
  describe("When editFood is called and it has a mockFile", () => {
    test("Then it should change the details of given food to the ones it gives", async () => {
      await fireEvent.click(elements[3]);
      expect(mockRepo.patchFood).toHaveBeenCalled();
      const state = foodReducer(initialState, updateAction);
      expect(state).toContainEqual(action.payload);
    });
  });
  describe("When editFood is called and it has no mockfile as a previous image", () => {
    test("Then it should change the details of given food to the ones it gives", async () => {
      await fireEvent.click(elements[5]);
      expect(mockRepo.patchFood).toHaveBeenCalled();
      const state = foodReducer(initialState, updateAction);
      expect(state).toContainEqual(action.payload);
    });
  });
  describe("When deleteFood is called", () => {
    test("Then it should call the delete mockFood", async () => {
      await fireEvent.click(elements[4]);
      expect(mockRepo.deleteFood).toHaveBeenCalled();
    });
  });
});
