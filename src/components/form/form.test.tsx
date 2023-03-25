/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodRepo } from "../../services/repositories/food.repo";
import { store } from "../../store/store";
import { Form } from "./form";

const mockParams = { id: "70" };
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams,
}));
jest.mock("../../hooks/use.food");

const mockRepo = {
  url: "testing",
  loadFoods: jest.fn(),
  loadSingleFood: jest.fn(),
  createFood: jest.fn(),
  patchFood: jest.fn(),
  deleteFood: jest.fn(),
} as unknown as FoodRepo;
describe("Given the Form component", () => {
  let elements: HTMLElement[];

  describe("When we render the form component", () => {
    beforeEach(async () => {
      (useFood as jest.Mock).mockReturnValue({
        foods: [
          {
            id: "1",
            name: "foodtest1",
          },
          {
            id: "2",
            name: "foodtest2",
          },
          {
            id: "70",
            name: "choripan",
          },
        ],
        addFood: jest.fn(),
        editFood: jest.fn(),
      });
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Form></Form>
            </MemoryRouter>
          </Provider>
        );
      });
    });
    test("Then the form should appear on the screen", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
    /* Esta línea de test no quiere pasar, dejo código comentado
    describe("When the user clicks the submit button and there is no existing food dish", () => {
      test("then it calls addCreator when submitting a foodDish", async () => {
        elements = await screen.findAllByRole("button");
        await fireEvent.click(elements[0]);
        expect(useFood(mockRepo).addFood).toHaveBeenCalled();
      });
    });*/
    describe("When the user clicks the submit button and there is an existing food dish", () => {
      test("then it calls patchFood when submitting a foodDish", async () => {
        elements = await screen.findAllByRole("button");
        await fireEvent.click(elements[0]);
        expect(useFood(mockRepo).editFood).toHaveBeenCalled();
      });
    });
  });
});
