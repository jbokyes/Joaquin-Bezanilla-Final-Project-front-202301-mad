import { Link } from "react-router-dom";
import styles from "./welcome.module.scss";
export function Welcome() {
  return (
    <div className={styles.welcome}>
      <img
        src="./images/mesa-chilena.jpg"
        alt="latin-food"
        className={styles.welcome__img}
      />
      <h2 className={styles.welcome__p}>
        Welcome to the Latin american food wiki
      </h2>
      <Link to={`/add`} relative="path">
        <button className={styles.welcome__button}> Add Food dish</button>
      </Link>
    </div>
  );
}

export default Welcome;
