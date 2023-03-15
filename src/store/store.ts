import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/user.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
