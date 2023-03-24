import { Link } from "react-router-dom";
import { FoodStructure } from "../../models/food";
import styles from "./FoodCard.module.scss";
type CardProps = {
  food: FoodStructure;
};

export function FoodCard({ food }: CardProps) {
  return (
    <div className={styles.card}>
      <li className={styles.card__list}>
        <div className={styles.card__element}>
          <Link to={`/details/${food.id}`}>
            <img
              className={styles.card__image}
              src={food.img}
              alt="appetizing food plate"
            ></img>
          </Link>
          <div className={styles.card__properties}>
            <div className={styles.card__properties__name}>
              <span>{food.name}</span>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
