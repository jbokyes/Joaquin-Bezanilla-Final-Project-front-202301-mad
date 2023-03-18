import { useDispatch, useSelector } from "react-redux";
import { UserStructure } from "../models/user";
import { login, register } from "../reducers/user.slice";
import { UsersApiRepo } from "../services/repositories/users.api.repo";
import { AppDispatch, RootState } from "../store/store";

export function useUsers(repo: UsersApiRepo) {
  const users = useSelector((state: RootState) => state.users);

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

  return {
    users,
    registerUser,
    loginUser,
  };
}
