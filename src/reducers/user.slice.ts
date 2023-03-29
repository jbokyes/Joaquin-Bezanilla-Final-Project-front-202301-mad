import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user";
import { FoodStructure } from "../models/food";

export type State = {
  userLogged: UserStructure;
  user: UserStructure;
  allUsers: UserStructure[];
};

const initialState: State = {
  userLogged: {} as UserStructure,
  user: {} as UserStructure,
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    register(state, action: PayloadAction<UserStructure>) {
      state.allUsers = [...state.allUsers, action.payload];
    },

    login(state, action: PayloadAction<UserStructure>) {
      state.userLogged = action.payload;
    },
    readId(state, action: PayloadAction<UserStructure>) {
      state.user = action.payload;
    },
    update(state, action: PayloadAction<UserStructure>) {
      state.userLogged = { ...state.userLogged, ...action.payload };
      const actualInfo = [...state.allUsers];
      state.allUsers = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    logout(state) {
      state.userLogged = {} as UserStructure;
    },
    addToFavourite(state, action: PayloadAction<FoodStructure>) {
      state.user.addFoods = [...state.userLogged.addFoods!, action.payload];
      console.log(
        "action payload: ",
        action.payload,
        "state.user.addFoods: ",
        state.user.addFoods,
        "state.userLogged.addFoods: ",
        state.userLogged.addFoods
      );
    },
  },
});

export const { register, login, readId, update, logout, addToFavourite } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
