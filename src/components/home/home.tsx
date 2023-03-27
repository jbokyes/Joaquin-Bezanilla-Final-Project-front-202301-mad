import React from "react";
import { FoodCardList } from "../foodCardList/FoodCardList";
import Welcome from "../welcome/welcome";
import styles from "./home.module.scss";

export function Home() {
  return (
    <div className={styles.home}>
      <Welcome></Welcome>
      <FoodCardList></FoodCardList>
    </div>
  );
}

export default Home;
