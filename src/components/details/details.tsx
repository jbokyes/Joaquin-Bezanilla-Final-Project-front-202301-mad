import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { useUsers } from "../../hooks/use.users";
import { FoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import { UsersApiRepo } from "../../services/repositories/users.repo";
import styles from "./details.module.scss";
export type CardProps = {
  food: FoodStructure;
};
export default function Details() {
  const { id } = useParams();
  const repo = useMemo(() => new FoodRepo(), []);
  const userRepo = useMemo(() => new UsersApiRepo(), []);
  const { foods, deleteFood } = useFood(repo);
  const { userFavourites } = useUsers(userRepo);

  const foodDetails = foods.find((item) => item.id === id);
  const handleDelete = () => {
    deleteFood(foodDetails!.id);
  };
  const handleFavourite = () => {
    userFavourites(foodDetails!, "add");
  };
  const handleUnfavourite = () => {
    userFavourites(foodDetails!, "delete");
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.details__buttons}>
          <Link to={`/home`} relative="path">
            <button onClick={handleDelete}> Delete </button>
          </Link>
          <Link to={`/edit/${id}`} relative="path">
            <button> Edit </button>
          </Link>
          <button onClick={handleFavourite}> Add to favourites </button>
          <button onClick={handleUnfavourite}> Delete from favourites </button>
        </div>
        <h2 className={styles.details__title}>{foodDetails?.name}</h2>
        <div>
          <img
            src={foodDetails?.img}
            alt="Details Card"
            className={styles.details__image}
          />
        </div>
        <ul className={styles.card__details}>
          <li>
            <span>Name: </span>
            {foodDetails?.name}
          </li>
          <li>
            <span>Region: </span>
            {foodDetails?.region}
          </li>
          <li>
            <span>Friendly to diets: </span>
            {foodDetails?.diet}
          </li>
          <li>
            <span>Description: </span>
            {foodDetails?.info}
          </li>
        </ul>

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
