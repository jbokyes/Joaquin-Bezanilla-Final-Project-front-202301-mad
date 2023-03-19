import React from "react";
import styles from "./welcome.module.scss";
export function Welcome() {
  return (
    <div className={styles.welcome}>
      <img src="./images/latin-food-welcome.png" alt="latin-food" />
      <p className={styles.welcome__p}>
        Welcome to the Latin american food wiki
      </p>
    </div>
  );
}

export default Welcome;
