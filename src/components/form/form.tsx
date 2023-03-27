/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useFood } from "../../hooks/use.food";
import { FoodStructure, ProtoFoodStructure } from "../../models/food";
import { FoodRepo } from "../../services/repositories/food.repo";
import styles from "./form.module.scss";
export function Form() {
  const { id } = useParams();
  const repo = useMemo(() => new FoodRepo(), []);
  const { foods } = useFood(repo);
  let foodToEdit = foods.find((item) => item.id === id);
  const { editFood, addFood } = useFood(repo);

  const type = foodToEdit === undefined ? "add" : "";
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const inputs = form.querySelectorAll("input");
    const newFood: Partial<FoodStructure> = {
      name: inputs[0].value,
      cuisine: inputs[1].value,
      region: inputs[2].value.toLowerCase(),
      diet: inputs[3].value,
      info: inputs[4].value,
    };
    const image = (form.elements[5] as HTMLFormElement).files?.item(0);
    if (type === "add") {
      addFood(newFood as ProtoFoodStructure, image);
    } else {
      newFood.id = foodToEdit!.id;
      editFood(newFood, image, foodToEdit!.img);
    }
    form.reset();
  };
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <form action="" onSubmit={handleSubmit} id="form" data-testid="form">
      <div className={styles.formline}>
        <label htmlFor="">Name: </label>
        <input
          type="text"
          placeholder="Food name"
          defaultValue={foodToEdit?.name}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.formline}>
        <label htmlFor="">Cuisine: </label>
        <input
          type="text"
          placeholder="Food cuisine"
          defaultValue={foodToEdit?.cuisine}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.formline}>
        <label htmlFor="">Region: </label>
        <input
          type="text"
          placeholder="chile, peru, argentina, brazil, mexico, other"
          defaultValue={foodToEdit?.region}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.formline}>
        <label htmlFor="">Diet: </label>
        <input
          type="text"
          placeholder="Diets this dish is friendly to"
          defaultValue={foodToEdit?.diet}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.formline}>
        <label htmlFor="">Description: </label>
        <input
          type="text"
          placeholder="Everything about this dish"
          defaultValue={foodToEdit?.info}
          className={styles.form__input}
          required
        />
      </div>
      <div className={styles.form__image}>
        <label htmlFor="">Image: </label>
        <input type="file" />
      </div>
      <div className="button-div">
        <button
          className={styles.form__submit}
          type="submit"
          onClick={() => {
            setIsSubmit(true);
            setTimeout(() => {
              setIsSubmit(false);
            }, 2500);
          }}
        >
          SUBMIT
        </button>
        <p className={styles.form__feedback}>
          {isSubmit ? `Food submitted!` : ""}
        </p>
      </div>
    </form>
  );
}
