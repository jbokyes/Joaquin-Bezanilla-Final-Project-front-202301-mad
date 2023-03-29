import { useMemo } from "react";
import { useUsers } from "../../hooks/use.users";
import { UsersApiRepo } from "../../services/repositories/users.repo";
import styles from "./favourites.module.scss";

export function Favourites() {
  const repoUser = useMemo(() => new UsersApiRepo(), []);
  const { usersState } = useUsers(repoUser);
  const { addFoods } = usersState.user;

  return (
    <>
      <h2 className={styles.favourites__title}>Favourites</h2>
      <ul className={styles.products}>
        {addFoods ? (
          addFoods!.map((item) => (
            <li key={item.id} className={styles.product}>
              <div>
                <img src={item.img} alt={item.name} />
              </div>
              <p>{item.name}</p>
              <p>{item.region}</p>
            </li>
          ))
        ) : (
          <p>No favourites yet</p>
        )}
      </ul>
    </>
  );
}

export default Favourites;
