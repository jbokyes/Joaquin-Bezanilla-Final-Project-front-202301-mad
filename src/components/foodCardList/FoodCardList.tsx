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

  const handlePage = (pageChange?: number, region?: string) => {
    loadFoods(pageChange, region);
  };
  return (
    <>
      <div className={styles.cardcontainer}>
        {foods.map((item: FoodStructure) => (
          <FoodCard food={item} key={item.id}></FoodCard>
        ))}
      </div>
      <div className={styles.buttons}>
        <div className={styles.pagebuttons}>
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
        <div className={styles.filterbuttons}>
          <button className="" onClick={() => handlePage(+0, "all")}>
            All latin america
          </button>
          <button className="" onClick={() => handlePage(+0, "peru")}>
            Peru
          </button>
          <button className="" onClick={() => handlePage(+0, "brazil")}>
            Brazil
          </button>
          <button className="" onClick={() => handlePage(+0, "chile")}>
            Chile
          </button>
          <button className="" onClick={() => handlePage(+0, "mexico")}>
            Mexico
          </button>
          <button className="" onClick={() => handlePage(+0, "argentina")}>
            Argentina
          </button>
        </div>
      </div>
    </>
  );
}
