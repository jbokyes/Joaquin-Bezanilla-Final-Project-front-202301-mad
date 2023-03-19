import { createAction } from "@reduxjs/toolkit";
import { FoodStructure } from "../models/food";
import { foodActions } from "./food.action.types";

export const loadCreator = createAction<FoodStructure[]>(foodActions.load);
export const addCreator = createAction<FoodStructure>(foodActions.add);
export const updateCreator = createAction<FoodStructure>(foodActions.update);
export const deleteCreator = createAction<FoodStructure["id"]>(
  foodActions.delete
);
