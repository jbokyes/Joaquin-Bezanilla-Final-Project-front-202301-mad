import * as ac from "./food.action.creator";
import { foodReducer } from "./food.reducer";

describe("Given foodReducer", () => {
  const foodDish1 = {
    id: "1",
    name: "choripan",
    cuisine: "BBQ",
    diet: "none",
    info: "muy rico",
    region: "chile",
    img: "blablabla",
  };
  const foodDish2 = {
    id: "2",
    name: "puré con huevo",
    cuisine: "casera",
    diet: "vegetarian",
    info: "muy muy rico",
    region: "chile",
    img: "blablabla",
  };
  const foodDishes = [foodDish1, foodDish2];

  describe("When the food reducer is called", () => {
    test("Then it should call the initial state", () => {
      expect(
        foodReducer(undefined, {
          type: undefined,
        })
      ).toEqual([]);
    });
    test("Then it should return the festival", () => {
      const action = ac.loadOneCreator(foodDish2);
      const state = foodReducer(foodDishes, action);
      expect(state).toEqual({ ...foodDishes, payload: foodDish2 });
    });
    test("Then it should call loadCreator and load foods", () => {
      expect(foodReducer([], ac.loadCreator(foodDishes))).toEqual(foodDishes);
    });
    test("Then it should call addCreator and add foodDish2 to an array with foodDish1 and equal foodDishes", () => {
      expect(foodReducer([foodDish1], ac.addCreator(foodDish2))).toEqual(
        foodDishes
      );
    });
    test("Then it should call updateCreator and return a different array", () => {
      const updatedfoodDish2 = {
        ...foodDish2,
        region: "region-updated",
      };
      const updatedfoodDishes = [foodDish1, updatedfoodDish2];
      expect(
        foodReducer(foodDishes, ac.updateCreator(updatedfoodDish2))
      ).toEqual(updatedfoodDishes);
    });
    test("Then the delete should give us an array with a single food dish", () => {
      expect(foodReducer(foodDishes, ac.deleteCreator(foodDish2.id))).toEqual([
        foodDish1,
      ]);
    });
  });
});
