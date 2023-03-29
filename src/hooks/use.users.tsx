import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FoodStructure } from "../models/food";
import { UserStructure } from "../models/user";
import {
  addToFavourite,
  login,
  logout,
  register,
} from "../reducers/user.slice";
import { UsersApiRepo } from "../services/repositories/users.repo";
import { AppDispatch, RootState } from "../store/store";

export function useUsers(repo: UsersApiRepo) {
  const navigate = useNavigate();
  const usersState = useSelector((state: RootState) => state.users);

  const usersDispatch = useDispatch<AppDispatch>();

  const registerUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, "register");
      usersDispatch(register(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const loginUser = async (userInfo: Partial<UserStructure>) => {
    try {
      const infoUser = await repo.create(userInfo, "login");
      usersDispatch(login(infoUser.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const userFavourites = async (food: FoodStructure, action: string) => {
    try {
      const userToken = localStorage.getItem("token");
      console.log("linea 1");
      if (!userToken) throw new Error("Not authorized");
      console.log("linea 2");
      const userInfo = await repo.update(food.id, userToken, action);
      console.log("userInfo: ", userInfo);
      // Arreglo temporal usersDispatch(update(userInfo.results[0]));
      usersDispatch(addToFavourite(food));
      console.log("Custom hook troubleshooting!", food);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logoutUser = () => {
    usersDispatch(logout());
    localStorage.removeItem("token");
    navigate("/home");
  };

  return {
    usersState,
    registerUser,
    loginUser,
    userFavourites,
    logoutUser,
  };
}
