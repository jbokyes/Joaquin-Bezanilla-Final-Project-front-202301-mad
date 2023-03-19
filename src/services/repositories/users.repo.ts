import { FoodStructure } from "../../models/food";
import { UserServerResponse, UserStructure } from "../../models/user";
import { URL_LATINO_FOOD_USERS } from "../../variables";

export interface UserRepo<T> {
  create(userInfo: Partial<UserStructure>, action: string): Promise<T>;
}

export class UsersApiRepo implements UserRepo<UserServerResponse> {
  url: string;

  constructor() {
    this.url = URL_LATINO_FOOD_USERS;
  }

  async create(
    userInfo: Partial<UserStructure>,
    action: "register" | "login"
  ): Promise<UserServerResponse> {
    const url = this.url + "/" + action;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error("HTTP Error " + resp.status + " / " + resp.statusText);

    const userData = await resp.json();

    return userData;
  }

  async readId(
    userId: UserStructure["id"],
    token: string
  ): Promise<UserServerResponse> {
    const url = this.url + "/" + userId;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer" + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error http: " + resp.status + "/" + resp.statusText);
    const userInfo = (await resp.json()) as UserServerResponse;
    return userInfo;
  }
  async update(
    foodId: FoodStructure["id"],
    token: string,
    action: string
  ): Promise<UserServerResponse> {
    const url = this.url + "/" + action + "/favourites" + foodId;
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error("Error http: " + resp.status + " / " + resp.statusText);
    const userInfo = (await resp.json()) as UserServerResponse;
    return userInfo;
  }
}
