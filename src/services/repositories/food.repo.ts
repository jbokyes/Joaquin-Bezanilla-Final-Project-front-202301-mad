import { FoodStructure, FoodServerResponse } from "../../models/food";

export interface FoodRepoStructure {
  loadFoods(): Promise<FoodServerResponse[]>;
  loadSpecificFood(id: FoodStructure["id"]): Promise<FoodServerResponse>;
  createFood(food: FoodStructure): Promise<FoodServerResponse>;
  updateFood(food: Partial<FoodStructure>): Promise<FoodServerResponse>;
  deleteFood(id: FoodStructure["id"]): Promise<void>;
}

export class FoodRepo {
  url: string;
  constructor() {
    this.url = "http://localhost:4500/bombardinos";
  }

  async loadFoods(): Promise<FoodServerResponse> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Wrong fetch" + resp.status + "/" + resp.statusText);
    const data = await resp.json();
    return data;
  }
}
