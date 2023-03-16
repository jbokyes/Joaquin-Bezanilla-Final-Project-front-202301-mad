/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UserStructure } from "../../models/user";
import { UsersApiRepo } from "../../services/repositories/users.api.repo";

import styles from "./login.module.scss";

export function Login() {
  const userRepo = useMemo(() => new UsersApiRepo(), []);

  const { loginUser } = useUsers(userRepo);

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formLoginUser = ev.currentTarget;

    const logUser: Partial<UserStructure> = {
      email: (formLoginUser.elements[0] as HTMLFormElement).value,
      passwd: (formLoginUser.elements[1] as HTMLFormElement).value,
    };

    loginUser(logUser);

    formLoginUser.reset();
  };
  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <p className="type-in">Type in your registered credentials.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          role="textbox"
          placeholder="Password:"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
