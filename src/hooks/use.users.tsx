import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FoodStructure } from "../models/food";
import { UserStructure } from "../models/user";
import { login, logout, register, update } from "../reducers/user.slice";
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

  const userFavourites = async (
    foodId: FoodStructure["id"],
    action: string
  ) => {
    try {
      const userToken = usersState.userLogged.token;
      if (!userToken) throw new Error("Not authorized");
      const userInfo = await repo.update(foodId, userToken, action);
      usersDispatch(update(userInfo.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logoutUser = () => {
    try {
      usersDispatch(logout());
      localStorage.removeItem("token");
      navigate("/home");
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    usersState,
    registerUser,
    loginUser,
    userFavourites,
    logoutUser,
  };
}
