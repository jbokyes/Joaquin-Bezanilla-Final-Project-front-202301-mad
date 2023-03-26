import { Link } from "react-router-dom";
import styles from "./welcome.module.scss";
export function Welcome() {
  return (
    <div className={styles.welcome}>
      <img
        src="./images/latin-food-welcome.png"
        alt="latin-food"
        className={styles.welcome__img}
      />
      <h2 className={styles.welcome__p}>
        Welcome to the Latin american food wiki
      </h2>
      <Link to={`/add`} relative="path">
        <img
          src="./images/add-heart.png"
          alt="latin-food"
          className={styles.welcome__button}
        />
      </Link>
    </div>
  );
}

export default Welcome;
