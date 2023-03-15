export type ProtoFoodStructure = {
  name: string;
  cuisine: string;
  diet: string;
  info: string;
  region: string;
  img: string;
};

export type FoodStructure = { id: string } & ProtoFoodStructure;

export type FoodServerResponse = {
  results: FoodStructure;
};
