import { configureStore } from "@reduxjs/toolkit";
import { foodReducer } from "../reducers/food.reducer";
import { userReducer } from "../reducers/user.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    foods: foodReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
