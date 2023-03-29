import { useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../services/repositories/users.repo";

export default function UserLogout() {
  const repo = useMemo(() => new UsersApiRepo(), []);
  const { logoutUser } = useUsers(repo);
  return <button onClick={logoutUser}>Logout</button>;
}
