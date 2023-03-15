import { FoodStructure } from "./food";

export type ProtoUserStructure = {
  username: string;
  lastName?: string;
  email: string;
  passwd?: string;
  role: string;
  addFoods: FoodStructure[];
  token?: string;
};

export type UserStructure = { id: string } & ProtoUserStructure;

export type UserServerResponse = {
  results: UserStructure[];
};
