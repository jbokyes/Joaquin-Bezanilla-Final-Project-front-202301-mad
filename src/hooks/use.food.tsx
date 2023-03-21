import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import * as ac from "../reducers/food.action.creator";
import { FoodRepo } from "../services/repositories/food.repo";
import { FoodStructure, ProtoFoodStructure } from "../models/food";

export function useFood(repo: FoodRepo) {
  const foods = useSelector((state: RootState) => state.foods);
  // const usersState = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const loadFoods = useCallback(
    async (region?: string) => {
      try {
        const data = await repo.loadFoods();
        dispatch(ac.loadCreator(data.results));
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    [dispatch, repo]
  );

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  const loadOneFood = async (foodId: FoodStructure["id"]) => {
    try {
      const foodInfo = await repo.loadSingleFood(foodId);
      dispatch(ac.loadCreator(foodInfo.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const addFood = async (food: ProtoFoodStructure) => {
    try {
      const foodToAdd = await repo.createFood(food);
      dispatch(ac.addCreator(foodToAdd.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const editFood = async (food: Partial<FoodStructure>) => {
    try {
      const foodToEdit = await repo.editFood(food);
      dispatch(ac.updateCreator(foodToEdit.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const deleteFood = async (foodId: FoodStructure["id"]) => {
    try {
      await repo.deleteFood(foodId);
      dispatch(ac.deleteCreator(foodId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  return { foods, loadFoods, loadOneFood, addFood, editFood, deleteFood };
}
