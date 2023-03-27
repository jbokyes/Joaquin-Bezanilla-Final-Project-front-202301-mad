import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../services/repositories/users.repo";
import { MenuOption } from "../app/app";
import styles from "./menu.module.scss";
type MenuProps = {
  options: MenuOption[];
};

export function Menu({ options }: MenuProps) {
  const repo = useMemo(() => new UsersApiRepo(), []);
  const { usersState } = useUsers(repo);
  const menuLoggedOptions: MenuOption[] = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Favourites", path: "/favourites" },
  ];

  const isLogging: boolean =
    usersState.userLogged.email !== undefined ? true : false;
  return (
    <nav>
      <img
        src={"./images/burger-menu.png"}
        alt=""
        className={styles.burgermenu}
      />
      <ul className={styles.menu}>
        {isLogging
          ? menuLoggedOptions.map((item) => (
              <li key={item.label}>
                <Link to={item.path}>
                  <p>{item.label}</p>
                </Link>
              </li>
            ))
          : options.map((item) => (
              <li key={item.label}>
                <Link to={item.path}>
                  <p>{item.label}</p>
                </Link>
              </li>
            ))}
      </ul>
    </nav>
  );
}
