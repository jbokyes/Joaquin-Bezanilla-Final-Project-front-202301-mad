import {
  FoodStructure,
  FoodServerResponse,
  ProtoFoodStructure,
} from "../../models/food";

export interface FoodRepoStructure {
  loadFoods(): Promise<FoodServerResponse[]>;
  loadSpecificFood(id: FoodStructure["id"]): Promise<FoodServerResponse>;
  createFood(food: FoodStructure): Promise<FoodServerResponse>;
  updateFood(food: Partial<FoodStructure>): Promise<FoodServerResponse>;
  deleteFood(id: FoodStructure["id"]): Promise<void>;
}

export class FoodRepo {
  // Recordar tipado cuando agregue funciones
  url: string;
  constructor() {
    this.url = "http://localhost:4200/foods";
  }

  async loadFoods(): Promise<FoodServerResponse> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Wrong fetch" + resp.status + "/" + resp.statusText);
    const data = await resp.json();
    return data;
  }
  async loadSingleFood(
    foodId: FoodStructure["id"]
  ): Promise<FoodServerResponse> {
    const url = this.url + "/details/" + foodId;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error getting this one Food Dish" + resp.status);
    const data: FoodServerResponse = await resp.json();
    return data;
  }
  async createFood(food: ProtoFoodStructure): Promise<FoodServerResponse> {
    const resp = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(resp);
    if (!resp.ok)
      throw new Error("Error HTTP: " + resp.status + " / " + resp.statusText);
    const data = await resp.json();
    return data;
  }
  async patchFood(food: Partial<FoodStructure>): Promise<FoodServerResponse> {
    const url = this.url + "/edit/" + food.id;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(food),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error("HTTP Error: " + resp.status + " / " + resp.statusText);
    const updatedData = await resp.json();
    return updatedData;
  }

  async deleteFood(foodId: FoodStructure["id"]): Promise<void> {
    const url = this.url + "/" + foodId;
    const resp = await fetch(url, {
      method: "DELETE",
    });
    if (!resp.ok)
      throw new Error("HTTP Error: " + resp.status + " / " + resp.statusText);
  }
}
