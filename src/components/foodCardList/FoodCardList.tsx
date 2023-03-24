import { useEffect, useMemo } from "react";
import { useFood } from "../../hooks/use.food";
import { FoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import { FoodCard } from "../foodCard/FoodCard";
import styles from "./FoodCardList.module.scss";

export function FoodCardList() {
  const repo = useMemo(() => new FoodRepo(), []);
  const { foods, loadFoods } = useFood(repo);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  const handlePage = (pageChange: number) => {
    loadFoods(pageChange);
  };
  return (
    <div className={styles.cardcontainer}>
      {foods.map((item: FoodStructure) => (
        <FoodCard food={item} key={item.id}></FoodCard>
      ))}
      <div className="buttons">
        <button
          className="style.productsButtonsPrev"
          onClick={() => handlePage(-1)}
        >
          -
        </button>
        <button className="" onClick={() => handlePage(+1)}>
          +
        </button>
      </div>
    </div>
  );
}
