import React from "react";
import { Link } from "react-router-dom";
import styles from "./welcome.module.scss";
export function Welcome() {
  return (
    <div className={styles.welcome}>
      <img src="./images/latin-food-welcome.png" alt="latin-food" />
      <p className={styles.welcome__p}>
        Welcome to the Latin american food wiki
      </p>
      <Link to={`/add`} relative="path">
        <button> Add food </button>
      </Link>
    </div>
  );
}

export default Welcome;
