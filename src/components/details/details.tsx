import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import styles from "./details.module.scss";
export type CardProps = {
  food: FoodStructure;
};
export default function Details() {
  const { id } = useParams();
  const repo = useMemo(() => new FoodRepo(), []);
  const { foods } = useFood(repo);

  const foodDetails = foods.find((item) => item.id === id);

  return (
    <>
      <div>
        <h2>Details</h2>
        <span>
          <span>
            <div>
              <img
                src={foodDetails?.img}
                alt="Details Card"
                className={styles.details__image}
              />
            </div>
            <ul className={styles.card__details}>
              <li>{foodDetails?.img}</li>
              <li>Name:{foodDetails?.name}</li>
              <li>Region:{foodDetails?.region}</li>
              <li>Description:{foodDetails?.info}</li>
            </ul>
          </span>
        </span>
        <div className={styles.button_container}>
          <div className={styles.button_container_flex}>
            <Link to={"/home"}>
              <button>Back Home</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
