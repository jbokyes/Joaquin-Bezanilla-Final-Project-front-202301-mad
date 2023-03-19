import React from "react";
import Welcome from "../welcome/welcome";
import styles from "./home.module.scss";

export function Home() {
  return (
    <div className={styles.home}>
      <Welcome></Welcome>
    </div>
  );
}

export default Home;
