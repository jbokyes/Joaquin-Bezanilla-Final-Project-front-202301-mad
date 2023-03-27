import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FoodStructure } from "../../models/food";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import { FoodCard } from "./FoodCard";

const mockFoodCard = {
  name: "test-choripan",
  img: "test-url",
} as unknown as FoodStructure;

describe("Given a FoodCard component", () => {
  describe("When rendered", () => {
    render(
      <Provider store={store}>
        <Router>
          <FoodCard food={mockFoodCard}></FoodCard>
        </Router>
      </Provider>
    );
    test("Then we should find the name of the first FoodCard", () => {
      const firstFoodCard = screen.getByText(mockFoodCard.name);
      expect(firstFoodCard).toBeInTheDocument();
    });
  });
});
