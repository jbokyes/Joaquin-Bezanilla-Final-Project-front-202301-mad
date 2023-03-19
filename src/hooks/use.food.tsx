import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import * as ac from "../reducers/food.action.creator";
import { FoodRepo } from "../services/repositories/food.repo";

export function useFood(repo: FoodRepo) {
  const foods = useSelector((state: RootState) => state.foods);
  const dispatch = useDispatch<AppDispatch>();

  const loadFoods = useCallback(async () => {
    try {
      const data = await repo.loadFoods();
      dispatch(ac.loadCreator(data.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, repo]);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  return { foods, loadFoods };
}
